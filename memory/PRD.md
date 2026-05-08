# Food Truck Launch Pad (FTLP) - Product Requirements Document

## Original Problem Statement
Build a "Food Truck Launch Pad" full-stack application with React frontend, FastAPI backend, and MongoDB. Key features include an interactive Paint Shop visual configurator, Kitchen Builder module, Google Auth, Stripe subscription payments, and a public showroom.

## Architecture
- **Frontend**: React + TailwindCSS + Shadcn UI, port 3000
- **Backend**: FastAPI + MongoDB, port 8001
- **Auth**: Emergent-managed Google Auth
- **Payments**: Stripe live subscriptions

## Design System (May 2026)
- **Fonts**: Outfit (headings), Manrope (body)
- **Primary accent**: #E8592F (warm copper)
- **Dark background**: #0a0d14
- **Glass morphism nav**: rgba(10,13,20,0.8) + backdrop-filter blur(20px)
- **CSS utilities**: `.glass`, `.text-gradient-warm`, `.animate-fade-in-up`
- **Icons**: Lucide React

## Completed Features

### Core Application
- [x] React frontend with routing (Landing, Dashboard, Paint Shop, Kitchen Builder, Showroom, Pricing, 10+ module pages)
- [x] FastAPI backend with MongoDB persistence
- [x] Emergent-managed Google Auth integration
- [x] Stripe subscription integration (Standard + Pro plans)
- [x] Source code ZIP download

### Premium Creative Director Overhaul (May 2026)
- [x] Full-bleed hero landing page with cinematic food truck imagery
- [x] Dashboard reorganized into 4 categories (Design & Build, Menu & Recipes, Business Planning, Operations)
- [x] Glassmorphism navigation across all pages
- [x] Outfit + Manrope typography, unified dark theme

### Paint Shop - Ship-Ready (May 2026)
- [x] 6 photorealistic truck chassis models (cleaned black backgrounds, no watermarks)
- [x] Color application with ZERO background bleed (mix-blend-mode: multiply + bg-black isolation)
- [x] **DRAGGABLE TEXT** — business name text can be clicked and dragged to reposition anywhere on canvas
- [x] Draggable logo positioning
- [x] HSV Color Wheel with hue ring + SV square
- [x] 6 preset color palettes
- [x] 7 finish types with CSS filters (Matte, Gloss, Metallic, Chrome, Enamel, Satin, Pearl)
- [x] Two-tone paint with 7 split patterns
- [x] 9 wrap patterns (overlay blend, visible only on truck body)
- [x] Racing stripe (confined to truck body bounds, 12%-88% canvas width)
- [x] Awning/Canopy with solid/striped/scalloped styles + custom color
- [x] LED Underglow with glow effect + custom color
- [x] Roof Signage with illuminated option
- [x] Business name lettering with 5 fonts, custom color, size, outline, letter spacing
- [x] Logo upload with position/scale/rotation controls
- [x] Custom photo upload
- [x] **FULL STATE PERSISTENCE** — all fields saved/loaded via backend API (upsert pattern)
- [x] Reset design to defaults

### Backend API — Paint Shop Endpoints
- `POST /api/truck-designs` — Upsert design (creates or updates for authenticated user)
- `GET /api/truck-designs/latest` — Get latest design for user
- `GET /api/truck-designs` — Get all designs for user

### Full TruckDesign Schema
```
{
  primary_color, accent_color, finish_type, business_name, base_model,
  split_pattern, wrap_id, wrap_opacity,
  lettering_font, lettering_color, lettering_size, lettering_x, lettering_y,
  lettering_outline, letter_spacing,
  awning, awning_color, lights_color, signage_illuminated,
  racing_stripe_color, racing_stripe_width,
  logo_url, logo_x, logo_y, logo_scale, logo_rotation,
  accessories[]
}
```

## Pending / Upcoming Tasks

### P1 - Next Up
- [ ] App-wide UX robustness audit (buttons, selectors, loading states, validation)
- [ ] Mobile responsive refinement for Paint Shop

### P2 - Future
- [ ] "Get Quote" feature
- [ ] Design Gallery (view, name, manage saved truck designs)
- [ ] Shareable design URLs
- [ ] Confirmation dialogs for destructive actions
- [ ] Additional view angles (front/rear)

## DB Schema
- **users**: `{ google_id, name, email, picture }`
- **subscriptions**: `{ user_id, stripe_subscription_id, ... }`
- **truck_designs**: Full schema above with all customization fields
