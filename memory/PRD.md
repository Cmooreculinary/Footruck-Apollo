# Food Truck Launch Pad (FTLP) - Product Requirements Document

## Original Problem Statement
Build a "Food Truck Launch Pad" full-stack application with React frontend, FastAPI backend, and MongoDB. Key features include an interactive Paint Shop visual configurator, Kitchen Builder module, Google Auth, Stripe subscription payments, and a public showroom.

## Architecture
- **Frontend**: React + TailwindCSS + Shadcn UI, port 3000
- **Backend**: FastAPI + MongoDB, port 8001
- **Auth**: Emergent-managed Google Auth
- **Payments**: Stripe live subscriptions

## Completed Features

### Core Application
- [x] React frontend with routing (Landing, Dashboard, Paint Shop, Kitchen Builder, Showroom)
- [x] FastAPI backend with MongoDB persistence
- [x] Emergent-managed Google Auth integration
- [x] Stripe subscription integration (Standard + Pro plans with live Price IDs)
- [x] Source code ZIP download

### Paint Shop - Real-Time Visual Configurator (P1A - COMPLETE)
- [x] 6 photorealistic truck chassis models (black background processed images)
- [x] Color application with NO background bleed (mix-blend-mode: multiply)
- [x] HSV Color Wheel with circular hue ring + SV square
- [x] 6 preset color palettes (Classic Fleet, Copper & Steel, Street Food, Coastal, Luxury, Neon City)
- [x] Recent colors tracking
- [x] 7 finish types (Matte, Gloss, Metallic, Chrome, Enamel, Satin, Pearl)
- [x] Two-tone paint with 7 split patterns
- [x] 9 wrap patterns (Stripes, Carbon Fiber, Polka Dots, Hex Grid, Chevrons, Brushed Metal, Camo)
- [x] Wrap opacity slider
- [x] Racing stripe (thin/medium/bold widths, custom color)
- [x] Awning/Canopy (solid/striped/scalloped styles, custom color)
- [x] LED Underglow with glow effect and custom color
- [x] Roof Signage with illuminated option
- [x] Business name lettering with 5 fonts, custom color, size, outline
- [x] Logo upload with position/scale/rotation controls
- [x] Custom photo upload
- [x] Save/Load design persistence
- [x] Reset design to defaults
- [x] Zoom controls

### Landing Page
- [x] Optimized hero image loading (preload + fetchpriority)

## Pending / Upcoming Tasks (Priority Order)

### P1 - Next Up
- [ ] Save/Load persistence verification (ensure all new customization state fields are stored)
- [ ] App-wide UX robustness audit (buttons, selectors, loading states, validation)

### P2 - Future
- [ ] "Get Quote" feature
- [ ] Design Gallery (view, name, manage saved truck designs)
- [ ] Shareable design URLs
- [ ] Confirmation dialogs for destructive actions (Reset Design)
- [ ] Additional view angles (front/rear)

## Key Technical Details
- Truck images: `/frontend/public/trucks/truck_01-06.png` (black backgrounds, white trucks)
- Color technique: `mix-blend-mode: multiply` overlay colors white areas, leaves black untouched
- Wraps: `mix-blend-mode: overlay` shows patterns only on colored truck areas
- Accessories (awning, LED, signage, racing stripe): Absolute positioned elements outside blend group
- Color isolation group uses `isolation: isolate` with `bg-black` to prevent letterbox bleed

## DB Schema
- **users**: `{ google_id, name, email, picture }`
- **subscriptions**: `{ user_id, stripe_subscription_id, ... }`
- **truck_designs**: `{ user_id, base_model, primary_color, accent_color, finish_type, business_name, split_pattern, wrap_id, awning, accessories[] }`
