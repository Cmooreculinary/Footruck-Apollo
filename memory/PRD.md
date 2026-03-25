# Food Truck Launch Pad (FTLP)

## Original Problem Statement
Build a "Food Truck Launch Pad" full-stack application with React frontend, FastAPI backend, and MongoDB. Features include interactive "Paint Shop" and "Kitchen Builder" modules, user authentication (Google Auth), Stripe subscription payments, and a real-time visual truck configurator.

## Core Architecture
- **Frontend:** React + TailwindCSS + Shadcn/UI (port 3000)
- **Backend:** FastAPI + Pydantic (port 8001, prefixed with /api)
- **Database:** MongoDB via MONGO_URL
- **Auth:** Emergent-managed Google Auth
- **Payments:** Stripe subscriptions (live Price IDs)

## Key Technical Implementation

### Paint Shop Visual Configurator
- **Truck Images:** 6 photorealistic truck models stored as processed PNGs in `/frontend/public/trucks/`
- **Image Processing:** Original images (mixed white/transparent backgrounds) processed via Python PIL to have solid BLACK backgrounds using flood-fill + dilation + feathering
- **Color Technique:** `mix-blend-mode: multiply` overlay on top of truck image. Black areas stay black (no bleed), white truck body gets colored.
- **Color Wheel:** HSV-based circular hue ring + saturation/brightness square, smooth drag interaction, HEX input, palette presets

### DB Schema
- `users`: { google_id, name, email, picture }
- `subscriptions`: { user_id, stripe_subscription_id, ... }
- `truck_designs`: { user_id, base_model, primary_color, secondary_color, finish, business_name, ... }

## What's Been Implemented

### Completed Features
1. React SPA with full routing (Landing, Dashboard, Paint Shop, Kitchen Builder, etc.)
2. Google Auth login via Emergent-managed auth
3. Stripe subscription integration (Standard/Pro plans)
4. Real-time Paint Shop visual configurator with:
   - 6 truck chassis models with processed black-background images
   - HSV color wheel with hue ring + SV square + HEX input
   - 6 preset color palettes + recent colors
   - 7 finish types (Matte, Gloss, Metallic, Chrome, Enamel, Satin, Pearl)
   - Two-tone paint with split patterns
   - Business name/text overlay with fonts and styling
   - Logo upload positioning
   - Accessories (awning, LED underglow, roof signage, racing stripe)
   - Save/Load design persistence
5. Landing page with optimized hero image loading (0.55s)
6. Source code ZIP download

### Bug Fixes Applied
- **P0 Color Bleed Fix:** Processed all 6 truck images with PIL to ensure black backgrounds. Used flood-fill from edges (threshold=200), dilation (2px), and gaussian feathering for clean edges. Verified all 6 models have zero background bleed.
- **React setState Warning:** Fixed ColorWheel to not call onChange inside setState callback
- **truck_04 Special Processing:** Required more aggressive edge dilation due to original white background with subtle gradients

## Prioritized Backlog

### P0 (None - all critical items resolved)

### P1 (Next)
- Implement remaining Paint Shop features: Wraps library, additional view angles (front/rear)
- Verify Save/Load persistence: complete configurator state saves/loads correctly
- App-wide UX Polish: form validation, universal loading states
- Design Gallery: view, name, and manage saved truck designs

### P2 (Future)
- Shareable Designs: URL-encoded design sharing
- "Get Quote" functionality
- Confirmation dialogs for destructive actions
- Mobile responsiveness audit
- Social media preview images for production

## Key Files
- `/app/frontend/src/pages/PaintShop.jsx` — Main configurator (ColorWheel, TruckCanvas, controls)
- `/app/frontend/public/trucks/` — Processed truck images (black backgrounds)
- `/app/backend/server.py` — API endpoints including Stripe, auth, design CRUD
- `/app/frontend/src/pages/LandingPage.jsx` — Hero with preload optimization
