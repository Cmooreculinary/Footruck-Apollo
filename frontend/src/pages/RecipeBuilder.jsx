import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Truck, Search, Settings, Bell, Download, Save, Layers, Plus, Clock, Thermometer, Loader2, X, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { apiClient } from "@/lib/api";
import { SkeletonForm, SkeletonTable } from "@/components/ui/skeleton-loader";
import { exportRecipeToPDF } from "@/lib/pdfExport";

const initialIngredients = [
  { id: 1, name: "Prime Beef Brisket", sku: "#0422", qty: "5.50", unit: "kg", unitCost: 18.50, total: 101.75 },
  { id: 2, name: "Oak Wood Chunks", sku: "#9812", qty: "2.00", unit: "bags", unitCost: 4.25, total: 8.50 },
  { id: 3, name: "House Rub Blend", sku: "#5521", qty: "150.00", unit: "g", unitCost: 0.02, total: 3.00 },
  { id: 4, name: "Pickled Red Onions", sku: "#1029", qty: "500.00", unit: "g", unitCost: 0.01, total: 5.00 },
];

const initialSteps = [
  {
    id: 1,
    title: "Surface Preparation & Rub",
    time: "20m",
    temp: "45°F",
    content: "Trim excess fat to 1/4 inch thickness. Apply a thin binder of yellow mustard. Season aggressively with the House Rub Blend, ensuring all surfaces including edges are covered. Let rest for at least 30 mins at room temp."
  },
  {
    id: 2,
    title: "Pit Management & Smoke",
    time: "6h",
    temp: "225°F",
    content: "Establish a clean-burning oak fire. Place brisket fat-side up toward the heat source. Maintain steady temperature between 225°F and 250°F. Spritz with apple cider vinegar every 60 mins after the first 3 hours."
  },
  {
    id: 3,
    title: "The Stall & Wrap",
    time: "4h",
    temp: "165°F",
    content: "Once bark is set and internal temp hits 165°F, wrap tightly in peach butcher paper. Return to pit until internal temp reaches 203°F and probe tender."
  },
];

