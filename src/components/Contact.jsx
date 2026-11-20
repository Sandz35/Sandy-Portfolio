import { useState } from "react";
import { profile } from "../data/content";
import { CheckIcon, LinkedInIcon, MailIcon } from "./Icons";
import Reveal from "./Reveal";

// Set in .env.local (dev) and as a GitHub Actions variable (deploy).
const CONTACT_URL = import.meta.env.VITE_CONTACT_URL;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const empty = { name: "", email: "", subject: "", message: "", company: "" };

function validate(v) {
  const errors = {};
  if (!v.name.trim()) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email.trim())) errors.email = "Please enter a valid email.";
  if (!v.subject.trim()) errors.subject = "Please add a subject.";
  if (v.message.trim().length < 10) errors.message = "Please write at least a sentence.";
  return errors;
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-[15px] font-normal text-slate-900 placeholder:text-slate-500 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/30 dark:border-ink-600 dark:bg-ink-950 dark:text-ink-100 dark:placeholder:text-ink-300/70 dark:focus:border-teal-400";

function Field({ label, name, error, children }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold">
      {label}
      {children}
      {error && (
        <span id={`${name}-error`} className="text-[13px] font-medium text-red-700 dark:text-red-300">
          {error}
        </span>
      )}
    </label>
  );
}

export default function Contact() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    if (!CONTACT_URL) {
      console.warn("VITE_CONTACT_URL is not set, so the form has nowhere to send to.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(CONTACT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      setValues(empty);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  const describedBy = (name) => (errors[name] ? `${name}-error` : undefined);

  return (
    <section id="contact" className="container-page flex flex-col gap-12 py-20 md:py-24 lg:flex-row lg:gap-16">
      <Reveal className="flex flex-col gap-4 lg:w-2/5">
        <span className="eyebrow">Contact</span>
        <h2 className="section-title">Have a program that needs a steady hand?</h2>
        <p className="text-slate-600 dark:text-ink-300">
          Send a note — it lands straight in my inbox, and I usually reply within a day or two.
        </p>
        <a href={`mailto:${profile.email}`} className="card mt-2 flex items-center gap-3.5 px-5 py-4 transition hover:border-slate-300 dark:hover:border-ink-300">
          <MailIcon size={20} /> <span className="break-all">{profile.email}</span>
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="card flex items-center gap-3.5 px-5 py-4 transition hover:border-slate-300 dark:hover:border-ink-300">
          <LinkedInIcon size={20} /> linkedin.com/in/sandipbanerjee1
        </a>
      </Reveal>

      <Reveal className="min-w-0 flex-1">
        <form onSubmit={handleSubmit} noValidate className="card flex flex-col gap-5 rounded-3xl p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" name="name" error={errors.name}>
              <input name="name" autoComplete="name" value={values.name} onChange={update} placeholder="Jane Doe"
                aria-invalid={!!errors.name} aria-describedby={describedBy("name")} className={`${inputClass} h-12`} />
            </Field>
            <Field label="Email" name="email" error={errors.email}>
              <input name="email" type="email" autoComplete="email" value={values.email} onChange={update} placeholder="jane@company.com"
                aria-invalid={!!errors.email} aria-describedby={describedBy("email")} className={`${inputClass} h-12`} />
            </Field>
          </div>
          <Field label="Subject" name="subject" error={errors.subject}>
            <input name="subject" value={values.subject} onChange={update} placeholder="What's this about?"
              aria-invalid={!!errors.subject} aria-describedby={describedBy("subject")} className={`${inputClass} h-12`} />
          </Field>
          <Field label="Message" name="message" error={errors.message}>
            <textarea name="message" rows={5} value={values.message} onChange={update} placeholder="Tell me a little about the role or project"
              aria-invalid={!!errors.message} aria-describedby={describedBy("message")} className={`${inputClass} resize-y py-3`} />
          </Field>

          {/* Honeypot: hidden from people, bots fill it in, and the server ignores those submissions. */}
          <div aria-hidden="true" className="absolute -left-[9999px]">
            <label>
              Company <input name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={update} />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" disabled={status === "sending"} className="btn-primary disabled:cursor-wait disabled:opacity-70">
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            <p role="status" className="text-[15px] font-semibold">
              {status === "sent" && (
                <span className="inline-flex items-center gap-2 text-teal-700 dark:text-teal-400">
                  <CheckIcon /> Thanks — message received.
                </span>
              )}
              {status === "error" && (
                <span className="text-red-700 dark:text-red-300">
                  Couldn't send right now. Please email me directly.
                </span>
              )}
            </p>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
