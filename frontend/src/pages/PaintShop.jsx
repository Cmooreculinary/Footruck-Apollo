import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Truck, Palette, Layers, Type, Sparkles, RotateCcw, Printer, Check, 
  Droplets, Sun, Zap, Loader2, ChevronDown, ChevronRight, Eye, Share2,
  Lightbulb, Box, CircleDot, Square, Hexagon, Car, Save, ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { apiClient } from "@/lib/api";

// ============================================================================
// TRUCK BASE MODELS
// ============================================================================
const truckModels = [
  { id: "step_van_classic", name: "Step Van (Classic)", desc: "Iconic boxy food truck shape", interior: { width: 14, depth: 7, sqft: 98 } },
  { id: "step_van_modern", name: "Step Van (Modern)", desc: "Sleeker with rounded edges", interior: { width: 16, depth: 7, sqft: 112 } },
  { id: "cargo_van", name: "Cargo Van", desc: "Compact, great for solo ops", interior: { width: 10, depth: 5.5, sqft: 55 } },
  { id: "trailer", name: "Food Trailer", desc: "Towed trailer style", interior: { width: 16, depth: 7, sqft: 112 } },
  { id: "flatbed", name: "Flatbed Build-Out", desc: "Custom box on flat chassis", interior: { width: 14, depth: 7.5, sqft: 105 } },
  { id: "vintage", name: "Vintage / Retro", desc: "Classic nostalgic look", interior: { width: 10, depth: 6, sqft: 60 } },
];

// ============================================================================
// COLOR PALETTES (30+ colors)
// ============================================================================
const colorPalettes = {
  "Classic": [
    { name: "Classic White", hex: "#ffffff" },
    { name: "Pearl White", hex: "#f5f5f0" },
    { name: "Arctic Silver", hex: "#d4d4d4" },
    { name: "Gunmetal Gray", hex: "#4a4a4a" },
    { name: "Charcoal Black", hex: "#2d2d2d" },
    { name: "Jet Black", hex: "#0a0a0a" },
  ],
  "Blues": [
    { name: "Midnight Blue", hex: "#1a1a4e" },
    { name: "Royal Blue", hex: "#4169e1" },
    { name: "Sky Blue", hex: "#87ceeb" },
    { name: "Teal", hex: "#008080" },
    { name: "Electric Blue", hex: "#0066ff" },
  ],
  "Reds & Oranges": [
    { name: "Fire Engine Red", hex: "#ce2029" },
    { name: "Crimson", hex: "#dc143c" },
    { name: "Burgundy", hex: "#800020" },
    { name: "Burnt Orange", hex: "#cc5500" },
    { name: "Tangerine", hex: "#ff9966" },
    { name: "Candy Apple Red", hex: "#ff0800" },
  ],
  "Greens & Earth": [
    { name: "Forest Green", hex: "#228b22" },
    { name: "British Racing Green", hex: "#004225" },
    { name: "Seafoam Green", hex: "#71eeb8" },
    { name: "Lime Green", hex: "#32cd32" },
    { name: "Olive", hex: "#808000" },
  ],
  "Metallic": [
    { name: "Chrome Silver", hex: "#c0c0c0" },
    { name: "Champagne Gold", hex: "#f7e7ce" },
    { name: "Rose Gold", hex: "#b76e79" },
    { name: "Bronze", hex: "#cd7f32" },
    { name: "Copper", hex: "#b87333" },
  ],
  "Special": [
    { name: "Hot Pink", hex: "#ff69b4" },
    { name: "Deep Purple", hex: "#673ab7" },
    { name: "Lavender", hex: "#e6e6fa" },
    { name: "Sunflower Yellow", hex: "#ffda03" },
    { name: "Bright Yellow", hex: "#ffff00" },
  ],
};

// ============================================================================
// FINISH TYPES
// ============================================================================
const finishTypes = [
  { id: "gloss", name: "High Gloss", desc: "Mirror-like deep shine", gradient: "linear-gradient(145deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)" },
  { id: "satin", name: "Satin", desc: "Subtle smooth sheen", gradient: "linear-gradient(145deg, rgba(255,255,255,0.2) 0%, transparent 60%)" },
  { id: "matte", name: "Matte", desc: "Modern flat finish", gradient: "none" },
  { id: "metallic", name: "Metallic", desc: "Sparkle flake effect", gradient: "linear-gradient(145deg, rgba(255,255,255,0.5) 0%, transparent 30%, rgba(255,255,255,0.2) 70%)" },
  { id: "pearl", name: "Pearl", desc: "Color-shifting iridescent", gradient: "linear-gradient(145deg, rgba(255,200,255,0.3) 0%, rgba(200,255,255,0.3) 50%, transparent 100%)" },
];

