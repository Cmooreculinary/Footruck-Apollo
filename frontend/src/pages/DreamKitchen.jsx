import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Truck, ArrowRight, ClipboardList, Lightbulb, Utensils, Store, Shield, DollarSign, Timer } from "lucide-react";
import SEO from "@/components/SEO";

const DreamKitchen = () => {
  const [progress, setProgress] = useState(0);

  const startAssessment = () => {
    setProgress(10);
  };

  return (
    <div className="bg-background-dark text-white font-work min-h-screen flex flex-col overflow-x-hidden antialiased selection:bg-primary selection:text-white">
      <SEO 
        title="Dream Kitchen - Readiness Assessment"
        description="Gauge your food truck readiness. Get a tailored roadmap, risk analysis, and capital forecast for your mobile food business journey."
        url="/dream-kitchen"
      />
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border-dark bg-[#181311]/95 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-md bg-gradient-to-br from-primary to-orange-700 flex items-center justify-center text-white shadow-lg shadow-orange-900/20">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-white text-lg font-bold tracking-tight uppercase">Food Truck Founder</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <nav className="flex items-center gap-6">
                <Link to="/" className="text-white text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
                <a href="#" className="text-text-muted text-sm font-medium hover:text-white transition-colors">Resources</a>
                <a href="#" className="text-text-muted text-sm font-medium hover:text-white transition-colors">Community</a>
              </nav>
              <div className="h-6 w-px bg-border-dark"></div>
              <button className="bg-primary hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-md transition-all shadow-[0_2px_8px_rgba(203,79,16,0.3)]">
                My Plan
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-12 items-start">
          {/* Left Sidebar */}
          <aside className="w-full lg:sticky lg:top-24">
            <div className="bg-surface-dark border border-border-dark rounded-xl p-6 shadow-xl">
              <div className="mb-6">
                <h3 className="text-text-muted text-xs font-bold uppercase tracking-widest mb-1">Your Journey</h3>
                <h2 className="text-white text-xl font-bold">Phase 1: Dream Kitchen</h2>
              </div>
              
              {/* Progress Steps */}
              <div className="relative pl-2">
                <div className="absolute left-[19px] top-3 bottom-3 w-[2px] bg-border-dark z-0"></div>
                
                {/* Step 1 - Current */}
                <div className="relative z-10 flex gap-4 pb-8">
                  <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(203,79,16,0.4)] border-2 border-surface-dark">
                    <ClipboardList className="w-5 h-5" />
                  </div>
                  <div className="pt-1">
                    <p className="text-primary text-xs font-bold uppercase tracking-wider mb-0.5">Step 1 • Current</p>
                    <p className="text-white text-base font-medium leading-tight">Welcome & Assessment</p>
                  </div>
                </div>
                
                {/* Step 2 - Locked */}
                <div className="relative z-10 flex gap-4 pb-8 opacity-60">
                  <div className="size-10 rounded-full bg-surface-dark border-2 border-border-dark flex items-center justify-center text-text-muted shrink-0">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div className="pt-1">
                    <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-0.5">Step 2 • Locked</p>
                    <p className="text-text-muted text-base font-medium leading-tight">Concept Definition</p>
                  </div>
                </div>
                
                {/* Step 3 - Locked */}
                <div className="relative z-10 flex gap-4 pb-8 opacity-60">
                  <div className="size-10 rounded-full bg-surface-dark border-2 border-border-dark flex items-center justify-center text-text-muted shrink-0">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div className="pt-1">
                    <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-0.5">Step 3 • Locked</p>
                    <p className="text-text-muted text-base font-medium leading-tight">Menu Planning</p>
                  </div>
                </div>
                
                {/* Step 4 - Locked */}
                <div className="relative z-10 flex gap-4 opacity-60">
                  <div className="size-10 rounded-full bg-surface-dark border-2 border-border-dark flex items-center justify-center text-text-muted shrink-0">
                    <Store className="w-5 h-5" />
                  </div>
                  <div className="pt-1">
                    <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-0.5">Step 4 • Locked</p>
                    <p className="text-text-muted text-base font-medium leading-tight">Brand Identity</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chef's Tip */}
            <div className="mt-6 bg-gradient-to-br from-gray-800 to-gray-900 border border-border-dark rounded-xl p-5 relative overflow-hidden">
              <p className="text-primary font-bold text-sm mb-2 uppercase tracking-wide">Chef's Tip</p>
              <p className="text-gray-300 text-sm italic leading-relaxed">
                "Don't build a menu for everyone. Build a menu for someone specific, and make it unforgettable."
              </p>
            </div>
          </aside>

          {/* Main Content */}
          <section className="flex flex-col gap-8">
            {/* Hero Section */}
            <div className="relative rounded-2xl overflow-hidden bg-surface-dark min-h-[240px] flex flex-col justify-end p-8 border border-border-dark">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#181311] via-[#181311]/80 to-transparent z-10"></div>
              </div>
              <div className="relative z-20 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  Getting Started
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-3">Let's Gauge Your Readiness</h1>
                <p className="text-lg text-gray-300 max-w-xl">
                  From concept to keys. Before you invest, understand where you stand. This first step calibrates your entire roadmap.
                </p>
              </div>
            </div>

            {/* Assessment Card */}
            <div className="bg-surface-dark border border-border-dark rounded-xl p-1 shadow-2xl relative overflow-hidden group" data-testid="assessment-card">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center relative z-10">
                  <div className="flex items-center gap-3 mb-4 text-text-muted">
                    <Timer className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wide">Est. Time: 5 Minutes</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">Readiness Assessment</h2>
                  <p className="text-text-muted mb-8 leading-relaxed">
                    This 5-minute assessment will analyze your culinary background, business experience, and financial preparedness to tailor a custom roadmap specifically for your food truck journey.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <button 
                      onClick={startAssessment}
                      className="w-full sm:w-auto bg-primary hover:bg-orange-600 text-white text-base font-bold py-3.5 px-8 rounded-md transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                      data-testid="begin-assessment-btn"
                    >
                      <span>Begin Assessment</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <span className="text-text-muted text-sm">{progress}% Complete</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-surface-dark border border-border-dark rounded-lg p-6 hover:border-primary/50 transition-colors group">
                <div className="size-12 rounded-lg bg-[#392e28] flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <h3 className="text-white text-lg font-bold mb-2">Tailored Roadmap</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Get specific advice based on whether you're a home cook or a seasoned executive chef.
                </p>
              </div>

              <div className="bg-surface-dark border border-border-dark rounded-lg p-6 hover:border-primary/50 transition-colors group">
                <div className="size-12 rounded-lg bg-[#392e28] flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Shield className="w-7 h-7" />
                </div>
                <h3 className="text-white text-lg font-bold mb-2">Risk Analysis</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Identify regulatory hurdles and financial pitfalls before you spend a single dollar.
                </p>
              </div>

              <div className="bg-surface-dark border border-border-dark rounded-lg p-6 hover:border-primary/50 transition-colors group">
                <div className="size-12 rounded-lg bg-[#392e28] flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <DollarSign className="w-7 h-7" />
                </div>
                <h3 className="text-white text-lg font-bold mb-2">Capital Forecast</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Receive a rough estimate of the startup capital needed for your specific concept type.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-dark mt-12 py-8 bg-[#181311]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">© 2024 Food Truck Founder. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="text-text-muted hover:text-white text-sm" href="#">Privacy Policy</a>
            <a className="text-text-muted hover:text-white text-sm" href="#">Terms of Service</a>
            <a className="text-text-muted hover:text-white text-sm" href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DreamKitchen;
