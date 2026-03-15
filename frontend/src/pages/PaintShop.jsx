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
            <Link to="/" className="text-[#E8592F]">
              <Truck className="w-8 h-8" />
            </Link>
            <div>
              <h1 className="text-xl font-bold uppercase tracking-wide">The Paint Shop</h1>
              <p className="text-xs text-white/50 uppercase tracking-widest">Exterior Configurator v2.0</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/" className="text-white/60 hover:text-white text-sm font-medium transition-colors">Dashboard</Link>
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
// TRUCK PREVIEW COMPONENT (2.5D SVG Illustration)
// ============================================================================
const TruckPreview = ({ 
  truckModel, primaryColor, secondaryColor, finishType, splitPattern, 
  servingWindow, awning, awningColor, wheelStyle, businessName, 
  selectedAccessories, viewAngle 
}) => {
  
  // Generate finish gradient overlay
  const getFinishOverlay = () => {
    const finishMap = {
      gloss: "linear-gradient(145deg, rgba(255,255,255,0.35) 0%, transparent 40%, rgba(0,0,0,0.15) 100%)",
      satin: "linear-gradient(145deg, rgba(255,255,255,0.15) 0%, transparent 60%)",
      matte: "none",
      metallic: "linear-gradient(145deg, rgba(255,255,255,0.4) 0%, transparent 25%, rgba(255,255,255,0.15) 60%, transparent 100%)",
      pearl: "linear-gradient(145deg, rgba(255,200,255,0.2) 0%, rgba(200,255,255,0.2) 50%, transparent 100%)",
    };
    return finishMap[finishType] || "none";
  };

  // Get wheel colors
  const getWheelColors = () => {
    const wheelMap = {
      steel_silver: { rim: "#c0c0c0", hub: "#808080" },
      steel_black: { rim: "#2a2a2a", hub: "#1a1a1a" },
      alloy: { rim: "#d4d4d4", hub: "#a0a0a0" },
      chrome: { rim: "#e8e8e8", hub: "#c0c0c0" },
      offroad: { rim: "#3a3a3a", hub: "#1a1a1a" },
    };
    return wheelMap[wheelStyle] || wheelMap.alloy;
  };

  // Get secondary color based on split pattern
  const getBodyColors = () => {
    if (splitPattern === "none") {
      return { main: primaryColor, accent: primaryColor };
    }
    return { main: primaryColor, accent: secondaryColor };
  };

  const colors = getBodyColors();
  const wheelColors = getWheelColors();
  const hasLEDUnderglow = selectedAccessories.includes("led_underglow");
  const hasRoofRack = selectedAccessories.includes("roof_rack");
  const hasRoofSign = selectedAccessories.includes("roof_sign");

  // Different truck shapes based on model
  const getTruckPath = () => {
    switch (truckModel) {
      case "cargo_van":
        return {
          body: "M100,280 L100,160 Q100,140 120,130 L200,110 Q220,105 240,105 L680,105 Q720,105 740,130 L760,160 L760,280 Z",
          cab: "M660,160 L660,280 L760,280 L760,160 L740,130 Q720,105 680,105 L680,160 Z",
          roof: "M120,130 Q100,140 100,160 L100,130 Q110,110 140,105 L680,105 Q700,105 720,115 L740,130 L120,130 Z"
        };
      case "trailer":
        return {
          body: "M80,280 L80,120 Q80,100 100,100 L750,100 Q770,100 770,120 L770,280 Z",
          cab: null,
          roof: "M100,100 Q80,100 80,120 L80,100 Q90,80 120,80 L730,80 Q760,80 770,100 Z",
          hitch: "M20,260 L80,260 L80,240 L40,240 L40,220 L20,220 Z"
        };
      case "vintage":
        return {
          body: "M120,280 L120,180 Q120,140 160,120 L200,110 Q240,100 280,100 L600,100 Q640,100 680,110 L720,140 Q740,160 740,200 L740,280 Z",
          cab: "M620,180 Q620,140 660,120 L700,130 Q730,150 730,200 L730,280 L620,280 Z",
          roof: "M160,120 Q120,140 120,180 L120,140 Q140,100 200,90 L600,90 Q660,100 700,130 L680,110 Q640,100 600,100 L280,100 Q240,100 200,110 Z",
          fenders: "M140,260 Q100,260 100,300 L180,300 Q180,260 140,260 M700,260 Q740,260 740,300 L660,300 Q660,260 700,260"
        };
      case "flatbed":
        return {
          body: "M200,280 L200,130 Q200,110 220,110 L740,110 Q760,110 760,130 L760,280 Z",
          cab: "M80,180 Q80,140 120,120 L180,110 Q200,110 200,130 L200,280 L80,280 Z",
          roof: "M220,110 Q200,110 200,130 L200,110 L740,110 Q760,110 760,130 L760,110 Z"
        };
      case "step_van_modern":
        return {
          body: "M80,280 L80,130 Q80,100 120,100 L640,100 Q680,100 700,130 L720,160 L720,280 Z",
          cab: "M600,160 L600,280 L720,280 L720,160 L700,130 Q680,100 640,100 L640,160 Z",
          roof: "M120,100 Q80,100 80,130 L80,100 Q100,70 150,70 L600,70 Q660,70 700,100 L700,130 Q680,100 640,100 L120,100 Z"
        };
      default: // step_van_classic
        return {
          body: "M80,280 L80,120 Q80,100 100,100 L600,100 Q620,100 640,120 L680,160 L680,280 Z",
          cab: "M560,160 L560,280 L680,280 L680,160 L640,120 Q620,100 600,100 L600,160 Z",
          roof: "M100,100 Q80,100 80,120 L80,100 L600,100 Q620,100 640,120 L640,100 Z"
        };
    }
  };

  const truckPaths = getTruckPath();

  // Serving window dimensions
  const getWindowDims = () => {
    const winMap = {
      standard: { x: 180, y: 140, w: 140, h: 80 },
      wide: { x: 160, y: 140, w: 200, h: 80 },
      double: { x: 140, y: 140, w: 240, h: 80 },
      full_pass: { x: 120, y: 130, w: 280, h: 100 },
      fold_counter: { x: 180, y: 140, w: 160, h: 80 },
      accordion: { x: 100, y: 120, w: 340, h: 120 },
    };
    return winMap[servingWindow] || winMap.standard;
  };

  const windowDims = getWindowDims();

  return (
    <svg 
      viewBox="0 0 850 420" 
      className="w-full max-w-4xl drop-shadow-2xl"
      style={{ filter: finishType === "metallic" ? "contrast(1.05) saturate(1.1)" : "none" }}
    >
      <defs>
        {/* Finish gradient */}
        <linearGradient id="finishGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="40%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
        </linearGradient>
        
        {/* Metallic sparkle pattern */}
        <pattern id="metallicSparkle" patternUnits="userSpaceOnUse" width="3" height="3">
          <circle cx="1.5" cy="1.5" r="0.3" fill="rgba(255,255,255,0.4)" />
        </pattern>
        
        {/* Shadow gradient */}
        <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
        </linearGradient>
        
        {/* Window glass gradient */}
        <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="50%" stopColor="#0f0f14" />
          <stop offset="100%" stopColor="#1a1a2e" />
        </linearGradient>
      </defs>
      
      {/* Ground shadow */}
      <ellipse cx="400" cy="340" rx="320" ry="25" fill="rgba(0,0,0,0.4)" />
      
      {/* LED Underglow */}
      {hasLEDUnderglow && (
        <ellipse cx="400" cy="300" rx="280" ry="15" fill="#E8592F" opacity="0.4">
          <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" />
        </ellipse>
      )}
      
      {/* Main Body */}
      <g>
        {/* Body base */}
        <path 
          d={truckPaths.body} 
          fill={colors.main}
        />
        
        {/* Secondary color based on split pattern */}
        {splitPattern === "horizontal" && (
          <path d="M80,200 L80,280 L680,280 L680,200 Z" fill={colors.accent} />
        )}
        {splitPattern === "diagonal" && (
          <path d="M80,280 L300,100 L680,100 L680,280 Z" fill={colors.accent} />
        )}
        {splitPattern === "lower_accent" && (
          <path d="M80,240 L80,280 L680,280 L680,240 Z" fill={colors.accent} />
        )}
        {splitPattern === "racing_stripe" && (
          <path d="M350,100 L350,280 L430,280 L430,100 Z" fill={colors.accent} opacity="0.9" />
        )}
        {splitPattern === "hood_roof" && truckPaths.cab && (
          <path d={truckPaths.cab} fill={colors.accent} />
        )}
        
        {/* Finish overlay */}
        <path 
          d={truckPaths.body} 
          fill="url(#finishGradient)"
          opacity={finishType === "matte" ? 0 : 1}
        />
        
        {/* Metallic sparkle */}
        {finishType === "metallic" && (
          <path d={truckPaths.body} fill="url(#metallicSparkle)" opacity="0.5" />
        )}
        
        {/* Roof highlight */}
        {truckPaths.roof && (
          <path d={truckPaths.roof} fill="rgba(255,255,255,0.1)" />
        )}
        
        {/* Cab section */}
        {truckPaths.cab && (
          <>
            <path d={truckPaths.cab} fill={splitPattern === "hood_roof" ? colors.accent : colors.main} />
            <path d={truckPaths.cab} fill="url(#finishGradient)" opacity={finishType === "matte" ? 0 : 0.7} />
          </>
        )}
        
        {/* Trailer hitch */}
        {truckPaths.hitch && (
          <path d={truckPaths.hitch} fill="#2a2a2a" />
        )}
        
        {/* Vintage fenders */}
        {truckPaths.fenders && (
          <path d={truckPaths.fenders} fill={colors.main} />
        )}
      </g>
      
      {/* Serving Window */}
      <g>
        <rect 
          x={windowDims.x} y={windowDims.y} 
          width={windowDims.w} height={windowDims.h} 
          rx="4" 
          fill="#1a1a1a" 
        />
        <rect 
          x={windowDims.x + 4} y={windowDims.y + 4} 
          width={windowDims.w - 8} height={windowDims.h - 8} 
          rx="2" 
          fill="url(#glassGradient)" 
        />
        {/* Window frame */}
        <rect 
          x={windowDims.x} y={windowDims.y + windowDims.h - 6} 
          width={windowDims.w} height="6" 
          fill={colors.accent}
        />
        
        {/* Fold-down counter */}
        {servingWindow === "fold_counter" && (
          <rect 
            x={windowDims.x - 10} y={windowDims.y + windowDims.h} 
            width={windowDims.w + 20} height="25" 
            fill="#c0c0c0"
            rx="2"
          />
        )}
      </g>
      
      {/* Awning */}
      {awning !== "none" && awningColor && (
        <g>
          <path 
            d={`M${windowDims.x - 20},${windowDims.y - 5} 
                L${windowDims.x + windowDims.w + 20},${windowDims.y - 5} 
                L${windowDims.x + windowDims.w + 40},${windowDims.y - 40} 
                L${windowDims.x - 40},${windowDims.y - 40} Z`}
            fill={typeof awningColor === 'string' && awningColor.startsWith('repeating') ? '#ce2029' : awningColor}
          />
          {awning === "led_lit" && (
            <line 
              x1={windowDims.x - 15} y1={windowDims.y - 8}
              x2={windowDims.x + windowDims.w + 15} y2={windowDims.y - 8}
              stroke="#ffcc00" strokeWidth="3" opacity="0.8"
            >
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
            </line>
          )}
        </g>
      )}
      
      {/* Cab Windows */}
      {truckModel !== "trailer" && (
        <g>
          {/* Windshield */}
          <path 
            d={truckModel === "vintage" 
              ? "M630,135 L630,200 L715,200 L715,150 L690,125 Z"
              : "M570,125 L570,220 L665,220 L665,165 L640,125 Z"
            }
            fill="#1a1a2e"
          />
          <path 
            d={truckModel === "vintage"
              ? "M635,140 L635,195 L710,195 L710,155 L687,130 Z"
              : "M575,130 L575,215 L660,215 L660,168 L637,130 Z"
            }
            fill="url(#glassGradient)"
          />
        </g>
      )}
      
      {/* Business Name */}
      <text 
        x={truckModel === "trailer" ? 425 : 320} 
        y="195" 
        textAnchor="middle" 
        fill={secondaryColor === "#ffffff" || secondaryColor === "#f5f5f0" ? "#1a1a1a" : "#ffffff"}
        fontSize="32" 
        fontFamily="Oswald, sans-serif"
        fontWeight="bold"
        letterSpacing="6"
      >
        {businessName}
      </text>
      
      {/* Wheels */}
      <g>
        {/* Front wheel */}
        <circle cx={truckModel === "flatbed" ? 140 : 180} cy="305" r="45" fill="#1a1a1a" />
        <circle cx={truckModel === "flatbed" ? 140 : 180} cy="305" r="32" fill="#2a2a2a" />
        <circle cx={truckModel === "flatbed" ? 140 : 180} cy="305" r="20" fill={wheelColors.rim} />
        <circle cx={truckModel === "flatbed" ? 140 : 180} cy="305" r="8" fill={wheelColors.hub} />
        
        {/* Rear wheel */}
        <circle cx={truckModel === "trailer" ? 650 : 580} cy="305" r="45" fill="#1a1a1a" />
        <circle cx={truckModel === "trailer" ? 650 : 580} cy="305" r="32" fill="#2a2a2a" />
        <circle cx={truckModel === "trailer" ? 650 : 580} cy="305" r="20" fill={wheelColors.rim} />
        <circle cx={truckModel === "trailer" ? 650 : 580} cy="305" r="8" fill={wheelColors.hub} />
        
        {/* Middle wheel for larger trucks */}
        {(truckModel === "step_van_classic" || truckModel === "step_van_modern" || truckModel === "trailer") && (
          <>
            <circle cx="400" cy="305" r="45" fill="#1a1a1a" />
            <circle cx="400" cy="305" r="32" fill="#2a2a2a" />
            <circle cx="400" cy="305" r="20" fill={wheelColors.rim} />
            <circle cx="400" cy="305" r="8" fill={wheelColors.hub} />
          </>
        )}
      </g>
      
      {/* Roof Rack */}
      {hasRoofRack && (
        <g>
          <rect x="120" y="85" width="460" height="4" fill="#3a3a3a" rx="2" />
          <rect x="140" y="78" width="4" height="12" fill="#3a3a3a" />
          <rect x="320" y="78" width="4" height="12" fill="#3a3a3a" />
          <rect x="500" y="78" width="4" height="12" fill="#3a3a3a" />
        </g>
      )}
      
      {/* Roof Sign */}
      {hasRoofSign && (
        <g>
          <rect x="250" y="55" width="180" height="35" rx="4" fill="#2a2a2a" />
          <rect x="255" y="60" width="170" height="25" rx="2" fill="#1a1a1a" />
          <text x="340" y="79" textAnchor="middle" fill="#E8592F" fontSize="14" fontWeight="bold">OPEN</text>
        </g>
      )}
      
      {/* Headlight */}
      {truckModel !== "trailer" && (
        <g>
          <circle cx={truckModel === "flatbed" ? 190 : truckModel === "vintage" ? 730 : 670} cy="230" r="12" fill="#facc15" />
          <circle cx={truckModel === "flatbed" ? 190 : truckModel === "vintage" ? 730 : 670} cy="230" r="8" fill="#fef08a" />
        </g>
      )}
      
      {/* Tail lights for trailer */}
      {truckModel === "trailer" && (
        <g>
          <rect x="765" y="200" width="8" height="20" rx="2" fill="#dc2626" />
          <rect x="765" y="230" width="8" height="20" rx="2" fill="#dc2626" />
        </g>
      )}
    </svg>
  );
};

export default PaintShop;
