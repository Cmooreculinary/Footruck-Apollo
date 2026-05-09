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
- **Icons**: Lucide React

## Completed Features

### Core Application
- [x] React frontend with routing (Landing, Dashboard, Paint Shop, Kitchen Builder, Showroom, Pricing, 10+ modules)
- [x] FastAPI backend with MongoDB persistence
- [x] Emergent-managed Google Auth
- [x] Stripe subscription (Standard + Pro)
- [x] Source code ZIP download

### Premium Creative Overhaul (May 2026)
- [x] Full-bleed hero landing page with cinematic imagery
- [x] Dashboard reorganized into 4 categories
- [x] Glassmorphism nav across all pages
- [x] Outfit + Manrope typography

### Paint Shop — Ship-Ready (May 2026)
- [x] **6 ultra-realistic truck images** generated via GPT Image 1 (cinematic dusk lighting, matte automotive paint, warm service window glow, realistic wheels/trim)
- [x] **Dual-layer color system**: multiply (kills background) + color at 60% opacity (vivid hue) — ZERO background bleed confirmed
- [x] **Draggable text** — business name repositionable via click+drag on canvas
- [x] Draggable logo positioning
- [x] HSV Color Wheel with hue ring + SV square
- [x] 6 preset color palettes + recent colors tracking
- [x] 7 finish types with CSS filters (Matte, Gloss, Metallic, Chrome, Enamel, Satin, Pearl)
- [x] Two-tone paint with 7 split patterns
- [x] 9 wrap patterns (overlay blend, visible only on truck body)
- [x] Racing stripe (confined to truck body bounds)
- [x] Awning/Canopy with solid/striped/scalloped + custom color
- [x] LED Underglow with glow + custom color
- [x] Roof Signage with illuminated option
- [x] Business name lettering with 5 fonts, custom color, size, outline, spacing
- [x] Logo upload + Custom photo upload
- [x] **Full state persistence** — all fields saved/loaded via upsert API
- [x] Reset design to defaults
- [x] Image watermarks cleaned, edge artifacts removed

### Truck Models
1. Classic Step Van (truck_01)
2. Modern Sprinter Van (truck_02)
3. Large Box Truck (truck_03)
4. Compact Transit Van (truck_04)
5. Retro Airstream Trailer (truck_05)
6. Open-Air Trailer (truck_06)

### Color System Technical Detail
- Images: GPT Image 1 generated, 1536x1024 PNG, pure black backgrounds, brightness-boosted truck bodies
- Layer 1: `mix-blend-mode: multiply` — ensures all black pixels stay black regardless of color
- Layer 2: `mix-blend-mode: color` at 60% opacity — pushes vivid hue onto lit truck areas
- Wraps: `mix-blend-mode: overlay` — visible on colored truck, invisible on black background
- Accessories: Positioned absolute elements outside the blend group

## Pending / Upcoming Tasks

### P1
- [ ] App-wide UX robustness audit (loading states, validation)
- [ ] Mobile responsive refinement

### P2
- [ ] Design Gallery (view/name/manage saved designs)
- [ ] Shareable design URLs
- [ ] "Get Quote" feature
- [ ] Confirmation dialogs for destructive actions