const RecipeBuilder = () => {
  const [recipeName, setRecipeName] = useState("Smoked Brisket Tacos");
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [steps, setSteps] = useState(initialSteps);
  const [activeStep, setActiveStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // Load saved recipe on mount
  useEffect(() => {
    const loadSavedRecipe = async () => {
      try {
        const data = await apiClient.request('/api/recipes/latest');
        if (data && data.name) {
          setRecipeName(data.name);
          if (data.ingredients?.length) setIngredients(data.ingredients);
          if (data.steps?.length) setSteps(data.steps);
          toast.success("Recipe loaded", { description: "Your saved recipe has been restored." });
        }
      } catch (error) {
        // No saved recipe found - use defaults
      } finally {
        setIsLoading(false);
      }
    };
    loadSavedRecipe();
  }, []);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!recipeName.trim()) {
      newErrors.recipeName = "Recipe name is required";
    }
    if (ingredients.length === 0) {
      newErrors.ingredients = "Add at least one ingredient";
    }
    if (steps.length === 0) {
      newErrors.steps = "Add at least one step";
    }
    // Validate each ingredient
    ingredients.forEach((ing, idx) => {
      if (!ing.name.trim()) {
        newErrors[`ingredient_${idx}`] = "Ingredient name required";
      }
      if (parseFloat(ing.qty) <= 0) {
        newErrors[`ingredient_qty_${idx}`] = "Quantity must be positive";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const prepTime = 45;
  const cookTime = 12 * 60; // 12 hours in minutes
  const batchYield = 24;
  const ingredientSubtotal = ingredients.reduce((sum, i) => sum + i.total, 0);
  const wasteFactor = ingredientSubtotal * 0.05;
  const costPerServing = ((ingredientSubtotal + wasteFactor) / batchYield).toFixed(2);

  const handleSaveRecipe = async () => {
    if (!validateForm()) {
      toast.error("Please fix errors", { description: "Check the highlighted fields." });
      return;
    }
    setIsSaving(true);
    try {
      await apiClient.saveRecipe({
        name: recipeName,
        prep_time: prepTime,
        cook_time: cookTime,
        batch_yield: batchYield,
        cost_per_serving: parseFloat(costPerServing),
        ingredients: ingredients,
        steps: steps,
      });
      toast.success("Recipe saved!", { description: "Your recipe has been saved to your library." });
      setErrors({});
    } catch (error) {
      toast.error("Failed to save", { description: "Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      exportRecipeToPDF({
        name: recipeName,
        prep_time: prepTime,
        cook_time: cookTime,
        batch_yield: batchYield,
        cost_per_serving: parseFloat(costPerServing),
        ingredients: ingredients,
        steps: steps,
      });
      toast.success("PDF exported!", { description: "Your recipe PDF has been downloaded." });
    } catch (error) {
      toast.error("Export failed", { description: error.message });
    } finally {
      setIsExporting(false);
    }
  };

  const handleAddIngredient = () => {
    const newId = Math.max(...ingredients.map(i => i.id)) + 1;
    setIngredients([...ingredients, {
      id: newId,
      name: "New Ingredient",
      sku: `#${Math.floor(Math.random() * 9999)}`,
      qty: "1.00",
      unit: "kg",
      unitCost: 0,
      total: 0,
    }]);
    toast.success("Ingredient added");
  };

  const handleAddStep = () => {
    const newId = Math.max(...steps.map(s => s.id)) + 1;
    setSteps([...steps, {
      id: newId,
      title: "New Step",
      time: "30m",
      temp: "350°F",
      content: "Enter step instructions here...",
    }]);
    setActiveStep(newId);
    toast.success("Step added");
  };

  const updateStepContent = (stepId, content) => {
    setSteps(steps.map(s => s.id === stepId ? { ...s, content } : s));
  };

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
              <Link to="/dashboard" className="text-slate-400 hover:text-slate-200">Dashboard</Link>
              <span className="text-primary font-bold border-b-2 border-primary pb-1">Recipe Builder</span>
              <Link to="/scaling-prep" className="text-slate-400 hover:text-slate-200">Scaling</Link>
              <Link to="/break-even" className="text-slate-400 hover:text-slate-200">Analytics</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                className="bg-surface border border-border-col rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-primary w-48" 
                placeholder="Search recipes..."
              />
              <Search className="absolute left-2.5 top-2 text-slate-500 w-5 h-5" />
            </div>
            <button 
              onClick={() => toast.info("Settings coming soon")}
              className="size-9 flex items-center justify-center rounded-lg border border-border-col text-slate-400 hover:text-white"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={() => toast.info("Notifications coming soon")}
              className="size-9 flex items-center justify-center rounded-lg border border-border-col text-slate-400 hover:text-white"
            >
              <Bell className="w-5 h-5" />
            </button>
            <div className="size-9 rounded-full bg-primary/30 border border-primary/50"></div>
          </div>
        </header>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex-1 p-8 space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-slate-400">Loading your recipe...</span>
            </div>
            <SkeletonForm fields={3} />
            <SkeletonTable rows={4} cols={5} />
          </div>
        ) : (
          <>
        {/* Recipe Header Bar */}
        <div className="px-8 py-5 border-b border-border-col bg-surface/80 shrink-0">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Phase 3: Iron Chef · Industrial Edition V3.0</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={recipeName}
                onChange={(e) => {
                  setRecipeName(e.target.value);
                  if (errors.recipeName) setErrors(prev => ({ ...prev, recipeName: null }));
                }}
                className={`font-header text-3xl font-bold uppercase tracking-tight bg-transparent border-b-2 outline-none text-white ${errors.recipeName ? 'border-red-500' : 'border-transparent focus:border-primary'}`}
                placeholder="Enter recipe name..."
              />
              <span className="text-primary">.</span>
              {errors.recipeName && (
                <span className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.recipeName}
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleExportPDF}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2.5 border border-border-col rounded-lg text-sm font-semibold hover:bg-surface transition-colors disabled:opacity-50"
              >
                {isExporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                {isExporting ? "Exporting..." : "Export PDF"}
              </button>
              <button 
                onClick={handleSaveRecipe}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2.5 bg-primary rounded-lg text-sm font-bold text-white hover:bg-primary/90 disabled:opacity-50" 
                data-testid="save-recipe-btn"
              >
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {isSaving ? "Saving..." : "Save Recipe"}
              </button>
            </div>
          </div>
          {/* Stats Bar */}
          <div className="grid grid-cols-4 mt-5 divide-x divide-border-col border border-border-col rounded-xl overflow-hidden" data-testid="recipe-stats">
            <div className="px-6 py-4">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Prep Time</p>
              <p className="text-2xl font-header font-bold text-white">{prepTime} <span className="text-sm text-slate-400 font-display font-normal">mins</span></p>
            </div>
            <div className="px-6 py-4">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Cook Time</p>
              <p className="text-2xl font-header font-bold text-white">{Math.floor(cookTime / 60)} <span className="text-sm text-slate-400 font-display font-normal">hours</span></p>
            </div>
            <div className="px-6 py-4">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Batch Yield</p>
              <p className="text-2xl font-header font-bold text-white">{batchYield} <span className="text-sm text-slate-400 font-display font-normal">servings</span></p>
            </div>
            <div className="px-6 py-4">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Cost Per Serving</p>
              <p className="text-2xl font-header font-bold text-primary">${costPerServing} <span className="text-sm text-slate-400 font-display font-normal">USD</span></p>
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
              <button 
                onClick={handleAddIngredient}
                className="size-7 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90" 
                data-testid="add-ingredient-btn"
              >
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
                    <div><p className="text-slate-500 uppercase font-bold tracking-widest text-[9px]">QTY</p><p className="text-slate-200 font-bold">{item.qty} {item.unit}</p></div>
                    <div><p className="text-slate-500 uppercase font-bold tracking-widest text-[9px]">Unit Cost</p><p className="text-slate-200 font-bold">${item.unitCost.toFixed(2)}</p></div>
                    <div><p className="text-slate-500 uppercase font-bold tracking-widest text-[9px]">Total</p><p className="text-primary font-bold">${item.total.toFixed(2)}</p></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5 border-t border-border-col bg-[#141210]/50">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400 font-medium">Ingredient Subtotal</span>
                <span className="text-white font-bold">${ingredientSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-medium">Waste Factor (5%)</span>
                <span className="text-primary font-bold">${wasteFactor.toFixed(2)}</span>
              </div>
            </div>
          </aside>

          {/* Right: Cooking Method */}
          <main className="flex-1 overflow-y-auto p-8 bg-[#141210]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-header text-2xl font-bold uppercase tracking-wide">Cooking Method</h2>
              <button 
                onClick={handleAddStep}
                className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg text-sm font-bold text-white hover:bg-primary/90" 
                data-testid="add-step-btn"
              >
                <Plus className="w-5 h-5" /> Add Step
              </button>
            </div>
            <div className="space-y-4" data-testid="cooking-steps">
              {steps.map((step) => (
                <div 
                  key={step.id} 
                  className={`bg-surface rounded-xl overflow-hidden cursor-pointer ${activeStep === step.id ? 'border-l-4 border-primary' : 'border border-border-col'}`}
                  onClick={() => setActiveStep(step.id)}
                >
                  <div className="flex items-center justify-between px-6 py-4 border-b border-border-col">
                    <div className="flex items-center gap-4">
                      <span className={`size-9 rounded-lg flex items-center justify-center font-header font-bold text-lg ${
                        activeStep === step.id 
                          ? 'bg-primary text-white' 
                          : 'bg-surface border border-border-col text-slate-400'
                      }`}>
                        {String(step.id).padStart(2, '0')}
                      </span>
                      <h3 className={`font-header font-bold uppercase tracking-wide ${activeStep === step.id ? 'text-primary' : 'text-sm'}`}>{step.title}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {step.time}</span>
                      <span className="flex items-center gap-1"><Thermometer className="w-4 h-4" /> {step.temp}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    {activeStep === step.id ? (
                      <textarea 
                        className="w-full bg-[#141210] border border-border-col rounded-lg p-4 text-slate-300 text-sm leading-relaxed focus:outline-none focus:border-primary resize-none h-24"
                        value={step.content}
                        onChange={(e) => updateStepContent(step.id, e.target.value)}
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
            <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-emerald-400 inline-block"></span> System Online</span>
            <span>Autosave Active</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Last saved: Just now</span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </footer>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeBuilder;
