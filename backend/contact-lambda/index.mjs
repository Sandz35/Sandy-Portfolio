// Contact form handler: AWS Lambda (Node.js 22) behind a Lambda Function URL.
// Saves each message to DynamoDB and emails you a copy through Amazon SES.
//
// Environment variables (Lambda > Configuration > Environment variables):
//   TABLE_NAME  DynamoDB table name, e.g. portfolio-contact-messages
//   TO_EMAIL    where notifications go (a verified SES identity)
//   FROM_EMAIL  sender address (a verified SES identity)
//
// CORS is configured on the Function URL itself (step 11.4), not in this code.

import { randomUUID } from "node:crypto";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const ses = new SESv2Client({});
const { TABLE_NAME, TO_EMAIL, FROM_EMAIL } = process.env;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 100, email: 254, subject: 200, message: 5000 };

const reply = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

const clean = (value, max) => String(value ?? "").trim().slice(0, max);

export const handler = async (event) => {
  if (event.requestContext?.http?.method !== "POST") {
    return reply(405, { error: "Method not allowed" });
  }

  let data;
  try {
    const raw = event.isBase64Encoded ? Buffer.from(event.body ?? "", "base64").toString("utf8") : event.body;
    data = JSON.parse(raw || "{}");
  } catch {
    return reply(400, { error: "Invalid JSON" });
  }

  // Honeypot field: real visitors never see it. Pretend success so bots move on.
  if (data.company) return reply(200, { ok: true });

  const msg = {
    name: clean(data.name, LIMITS.name),
    email: clean(data.email, LIMITS.email),
    subject: clean(data.subject, LIMITS.subject),
    message: clean(data.message, LIMITS.message),
  };

  if (!msg.name || !msg.subject || msg.message.length < 10 || !EMAIL_RE.test(msg.email)) {
    return reply(400, { error: "Please fill in every field with a valid email." });
  }

  const item = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...msg,
    sourceIp: event.requestContext?.http?.sourceIp ?? "unknown",
  };

  try {
    await ddb.send(new PutCommand({ TableName: TABLE_NAME, Item: item }));
  } catch (err) {
    console.error("DynamoDB write failed", err);
    return reply(500, { error: "Could not save your message." });
  }

  // The message is already saved, so an email failure is logged but not shown to the visitor.
  if (TO_EMAIL && FROM_EMAIL) {
    try {
      await ses.send(
        new SendEmailCommand({
          FromEmailAddress: FROM_EMAIL,
          Destination: { ToAddresses: [TO_EMAIL] },
          ReplyToAddresses: [msg.email],
          Content: {
            Simple: {
              Subject: { Data: `Portfolio contact: ${msg.subject}` },
              Body: {
                Text: {
                  Data: `From: ${msg.name} <${msg.email}>\nSent: ${item.createdAt}\n\n${msg.message}`,
                },
              },
            },
          },
        })
      );
    } catch (err) {
      console.error("SES send failed", err);
    }
  }

  return reply(200, { ok: true });
};