// ============================================================================
// TWO-TONE SPLIT PATTERNS
// ============================================================================
const splitPatterns = [
  { id: "none", name: "Solid Color" },
  { id: "horizontal", name: "Horizontal Split" },
  { id: "diagonal", name: "Diagonal Split" },
  { id: "hood_roof", name: "Hood & Roof" },
  { id: "racing_stripe", name: "Racing Stripe" },
  { id: "lower_accent", name: "Lower Accent" },
];

// ============================================================================
// WRAP PATTERNS
// ============================================================================
const wrapPatterns = {
  "Patterns": [
    { id: "carbon_fiber", name: "Carbon Fiber" },
    { id: "brushed_aluminum", name: "Brushed Aluminum" },
    { id: "wood_grain", name: "Wood Grain" },
    { id: "brick", name: "Brick Wall" },
    { id: "chalkboard", name: "Chalkboard" },
    { id: "marble", name: "Marble" },
  ],
  "Food Themes": [
    { id: "flames", name: "Flame Grill" },
    { id: "smoke", name: "BBQ Smoke" },
    { id: "tacos", name: "Taco Pattern" },
    { id: "pizza", name: "Pizza Slices" },
    { id: "burgers", name: "Burger Ingredients" },
    { id: "coffee", name: "Coffee Beans" },
  ],
  "Cultural": [
    { id: "mexican_tile", name: "Mexican Tile" },
    { id: "japanese_wave", name: "Japanese Wave" },
    { id: "tropical", name: "Hawaiian Tropical" },
    { id: "graffiti", name: "Street Art" },
    { id: "retro_diner", name: "Retro Diner" },
    { id: "art_deco", name: "Art Deco" },
  ],
};

// ============================================================================
// SERVING WINDOWS
// ============================================================================
const servingWindows = [
  { id: "standard", name: "Standard (36×24)", width: 36, height: 24 },
  { id: "wide", name: "Wide (60×24)", width: 60, height: 24 },
  { id: "double", name: "Double Window", width: 72, height: 24 },
  { id: "full_pass", name: "Full Pass-Through", width: 72, height: 30 },
  { id: "fold_counter", name: "With Fold-Down Counter", width: 48, height: 24 },
  { id: "accordion", name: "Accordion Fold-Out", width: 96, height: 36 },
];

// ============================================================================
// AWNINGS
// ============================================================================
const awnings = [
  { id: "none", name: "No Awning" },
  { id: "retractable_red", name: "Retractable - Red" },
  { id: "retractable_blue", name: "Retractable - Blue" },
  { id: "retractable_green", name: "Retractable - Green" },
  { id: "retractable_black", name: "Retractable - Black" },
  { id: "retractable_striped", name: "Retractable - Striped" },
  { id: "metal_stainless", name: "Fixed Metal - Stainless" },
  { id: "led_lit", name: "LED-Lit Awning" },
];

// ============================================================================
// ACCESSORIES
// ============================================================================
const accessories = {
  "Lighting": [
    { id: "led_underglow", name: "LED Underglow" },
    { id: "roof_floods", name: "Roof Flood Lights" },
    { id: "neon_accent", name: "Neon Accent Tubes" },
    { id: "menu_backlight", name: "Menu Board Backlight" },
    { id: "string_lights", name: "String Lights" },
  ],
  "Signage": [
    { id: "roof_sign", name: "Roof Sign Box" },
    { id: "blade_sign", name: "Side Blade Sign" },
    { id: "digital_menu", name: "Digital Menu Board" },
    { id: "neon_open", name: "Neon Open Sign" },
  ],
  "Hardware": [
    { id: "roof_rack", name: "Roof Rack" },
    { id: "rear_step", name: "Rear Bumper Step" },
    { id: "lp_tanks", name: "External LP Tanks" },
    { id: "generator", name: "Generator Compartment" },
    { id: "handwash", name: "External Hand Wash" },
  ],
};

