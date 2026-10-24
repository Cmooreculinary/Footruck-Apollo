# Foodtruck Apollo

Foodtruck Apollo is a full-stack food truck planning application. The React
frontend includes design, menu, staffing, permitting, and financial tools. The
FastAPI backend provides authentication, persistence, and Stripe subscription
endpoints.

## Repository Layout

- `frontend/`: React 19 and Vite application
- `backend/`: FastAPI application and pytest suite
- `backend/Dockerfile`, `backend/fly.toml`: Fly.io backend deployment
- `.github/workflows/`: manual deploys (`fly-backend.yml`, `cloudflare.yml`)

Historical mockups, generated reports, and retired design assets are kept
outside this application repository.

## Prerequisites

- Node.js 20.19
- Python 3.11
- SQLite (bundled with Python)

## First-Time Setup

```bash
make setup
```

This installs frontend dependencies, creates `backend/.venv`, installs Python
dependencies, and creates local `.env` files from the checked-in examples.
Review both environment files before running the application.

## Run Locally

Start the API:

```bash
make backend
```

In another terminal, start the frontend:

```bash
make frontend
```

The frontend runs at `http://localhost:5173` and the API runs at
`http://localhost:8000`.

## Verify

```bash
make test
make build
```

The normal backend suite runs isolated unit tests and skips live API tests.
To run integration tests against a configured API:

```bash
RUN_API_TESTS=1 BACKEND_URL=http://localhost:8000 make test
```

Optional integration test variables:

- `TEST_SESSION_TOKEN` and `TEST_USER_ID`: session credentials for an existing
  user; the `/api/auth/me` tests are skipped without them.
- `FRONTEND_URL`: frontend deployment URL; the truck image tests are skipped
  without it because those PNGs are frontend static assets.

## Deployment

- Frontend: Cloudflare, built from `frontend/` by `.github/workflows/cloudflare.yml`.
  Site: https://apollo.bcappz.com
- Backend API: Fly.io app `bca-foodtruck-apollo-api` (org `blue-collar-appz`), deployed by
  the manual `Deploy backend to Fly.io` workflow. API: https://api-apollo.bcappz.com

Both domains are assumed until confirmed. The frontend and API share a parent domain so
login cookies work on phones. To change a domain:

- Backend: set `CORS_ORIGINS` (a Fly secret) and optionally `FRONTEND_URL`.
- Frontend: set the repository variables `VITE_BACKEND_URL`, `VITE_SITE_URL` and
  `VITE_SUPPORT_URL` (Help / Contact link, falls back to https://bcappz.com).
- Static files: search and replace `apollo.bcappz.com` in `frontend/public/sitemap.xml`
  and `frontend/public/robots.txt`.

The backend runs on exactly one Fly machine and stores SQLite data on the volume mounted
at `/var/data`. Do not move `SQLITE_PATH` off the volume or user data is lost on deploy.
The machine stops when idle and wakes on the next request.

Secrets live on Fly, never in Git: `fly secrets set --app bca-foodtruck-apollo-api
JWT_SECRET=... STRIPE_API_KEY=... STRIPE_WEBHOOK_SECRET=... CORS_ORIGINS=...`.
The deploy workflow only checks that these names exist. Stripe price IDs can be
overridden with `FOODTRUCK_STANDARD_PRICE_ID` and `FOODTRUCK_PRO_PRICE_ID`.
