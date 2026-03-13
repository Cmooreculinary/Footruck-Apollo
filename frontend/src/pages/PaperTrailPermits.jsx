import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Compass, Shield, Cross, Building, Map, Check, ChevronRight, Lock, Clock, Search, Bell, Settings, Plus, Download, MapPin, Lightbulb, Info } from "lucide-react";

const PaperTrailPermits = () => {
  const [healthExpanded, setHealthExpanded] = useState(true);

  return (
    <div className="bg-background-dark font-display text-slate-100 min-h-screen">
      <div className="flex h-screen overflow-hidden">
        {/* Left Panel */}
        <aside className="w-72 border-r border-border-col bg-surface flex flex-col shrink-0">
          <div className="p-6 border-b border-border-col flex items-center gap-3">
            <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Compass className="w-5 h-5 text-primary" />
            </div>
            <h1 className="font-header text-xl font-bold uppercase tracking-wide">Navigator</h1>
          </div>
          <div className="p-6 flex-1">
            <div className="mb-6">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Project Phase</p>
              <h2 className="font-header text-2xl font-bold uppercase italic">Paper Trail</h2>
              <p className="text-slate-400 text-sm mt-1">Food Truck Entrepreneur Phase 2: Navigation of the regulatory landscape.</p>
            </div>

            {/* Progress */}
            <div className="bg-background-dark border border-border-col rounded-xl p-5 mb-6" data-testid="progress-card">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Progress</p>
                <p className="text-2xl font-header font-bold text-primary">65%</p>
              </div>
              <div className="w-full h-2 bg-border-col rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{width: '65%'}}></div>
              </div>
            </div>

            {/* Phase Steps */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/30">
                <div className="size-8 rounded bg-emerald-500/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="font-bold text-sm text-white">Federal EIN</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">Completed Phase 1</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <div className="size-8 rounded bg-primary/20 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-sm text-white">Permits & Licenses</p>
                  <p className="text-[10px] text-primary uppercase tracking-wider font-bold">Current Action</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg opacity-50">
                <div className="size-8 rounded bg-border-col flex items-center justify-center">
                  <Lock className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-400">Operations Launch</p>
                  <p className="text-[10px] text-slate-600 uppercase tracking-wider">Locked Phase 3</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Nav */}
          <header className="flex items-center justify-between px-8 py-4 border-b border-border-col bg-surface shrink-0">
            <nav className="flex items-center gap-8 text-sm">
              <Link to="/" className="text-slate-400 hover:text-slate-200">Mission Control</Link>
              <span className="text-primary font-bold border-b-2 border-primary pb-1">Permits</span>
              <a href="#" className="text-slate-400 hover:text-slate-200">Compliance</a>
              <a href="#" className="text-slate-400 hover:text-slate-200">Blueprint</a>
            </nav>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input 
                  className="bg-surface border border-border-col rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-primary w-52"
                  placeholder="Search requirements..."
                />
                <Search className="absolute left-2.5 top-2 text-slate-500 w-5 h-5" />
              </div>
              <button className="size-9 flex items-center justify-center rounded-lg border border-border-col text-slate-400">
                <Bell className="w-5 h-5" />
              </button>
              <button className="size-9 flex items-center justify-center rounded-lg border border-border-col text-slate-400">
                <Settings className="w-5 h-5" />
              </button>
              <div className="size-9 rounded-full bg-slate-600 border-2 border-primary/30"></div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-8">
            <div className="grid grid-cols-3 gap-6">
              {/* Center: Permits */}
              <div className="col-span-2 space-y-4">
                {/* Federal */}
                <div className="bg-surface border border-border-col rounded-xl overflow-hidden" data-testid="federal-section">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-border-col">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <h2 className="font-bold uppercase tracking-wide text-sm">Federal Requirements</h2>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded border border-emerald-500/30">2/2 Complete</span>
                  </div>
                  <div className="px-6 py-4 flex items-center gap-4">
                    <div className="size-5 rounded border-2 border-emerald-500 bg-emerald-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <p className="font-medium">Employer Identification Number (EIN)</p>
                    <Info className="w-4 h-4 text-slate-500" />
                    <p className="ml-auto text-xs text-slate-500">Completed 12/15/2024</p>
                  </div>
                </div>

                {/* Health Dept */}
                <div className="bg-surface border-2 border-primary/40 rounded-xl overflow-hidden" data-testid="health-section">
                  <div 
                    className="flex items-center justify-between px-6 py-4 border-b border-border-col cursor-pointer"
                    onClick={() => setHealthExpanded(!healthExpanded)}
                  >
                    <div className="flex items-center gap-3">
                      <Cross className="w-5 h-5 text-primary" />
                      <h2 className="font-bold uppercase tracking-wide text-sm">Health Department</h2>
                    </div>
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded border border-primary/30">In Progress</span>
                    <ChevronRight className={`w-5 h-5 text-slate-400 ml-2 transition-transform ${healthExpanded ? 'rotate-90' : ''}`} />
                  </div>
                  {healthExpanded && (
                    <div className="px-6 py-5 space-y-4">
                      <div>
                        <div className="flex items-start gap-3 mb-2">
                          <div className="size-5 mt-0.5 rounded border-2 border-border-col bg-transparent shrink-0"></div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-bold">Public Health Permit Application</p>
                              <span className="text-[10px] font-bold text-primary border border-primary/50 px-2 py-0.5 rounded cursor-pointer hover:bg-primary/10">Explain This</span>
                              <p className="ml-auto text-xs text-slate-500">Due 02/01/2025</p>
                            </div>
                            <p className="text-xs text-slate-400">Primary authorization required to serve food to the public.</p>
                          </div>
                        </div>
                        {/* Sub-items */}
                        <div className="ml-8 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="size-4 rounded border-2 border-emerald-500 bg-emerald-500 flex items-center justify-center shrink-0">
                              <Check className="w-2 h-2 text-white" />
                            </div>
                            <p className="text-sm text-slate-300">Upload equipment certification (NSF)</p>
                            <p className="ml-auto text-xs text-slate-500">Verified 01/05/2025</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="size-4 rounded border-2 border-border-col bg-transparent shrink-0"></div>
                            <p className="text-sm text-slate-300">Schedule pre-opening inspection</p>
                            <button className="ml-auto bg-primary text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider hover:bg-primary/90" data-testid="schedule-btn">
                              Schedule Now
                            </button>
                          </div>
                          <div className="flex items-center gap-3 opacity-50">
                            <div className="size-4 rounded border-2 border-border-col bg-transparent shrink-0"></div>
                            <p className="text-sm text-slate-500">Submit commissary kitchen agreement</p>
                            <Lock className="ml-auto w-4 h-4 text-slate-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* City + County */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface border border-border-col rounded-xl p-5 flex items-center justify-between cursor-pointer hover:border-primary/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <Building className="w-5 h-5 text-slate-400" />
                      <p className="font-bold uppercase tracking-wide text-sm">City Ordinances</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="bg-surface border border-border-col rounded-xl p-5 flex items-center justify-between cursor-pointer hover:border-primary/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <Map className="w-5 h-5 text-slate-400" />
                      <p className="font-bold uppercase tracking-wide text-sm">County Permits</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                </div>

                {/* Pro Tip */}
                <div className="bg-surface border border-border-col rounded-xl p-5 flex items-start gap-4">
                  <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold mb-1">Pro Tip: Commissary Agreements</p>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Most health departments require proof that you have a licensed commercial kitchen (commissary) for prep and waste disposal. Don't skip this step or your inspection will be denied.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Stats */}
              <div className="space-y-4">
                <div className="bg-surface border border-border-col rounded-xl p-6" data-testid="stats-card">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-slate-500 mb-5">Technical Stats</h3>
                  <div className="space-y-5">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">Active Applications</p>
                      <p className="text-4xl font-header font-bold text-primary">04</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">Upcoming Deadlines</p>
                      <p className="text-4xl font-header font-bold text-white">02</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">Estimated Cost</p>
                      <p className="text-3xl font-header font-bold text-white">$1,240.00</p>
                    </div>
                  </div>
                </div>
                <button className="w-full py-3.5 bg-primary rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors" data-testid="new-permit-btn">
                  <Plus className="w-5 h-5" /> New Permit
                </button>
                <button className="w-full py-3 border border-border-col rounded-xl text-slate-300 text-sm font-bold flex items-center justify-center gap-2 hover:bg-surface transition-colors">
                  <Download className="w-5 h-5" /> Export Audit Trail
                </button>

                {/* Map Card */}
                <div className="bg-surface border border-border-col rounded-xl overflow-hidden">
                  <div className="h-32 bg-gradient-to-br from-slate-700 to-slate-800 relative flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-10 h-10 text-primary mx-auto mb-1" />
                      <div className="bg-background-dark/80 rounded px-3 py-1">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Office Location</p>
                        <p className="text-xs text-white font-bold">Health Dept. Main</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PaperTrailPermits;
