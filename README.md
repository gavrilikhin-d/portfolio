# Daniil Gavrilikhin Portfolio

Source code for [gavrilikhin.dev](https://gavrilikhin.dev/), a personal portfolio built with Next.js, React, Tailwind CSS, Bun, Resend, Upstash Redis, and Vercel.

## Technologies

- `Next.js`: App Router framework for rendering the portfolio and handling the contact form with server actions.
- `React`: component model for the UI.
- `Tailwind CSS`: utility-first styling for layout, typography, responsive behavior, and interaction states.
- `Bun`: package manager and local development runtime.
- `Resend`: email provider used by the contact form server action.
- `Upstash Redis`: durable serverless Redis storage for contact form rate-limit counters.
- `@upstash/ratelimit`: sliding-window rate limiter used to restrict contact form submissions by client IP.
- `Vercel`: hosting, preview deployments, production deployments, analytics, and speed insights.
- `Vercel Analytics`: privacy-friendly visit analytics.
- `Vercel Speed Insights`: real-user performance metrics.
- `ESLint`: static checks with `--max-warnings=0`, so warnings fail CI and local hooks.
- `Husky`: pre-commit hook that runs lint before local commits.
- `GitHub Actions`: pull request CI for the `Lint` status check before merging into `master`.

## Contact Form Protection

The contact form is protected with server-side validation, a honeypot field, Redis-backed IP rate limiting, and Resend idempotency keys. Bot-looking submissions are silently ignored before hitting Redis or Resend.

## Local Development

```bash
cd frontend
bun install
bun dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

The local environment is based on `frontend/.env.example`. The real `frontend/.env` file is ignored by Git.

## Environment

The contact form and external links use these environment variables:

```env
NEXT_PUBLIC_LINKEDIN_URL=
CONTACT_EMAIL=
MAX_EMAILS=
RATE_LIMIT_WINDOW=
RESEND_API_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
AWS_REGION=
AWS_S3_CV_BUCKET=
AWS_S3_CV_KEY=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

The CV preview and download are served from `/api/cv`, which reads the PDF from S3 when the AWS variables are configured. Without S3 configuration, local development falls back to `frontend/public/cv.pdf`.

Production values live in Vercel. Preview deployments should use separate non-production credentials if the contact form needs to work there.

## Scripts

Run from `frontend`:

```bash
bun dev
bun build
bun start
bun lint
```

`bun lint` runs ESLint with `--max-warnings=0`, so warnings fail both local hooks and CI.

## Docker

The frontend has a multi-stage Dockerfile that builds the Next.js standalone output with Bun and runs it in a distroless Node.js image.

Run the production container locally from the repository root:

```bash
docker compose up --build
```

The container listens on [http://localhost:3000](http://localhost:3000) and reads runtime environment variables from `frontend/.env`.

## Quality Gates

Local commits run:

```bash
cd frontend
bun run lint
```

GitHub Actions runs the same lint check for pull requests targeting `master`.

The intended repository policy is:

- no direct commits to `master`
- PR required before merge
- `Lint` status check required before merge
- Vercel preview deployment required before merge, configured through GitHub branch protection

## Deployment

Deployment is handled by Vercel Git integration.

Current flow:

1. Open a PR into `master`.
2. GitHub Actions runs `Lint`.
3. Vercel creates a preview deployment.
4. GitHub blocks merge if required checks fail.
5. Merging to `master` triggers the production deployment on Vercel.

## Project Layout

```text
frontend/src/app/                           App Router entrypoints and global styles
frontend/src/components/sections/hero       Landing section
frontend/src/components/sections/skills     Skills marquee
frontend/src/components/sections/experience Timeline and CV preview
frontend/src/components/sections/contact    Contact form and server action
frontend/src/lib                            Server utilities
frontend/public                             Static assets, icons, background, and CV
```
