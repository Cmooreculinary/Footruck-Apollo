# FoTruck Apollo — CANONICAL REPO [Iteration 18 | Render-Ready | FastAPI + React]

> Food truck launch platform built by Blue Collar Apps. Plan, design, price, and launch your food truck business — AI-optional, fully functional without an API key.

---

## What It Does

FoTruck Apollo walks food truck operators through every stage of launch:

| Module | Description |
|---|---|
| Day One Simulator | Simulate your first day of service |
| Signature Dish Developer | Build and cost out your hero dishes |
| Dream Kitchen | Plan your truck layout and equipment |
| Paint Shop | Design your truck wrap with 6 base truck models |
| Truck Design Studio | Full customization: colors, graphics, racing stripes |
| Crew Quarters Training | Staff onboarding and training planner |
| Payroll Planning | Schedule and labor cost projections |
| Break-Even Analyzer | Revenue vs. cost modeling |
| Scaling Prep Calculator | Batch prep math for service volume |
| Paper Trail Permits | Permit and compliance checklist |
| Target Customer Profiling | Define and reach your ideal customer |
| Recipe Builder | Build and scale recipes |

---

## Deploy to Render

Connect this repo to Render — the `render.yaml` at the root handles both services.

**Backend env vars (required):**
```
MONGO_URL=mongodb+srv://...
STRIPE_API_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
FOODTRUCK_STANDARD_PRICE_ID=price_...
FOODTRUCK_PRO_PRICE_ID=price_...
```

**Frontend env vars (required):**
```
REACT_APP_BACKEND_URL=https://footruck-apollo-api.onrender.com
```

> **Auth note:** Login uses the Emergent OAuth system (`auth.emergentagent.com`). The app loads and all tool modules work without login — only subscription gating requires auth. Replacing the auth layer with Google OAuth or email/password is a known next step.

---

## Run Locally

```bash
# Backend
cd backend
cp .env.example .env
# Fill in MONGO_URL and Stripe keys
pip install -r requirements.txt
uvicorn server:app --reload

# Frontend (new terminal)
cd frontend
cp .env.example .env.local
# Set REACT_APP_BACKEND_URL=http://localhost:8000
npm install
npm start
```

---

## Tech Stack

- **Backend**: FastAPI, Motor (async MongoDB), Stripe native SDK
- **Frontend**: React 18, CRACO, Tailwind CSS, Radix UI, Recharts
- **Auth**: Emergent OAuth (session-token, httpOnly cookie)
- **Payments**: Stripe Checkout + webhook subscription lifecycle
- **Deploy**: Render (Python web service + static site)

---

## Truck Images

6 base truck models live in `frontend/public/trucks/` (truck_01–06.png).  
Final rendered variants in `.screenshots/` — used for showroom and paint shop previews.

---

## License

Proprietary — All Rights Reserved © Blue Collar Apps
