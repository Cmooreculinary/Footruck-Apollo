import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Truck, Download, Plus, Calendar, Search, Zap, Users, Coins, Gavel, PiggyBank, Wand2, BarChart, CheckCircle, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { apiClient } from "@/lib/api";

const crewData = [
  { initials: "MA", name: "Marco A.", color: "primary", shifts: ["08:00", "08:00", "08:00", "OFF", "10:00", "10:00"], total: "44:00" },
  { initials: "SL", name: "Sarah L.", color: "blue-500", shifts: ["OFF", "06:00", "06:00", "08:00", "08:00", "08:00"], total: "36:00" },
  { initials: "JD", name: "James D.", color: "emerald-500", shifts: ["08:00", "08:00", "08:00", "08:00", "08:00", "OFF"], total: "40:00" },
];

const PayrollPlanning = () => {
  const [selectedLocation, setSelectedLocation] = useState("California (San Francisco)");
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleSavePayroll = async () => {
    setIsSaving(true);
    try {
      await apiClient.savePayrollPlan({
        location: selectedLocation,
        projected_labor_cost: 4250.00,
        total_weekly_labor: 5825.50,
        crew_schedule: crewData,
      });
      toast.success("Payroll saved!", { description: "Your payroll plan has been saved." });
    } catch (error) {
      toast.error("Failed to save", { description: "Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportReport = () => {
    toast.info("Export coming soon", { description: "Report export is in development." });
  };

  const handleAddShift = () => {
    toast.info("Shift editor coming soon", { description: "Shift management is in development." });
  };

  return (
    <div className="bg-background-dark font-display text-slate-100 min-h-screen">
      <SEO 
        title="Payroll Planning & Scheduling"
        description="Model labor costs and manage weekly shifts with industrial precision. State wage compliance, tip pool management, and labor analytics."
        url="/payroll"
      />
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-52 border-r border-border-col bg-surface flex flex-col shrink-0">
          <div className="p-5 border-b border-border-col flex items-center gap-3">
            <Truck className="w-6 h-6 text-primary" />
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wide leading-tight">Food Truck</p>
              <p className="text-xs font-bold text-white uppercase tracking-wide leading-tight">Launch Pad</p>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-3 px-3">Phase 6: Operations</p>
            <button onClick={() => toast.info("Staff Directory coming soon")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-200 text-sm w-full text-left">
              <Users className="w-5 h-5" /> Staff Directory
            </button>
            <button onClick={() => toast.info("Scheduling coming soon")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-200 text-sm w-full text-left">
              <Calendar className="w-5 h-5" /> Scheduling
            </button>
            <span className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/20 text-primary font-semibold text-sm">
              <Coins className="w-5 h-5" /> Payroll Modeling
            </span>
            <button onClick={() => toast.info("Tip Management coming soon")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-200 text-sm w-full text-left">
              <PiggyBank className="w-5 h-5" /> Tip Management
            </button>
          </nav>
          <div className="p-4 m-4 bg-amber-900/30 border border-amber-700/40 rounded-lg">
            <p className="text-[9px] font-bold text-amber-400 uppercase tracking-wider mb-1">Compliance Alert</p>
            <p className="text-[10px] text-slate-400 leading-relaxed">New overtime laws in Oregon effective next month. Update labor models now.</p>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Nav */}
          <header className="flex items-center justify-between px-8 py-4 border-b border-border-col bg-surface shrink-0">
            <nav className="flex items-center gap-8 text-sm">
              <Link to="/" className="text-slate-400 hover:text-slate-200">Dashboard</Link>
              <button onClick={() => toast.info("Inventory coming soon")} className="text-slate-400 hover:text-slate-200">Inventory</button>
              <Link to="/crew-quarters" className="text-primary font-bold border-b-2 border-primary pb-1">Crew Quarters</Link>
              <span className="text-slate-400 hover:text-slate-200">Payroll</span>
              <button onClick={() => toast.info("Compliance coming soon")} className="text-slate-400 hover:text-slate-200">Compliance</button>
            </nav>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input 
                  className="bg-surface border border-border-col rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-primary w-56"
                  placeholder="Search operations..."
                />
                <Search className="absolute left-2.5 top-2 text-slate-500 w-5 h-5" />
              </div>
              <button className="bg-primary text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg flex items-center gap-2">
                <Zap className="w-4 h-4" /> Go Live
              </button>
              <div className="size-9 rounded-full bg-slate-600 border-2 border-primary/50"></div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="font-header text-4xl font-bold uppercase tracking-tight">
                  Payroll Planning <span className="text-primary">&amp; Scheduling</span>
                </h1>
                <p className="text-slate-400 mt-1">Model labor costs and manage weekly shifts with industrial precision for high-efficiency mobile kitchens.</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleExportReport}
                  className="flex items-center gap-2 px-4 py-2.5 border border-border-col rounded-lg text-sm font-semibold hover:bg-surface transition-colors"
                >
                  <Download className="w-4 h-4" /> Export Report
                </button>
                <button 
                  onClick={handleAddShift}
                  className="flex items-center gap-2 px-4 py-2.5 bg-primary rounded-lg text-sm font-bold text-white hover:bg-primary/90" 
                  data-testid="add-shift-btn"
                >
                  <Plus className="w-4 h-4" /> Add Shift
                </button>
                <button 
                  onClick={handleSavePayroll}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2.5 bg-primary rounded-lg text-sm font-bold text-white hover:bg-primary/90 disabled:opacity-50" 
                  data-testid="save-payroll-btn"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isSaving ? "Saving..." : "Save Plan"}
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-surface border border-border-col rounded-xl p-6" data-testid="labor-cost-card">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Projected Labor Cost</p>
                  <BarChart className="w-5 h-5 text-slate-500" />
                </div>
                <p className="text-3xl font-header font-bold text-white">$4,250.00</p>
                <p className="text-xs text-emerald-400 mt-1">+5.2%</p>
              </div>
              <div className="bg-surface border border-border-col rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Wage Compliance</p>
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-3xl font-header font-bold text-white">100%</p>
                <p className="text-xs text-slate-400 mt-1">Verified · State Level</p>
              </div>
              <div className="bg-surface border-2 border-primary rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Total Weekly Labor</p>
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <p className="text-3xl font-header font-bold text-primary">$5,825.50</p>
                <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-wider">Budgeted</p>
              </div>
            </div>

            {/* Weekly Shift Grid */}
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 bg-surface border border-border-col rounded-xl p-6" data-testid="shift-management">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h2 className="font-header text-xl font-bold uppercase">Weekly Shift Management</h2>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <button className="hover:text-white">‹</button>
                    <span className="font-medium">Oct 14 – Oct 20</span>
                    <button className="hover:text-white">›</button>
                  </div>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-border-col">
                      <th className="text-left pb-3 font-bold">Crew Member</th>
                      <th className="pb-3 font-bold">M</th>
                      <th className="pb-3 font-bold">T</th>
                      <th className="pb-3 font-bold">W</th>
                      <th className="pb-3 font-bold">T</th>
                      <th className="pb-3 font-bold">F</th>
                      <th className="pb-3 font-bold">S</th>
                      <th className="text-right pb-3 font-bold text-primary">Total Hrs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-col/50">
                    {crewData.map((crew, index) => (
                      <tr key={index} className="hover:bg-white/5 transition-colors">
                        <td className="py-4 flex items-center gap-3">
                          <div className={`size-8 rounded-full bg-${crew.color}/20 flex items-center justify-center text-xs font-bold text-${crew.color}`}>
                            {crew.initials}
                          </div>
                          {crew.name}
                        </td>
                        {crew.shifts.map((shift, i) => (
                          <td key={i} className={`text-center ${shift === "OFF" ? "text-slate-500" : "text-slate-300"}`}>
                            {shift}
                          </td>
                        ))}
                        <td className="text-right font-bold text-primary">{crew.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-4">
                {/* State Wage Tool */}
                <div className="bg-surface border border-border-col rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Gavel className="w-5 h-5 text-primary" />
                    <h3 className="font-header font-bold uppercase tracking-wide text-sm">State Wage Tool</h3>
                  </div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Select Location</p>
                  <select 
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-background-dark border border-border-col rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-primary mb-4"
                  >
                    <option>California (San Francisco)</option>
                    <option>New York (NYC)</option>
                    <option>Texas (Austin)</option>
                  </select>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-background-dark rounded-lg p-3">
                      <p className="text-[9px] text-slate-500 uppercase font-bold mb-1">Min Wage</p>
                      <p className="text-lg font-header font-bold text-white">$18.07/hr</p>
                    </div>
                    <div className="bg-background-dark rounded-lg p-3">
                      <p className="text-[9px] text-slate-500 uppercase font-bold mb-1">Tipped Min</p>
                      <p className="text-lg font-header font-bold text-white">$18.07/hr</p>
                    </div>
                  </div>
                  <button className="w-full mt-3 py-2 border border-border-col rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-colors">
                    Sync State Requirements
                  </button>
                </div>

                {/* Tip Pool Compliance */}
                <div className="bg-surface border border-border-col rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <PiggyBank className="w-5 h-5 text-primary" />
                    <h3 className="font-header font-bold uppercase tracking-wide text-sm">Tip Pool Compliance</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    Your current 70/30 Back-of-House tip pool structure is compliant with FLSA 2024 regulations.
                  </p>
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Legal Pool Verified</span>
                  </div>
                </div>

                {/* Setup Wizard */}
                <div className="bg-surface border border-border-col rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Wand2 className="w-5 h-5 text-primary" />
                    <h3 className="font-header font-bold uppercase tracking-wide text-sm">Setup Wizard</h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">Finalize Direct Deposit connections for 4 new crew members.</p>
                  <div className="w-full h-1.5 bg-border-col rounded-full overflow-hidden mb-3">
                    <div className="h-full bg-primary w-2/3"></div>
                  </div>
                  <button className="w-full py-2.5 bg-primary rounded-lg text-xs font-bold uppercase tracking-widest text-white hover:bg-primary/90">
                    Resume Wizard
                  </button>
                </div>
              </div>
            </div>

            {/* Industrial Analytics Banner */}
            <div className="mt-6 bg-surface border border-border-col rounded-xl p-6 flex items-center justify-between">
              <div className="max-w-xl">
                <h3 className="font-header text-xl font-bold uppercase italic mb-2">Industrial Labor Analytics</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Our modeling engine uses historical data from over 5,000 food truck operations to project your peak-hour labor efficiency. Keep your "Labor Cost vs. Sales" ratio below 30% for optimal profitability.
                </p>
                <div className="flex items-center gap-6 mt-3">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-primary inline-block"></span>
                    <span className="text-xs text-slate-400">Current Model: Aggressive Growth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-slate-500 inline-block"></span>
                    <span className="text-xs text-slate-400">Target Ratio: 24.5%</span>
                  </div>
                </div>
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
        </div>
      </div>
    </div>
  );
};

export default PayrollPlanning;
