# Food Truck Launch Pad (FTLP) - Product Requirements Document

## Original Problem Statement
Build a "Food Truck Launch Pad" full-stack application with React frontend, FastAPI backend, and MongoDB. Key features include an interactive Paint Shop visual configurator, Kitchen Builder module, Google Auth, Stripe subscription payments, and a public showroom.

## Architecture
- **Frontend**: React + TailwindCSS + Shadcn UI, port 3000
- **Backend**: FastAPI + MongoDB, port 8001
- **Auth**: Emergent-managed Google Auth
- **Payments**: Stripe live subscriptions

## Design System (May 2026 - Premium Overhaul)
- **Fonts**: Outfit (headings), Manrope (body)
- **Primary accent**: #E8592F (warm copper)
- **Dark background**: #0a0d14
- **Glass morphism nav**: rgba(10,13,20,0.8) + backdrop-filter blur(20px)
- **CSS utilities**: `.glass`, `.text-gradient-warm`, `.animate-fade-in-up`, `.noise-overlay`
- **Icons**: Lucide React

## Completed Features

### Core Application
- [x] React frontend with routing (Landing, Dashboard, Paint Shop, Kitchen Builder, Showroom, Pricing, 10+ module pages)
- [x] FastAPI backend with MongoDB persistence
- [x] Emergent-managed Google Auth integration
- [x] Stripe subscription integration (Standard + Pro plans with live Price IDs)
- [x] Source code ZIP download

### Premium Creative Director Overhaul (May 2026)
- [x] **Landing Page**: Full-bleed hero with cinematic food truck imagery, bold "Build Your Food Truck Empire" headline, feature showcase with alternating images, how-it-works steps, tools grid, final CTA with trust signals, footer
- [x] **Dashboard**: Reorganized into 4 categories (Design & Build, Menu & Recipes, Business Planning, Operations), 14 modules with premium card design, "Popular" badge for Paint Shop
- [x] **Paint Shop**: Premium glassmorphism header, wider canvas preview, polished control tabs, consistent dark theme
- [x] **All Pages**: Consistent glass navigation bars, unified dark theme (#0a0d14), Outfit/Manrope typography, warm copper accent
- [x] **Showroom**: Updated sidebar branding and background
- [x] **Kitchen Builder**: Updated header with glass morphism
- [x] **Pricing Page**: Updated header, badge styling, consistent colors

### Paint Shop - Real-Time Visual Configurator
- [x] 6 photorealistic truck chassis models (black background processed images)
- [x] Color application with NO background bleed (mix-blend-mode: multiply + bg-black isolation)
- [x] HSV Color Wheel with circular hue ring + SV square
- [x] 6 preset color palettes (Classic Fleet, Copper & Steel, Street Food, Coastal, Luxury, Neon City)
- [x] 7 finish types (Matte, Gloss, Metallic, Chrome, Enamel, Satin, Pearl)
- [x] Two-tone paint with 7 split patterns
- [x] 9 wrap patterns with visible overlay effects
- [x] Racing stripe, Awning/Canopy, LED Underglow, Roof Signage
- [x] Business name lettering with fonts, color, size, outline
- [x] Logo upload, Custom photo upload
- [x] Save/Load design persistence + Reset

## Pending / Upcoming Tasks (Priority Order)

### P1 - Next Up
- [ ] Save/Load persistence verification (ensure all new customization state fields are stored)
- [ ] App-wide UX robustness audit (buttons, selectors, loading states, validation)

### P2 - Future
- [ ] "Get Quote" feature
- [ ] Design Gallery (view, name, manage saved truck designs)
- [ ] Shareable design URLs
- [ ] Confirmation dialogs for destructive actions
- [ ] Additional view angles (front/rear)
- [ ] Mobile responsive refinement for landing page and dashboard

## DB Schema
- **users**: `{ google_id, name, email, picture }`
- **subscriptions**: `{ user_id, stripe_subscription_id, ... }`
- **truck_designs**: `{ user_id, base_model, primary_color, accent_color, finish_type, business_name, split_pattern, wrap_id, awning, accessories[] }`
