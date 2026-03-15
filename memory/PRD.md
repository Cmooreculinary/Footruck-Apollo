# Food Truck Launch Pad - PRD

## Problem Statement
Build a comprehensive platform for food truck entrepreneurs covering the journey from concept to launch with 13 feature modules across 7 phases.

## Architecture & Tech Stack
- **Frontend**: React.js with Tailwind CSS
- **Theme**: Industrial-luxe dark theme with orange primary (#E8592F / #ec7f13)
- **Fonts**: Space Grotesk, Oswald, Work Sans, Lexend
- **Backend**: FastAPI (Python)
- **Database**: MongoDB

## User Personas
1. **Aspiring Food Truck Entrepreneur** - First-time business owners
2. **Existing Restaurant Owner** - Expanding into mobile food service
3. **Culinary Professional** - Chefs transitioning to food truck ownership

## What's Been Implemented

### NEW: Paint Shop v2.0 (March 2026) ✅
Full exterior truck configurator with:
- **6 Base Truck Models**: Step Van Classic, Step Van Modern, Cargo Van, Food Trailer, Flatbed Build-Out, Vintage/Retro
- **30+ Paint Colors** across 6 categories (Classic, Blues, Reds/Oranges, Greens/Earth, Metallic, Special)
- **5 Finish Types**: High Gloss, Satin, Matte, Metallic, Pearl
- **6 Two-Tone Patterns**: Solid, Horizontal Split, Diagonal, Hood & Roof, Racing Stripe, Lower Accent
- **Wraps & Graphics**: Carbon fiber, wood grain, food themes, cultural patterns
- **Serving Windows**: 6 configurations from standard to accordion fold-out
- **Awnings**: 8 options including LED-lit
- **15+ Accessories**: LED underglow, roof floods, neon accents, roof sign, blade sign
- **5 Wheel Styles**: Steel, alloy, chrome, off-road
- **Real-time 2.5D SVG Truck Preview** with business name display
- **Cost Estimator** updating live based on selections

### NEW: Kitchen Builder v2.0 (March 2026) ✅
Interior equipment layout designer with:
- **100+ Equipment Items** across 7 categories:
  - Cooking: Griddles, fryers, charbroilers, ranges, ovens
  - Refrigeration: Under-counter fridges, freezers, prep tables, display cases
  - Prep & Tables: Work tables, shelving, racks
  - Sinks & Plumbing: 3-compartment sink, hand wash, water tanks
  - Ventilation: Exhaust hoods, fire extinguisher
  - Beverage: Espresso, coffee, fountain, soft-serve
  - Serving: Heat lamps, warming drawers, POS terminal
- **Top-Down Floor Plan** with 6" grid snap
- **Drag-and-Drop Placement** with collision detection
- **Space Utilization Meter** showing % of floor space used
- **Health Code Validation** flagging missing required items
- **Equipment List** with running cost total
- **6 Truck Interior Sizes** matching base truck models

### Data Persistence (March 2026) ✅
All 13 pages now have working save functionality:

| Page | Save Feature | API Endpoint | Status |
|------|--------------|--------------|--------|
| Paint Shop | Save Design | POST /api/truck-designs | ✅ |
| Kitchen Builder | Save Layout | POST /api/scaled-batches | ✅ |
| Truck Design (Legacy) | Save Design | POST /api/truck-designs | ✅ |
| Signature Dish Developer | Save Draft/Publish | POST /api/dishes | ✅ |
| Break-Even Analyzer | Save Scenario | POST /api/break-even | ✅ |
| Recipe Builder | Save Recipe | POST /api/recipes | ✅ |
| Target Customer Profiling | Save Profile | POST /api/customer-profiles | ✅ |
| Dream Kitchen | Begin Assessment | POST /api/assessments | ✅ |
| Scaling & Prep Calculator | Export to Inventory | POST /api/scaled-batches | ✅ |
| Payroll Planning | Save Plan | POST /api/payroll-plans | ✅ |
| Paper Trail Permits | New Permit/Schedule | POST /api/permits | ✅ |
| Day One Simulator | Answer Progress | POST /api/simulation-progress | ✅ |
| Crew Quarters Training | Mark as Trained | POST /api/training-progress | ✅ |

### Dead Links Fixed (March 2026) ✅
All 35 `href="#"` dead links replaced with toast notifications:
- CrewQuartersTraining.jsx - Vault, Schedule, Team, footer links
- PayrollPlanning.jsx - Staff Directory, Scheduling, Tip Management, nav links
- ScalingPrepCalculator.jsx - Recipe Library, Batch Logs, Yield Tracking, nav links
- PaperTrailPermits.jsx - Compliance, Blueprint links
- BreakEvenAnalyzer.jsx - Features, Pricing, Blog, Vendor Directory, About, Contact, Privacy
- DreamKitchen.jsx - Resources, Community, Privacy, Terms, Support

### Social Media/SEO Optimization ✅
- React Helmet Async for dynamic meta tags
- Open Graph and Twitter Card meta tags on all pages
- og-image.png, robots.txt, sitemap.xml

### All Feature Modules
1. **Paint Shop v2.0** - `/paint-shop` (NEW)
2. **Kitchen Builder v2.0** - `/kitchen-builder` (NEW)
3. **Day One Simulator** - `/day-one`
4. **Signature Dish Developer** - `/signature-dish`
5. **Crew Quarters Training** - `/crew-quarters`
6. **Dream Kitchen Readiness** - `/dream-kitchen`
7. **Truck Design (Legacy)** - `/truck-design`
8. **Payroll Planning** - `/payroll`
9. **Scaling & Prep Calculator** - `/scaling-prep`
10. **Paper Trail Permits** - `/paper-trail`
11. **Break-Even Analyzer** - `/break-even`
12. **Target Customer Profiling** - `/target-customer`
13. **Recipe Builder** - `/recipe-builder`

## Prioritized Backlog

### P0 - Critical ✅ COMPLETE
- ✅ All 13 feature modules implemented
- ✅ Backend API for data persistence
- ✅ Dead links fixed

### P1 - High Priority
- User authentication system (JWT or social login)
- Load saved data on page mount (useEffect with fetch)
- Form validation (client & server-side)

### P2 - Medium Priority
- PDF export for permits, recipes, personas, floor plans
- Real data integration for state wage tools
- Confirmation dialogs for destructive actions
- 3D truck preview upgrade (Three.js / React Three Fiber)

### P3 - Nice to Have
- Multi-user collaboration
- Mobile native app
- Third-party integrations (Stripe, payments)
- Equipment drag from floor plan (reposition)

## Test Results (March 15, 2026)
- **Iteration 5**: Backend 23/23 PASSED, Frontend 9/9 PASSED
- **Iteration 6**: Frontend 100% PASSED (Paint Shop, Kitchen Builder, dead links)

## Files of Reference
- `/app/frontend/src/pages/PaintShop.jsx` - New Paint Shop v2.0
- `/app/frontend/src/pages/KitchenBuilder.jsx` - New Kitchen Builder v2.0
- `/app/backend/server.py` - All API endpoints
- `/app/frontend/src/lib/api.js` - API client
- `/app/frontend/src/App.js` - Routes for all 13 pages
