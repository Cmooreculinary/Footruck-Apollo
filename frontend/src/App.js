import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Truck, LayoutDashboard, BookOpen, Palette, Users, Calculator, FileText, DollarSign, Utensils, Gauge } from "lucide-react";

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

const phases = [
  { path: "/dream-kitchen", name: "Dream Kitchen", phase: "Phase 1", icon: Gauge, description: "Readiness Assessment" },
  { path: "/signature-dish", name: "Signature Dish", phase: "Phase 3", icon: Utensils, description: "Menu Development" },
  { path: "/truck-design", name: "Truck Design", phase: "Phase 5", icon: Palette, description: "Paint Shop" },
  { path: "/crew-quarters", name: "Crew Quarters", phase: "Phase 6", icon: Users, description: "Training & Ops" },
  { path: "/payroll", name: "Payroll", phase: "Phase 6", icon: DollarSign, description: "Labor Planning" },
  { path: "/scaling-prep", name: "Scaling & Prep", phase: "Phase 3", icon: Calculator, description: "Batch Calculator" },
  { path: "/paper-trail", name: "Paper Trail", phase: "Phase 2", icon: FileText, description: "Permits & Licenses" },
  { path: "/break-even", name: "Break-Even", phase: "Financial", icon: DollarSign, description: "Cost Analysis" },
  { path: "/day-one", name: "Day One", phase: "Phase 7", icon: BookOpen, description: "Launch Simulator" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border-col bg-surface/95 backdrop-blur-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-primary">
              <Truck className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-white text-lg font-bold tracking-tight uppercase font-header">Food Truck Launch Pad</h1>
              <p className="text-[10px] text-primary uppercase tracking-[0.2em]">Professional Grade V.2.4</p>
            </div>
          </div>
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-primary font-bold text-sm border-b-2 border-primary pb-1">Dashboard</Link>
            <a href="#" className="text-slate-400 hover:text-primary text-sm transition-colors">Resources</a>
            <a href="#" className="text-slate-400 hover:text-primary text-sm transition-colors">Community</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Command Center
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-3 font-header">
            Your Food Truck Journey
          </h2>
          <p className="text-lg text-text-muted max-w-2xl">
            From concept to launch. Navigate every phase of building your mobile food empire with industrial-grade precision.
          </p>
        </div>

        {/* Phase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phases.map((phase) => {
            const Icon = phase.icon;
            return (
              <Link
                key={phase.path}
                to={phase.path}
                data-testid={`nav-${phase.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group bg-surface border border-border-col rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6 text-primary group-hover:text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded border border-primary/30">
                    {phase.phase}
                  </span>
                </div>
                <h3 className="text-white text-lg font-bold mb-1 group-hover:text-primary transition-colors">{phase.name}</h3>
                <p className="text-text-muted text-sm">{phase.description}</p>
                <div className="mt-4 pt-4 border-t border-border-col flex items-center justify-between">
                  <span className="text-xs text-slate-500">Click to open</span>
                  <span className="text-primary text-sm font-bold group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-surface border border-border-col rounded-xl p-8 flex items-center justify-between">
          <div className="max-w-xl">
            <h3 className="font-header text-2xl font-bold uppercase italic mb-2 text-white">Industrial-Grade Launch System</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Our platform guides you through every phase of building a successful food truck business—from initial concept to Day One operations. Each module is designed with the precision and efficiency of a commercial kitchen.
            </p>
          </div>
          <div className="flex items-end gap-1 h-20">
            <div className="w-6 bg-primary/60 rounded-sm" style={{height: '40%'}}></div>
            <div className="w-6 bg-primary/80 rounded-sm" style={{height: '65%'}}></div>
            <div className="w-6 bg-primary rounded-sm" style={{height: '85%'}}></div>
            <div className="w-6 bg-primary/70 rounded-sm" style={{height: '55%'}}></div>
            <div className="w-6 bg-primary/50 rounded-sm" style={{height: '45%'}}></div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-col bg-surface/50 px-6 py-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">© 2024 Food Truck Launch Pad. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-text-muted hover:text-primary text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-text-muted hover:text-primary text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-text-muted hover:text-primary text-sm transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <div className="dark">
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
