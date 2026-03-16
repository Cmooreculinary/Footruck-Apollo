# Food Truck Launch Pad - PRD

## Problem Statement
Build a comprehensive platform for food truck entrepreneurs covering the journey from concept to launch with 14 feature modules across 7 phases.

## Architecture & Tech Stack
- **Frontend**: React.js with Tailwind CSS
- **Theme**: Industrial-luxe dark theme with orange primary (#E8592F / #ec7f13)
- **Fonts**: Space Grotesk, Oswald, Work Sans, Lexend
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Auth**: Emergent-managed Google OAuth

## User Personas
1. **Aspiring Food Truck Entrepreneur** - First-time business owners
2. **Existing Restaurant Owner** - Expanding into mobile food service
3. **Culinary Professional** - Chefs transitioning to food truck ownership

## What's Been Implemented

### NEW: User Authentication (March 2026) ✅
Google OAuth integration via Emergent Auth:
- **AuthContext** - React context managing auth state
- **AuthCallback** - Handles OAuth redirect with session exchange
- **Session Management** - HTTP-only cookies for secure sessions
- **User Profile** - Shows name and avatar in dashboard header
- **Sign Out** - Clears session and redirects to login

Backend endpoints:
- `POST /api/auth/session` - Exchange OAuth session_id for session_token
- `GET /api/auth/me` - Get current authenticated user
- `POST /api/auth/logout` - Clear session and logout

### NEW: Equipment Showroom (March 2026) ✅
Complete equipment catalog and build configurator:
- **8 Equipment Categories**: Chassis, Cooking, Refrigeration, Smallwares, HVAC, Plumbing, Electrical, Serving & POS
- **60+ Products** across 3 tiers (Standard, Premium, Elite)
- **Tier Filtering** and search functionality
- **"Your Build" Shopping Cart** with real-time cost tracking
- **Product Detail Modals** with full specs and features
- **Save Build** persists configuration to backend

### NEW: Paint Shop v2.0 (March 2026) ✅
Full exterior truck configurator with:
- **6 Base Truck Models**: Step Van Classic, Step Van Modern, Cargo Van, Food Trailer, Flatbed Build-Out, Vintage/Retro
- **30+ Paint Colors** across 6 categories
- **5 Finish Types**: High Gloss, Satin, Matte, Metallic, Pearl
- **6 Two-Tone Patterns**
- **Wraps & Graphics**
- **Serving Windows, Awnings, 15+ Accessories, Wheels**
- **Real-time 2.5D SVG Truck Preview**
- **Cost Estimator**

### NEW: Kitchen Builder v2.0 (March 2026) ✅
Interior equipment layout designer with:
- **100+ Equipment Items** across 7 categories
- **Top-Down Floor Plan** with 6" grid snap
- **Drag-and-Drop Placement** with collision detection
- **Health Code Validation**
- **Space Utilization Meter**
- **Equipment Cost Calculator**

### Data Persistence (March 2026) ✅
All 13 pages now have working save functionality with backend API endpoints.

### Dead Links Fixed (March 2026) ✅
All 35 `href="#"` dead links replaced with toast notifications.

### Social Media/SEO Optimization ✅
React Helmet Async, Open Graph, Twitter Cards, sitemap.xml

### All Feature Modules (14 Total)
1. **Equipment Showroom** - `/showroom` ← NEW
2. **Paint Shop v2.0** - `/paint-shop`
3. **Kitchen Builder v2.0** - `/kitchen-builder`
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
- ✅ User authentication (Google OAuth)
- ✅ Dead links fixed

### P1 - High Priority
- Associate saved data with authenticated user (user_id on documents)
- Load user's saved data on page mount
- Form validation (client & server-side)

### P2 - Medium Priority
- PDF export for permits, recipes, personas, floor plans
- Real data integration for state wage tools
- Confirmation dialogs for destructive actions
- 3D truck preview upgrade (Three.js)

### P3 - Nice to Have
- Multi-user collaboration
- Mobile native app
- Payment integration (Stripe)
- Equipment drag repositioning

## Test Results
- **Iteration 5**: Backend 23/23 PASSED, Frontend 9/9 PASSED
- **Iteration 6**: Frontend 100% PASSED (Paint Shop, Kitchen Builder)
- **Iteration 7**: Frontend 100% PASSED (Equipment Showroom - all 8 categories, filtering, search, build cart, save)
- **Auth**: Sign In button present, API endpoints working

## Files of Reference
- `/app/frontend/src/contexts/AuthContext.js` - Auth state management
- `/app/frontend/src/components/AuthCallback.jsx` - OAuth callback handler
- `/app/frontend/src/pages/Showroom.jsx` - Equipment Showroom ← NEW
- `/app/frontend/src/pages/PaintShop.jsx` - Paint Shop v2.0
- `/app/frontend/src/pages/KitchenBuilder.jsx` - Kitchen Builder v2.0
- `/app/backend/server.py` - All API endpoints including auth
- `/app/frontend/src/App.js` - Routes and AuthProvider
