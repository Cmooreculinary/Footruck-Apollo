import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Truck, BookOpen, Palette, Users, Calculator, FileText, DollarSign, Utensils, Gauge, Timer, School, ClipboardList, Banknote, Compass, BarChart2, UserCircle, BookMarked, Paintbrush, ChefHat, LogIn, LogOut, User, Store } from "lucide-react";
import { Toaster } from "sonner";
import SEO from "@/components/SEO";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AuthCallback from "@/components/AuthCallback";

// Import pages
import LandingPage from "@/pages/LandingPage";
import DayOneSimulator from "@/pages/DayOneSimulator";
import SignatureDishDeveloper from "@/pages/SignatureDishDeveloper";
import CrewQuartersTraining from "@/pages/CrewQuartersTraining";
import DreamKitchen from "@/pages/DreamKitchen";
import TruckDesignStudio from "@/pages/TruckDesignStudio";
import PayrollPlanning from "@/pages/PayrollPlanning";
import ScalingPrepCalculator from "@/pages/ScalingPrepCalculator";
import PaperTrailPermits from "@/pages/PaperTrailPermits";
import BreakEvenAnalyzer from "@/pages/BreakEvenAnalyzer";
import TargetCustomerProfiling from "@/pages/TargetCustomerProfiling";
import RecipeBuilder from "@/pages/RecipeBuilder";
import PaintShop from "@/pages/PaintShop";
import KitchenBuilder from "@/pages/KitchenBuilder";
import Showroom from "@/pages/Showroom";

// Hero image for OG tags
const HERO_IMAGE = "https://customer-assets.emergentagent.com/job_750cf976-26d8-4bfa-9e94-eee06e714e86/artifacts/svuwg9mb_274d8457-be63-45b6-9aaa-51fbc158cbbf.png";

const phases = [
  { path: "/showroom", name: "Equipment Showroom", phase: "Phase 5", icon: Store, description: "Browse and configure all food truck equipment. 8 categories, 60+ products.", fontStyle: "NEW · Showroom v1.0", isNew: true },
  { path: "/paint-shop", name: "Paint Shop — Truck Configurator", phase: "Phase 5", icon: Paintbrush, description: "Design your truck exterior with colors, wraps, windows, awnings and accessories.", fontStyle: "NEW · Configurator v2.0", isNew: true },
  { path: "/kitchen-builder", name: "Kitchen Builder — Layout Designer", phase: "Phase 5", icon: ChefHat, description: "Drag-and-drop equipment placement with code compliance validation.", fontStyle: "NEW · Builder v2.0", isNew: true },
  { path: "/day-one", name: "Day One Simulator", phase: "Phase 7", icon: Timer, description: "Interactive scenario-based training. Rush hour decision making with live metrics.", fontStyle: "Space Grotesk · Oswald" },
  { path: "/signature-dish", name: "Signature Dish Developer", phase: "Phase 3", icon: Utensils, description: "Hero item creation form with narrative, ingredient highlights, and image upload.", fontStyle: "Iron Chef · Work Sans" },
  { path: "/crew-quarters", name: "Crew Quarters — Training Bible", phase: "Phase 6", icon: School, description: "HACCP training, sanitization protocols, customer service standards, emergency docs.", fontStyle: "Crew Quarters · Lexend" },
  { path: "/dream-kitchen", name: "Dream Kitchen — Readiness", phase: "Phase 1", icon: ClipboardList, description: "Onboarding assessment. Tailored roadmap, risk analysis, capital forecast intro.", fontStyle: "Founder · Work Sans" },
  { path: "/truck-design", name: "Truck Design — Paint Shop (Legacy)", phase: "Phase 5", icon: Palette, description: "Composite preview canvas with paint/finish tools, asset upload, lettering tool.", fontStyle: "Studio · Space Grotesk" },
  { path: "/payroll", name: "Payroll Planning & Scheduling", phase: "Phase 6", icon: Banknote, description: "Shift grid, wage compliance, state tool, tip pool, labor analytics dashboard.", fontStyle: "Crew Quarters · Ops" },
  { path: "/scaling-prep", name: "Scaling & Prep Calculator", phase: "Phase 3", icon: Calculator, description: "Ingredient matrix with batch scaling, waste estimation, cost per unit, prep labor.", fontStyle: "Iron Chef · High Volume" },
  { path: "/paper-trail", name: "Paper Trail — Permits Navigator", phase: "Phase 2", icon: Compass, description: "Regulatory landscape. Federal, health dept, city, county permits with progress tracking.", fontStyle: "Navigator · Compliance" },
  { path: "/break-even", name: "Break-Even Analyzer", phase: "Financial", icon: BarChart2, description: "Financial modeling tool with cost inputs, revenue projections, break-even point.", fontStyle: "Financial Module" },
  { path: "/target-customer", name: "Target Customer Profiling", phase: "Module 2", icon: UserCircle, description: "Archetype builder with demographics, real-time persona preview, PDF download.", fontStyle: "Workshop · Concept Dev" },
  { path: "/recipe-builder", name: "Recipe Builder — Brisket Tacos", phase: "Phase 3", icon: BookMarked, description: "Full recipe editor with ingredient costing, step-by-step method, export to PDF.", fontStyle: "Iron Chef · Industrial V3" },
];

