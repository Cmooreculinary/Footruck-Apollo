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

## Code Quality (May 9 2026 — Review Applied)
- Hardcoded test secrets moved to env vars
- React hook deps annotated with eslint-disable for intentional mount-only effects
- Array index keys replaced with stable keys in Showroom, SignatureDishDeveloper
- stripe_webhook() refactored from 118-line monolith to 5 focused handler functions
- Redundant stripe imports removed
- Empty catch blocks given console.error logging
- Backend lint: 0 errors. Frontend lint: 0 errors.

## Completed Features

### Core Application
- [x] React frontend with routing (14+ pages)
- [x] FastAPI backend with MongoDB persistence
- [x] Emergent-managed Google Auth
- [x] Stripe subscription (Standard + Pro)

### Paint Shop — Ship-Ready
- [x] 6 ultra-realistic truck images (GPT Image 1)
- [x] Dual-layer color system (multiply + color blend) — zero background bleed
- [x] Draggable text + draggable logo on canvas
- [x] Full state persistence via upsert API
- [x] HSV Color Wheel, 6 palettes, 7 finishes, 9 wraps, extras

### Premium Creative Overhaul
- [x] Full-bleed hero landing page
- [x] Dashboard reorganized into 4 categories
- [x] Glassmorphism nav across all pages

## Pending Tasks
### P1
- [ ] App-wide UX robustness audit
- [ ] Mobile responsive refinement

### P2
- [ ] Design Gallery, Shareable URLs, "Get Quote"
