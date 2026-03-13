import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Truck, Search, Settings, Bell, Download, Save, Layers, Plus, Clock, Thermometer } from "lucide-react";
import SEO from "@/components/SEO";

const ingredients = [
  { id: 1, name: "Prime Beef Brisket", sku: "#0422", qty: "5.50 kg", unitCost: "$18.50", total: "$101.75" },
  { id: 2, name: "Oak Wood Chunks", sku: "#9812", qty: "2.00 bags", unitCost: "$4.25", total: "$8.50" },
  { id: 3, name: "House Rub Blend", sku: "#5521", qty: "150.00 g", unitCost: "$0.02", total: "$3.00" },
  { id: 4, name: "Pickled Red Onions", sku: "#1029", qty: "500.00 g", unitCost: "$0.01", total: "$5.00" },
];

const steps = [
  {
    id: 1,
    title: "Surface Preparation & Rub",
    time: "20m",
    temp: "45°F",
    active: true,
    content: "Trim excess fat to 1/4 inch thickness. Apply a thin binder of yellow mustard. Season aggressively with the House Rub Blend, ensuring all surfaces including edges are covered. Let rest for at least 30 mins at room temp."
  },
  {
    id: 2,
    title: "Pit Management & Smoke",
    time: "6h",
    temp: "225°F",
    active: false,
    content: "Establish a clean-burning oak fire. Place brisket fat-side up toward the heat source. Maintain steady temperature between 225°F and 250°F. Spritz with apple cider vinegar every 60 mins after the first 3 hours."
  },
  {
    id: 3,
    title: "The Stall & Wrap",
    time: "4h",
    temp: "165°F",
    active: false,
    content: "Once bark is set and internal temp hits 165°F, wrap tightly in peach butcher paper. Return to pit until internal temp reaches 203°F and probe tender."
  },
];