const Dashboard = () => {
  const { user, login, logout, loading, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#141210] text-slate-100 p-8">
      <SEO 
        title="Dashboard - Food Truck Launch Pad"
        description="Industrial-grade platform for food truck entrepreneurs. 14 screens, 7 phases. From concept to Day One, build your mobile food empire with precision."
        url="/dashboard"
      />
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Truck className="w-8 h-8 text-primary" />
              <h1 className="font-bold text-xl uppercase tracking-wider text-primary">Blue Collar Apps Co.</h1>
            </Link>
            
            {/* Auth UI */}
            <div className="flex items-center gap-3">
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-slate-800 animate-pulse" />
              ) : isAuthenticated && user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-slate-800 rounded-full pl-1 pr-3 py-1">
                    {user.picture ? (
                      <img src={user.picture} alt={user.name} className="w-7 h-7 rounded-full" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-white">{user.name?.split(' ')[0]}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 hover:text-white transition-colors"
                    data-testid="logout-btn"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={login}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
                  data-testid="login-btn"
                >
                  <LogIn className="w-4 h-4" /> Sign In with Google
                </button>
              )}
            </div>
          </div>
          <h2 className="text-5xl font-black uppercase tracking-tight mb-2 font-header">Food Truck Launch Pad</h2>
          <p className="text-slate-400 text-lg">Stitch Screen Catalog · Emergent Handoff Package</p>
          <div className="flex items-center gap-4 mt-4">
            <span className="bg-primary/20 border border-primary/40 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">14 Screens</span>
            <span className="bg-slate-800 border border-slate-700 text-slate-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">7 Phases</span>
            <span className="bg-slate-800 border border-slate-700 text-slate-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Production Ready</span>
          </div>
        </div>

        {/* Phase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {phases.map((phase) => {
            const Icon = phase.icon;
            return (
              <Link
                key={phase.path}
                to={phase.path}
                data-testid={`nav-${phase.name.toLowerCase().replace(/\s+/g, '-').replace(/[—]/g, '')}`}
                className={`group bg-[#1a1714] border rounded-xl p-5 transition-all ${
                  phase.isNew 
                    ? "border-primary/50 hover:border-primary ring-1 ring-primary/20" 
                    : "border-[#2e2820] hover:border-primary/60"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`size-10 rounded-lg flex items-center justify-center ${
                    phase.isNew ? "bg-primary" : "bg-primary/20"
                  }`}>
                    <Icon className={`w-5 h-5 ${phase.isNew ? "text-white" : "text-primary"}`} />
                  </div>
                  <div className="flex items-center gap-2">
                    {phase.isNew && (
                      <span className="text-[8px] bg-primary text-white font-black px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">NEW</span>
                    )}
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{phase.phase}</span>
                  </div>
                </div>
                <h3 className="font-bold text-white mb-1 group-hover:text-primary transition-colors">{phase.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{phase.description}</p>
                <div className="mt-3 flex gap-2">
                  <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                    phase.isNew ? "bg-primary/20 text-primary" : "bg-slate-800 text-slate-400"
                  }`}>{phase.fontStyle}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-[#2e2820] pt-6 flex items-center justify-between text-xs text-slate-600">
          <p>Blue Collar Apps Co. · Food Truck Launch Pad · Stitch → Emergent Handoff</p>
          <p>Design System: Space Grotesk · Oswald · #ec7f13 · Industrial Luxe</p>
        </div>
      </div>
    </div>
  );
};

// Handle auth callback in hash
const AppContent = () => {
  const location = useLocation();
  
  // Check if this is an auth callback
  if (location.hash?.includes('session_id=')) {
    return <AuthCallback />;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dream-kitchen" element={<DreamKitchen />} />
      <Route path="/day-one" element={<DayOneSimulator />} />
      <Route path="/signature-dish" element={<SignatureDishDeveloper />} />
      <Route path="/crew-quarters" element={<CrewQuartersTraining />} />
      <Route path="/truck-design" element={<TruckDesignStudio />} />
      <Route path="/payroll" element={<PayrollPlanning />} />
      <Route path="/scaling-prep" element={<ScalingPrepCalculator />} />
      <Route path="/paper-trail" element={<PaperTrailPermits />} />
      <Route path="/break-even" element={<BreakEvenAnalyzer />} />
      <Route path="/target-customer" element={<TargetCustomerProfiling />} />
      <Route path="/recipe-builder" element={<RecipeBuilder />} />
      <Route path="/paint-shop" element={<PaintShop />} />
      <Route path="/kitchen-builder" element={<KitchenBuilder />} />
      <Route path="/showroom" element={<Showroom />} />
    </Routes>
  );
};

function App() {
  return (
    <div className="dark">
      <Toaster 
        position="top-right" 
        richColors 
        closeButton
        theme="dark"
        toastOptions={{
          style: {
            background: '#1a1714',
            border: '1px solid #2e2820',
            color: '#fff',
          },
        }}
      />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
