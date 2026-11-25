# Sandip Banerjee — Portfolio

Personal portfolio of Sandip Banerjee

**Live site:** https://sandieportfolio.com

## Tech stack

- **Frontend:** React, Vite, Tailwind CSS
- **Hosting:** AWS S3 + CloudFront, custom domain via Route 53
- **Contact form:** AWS Lambda, DynamoDB, SES
- **Infrastructure:** AWS SAM (`infra/template.yaml`)
- **CI/CD:** GitHub Actions deploys every push to `main`

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

To test the contact form locally, copy `.env.example` to `.env.local` and set `VITE_CONTACT_URL`.

## Project structure

```
src/data/content.js       all site text
src/components/           page sections
backend/contact-lambda/   contact form handler
infra/                    SAM template and config
.github/workflows/        deploy pipeline
```

## Deploy

- **Site:** merge to `main`; GitHub Actions builds and uploads it.
- **AWS resources:** `cd infra` then `sam deploy` (only when `infra/` changes).