import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X, BookOpen, Calculator, Activity, TrendingUp, Search, Bell, Printer, Package, Clock, Zap, SlidersHorizontal, Info, ArrowRight, GitBranch, BarChart2, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { apiClient } from "@/lib/api";

const ingredientData = [
  { name: "Beef Short Rib (Bone-in)", unit: "kg", original: "10.0", target: "48.0", waste: "1.2 kg" },
  { name: "Red Wine (Bordeaux Style)", unit: "L", original: "2.5", target: "12.0", waste: "0.0 L" },
  { name: "Mirepoix Mix (Fresh)", unit: "kg", original: "3.0", target: "14.4", waste: "0.8 kg" },
  { name: "Beef Bone Broth (Double Reduction)", unit: "L", original: "4.0", target: "19.2", waste: "0.2 L" },
  { name: "Aromatic Sachet (House Blend)", unit: "unit", original: "1.0", target: "4.8", waste: "--" },
];

const ScalingPrepCalculator = () => {
  const [selectedRecipe, setSelectedRecipe] = useState("Signature Braised Short Ribs");
  const [targetServings, setTargetServings] = useState(120);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportToInventory = async () => {
    setIsExporting(true);
    try {
      await apiClient.saveScaledBatch({
        recipe_name: selectedRecipe,
        target_servings: targetServings,
        total_batch_cost: 842.12,
        cost_per_unit: 7.02,
        prep_time_hours: 6.5,
        ingredients: ingredientData,
      });
      toast.success("Exported to inventory!", { description: "Batch has been saved and added to your inventory system." });
    } catch (error) {
      toast.error("Export failed", { description: "Please try again." });
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrintPrepSheet = () => {
    toast.info("Print coming soon", { description: "Prep sheet printing is in development." });
  };

  return (
    <div className="bg-background-dark font-display text-slate-100 min-h-screen">
      <SEO 
        title="Scaling & Prep Calculator"
        description="Industrial-grade batch scaling for culinary entrepreneurs. Calculate ingredient quantities, waste estimates, prep labor, and cost per serving."
        url="/scaling-prep"
      />
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-52 border-r border-border-col bg-surface flex flex-col shrink-0">
          <div className="p-5 border-b border-border-col flex items-center gap-3">
            <X className="w-6 h-6 text-primary" />
            <h2 className="text-white font-header text-lg font-bold uppercase tracking-wide">Iron Chef</h2>
          </div>
          <div className="p-4">
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-3 px-2">Kitchen Ops</p>
            <nav className="space-y-1">
              <Link to="/recipe-builder" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-200 text-sm">
                <BookOpen className="w-5 h-5" /> Recipe Library
              </Link>
              <span className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/20 text-primary font-semibold text-sm">
                <Calculator className="w-5 h-5" /> Prep Calculator
              </span>
              <button onClick={() => toast.info("Batch Logs coming soon")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-200 text-sm w-full text-left">
                <Activity className="w-5 h-5" /> Batch Logs
              </button>
              <button onClick={() => toast.info("Yield Tracking coming soon")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-200 text-sm w-full text-left">
                <TrendingUp className="w-5 h-5" /> Yield Tracking
              </button>
            </nav>
          </div>
          <div className="mt-auto p-4 m-4 bg-surface border border-border-col rounded-xl">
            <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">System Status</p>
            <p className="text-xs text-slate-300 font-medium">Phase 3: Iron Chef Mode</p>
            <p className="text-xs text-slate-400">Active</p>
            <div className="w-full h-1 bg-border-col rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-primary w-3/4"></div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Nav */}
          <header className="flex items-center justify-between px-8 py-4 border-b border-border-col bg-surface shrink-0">
            <nav className="flex items-center gap-8 text-sm">
              <Link to="/" className="text-slate-400 hover:text-slate-200">Dashboard</Link>
              <Link to="/recipe-builder" className="text-slate-400 hover:text-slate-200">Recipes</Link>
              <button onClick={() => toast.info("Inventory coming soon")} className="text-slate-400 hover:text-slate-200">Inventory</button>
              <span className="text-primary font-bold border-b-2 border-primary pb-1">Scaling</span>
              <button onClick={() => toast.info("Costs coming soon")} className="text-slate-400 hover:text-slate-200">Costs</button>
            </nav>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input 
                  className="bg-surface border border-border-col rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-primary w-52"
                  placeholder="Search components..."
                />
                <Search className="absolute left-2.5 top-2 text-slate-500 w-5 h-5" />
              </div>
              <button className="size-9 flex items-center justify-center rounded-lg border border-border-col text-slate-400 hover:text-slate-200">
                <Bell className="w-5 h-5" />
              </button>
              <div className="size-9 rounded-full bg-primary/30 border border-primary/50"></div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1 mb-1">
                  <Zap className="w-4 h-4" /> High Volume Precision
                </p>
                <h1 className="text-4xl font-bold text-white">Scaling & Prep Calculator</h1>
                <p className="text-slate-400 mt-1">Industrial-luxe precision for culinary entrepreneurs. Calibrate your batches for peak service efficiency.</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handlePrintPrepSheet}
                  className="flex items-center gap-2 px-4 py-2.5 border border-border-col rounded-lg text-sm font-semibold hover:bg-surface transition-colors"
                >
                  <Printer className="w-4 h-4" /> Print Prep Sheet
                </button>
                <button 
                  onClick={handleExportToInventory}
                  disabled={isExporting}
                  className="flex items-center gap-2 px-4 py-2.5 bg-primary rounded-lg text-sm font-bold text-white hover:bg-primary/90 disabled:opacity-50" 
                  data-testid="export-inventory-btn"
                >
                  {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Package className="w-4 h-4" />}
                  {isExporting ? "Exporting..." : "Export to Inventory"}
                </button>
              </div>
            </div>

            {/* Parameters + Labor */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="col-span-2 bg-surface border border-border-col rounded-xl p-6" data-testid="scaling-parameters">
                <div className="flex items-center gap-2 mb-5">
                  <SlidersHorizontal className="w-5 h-5 text-primary" />
                  <h2 className="font-bold text-lg">Scaling Parameters</h2>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Select Recipe</p>
                    <select 
                      value={selectedRecipe}
                      onChange={(e) => setSelectedRecipe(e.target.value)}
                      className="w-full bg-background-dark border border-border-col rounded-lg px-3 py-3 text-slate-200 focus:outline-none focus:border-primary"
                      data-testid="recipe-select"
                    >
                      <option>Signature Braised Short Ribs</option>
                      <option>Smoked Brisket Tacos</option>
                    </select>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Target Servings</p>
                    <div className="flex">
                      <input 
                        type="number"
                        value={targetServings}
                        onChange={(e) => setTargetServings(parseInt(e.target.value))}
                        className="flex-1 bg-background-dark border border-border-col rounded-l-lg px-3 py-3 text-slate-200 focus:outline-none focus:border-primary text-lg font-bold"
                        data-testid="servings-input"
                      />
                      <span className="bg-border-col border border-border-col rounded-r-lg px-4 py-3 text-slate-500 text-sm">units</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-surface border border-border-col rounded-xl p-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <h2 className="font-bold">Prep Labor</h2>
                </div>
                <p className="text-xs text-slate-400 mb-4">Estimated total time based on volume.</p>
                <div className="mb-1">
                  <span className="text-5xl font-header font-bold text-primary">6.5</span>
                  <span className="text-sm text-slate-400 ml-2 uppercase font-bold tracking-wider">Hours</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-3">
                  <span>Efficiency: 92%</span>
                  <span className="text-primary font-bold">Industrial Grade</span>
                </div>
              </div>
            </div>

            {/* Ingredient Matrix */}
            <div className="bg-surface border border-border-col rounded-xl overflow-hidden mb-6" data-testid="ingredient-matrix">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border-col">
                <h2 className="font-bold uppercase tracking-wide text-sm flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-primary" /> Ingredient Matrix
                </h2>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="size-2 rounded-full bg-slate-500 inline-block"></span> Base: 25 Servings
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="size-2 rounded-full bg-primary inline-block"></span> Target: 120 Servings
                  </span>
                </div>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-background-dark/50">
                  <tr className="text-[10px] uppercase tracking-widest text-slate-500">
                    <th className="text-left px-6 py-3 font-bold">Ingredient</th>
                    <th className="px-6 py-3 font-bold">Unit</th>
                    <th className="px-6 py-3 font-bold">Original Qty</th>
                    <th className="px-6 py-3 font-bold text-primary">Target Qty</th>
                    <th className="px-6 py-3 font-bold text-right">Waste Est.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-col/50">
                  {ingredientData.map((item, index) => (
                    <tr key={index} className="hover:bg-white/5">
                      <td className="px-6 py-4 font-bold text-slate-200">{item.name}</td>
                      <td className="px-6 py-4 text-slate-400 text-center">{item.unit}</td>
                      <td className="px-6 py-4 text-slate-400 text-center">{item.original}</td>
                      <td className="px-6 py-4 text-primary font-bold text-center">{item.target}</td>
                      <td className="px-6 py-4 text-slate-500 text-right">{item.waste}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between px-6 py-4 border-t border-border-col bg-background-dark/30">
                <p className="text-xs text-slate-500 flex items-center gap-2">
                  <Info className="w-4 h-4" /> Scaling factor applied: x4.8. Includes 5% safety margin for yield variance in high-volume reductions.
                </p>
                <div className="flex gap-8 text-right">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Total Batch Cost</p>
                    <p className="text-xl font-header font-bold text-white">$842.12</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Cost Per Unit</p>
                    <p className="text-xl font-header font-bold text-primary">$7.02</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-surface border border-border-col rounded-xl p-6 flex items-start gap-4">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <BarChart2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Production Variance</h3>
                  <p className="text-slate-400 text-sm mb-3">Track the difference between calculated yield and actual production volume.</p>
                  <button onClick={() => toast.info("Analyze History coming soon")} className="text-primary text-xs font-bold uppercase tracking-wider hover:underline flex items-center gap-1">
                    Analyze History <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="bg-surface border border-border-col rounded-xl p-6 flex items-start gap-4">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <GitBranch className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Sub-Recipe Breakdown</h3>
                  <p className="text-slate-400 text-sm mb-3">Expand this calculation into its constituent bases, sauces, and garnishes.</p>
                  <button onClick={() => toast.info("View Breakdown coming soon")} className="text-primary text-xs font-bold uppercase tracking-wider hover:underline flex items-center gap-1">
                    View Breakdown <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </main>

          {/* Status Bar */}
          <footer className="border-t border-border-col bg-surface px-8 py-3 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-400 inline-block"></span> Live Inventory Sync
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-primary inline-block"></span> Lab Calibrated
              </span>
            </div>
            <span>© 2024 Food Truck Launch Pad – Industrial Series</span>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ScalingPrepCalculator;