const RecipeBuilder = () => {
  const [recipeName] = useState("Smoked Brisket Tacos");

  return (
    <div className="bg-[#141210] font-display text-slate-100 min-h-screen">
      <SEO 
        title="Recipe Builder - Smoked Brisket Tacos"
        description="Build and cost your food truck recipes with industrial precision. Ingredient costing, cooking methods, batch yields, and cost per serving."
        url="/recipe-builder"
      />
      <div className="flex h-screen flex-col overflow-hidden">
        {/* Top Nav */}
        <header className="flex items-center justify-between px-8 py-4 border-b border-border-col bg-surface shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Truck className="w-6 h-6 text-primary" />
              <h2 className="font-bold text-white uppercase tracking-wide">Food Truck Launch Pad</h2>
            </div>
            <nav className="flex items-center gap-6 text-sm">
              <Link to="/" className="text-slate-400 hover:text-slate-200">Dashboard</Link>
              <span className="text-primary font-bold border-b-2 border-primary pb-1">Recipe Builder</span>
              <a href="#" className="text-slate-400 hover:text-slate-200">Inventory</a>
              <a href="#" className="text-slate-400 hover:text-slate-200">Analytics</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input className="bg-surface border border-border-col rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-primary w-48" placeholder="Search recipes..."/>
              <Search className="absolute left-2.5 top-2 text-slate-500 w-5 h-5" />
            </div>
            <button className="size-9 flex items-center justify-center rounded-lg border border-border-col text-slate-400"><Settings className="w-5 h-5" /></button>
            <button className="size-9 flex items-center justify-center rounded-lg border border-border-col text-slate-400"><Bell className="w-5 h-5" /></button>
            <div className="size-9 rounded-full bg-primary/30 border border-primary/50"></div>
          </div>
        </header>

        {/* Recipe Header Bar */}
        <div className="px-8 py-5 border-b border-border-col bg-surface/80 shrink-0">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Phase 3: Iron Chef · Industrial Edition V3.0</p>
          <div className="flex items-center justify-between">
            <h1 className="font-header text-3xl font-bold uppercase tracking-tight flex items-center gap-2">
              {recipeName} <span className="text-primary">.</span>
            </h1>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 border border-border-col rounded-lg text-sm font-semibold hover:bg-surface transition-colors">
                <Download className="w-5 h-5" /> Export PDF
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-primary rounded-lg text-sm font-bold text-white hover:bg-primary/90" data-testid="save-recipe-btn">
                <Save className="w-5 h-5" /> Save Recipe
              </button>
            </div>
          </div>
          {/* Stats Bar */}
          <div className="grid grid-cols-4 mt-5 divide-x divide-border-col border border-border-col rounded-xl overflow-hidden" data-testid="recipe-stats">
            <div className="px-6 py-4">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Prep Time</p>
              <p className="text-2xl font-header font-bold text-white">45 <span className="text-sm text-slate-400 font-display font-normal">mins</span></p>
            </div>
            <div className="px-6 py-4">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Cook Time</p>
              <p className="text-2xl font-header font-bold text-white">12 <span className="text-sm text-slate-400 font-display font-normal">hours</span></p>
            </div>
            <div className="px-6 py-4">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Batch Yield</p>
              <p className="text-2xl font-header font-bold text-white">24 <span className="text-sm text-slate-400 font-display font-normal">servings</span></p>
            </div>
            <div className="px-6 py-4">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Cost Per Serving</p>
              <p className="text-2xl font-header font-bold text-primary">$3.82 <span className="text-sm text-slate-400 font-display font-normal">USD</span></p>
            </div>
          </div>
        </div>

        {/* Main Two-Column */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Ingredients */}
          <aside className="w-96 border-r border-border-col bg-surface flex flex-col shrink-0 overflow-y-auto">
            <div className="p-5 border-b border-border-col flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                <h2 className="font-bold uppercase tracking-wide">Ingredients</h2>
              </div>
              <button className="size-7 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90" data-testid="add-ingredient-btn">
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="p-4 space-y-3 flex-1" data-testid="ingredients-list">
              {ingredients.map((item) => (
                <div key={item.id} className="bg-[#141210] border border-border-col rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-sm text-white uppercase tracking-tighter">{item.name}</p>
                    <span className="text-[10px] text-slate-600">{item.sku}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div><p className="text-slate-500 uppercase font-bold tracking-widest text-[9px]">QTY</p><p className="text-slate-200 font-bold">{item.qty}</p></div>
                    <div><p className="text-slate-500 uppercase font-bold tracking-widest text-[9px]">Unit Cost</p><p className="text-slate-200 font-bold">{item.unitCost}</p></div>
                    <div><p className="text-slate-500 uppercase font-bold tracking-widest text-[9px]">Total</p><p className="text-primary font-bold">{item.total}</p></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5 border-t border-border-col bg-[#141210]/50">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400 font-medium">Ingredient Subtotal</span>
                <span className="text-white font-bold">$118.25</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-medium">Waste Factor (5%)</span>
                <span className="text-primary font-bold">$5.91</span>
              </div>
            </div>
          </aside>

          {/* Right: Cooking Method */}
          <main className="flex-1 overflow-y-auto p-8 bg-[#141210]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-header text-2xl font-bold uppercase tracking-wide">Cooking Method</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg text-sm font-bold text-white hover:bg-primary/90" data-testid="add-step-btn">
                <Plus className="w-5 h-5" /> Add Step
              </button>
            </div>
            <div className="space-y-4" data-testid="cooking-steps">
              {steps.map((step) => (
                <div key={step.id} className={`bg-surface rounded-xl overflow-hidden ${step.active ? 'border-l-4 border-primary' : 'border border-border-col'}`}>
                  <div className="flex items-center justify-between px-6 py-4 border-b border-border-col">
                    <div className="flex items-center gap-4">
                      <span className={`size-9 rounded-lg flex items-center justify-center font-header font-bold text-lg ${
                        step.active 
                          ? 'bg-primary text-white' 
                          : 'bg-surface border border-border-col text-slate-400'
                      }`}>
                        {String(step.id).padStart(2, '0')}
                      </span>
                      <h3 className={`font-header font-bold uppercase tracking-wide ${step.active ? 'text-primary' : 'text-sm'}`}>{step.title}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {step.time}</span>
                      <span className="flex items-center gap-1"><Thermometer className="w-4 h-4" /> {step.temp}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    {step.active ? (
                      <textarea 
                        className="w-full bg-[#141210] border border-border-col rounded-lg p-4 text-slate-300 text-sm leading-relaxed focus:outline-none focus:border-primary resize-none h-24"
                        defaultValue={step.content}
                      />
                    ) : (
                      <p className="text-slate-400 text-sm leading-relaxed">{step.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>

        {/* Status Bar */}
        <footer className="border-t border-border-col bg-surface px-8 py-3 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-emerald-400 inline-block"></span> System Online: CLUSTER-01</span>
            <span>DB: RECIPE_MAIN_V3</span>
            <span>Autosave Active</span>
          </div>
          <div className="flex items-center gap-4">
            <span>User: EXECUTIVE_CHEF_01</span>
            <span>{new Date().toISOString().split('T')[0]} {new Date().toLocaleTimeString()}</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default RecipeBuilder;
