# Foodtruck Apollo

Foodtruck Apollo is a full-stack food truck planning application. The React
frontend includes design, menu, staffing, permitting, and financial tools. The
FastAPI backend provides authentication, persistence, and Stripe subscription
endpoints.

## Repository Layout

- `frontend/`: React 19 and Vite application
- `backend/`: FastAPI application and pytest suite
- `vercel.json`: Vercel frontend deployment config
- `render.yaml`: Render backend deployment blueprint

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

## Deployment

The frontend deploys on Vercel from `vercel.json`. The backend deploys on
Render from `render.yaml`.

- Frontend: Vercel project connected to this repository
- Backend API: https://footruck-apollo-backend.onrender.com
- API documentation: https://footruck-apollo-backend.onrender.com/docs

The backend stores SQLite data on the persistent disk mounted at `/var/data`.
Do not change `SQLITE_PATH` to a non-disk path in production or user data will
be lost across deploys.

Secrets and environment-specific URLs belong in the appropriate Render or Vercel
environment variables, not in Git. Required production values include
`JWT_SECRET`, `STRIPE_API_KEY`, `STRIPE_WEBHOOK_SECRET`, `CORS_ORIGINS`,
`VITE_BACKEND_URL`, and the Stripe price IDs if they differ from the checked-in
defaults.
