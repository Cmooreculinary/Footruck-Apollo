# Food Truck Launch Pad - PRD

## Problem Statement
Upgrade the FoodTruck LaunchPad app with **11 pixel-perfect feature modules** based on provided HTML templates covering the entire food truck entrepreneur journey from concept to launch.

## Architecture & Tech Stack
- **Frontend**: React.js with Tailwind CSS
- **Theme**: Industrial-luxe dark theme with orange primary color (#ec7f13)
- **Fonts**: Space Grotesk, Oswald, Work Sans, Lexend
- **Backend**: FastAPI (Python)
- **Database**: MongoDB

## User Personas
1. **Aspiring Food Truck Entrepreneur** - First-time business owners looking to start a food truck
2. **Existing Restaurant Owner** - Expanding into mobile food service
3. **Culinary Professional** - Chefs transitioning to food truck ownership

## Core Requirements (Static)
- Industrial-grade precision design aesthetic
- Dark theme with orange accents
- Responsive design for desktop and mobile
- Interactive forms and calculators
- Progress tracking across phases

## What's Been Implemented (Jan 2026)

### Dashboard (Home Page)
- Screen Catalog layout with 11 cards
- Blue Collar Apps Co. branding
- Badges: "11 Screens", "7 Phases", "Production Ready"
- Phase tags on each card
- Font style indicators per module

### Feature Modules Implemented:

1. **Dream Kitchen (Phase 1)** - `/dream-kitchen`
   - Readiness assessment with progress steps
   - Feature cards for Tailored Roadmap, Risk Analysis, Capital Forecast

2. **Signature Dish Developer (Phase 3)** - `/signature-dish`
   - Dish narrative text area
   - Ingredient highlights with primary component and X-factor
   - Flavor profile tags
   - Photo upload area

3. **Truck Design Paint Shop (Phase 5)** - `/truck-design`
   - Visual truck preview canvas
   - Finish type selector (matte/gloss/metallic)
   - Color picker with hue slider
   - Lettering tool with font selection
   - Export for wrap shop button

4. **Crew Quarters Training (Phase 6)** - `/crew-quarters`
   - Training categories sidebar
   - Video training modules with progress tracking
   - Documentation vault
   - Emergency procedures section

5. **Payroll Planning & Scheduling (Phase 6)** - `/payroll`
   - KPI cards (Labor Cost, Compliance, Weekly Labor)
   - Weekly shift management grid
   - State wage tool with location selector
   - Tip pool compliance checker
   - Setup wizard for direct deposit

6. **Scaling & Prep Calculator (Phase 3)** - `/scaling-prep`
   - Recipe selection dropdown
   - Target servings input
   - Ingredient matrix table with scaling calculations
   - Prep labor time estimate
   - Batch cost calculations

7. **Paper Trail Permits (Phase 2)** - `/paper-trail`
   - Progress tracker sidebar (65% complete)
   - Federal requirements checklist
   - Health department permits with sub-tasks
   - City ordinances and county permits sections
   - Technical stats panel

8. **Break-Even Analyzer (Financial)** - `/break-even`
   - Fixed costs input
   - Unit economics calculator
   - Sales volume sliders
   - Real-time profit/loss calculation
   - Performance visualizer bar chart
   - P&L preview

9. **Day One Simulator (Phase 7)** - `/day-one`
   - Interactive scenario-based training
   - Mission control timeline
   - Multiple choice answers with feedback
   - Live metrics panel (Revenue, Satisfaction, Ticket Time)
   - Badge earning system

10. **Target Customer Profiling (Module 2)** - `/target-customer`
    - Core Archetypes selection (Corporate Worker, Student, Tourist, Event Goer, Families)
    - Multi-select functionality
    - Demographic details (age range slider, income level buttons)
    - Real-time Persona Preview panel
    - Download Persona PDF button

11. **Recipe Builder - Brisket Tacos (Phase 3)** - `/recipe-builder`
    - Recipe stats bar (Prep Time, Cook Time, Batch Yield, Cost Per Serving)
    - Ingredients sidebar with SKUs, quantities, unit costs, totals
    - Ingredient subtotal and waste factor calculation
    - Cooking method steps with time and temperature
    - Editable step content
    - Save Recipe and Export PDF buttons

## Prioritized Backlog

### P0 - Critical
- ✅ All 9 feature modules implemented

### P1 - High Priority
- Backend API for data persistence
- User authentication system
- Progress saving across sessions

### P2 - Medium Priority
- PDF export for permits and checklists
- Real data integration for wage tools
- Actual recipe database

### P3 - Nice to Have
- Multi-user collaboration
- Mobile native app
- Third-party integrations (Stripe, etc.)

## Next Tasks
1. Implement backend APIs for saving user progress
2. Add authentication (JWT or social login)
3. Create MongoDB models for user data, recipes, permits
4. Add PDF export functionality
5. Integrate real state wage data API
