import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Truck, BookOpen, Palette, Users, Calculator, FileText, DollarSign, Utensils, Gauge, Timer, School, ClipboardList, Banknote, Compass, BarChart2, UserCircle, BookMarked } from "lucide-react";
import { Toaster } from "sonner";
import SEO from "@/components/SEO";

// Import pages
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

const phases = [
  { path: "/day-one", name: "Day One Simulator", phase: "Phase 7", icon: Timer, description: "Interactive scenario-based training. Rush hour decision making with live metrics.", fontStyle: "Space Grotesk · Oswald" },
  { path: "/signature-dish", name: "Signature Dish Developer", phase: "Phase 3", icon: Utensils, description: "Hero item creation form with narrative, ingredient highlights, and image upload.", fontStyle: "Iron Chef · Work Sans" },
  { path: "/crew-quarters", name: "Crew Quarters — Training Bible", phase: "Phase 6", icon: School, description: "HACCP training, sanitization protocols, customer service standards, emergency docs.", fontStyle: "Crew Quarters · Lexend" },
  { path: "/dream-kitchen", name: "Dream Kitchen — Readiness", phase: "Phase 1", icon: ClipboardList, description: "Onboarding assessment. Tailored roadmap, risk analysis, capital forecast intro.", fontStyle: "Founder · Work Sans" },
  { path: "/truck-design", name: "Truck Design — Paint Shop", phase: "Phase 5", icon: Palette, description: "Composite preview canvas with paint/finish tools, asset upload, lettering tool.", fontStyle: "Studio · Space Grotesk" },
  { path: "/payroll", name: "Payroll Planning & Scheduling", phase: "Phase 6", icon: Banknote, description: "Shift grid, wage compliance, state tool, tip pool, labor analytics dashboard.", fontStyle: "Crew Quarters · Ops" },
  { path: "/scaling-prep", name: "Scaling & Prep Calculator", phase: "Phase 3", icon: Calculator, description: "Ingredient matrix with batch scaling, waste estimation, cost per unit, prep labor.", fontStyle: "Iron Chef · High Volume" },
  { path: "/paper-trail", name: "Paper Trail — Permits Navigator", phase: "Phase 2", icon: Compass, description: "Regulatory landscape. Federal, health dept, city, county permits with progress tracking.", fontStyle: "Navigator · Compliance" },
  { path: "/break-even", name: "Break-Even Analyzer", phase: "Financial", icon: BarChart2, description: "Financial modeling tool with cost inputs, revenue projections, break-even point.", fontStyle: "Financial Module" },
  { path: "/target-customer", name: "Target Customer Profiling", phase: "Module 2", icon: UserCircle, description: "Archetype builder with demographics, real-time persona preview, PDF download.", fontStyle: "Workshop · Concept Dev" },
  { path: "/recipe-builder", name: "Recipe Builder — Brisket Tacos", phase: "Phase 3", icon: BookMarked, description: "Full recipe editor with ingredient costing, step-by-step method, export to PDF.", fontStyle: "Iron Chef · Industrial V3" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#141210] text-slate-100 p-8">
      <SEO 
        title="Food Truck Launch Pad"
        description="Industrial-grade platform for food truck entrepreneurs. 11 screens, 7 phases. From concept to Day One, build your mobile food empire with precision."
        url="/"
      />
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Truck className="w-8 h-8 text-primary" />
            <h1 className="font-bold text-xl uppercase tracking-wider text-primary">Blue Collar Apps Co.</h1>
          </div>
          <h2 className="text-5xl font-black uppercase tracking-tight mb-2 font-header">Food Truck Launch Pad</h2>
          <p className="text-slate-400 text-lg">Stitch Screen Catalog · Emergent Handoff Package</p>
          <div className="flex items-center gap-4 mt-4">
            <span className="bg-primary/20 border border-primary/40 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">11 Screens</span>
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
                className="group bg-[#1a1714] border border-[#2e2820] hover:border-primary/60 rounded-xl p-5 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{phase.phase}</span>
                </div>
                <h3 className="font-bold text-white mb-1 group-hover:text-primary transition-colors">{phase.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{phase.description}</p>
                <div className="mt-3 flex gap-2">
                  <span className="text-[9px] bg-slate-800 px-2 py-0.5 rounded font-bold text-slate-400 uppercase">{phase.fontStyle}</span>
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
        <Routes>
          <Route path="/" element={<Dashboard />} />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