// ============================================================================
// WHEELS
// ============================================================================
const wheelStyles = [
  { id: "steel_silver", name: "Steel - Silver" },
  { id: "steel_black", name: "Steel - Black" },
  { id: "alloy", name: "Aluminum Alloy" },
  { id: "chrome", name: "Chrome Dually" },
  { id: "offroad", name: "Off-Road Rugged" },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const PaintShop = () => {
  const navigate = useNavigate();
  
  // Truck model
  const [truckModel, setTruckModel] = useState("step_van_classic");
  
  // Colors
  const [primaryColor, setPrimaryColor] = useState("#ce2029");
  const [secondaryColor, setSecondaryColor] = useState("#1a1a1a");
  const [activeColorTarget, setActiveColorTarget] = useState("primary");
  const [activeColorCategory, setActiveColorCategory] = useState("Classic");
  
  // Finish & Pattern
  const [finishType, setFinishType] = useState("gloss");
  const [splitPattern, setSplitPattern] = useState("none");
  
  // Wrap
  const [wrapEnabled, setWrapEnabled] = useState(false);
  const [selectedWrap, setSelectedWrap] = useState(null);
  const [wrapCategory, setWrapCategory] = useState("Patterns");
  
  // Features
  const [servingWindow, setServingWindow] = useState("standard");
  const [awning, setAwning] = useState("none");
  const [selectedAccessories, setSelectedAccessories] = useState([]);
  const [wheelStyle, setWheelStyle] = useState("alloy");
  
  // Business name
  const [businessName, setBusinessName] = useState("YOUR BRAND");
  
  // UI State
  const [expandedSection, setExpandedSection] = useState("model");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewAngle, setViewAngle] = useState("front-quarter");

  // Load saved design on mount
  useEffect(() => {
    const loadSavedDesign = async () => {
      try {
        const design = await apiClient.getLatestTruckDesign();
        if (design) {
          setTruckModel(design.base_model || "step_van_classic");
          setPrimaryColor(design.primary_color || "#ce2029");
          setSecondaryColor(design.accent_color || "#1a1a1a");
          setFinishType(design.finish_type || "gloss");
          setSplitPattern(design.split_pattern || "none");
          if (design.wrap_id) {
            setWrapEnabled(true);
            setSelectedWrap(design.wrap_id);
          }
          setServingWindow(design.serving_window || "standard");
          setAwning(design.awning || "none");
          setSelectedAccessories(design.accessories || []);
          setWheelStyle(design.wheels || "alloy");
          setBusinessName(design.business_name || "YOUR BRAND");
          toast.success("Design loaded", { description: "Your saved design has been restored." });
        }
      } catch (error) {
        // Silent fail - user might not have a saved design
        console.log("No saved design found");
      } finally {
        setIsLoading(false);
      }
    };
    loadSavedDesign();
  }, []);

  // Calculate estimated cost
  const calculateCost = () => {
    let base = 45000;
    if (truckModel === "step_van_modern") base = 55000;
    if (truckModel === "cargo_van") base = 35000;
    if (truckModel === "trailer") base = 25000;
    if (truckModel === "flatbed") base = 50000;
    if (truckModel === "vintage") base = 65000;
    
    if (finishType === "metallic" || finishType === "pearl") base += 2500;
    if (splitPattern !== "none") base += 1500;
    if (wrapEnabled) base += 3500;
    if (awning !== "none") base += 800;
    base += selectedAccessories.length * 350;
    
    return base;
  };

  const toggleAccessory = (id) => {
    setSelectedAccessories(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await apiClient.saveTruckDesign({
        base_model: truckModel,
        primary_color: primaryColor,
        accent_color: secondaryColor,
        finish_type: finishType,
        split_pattern: splitPattern,
        wrap_id: wrapEnabled ? selectedWrap : null,
        serving_window: servingWindow,
        awning: awning,
        accessories: selectedAccessories,
        wheels: wheelStyle,
        business_name: businessName,
      });
      toast.success("Design saved!", { description: "Your truck configuration has been saved." });
    } catch (error) {
      toast.error("Failed to save", { description: "Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  const currentFinish = finishTypes.find(f => f.id === finishType);
  const currentTruck = truckModels.find(t => t.id === truckModel);

  // Section toggle helper
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Get awning color
  const getAwningColor = () => {
    if (awning === "none") return null;
    if (awning.includes("red")) return "#ce2029";
    if (awning.includes("blue")) return "#4169e1";
    if (awning.includes("green")) return "#228b22";
    if (awning.includes("black")) return "#1a1a1a";
    if (awning.includes("striped")) return "repeating-linear-gradient(90deg, #ce2029 0px, #ce2029 20px, #ffffff 20px, #ffffff 40px)";
    if (awning.includes("stainless")) return "#c0c0c0";
    if (awning.includes("led")) return "#2a2a2a";
    return "#1a1a1a";
  };

  return (
    <div className="min-h-screen bg-[#0f0f14] text-white font-sans">
      <SEO 
        title="Paint Shop - Truck Design Studio"
        description="Design your food truck with photorealistic customization. Choose colors, wraps, windows, awnings and accessories."
        url="/paint-shop"
      />
      
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0f0f14]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-[#E8592F]">
              <Truck className="w-8 h-8" />
            </Link>
            <div>
              <h1 className="text-xl font-bold uppercase tracking-wide">The Paint Shop</h1>
              <p className="text-xs text-white/50 uppercase tracking-widest">Exterior Configurator v2.0</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-white/60 hover:text-white text-sm font-medium transition-colors">Dashboard</Link>
            <span className="text-[#E8592F] text-sm font-bold border-b-2 border-[#E8592F] pb-1">Paint Shop</span>
            <Link to="/kitchen-builder" className="text-white/60 hover:text-white text-sm font-medium transition-colors flex items-center gap-1">
              Kitchen Builder <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => toast.info("Share coming soon")}
              className="p-2 rounded-lg border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2.5 bg-[#E8592F] rounded-lg text-sm font-bold uppercase tracking-wide hover:bg-[#E8592F]/90 transition-all flex items-center gap-2 disabled:opacity-50"
              data-testid="save-design-btn"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSaving ? "Saving..." : "Save Design"}
            </button>
          </div>
        </div>
      </header>

      <div className="flex max-w-[1800px] mx-auto">
        {/* Left Panel - Configuration */}
        <aside className="w-[380px] border-r border-white/10 h-[calc(100vh-73px)] overflow-y-auto custom-scrollbar bg-[#111118]">
          
          {/* Truck Model Section */}
          <div className="border-b border-white/10">
            <button 
              onClick={() => toggleSection("model")}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-[#E8592F]" />
                <span className="font-bold text-sm uppercase tracking-wide">Base Model</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${expandedSection === "model" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "model" && (
              <div className="px-5 pb-5 grid grid-cols-2 gap-2">
                {truckModels.map(model => (
                  <button
                    key={model.id}
                    onClick={() => setTruckModel(model.id)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      truckModel === model.id 
                        ? "border-[#E8592F] bg-[#E8592F]/10" 
                        : "border-white/10 hover:border-white/30"
                    }`}
                    data-testid={`truck-${model.id}`}
                  >
                    <p className="text-xs font-bold text-white">{model.name}</p>
                    <p className="text-[10px] text-white/50 mt-1">{model.desc}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Paint Color Section */}
          <div className="border-b border-white/10">
            <button 
              onClick={() => toggleSection("paint")}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-[#E8592F]" />
                <span className="font-bold text-sm uppercase tracking-wide">Paint Color</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded border border-white/30" style={{ backgroundColor: primaryColor }} />
                <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${expandedSection === "paint" ? "rotate-180" : ""}`} />
              </div>
            </button>
            {expandedSection === "paint" && (
              <div className="px-5 pb-5 space-y-4">
                {/* Color target toggle */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveColorTarget("primary")}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                      activeColorTarget === "primary" ? "bg-[#E8592F] text-white" : "bg-white/10 text-white/60"
                    }`}
                  >
                    Primary
                  </button>
                  <button
                    onClick={() => setActiveColorTarget("secondary")}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                      activeColorTarget === "secondary" ? "bg-[#E8592F] text-white" : "bg-white/10 text-white/60"
                    }`}
                  >
                    Secondary
                  </button>
                </div>
                
                {/* Category tabs */}
                <div className="flex flex-wrap gap-1">
                  {Object.keys(colorPalettes).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveColorCategory(cat)}
                      className={`px-2 py-1 text-[10px] font-bold uppercase rounded transition-all ${
                        activeColorCategory === cat ? "bg-white/20 text-white" : "text-white/50 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                
                {/* Color grid */}
                <div className="grid grid-cols-6 gap-2">
                  {colorPalettes[activeColorCategory].map(color => {
                    const isSelected = (activeColorTarget === "primary" ? primaryColor : secondaryColor) === color.hex;
                    return (
                      <button
                        key={color.hex}
                        onClick={() => activeColorTarget === "primary" ? setPrimaryColor(color.hex) : setSecondaryColor(color.hex)}
                        className={`aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                          isSelected ? "border-[#E8592F] ring-2 ring-[#E8592F]/50" : "border-transparent"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {isSelected && <Check className={`w-4 h-4 mx-auto ${color.hex === "#ffffff" || color.hex === "#f5f5f0" ? "text-black" : "text-white"}`} />}
                      </button>
                    );
                  })}
                </div>
                
                {/* Custom hex input */}
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={activeColorTarget === "primary" ? primaryColor : secondaryColor}
                    onChange={(e) => activeColorTarget === "primary" ? setPrimaryColor(e.target.value) : setSecondaryColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border-0"
                  />
                  <input
                    type="text"
                    value={activeColorTarget === "primary" ? primaryColor : secondaryColor}
                    onChange={(e) => {
                      if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                        activeColorTarget === "primary" ? setPrimaryColor(e.target.value) : setSecondaryColor(e.target.value);
                      }
                    }}
                    className="flex-1 bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm uppercase font-mono focus:outline-none focus:border-[#E8592F]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Finish Type Section */}
          <div className="border-b border-white/10">
            <button 
              onClick={() => toggleSection("finish")}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#E8592F]" />
                <span className="font-bold text-sm uppercase tracking-wide">Finish Type</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${expandedSection === "finish" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "finish" && (
              <div className="px-5 pb-5 grid grid-cols-1 gap-2">
                {finishTypes.map(finish => (
                  <button
                    key={finish.id}
                    onClick={() => setFinishType(finish.id)}
                    className={`p-3 rounded-lg border-2 text-left transition-all flex items-center gap-3 ${
                      finishType === finish.id 
                        ? "border-[#E8592F] bg-[#E8592F]/10" 
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className="w-8 h-8 rounded" style={{ 
                      backgroundColor: primaryColor,
                      background: finish.gradient !== "none" ? `${finish.gradient}, ${primaryColor}` : primaryColor
                    }} />
                    <div>
                      <p className="text-sm font-bold text-white">{finish.name}</p>
                      <p className="text-[10px] text-white/50">{finish.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Two-Tone Pattern Section */}
          <div className="border-b border-white/10">
            <button 
              onClick={() => toggleSection("twotone")}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-[#E8592F]" />
                <span className="font-bold text-sm uppercase tracking-wide">Two-Tone Pattern</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${expandedSection === "twotone" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "twotone" && (
              <div className="px-5 pb-5 grid grid-cols-2 gap-2">
                {splitPatterns.map(pattern => (
                  <button
                    key={pattern.id}
                    onClick={() => setSplitPattern(pattern.id)}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      splitPattern === pattern.id 
                        ? "border-[#E8592F] bg-[#E8592F]/10" 
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <p className="text-xs font-bold text-white">{pattern.name}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Wraps Section */}
          <div className="border-b border-white/10">
            <button 
              onClick={() => toggleSection("wraps")}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Box className="w-5 h-5 text-[#E8592F]" />
                <span className="font-bold text-sm uppercase tracking-wide">Wraps & Graphics</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${expandedSection === "wraps" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "wraps" && (
              <div className="px-5 pb-5 space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wrapEnabled}
                    onChange={(e) => setWrapEnabled(e.target.checked)}
                    className="w-5 h-5 rounded border-white/30 bg-white/10 text-[#E8592F] focus:ring-[#E8592F]"
                  />
                  <span className="text-sm font-medium">Enable Wrap Overlay</span>
                </label>
                
                {wrapEnabled && (
                  <>
                    <div className="flex gap-1">
                      {Object.keys(wrapPatterns).map(cat => (
                        <button
                          key={cat}
                          onClick={() => setWrapCategory(cat)}
                          className={`px-2 py-1 text-[10px] font-bold uppercase rounded transition-all ${
                            wrapCategory === cat ? "bg-white/20 text-white" : "text-white/50 hover:text-white"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {wrapPatterns[wrapCategory].map(wrap => (
                        <button
                          key={wrap.id}
                          onClick={() => setSelectedWrap(wrap.id)}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            selectedWrap === wrap.id 
                              ? "border-[#E8592F] bg-[#E8592F]/10" 
                              : "border-white/10 hover:border-white/30"
                          }`}
                        >
                          <p className="text-xs font-bold text-white">{wrap.name}</p>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Serving Window Section */}
          <div className="border-b border-white/10">
            <button 
              onClick={() => toggleSection("window")}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Square className="w-5 h-5 text-[#E8592F]" />
                <span className="font-bold text-sm uppercase tracking-wide">Serving Window</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${expandedSection === "window" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "window" && (
              <div className="px-5 pb-5 grid grid-cols-2 gap-2">
                {servingWindows.map(win => (
                  <button
                    key={win.id}
                    onClick={() => setServingWindow(win.id)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      servingWindow === win.id 
                        ? "border-[#E8592F] bg-[#E8592F]/10" 
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <p className="text-xs font-bold text-white">{win.name}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Awning Section */}
          <div className="border-b border-white/10">
            <button 
              onClick={() => toggleSection("awning")}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Hexagon className="w-5 h-5 text-[#E8592F]" />
                <span className="font-bold text-sm uppercase tracking-wide">Awning</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${expandedSection === "awning" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "awning" && (
              <div className="px-5 pb-5 grid grid-cols-2 gap-2">
                {awnings.map(awn => (
                  <button
                    key={awn.id}
                    onClick={() => setAwning(awn.id)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      awning === awn.id 
                        ? "border-[#E8592F] bg-[#E8592F]/10" 
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <p className="text-xs font-bold text-white">{awn.name}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accessories Section */}
          <div className="border-b border-white/10">
            <button 
              onClick={() => toggleSection("accessories")}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Lightbulb className="w-5 h-5 text-[#E8592F]" />
                <span className="font-bold text-sm uppercase tracking-wide">Accessories</span>
              </div>
              <span className="text-xs text-white/40">{selectedAccessories.length} selected</span>
            </button>
            {expandedSection === "accessories" && (
              <div className="px-5 pb-5 space-y-4">
                {Object.entries(accessories).map(([category, items]) => (
                  <div key={category}>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest mb-2">{category}</p>
                    <div className="space-y-1">
                      {items.map(item => (
                        <label key={item.id} className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedAccessories.includes(item.id)}
                            onChange={() => toggleAccessory(item.id)}
                            className="w-4 h-4 rounded border-white/30 bg-white/10 text-[#E8592F] focus:ring-[#E8592F]"
                          />
                          <span className="text-sm">{item.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Wheels Section */}
          <div className="border-b border-white/10">
            <button 
              onClick={() => toggleSection("wheels")}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <CircleDot className="w-5 h-5 text-[#E8592F]" />
                <span className="font-bold text-sm uppercase tracking-wide">Wheels</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${expandedSection === "wheels" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "wheels" && (
              <div className="px-5 pb-5 grid grid-cols-2 gap-2">
                {wheelStyles.map(wheel => (
                  <button
                    key={wheel.id}
                    onClick={() => setWheelStyle(wheel.id)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      wheelStyle === wheel.id 
                        ? "border-[#E8592F] bg-[#E8592F]/10" 
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <p className="text-xs font-bold text-white">{wheel.name}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Business Name Section */}
          <div className="border-b border-white/10">
            <button 
              onClick={() => toggleSection("name")}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Type className="w-5 h-5 text-[#E8592F]" />
                <span className="font-bold text-sm uppercase tracking-wide">Business Name</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${expandedSection === "name" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "name" && (
              <div className="px-5 pb-5">
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value.toUpperCase())}
                  maxLength={24}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-lg uppercase tracking-widest font-bold focus:outline-none focus:border-[#E8592F]"
                  placeholder="YOUR BRAND NAME"
                />
                <p className="text-[10px] text-white/40 mt-2">{24 - businessName.length} characters remaining</p>
              </div>
            )}
          </div>

        </aside>

        {/* Main Viewport */}
        <main className="flex-1 h-[calc(100vh-73px)] bg-gradient-to-br from-[#1a1a2e] to-[#0f0f14] relative overflow-hidden">
          
          {/* View Controls */}
          <div className="absolute top-6 right-6 flex gap-2 z-10">
            {["front-quarter", "side", "rear", "top"].map(angle => (
              <button
                key={angle}
                onClick={() => setViewAngle(angle)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  viewAngle === angle ? "bg-[#E8592F] text-white" : "bg-white/10 text-white/60 hover:bg-white/20"
                }`}
              >
                {angle.replace("-", " ")}
              </button>
            ))}
          </div>

          {/* Truck Preview */}
          <div className="absolute inset-0 flex items-center justify-center" data-testid="truck-preview">
            <TruckPreview
              truckModel={truckModel}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              finishType={finishType}
              splitPattern={splitPattern}
              servingWindow={servingWindow}
              awning={awning}
              awningColor={getAwningColor()}
              wheelStyle={wheelStyle}
              businessName={businessName}
              selectedAccessories={selectedAccessories}
              viewAngle={viewAngle}
            />
          </div>

          {/* Bottom Info Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm border-t border-white/10 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest">Base Model</p>
                  <p className="text-sm font-bold">{currentTruck?.name}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest">Interior Space</p>
                  <p className="text-sm font-bold">{currentTruck?.interior.sqft} sq ft</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest">Finish</p>
                  <p className="text-sm font-bold">{currentFinish?.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-white/50 uppercase tracking-widest">Estimated Cost</p>
                <p className="text-2xl font-black text-[#E8592F]">${calculateCost().toLocaleString()}</p>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};


// ============================================================================
// TRUCK PREVIEW COMPONENT (Photo-based with CSS Color Overlay)
// ============================================================================

// Real food truck base image (white for color overlay compatibility)
const TRUCK_BASE_IMAGE = "https://static.prod-images.emergentagent.com/jobs/750cf976-26d8-4bfa-9e94-eee06e714e86/images/0492b9aa282ca71e1e7333dd6f57a1e9501d75854655ae4cedfb6443d6ad1fd3.png";

const TruckPreview = ({ 
  truckModel, primaryColor, secondaryColor, finishType, splitPattern, 
  servingWindow, awning, awningColor, wheelStyle, businessName, 
  selectedAccessories, viewAngle 
}) => {
  
  // Generate finish effects
  const getFinishStyle = () => {
    const finishStyles = {
      gloss: { 
        filter: "contrast(1.05) brightness(1.02)",
        overlayGradient: "linear-gradient(145deg, rgba(255,255,255,0.25) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)"
      },
      satin: { 
        filter: "contrast(1.02)",
        overlayGradient: "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, transparent 70%)"
      },
      matte: { 
        filter: "contrast(0.98) brightness(0.98)",
        overlayGradient: "none"
      },
      metallic: { 
        filter: "contrast(1.08) saturate(1.15)",
        overlayGradient: "linear-gradient(145deg, rgba(255,255,255,0.35) 0%, transparent 30%, rgba(255,255,255,0.15) 70%)"
      },
      pearl: { 
        filter: "contrast(1.02) saturate(1.1)",
        overlayGradient: "linear-gradient(145deg, rgba(255,200,255,0.15) 0%, rgba(200,255,255,0.15) 50%, transparent 100%)"
      },
    };
    return finishStyles[finishType] || finishStyles.gloss;
  };

  // Calculate overlay opacity based on color brightness
  const getOverlayOpacity = () => {
    if (!primaryColor || primaryColor.toLowerCase() === "#ffffff" || primaryColor.toLowerCase() === "#fff") {
      return 0;
    }
    const r = parseInt(primaryColor.slice(1, 3), 16);
    const g = parseInt(primaryColor.slice(3, 5), 16);
    const b = parseInt(primaryColor.slice(5, 7), 16);
    const brightness = (r + g + b) / 3;
    if (brightness > 240) return 0.3;
    if (brightness > 200) return 0.5;
    return 0.7;
  };

  const finishStyle = getFinishStyle();
  const overlayOpacity = getOverlayOpacity();
  const hasAwning = awning !== "none";
  const hasRoofRack = selectedAccessories?.includes("roof_rack");
  const hasRoofSign = selectedAccessories?.includes("roof_sign");
  const hasLEDUnderglow = selectedAccessories?.includes("led_underglow");

  // Get contrast color for text
  const getContrastColor = (hexColor) => {
    if (!hexColor) return "#ffffff";
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#1a1a1a" : "#ffffff";
  };

  // Get split pattern mask
  const getSplitMask = (pattern) => {
    const masks = {
      horizontal: "linear-gradient(to bottom, transparent 0%, transparent 50%, black 50%, black 100%)",
      diagonal: "linear-gradient(135deg, transparent 0%, transparent 50%, black 50%, black 100%)",
      hood_roof: "linear-gradient(to bottom, black 0%, black 25%, transparent 25%, transparent 100%)",
      racing_stripe: "linear-gradient(to right, transparent 42%, black 42%, black 58%, transparent 58%)",
      lower_accent: "linear-gradient(to bottom, transparent 0%, transparent 65%, black 65%, black 100%)",
    };
    return masks[pattern] || "none";
  };

  // Wheel colors
  const wheelColors = {
    steel_silver: "#c0c0c0",
    steel_black: "#2a2a2a",
    alloy: "#d4d4d4",
    chrome: "#e8e8e8",
    offroad: "#3a3a3a",
  };
  const wheelColor = wheelColors[wheelStyle] || wheelColors.alloy;

  return (
    <div className="relative w-full max-w-4xl mx-auto" data-testid="truck-preview-container">
      {/* Main Preview Container */}
      <div 
        className="relative"
        style={{ 
          aspectRatio: "3/2",
          filter: finishStyle.filter
        }}
      >
        {/* Base truck image (white truck for color overlay) */}
        <img 
          src={TRUCK_BASE_IMAGE}
          alt="Food truck preview"
          className="w-full h-full object-contain select-none"
          style={{ 
            userSelect: "none",
            WebkitUserDrag: "none"
          }}
          draggable="false"
        />
        
        {/* Primary Color overlay using multiply blend mode */}
        {primaryColor && primaryColor !== "#ffffff" && primaryColor !== "#fff" && (
          <div 
            className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out"
            style={{
              backgroundColor: primaryColor,
              mixBlendMode: "multiply",
              opacity: overlayOpacity,
              // Mask to preserve wheels and windows
              maskImage: "linear-gradient(to bottom, black 0%, black 80%, transparent 92%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 80%, transparent 92%)"
            }}
          />
        )}
        
        {/* Two-tone secondary color overlay */}
        {splitPattern && splitPattern !== "none" && secondaryColor && secondaryColor !== primaryColor && (
          <div 
            className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out"
            style={{
              backgroundColor: secondaryColor,
              mixBlendMode: "multiply",
              opacity: overlayOpacity * 0.85,
              maskImage: getSplitMask(splitPattern),
              WebkitMaskImage: getSplitMask(splitPattern)
            }}
          />
        )}
        
        {/* Finish overlay (gloss/metallic shine effects) */}
        {finishStyle.overlayGradient && finishStyle.overlayGradient !== "none" && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: finishStyle.overlayGradient,
              mixBlendMode: "overlay"
            }}
          />
        )}
        
        {/* LED Underglow Effect */}
        {hasLEDUnderglow && (
          <div 
            className="absolute bottom-[8%] left-[20%] right-[20%] h-6 rounded-full blur-xl opacity-60"
            style={{ 
              backgroundColor: primaryColor || "#E8592F",
              transform: "translateY(50%)"
            }}
          />
        )}
        
        {/* Business Name on truck body */}
        {businessName && businessName.trim() !== "" && (
          <div className="absolute top-[35%] left-[15%] right-[35%] text-center pointer-events-none">
            <span 
              className="text-xl md:text-2xl lg:text-3xl font-black tracking-wide"
              style={{ 
                color: getContrastColor(primaryColor),
                textShadow: "2px 2px 4px rgba(0,0,0,0.5), -1px -1px 2px rgba(0,0,0,0.3)"
              }}
            >
              {businessName}
            </span>
          </div>
        )}
        
        {/* Awning indicator */}
        {hasAwning && (
          <div 
            className="absolute top-[18%] left-[12%] h-4 rounded-b-lg shadow-lg"
            style={{ 
              backgroundColor: awningColor || "#dc2626",
              width: awning === "full" ? "45%" : "25%"
            }}
          />
        )}
        
        {/* Roof accessories */}
        {(hasRoofRack || hasRoofSign) && (
          <div className="absolute top-[8%] left-[25%] right-[35%] flex justify-center items-center gap-4">
            {hasRoofRack && (
              <div className="w-32 h-2 bg-gray-500 rounded opacity-70" />
            )}
            {hasRoofSign && (
              <div className="px-4 py-1.5 bg-gray-800 rounded-lg border border-gray-600">
                <span className="text-orange-500 text-xs font-bold">OPEN</span>
              </div>
            )}
          </div>
        )}
        
        {/* Wheel style indicators */}
        <div className="absolute bottom-[10%] left-[18%] pointer-events-none">
          <div 
            className="w-10 h-10 rounded-full border-4 opacity-50"
            style={{ borderColor: wheelColor, backgroundColor: "#1a1a1a" }}
          />
        </div>
        <div className="absolute bottom-[10%] right-[22%] pointer-events-none">
          <div 
            className="w-10 h-10 rounded-full border-4 opacity-50"
            style={{ borderColor: wheelColor, backgroundColor: "#1a1a1a" }}
          />
        </div>
      </div>
      
      {/* View angle indicator */}
      <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 rounded text-[10px] text-white/60 uppercase">
        {viewAngle?.replace("-", " ") || "Side View"}
      </div>
    </div>
  );
};

export default PaintShop;

