import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Truck, Palette, Layers, Type, Sparkles, Settings, RotateCcw, Camera, Upload, Printer, Check, Droplets, Sun, Zap, Loader2 } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { apiClient } from "@/lib/api";

// Color palettes organized by category
const colorPalettes = {
  "Classic": [
    { name: "Jet Black", hex: "#0a0a0a" },
    { name: "Pure White", hex: "#ffffff" },
    { name: "Crimson Red", hex: "#dc2626" },
    { name: "Navy Blue", hex: "#1e3a5f" },
    { name: "Forest Green", hex: "#166534" },
    { name: "Sunflower Yellow", hex: "#facc15" },
  ],
  "Industrial": [
    { name: "Gunmetal", hex: "#2d3436" },
    { name: "Steel Gray", hex: "#636e72" },
    { name: "Copper", hex: "#b87333" },
    { name: "Rust Orange", hex: "#c45c26" },
    { name: "Iron Black", hex: "#1a1a1a" },
    { name: "Concrete", hex: "#95a5a6" },
  ],
  "Vibrant": [
    { name: "Electric Blue", hex: "#0066ff" },
    { name: "Hot Pink", hex: "#ff1493" },
    { name: "Lime Green", hex: "#32cd32" },
    { name: "Purple Rain", hex: "#8b5cf6" },
    { name: "Tangerine", hex: "#ff6600" },
    { name: "Turquoise", hex: "#40e0d0" },
  ],
  "Earth Tones": [
    { name: "Terracotta", hex: "#c45a3b" },
    { name: "Olive", hex: "#708238" },
    { name: "Sand", hex: "#c2b280" },
    { name: "Chocolate", hex: "#3d2314" },
    { name: "Clay", hex: "#b66a50" },
    { name: "Sage", hex: "#9caf88" },
  ],
  "Metallic": [
    { name: "Chrome Silver", hex: "#c0c0c0" },
    { name: "Gold Rush", hex: "#ffd700" },
    { name: "Rose Gold", hex: "#b76e79" },
    { name: "Bronze", hex: "#cd7f32" },
    { name: "Platinum", hex: "#e5e4e2" },
    { name: "Titanium", hex: "#878681" },
  ],
  "Pastels": [
    { name: "Blush Pink", hex: "#ffb6c1" },
    { name: "Mint", hex: "#98fb98" },
    { name: "Lavender", hex: "#e6e6fa" },
    { name: "Peach", hex: "#ffcba4" },
    { name: "Sky Blue", hex: "#87ceeb" },
    { name: "Cream", hex: "#fffdd0" },
  ],
};

const finishes = [
  { id: "matte", name: "Matte", icon: Droplets, description: "Non-reflective, modern look", opacity: 1, blur: 0 },
  { id: "satin", name: "Satin", icon: Sun, description: "Subtle sheen, easy care", opacity: 0.95, blur: 0 },
  { id: "gloss", name: "Gloss", icon: Sparkles, description: "High shine, classic appeal", opacity: 0.9, blur: 0 },
  { id: "metallic", name: "Metallic", icon: Zap, description: "Sparkle effect, premium feel", opacity: 0.85, blur: 0 },
];

const textures = [
  { id: "solid", name: "Solid", pattern: "none" },
  { id: "brushed", name: "Brushed Metal", pattern: "url(#brushed)" },
  { id: "carbon", name: "Carbon Fiber", pattern: "url(#carbon)" },
  { id: "diamond", name: "Diamond Plate", pattern: "url(#diamond)" },
];

const TruckDesignStudio = () => {
  const [primaryColor, setPrimaryColor] = useState("#ec7f13");
  const [accentColor, setAccentColor] = useState("#1a1a1a");
  const [finishType, setFinishType] = useState("matte");
  const [textureType, setTextureType] = useState("solid");
  const [activeColorTarget, setActiveColorTarget] = useState("primary"); // primary or accent
  const [businessName, setBusinessName] = useState("YOUR BRAND");
  const [activeCategory, setActiveCategory] = useState("Classic");
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const currentFinish = finishes.find(f => f.id === finishType);

  const handleSaveDesign = async () => {
    setIsSaving(true);
    try {
      await apiClient.saveTruckDesign({
        primary_color: primaryColor,
        accent_color: accentColor,
        finish_type: finishType,
        texture_type: textureType,
        business_name: businessName,
      });
      toast.success("Design saved successfully!", {
        description: "Your truck design has been saved to your account."
      });
    } catch (error) {
      toast.error("Failed to save design", {
        description: "Please try again or check your connection."
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportDesign = async () => {
    setIsExporting(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Design exported!", {
        description: "Your wrap-ready PDF has been generated."
      });
    } catch (error) {
      toast.error("Export failed", {
        description: "Please try again."
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleResetDesign = () => {
    setPrimaryColor("#ec7f13");
    setAccentColor("#1a1a1a");
    setFinishType("matte");
    setTextureType("solid");
    setBusinessName("YOUR BRAND");
    toast.info("Design reset to defaults");
  };

  return (
    <div className="bg-background-dark font-display text-slate-100 h-screen flex flex-col overflow-hidden">
      <SEO 
        title="Truck Design Studio - Paint Shop"
        description="Design your food truck wrap with industrial precision. Choose from dozens of colors, finishes, and textures. See your design in real-time."
        url="/truck-design"
      />
      
      {/* Header */}
      <header className="flex items-center justify-between border-b border-steel/50 px-8 py-4 bg-background-dark shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-primary">
            <Truck className="w-7 h-7" />
          </Link>
          <div>
            <h2 className="text-lg font-bold leading-tight tracking-tight uppercase">Truck Design Studio</h2>
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">Paint Shop V.3.0</p>
          </div>
        </div>
        <nav className="flex items-center gap-10">
          <Link to="/" className="text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Dashboard</Link>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary border-b-2 border-primary pb-1">Paint Shop</span>
          <button 
            onClick={() => toast.info("Wrap Preview coming soon", { description: "This feature is in development." })}
            className="text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
          >
            Wrap Preview
          </button>
        </nav>
        <button 
          onClick={handleExportDesign}
          disabled={isExporting}
          className="px-6 py-2 bg-primary rounded text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Printer className="w-4 h-4" />}
          {isExporting ? "Exporting..." : "Export Design"}
        </button>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Tool Sidebar */}
        <aside className="w-20 border-r border-steel/50 bg-surface flex flex-col items-center py-6 gap-4 shrink-0">
          <button 
            className={`p-3 rounded-lg transition-colors ${activeColorTarget === 'primary' ? 'bg-primary/20 text-primary' : 'text-slate-500 hover:text-slate-200'}`}
            onClick={() => setActiveColorTarget('primary')}
            title="Primary Color"
          >
            <Palette className="w-5 h-5" />
          </button>
          <button 
            className={`p-3 rounded-lg transition-colors ${activeColorTarget === 'accent' ? 'bg-primary/20 text-primary' : 'text-slate-500 hover:text-slate-200'}`}
            onClick={() => setActiveColorTarget('accent')}
            title="Accent Color"
          >
            <Layers className="w-5 h-5" />
          </button>
          <button className="p-3 text-slate-500 hover:text-slate-200 cursor-pointer transition-colors" title="Text Tool">
            <Type className="w-5 h-5" />
          </button>
          <button className="p-3 text-slate-500 hover:text-slate-200 cursor-pointer transition-colors" title="Effects">
            <Sparkles className="w-5 h-5" />
          </button>
          <div className="mt-auto">
            <button className="p-3 text-slate-500 hover:text-slate-200 cursor-pointer transition-colors" title="Settings">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 bg-[#0d0a09] relative overflow-hidden flex flex-col">
          {/* Truck Preview Canvas */}
          <div className="flex-1 flex items-center justify-center p-8 relative" data-testid="truck-preview">
            {/* SVG Patterns */}
            <svg width="0" height="0">
              <defs>
                <pattern id="brushed" patternUnits="userSpaceOnUse" width="4" height="4">
                  <line x1="0" y1="0" x2="4" y2="4" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                </pattern>
                <pattern id="carbon" patternUnits="userSpaceOnUse" width="6" height="6">
                  <rect width="3" height="3" fill="rgba(0,0,0,0.2)"/>
                  <rect x="3" y="3" width="3" height="3" fill="rgba(0,0,0,0.2)"/>
                </pattern>
                <pattern id="diamond" patternUnits="userSpaceOnUse" width="8" height="8">
                  <polygon points="4,0 8,4 4,8 0,4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                </pattern>
                <linearGradient id="glossGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.3)"/>
                  <stop offset="50%" stopColor="rgba(255,255,255,0)"/>
                  <stop offset="100%" stopColor="rgba(0,0,0,0.2)"/>
                </linearGradient>
                <filter id="metallic">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3"/>
                  <feDisplacementMap in="SourceGraphic" scale="2"/>
                </filter>
              </defs>
            </svg>

            {/* Food Truck SVG */}
            <svg viewBox="0 0 800 400" className="w-full max-w-4xl drop-shadow-2xl" style={{ filter: finishType === 'metallic' ? 'contrast(1.1) saturate(1.2)' : 'none' }}>
              {/* Ground shadow */}
              <ellipse cx="400" cy="380" rx="350" ry="20" fill="rgba(0,0,0,0.3)"/>
              
              {/* Main Body */}
              <g>
                {/* Truck body base */}
                <rect x="80" y="120" width="520" height="200" rx="12" 
                  fill={primaryColor} 
                  opacity={currentFinish?.opacity || 1}
                />
                {/* Texture overlay */}
                {textureType !== 'solid' && (
                  <rect x="80" y="120" width="520" height="200" rx="12" 
                    fill={textures.find(t => t.id === textureType)?.pattern}
                    opacity="0.5"
                  />
                )}
                {/* Gloss highlight */}
                {(finishType === 'gloss' || finishType === 'metallic') && (
                  <rect x="80" y="120" width="520" height="100" rx="12" 
                    fill="url(#glossGradient)"
                  />
                )}
                
                {/* Cab section */}
                <path d="M600 160 L600 320 L720 320 L720 200 L680 160 Z" 
                  fill={primaryColor}
                  opacity={currentFinish?.opacity || 1}
                />
                {textureType !== 'solid' && (
                  <path d="M600 160 L600 320 L720 320 L720 200 L680 160 Z" 
                    fill={textures.find(t => t.id === textureType)?.pattern}
                    opacity="0.5"
                  />
                )}
                
                {/* Accent stripe */}
                <rect x="80" y="240" width="640" height="24" fill={accentColor}/>
                
                {/* Service window */}
                <rect x="180" y="150" width="200" height="120" rx="4" fill="#1a1a1a"/>
                <rect x="185" y="155" width="190" height="110" rx="2" fill="#0d0a09"/>
                {/* Window frame accent */}
                <rect x="180" y="268" width="200" height="8" fill={accentColor}/>
                
                {/* Menu board area */}
                <rect x="420" y="150" width="140" height="80" rx="4" fill="#1a1a1a"/>
                <rect x="425" y="155" width="130" height="70" rx="2" fill="#2a2a2a"/>
                {/* Menu lines */}
                <line x1="435" y1="170" x2="545" y2="170" stroke="#4a4a4a" strokeWidth="2"/>
                <line x1="435" y1="185" x2="525" y2="185" stroke="#4a4a4a" strokeWidth="2"/>
                <line x1="435" y1="200" x2="535" y2="200" stroke="#4a4a4a" strokeWidth="2"/>
                
                {/* Cab windshield */}
                <path d="M610 170 L610 280 L700 280 L700 205 L670 170 Z" fill="#1a1a1a"/>
                <path d="M615 175 L615 275 L695 275 L695 208 L667 175 Z" fill="#0d0a09"/>
                
                {/* Business name */}
                <text x="300" y="215" 
                  textAnchor="middle" 
                  fill={accentColor === "#ffffff" || accentColor === "#fffdd0" ? "#1a1a1a" : "#ffffff"}
                  fontSize="28" 
                  fontFamily="Oswald, sans-serif"
                  fontWeight="bold"
                  letterSpacing="4"
                >
                  {businessName}
                </text>
              </g>
              
              {/* Wheels */}
              <g>
                {/* Front wheel */}
                <circle cx="180" cy="340" r="50" fill="#1a1a1a"/>
                <circle cx="180" cy="340" r="35" fill="#2a2a2a"/>
                <circle cx="180" cy="340" r="20" fill={accentColor}/>
                <circle cx="180" cy="340" r="8" fill="#1a1a1a"/>
                
                {/* Middle wheel */}
                <circle cx="450" cy="340" r="50" fill="#1a1a1a"/>
                <circle cx="450" cy="340" r="35" fill="#2a2a2a"/>
                <circle cx="450" cy="340" r="20" fill={accentColor}/>
                <circle cx="450" cy="340" r="8" fill="#1a1a1a"/>
                
                {/* Rear wheel */}
                <circle cx="650" cy="340" r="45" fill="#1a1a1a"/>
                <circle cx="650" cy="340" r="32" fill="#2a2a2a"/>
                <circle cx="650" cy="340" r="18" fill={accentColor}/>
                <circle cx="650" cy="340" r="6" fill="#1a1a1a"/>
              </g>
              
              {/* Details */}
              <g>
                {/* Roof vent */}
                <rect x="250" y="105" width="80" height="20" rx="4" fill="#2a2a2a"/>
                
                {/* Awning rod */}
                <rect x="175" y="145" width="210" height="4" fill={accentColor}/>
                
                {/* Step */}
                <rect x="390" y="310" width="60" height="15" rx="2" fill="#2a2a2a"/>
                
                {/* Headlight */}
                <circle cx="710" cy="260" r="12" fill="#facc15"/>
                <circle cx="710" cy="260" r="8" fill="#fef08a"/>
              </g>
            </svg>

            {/* Preview Info */}
            <div className="absolute bottom-6 left-6 flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Live Preview</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-tighter">
                {finishType.charAt(0).toUpperCase() + finishType.slice(1)} Finish · {textureType.charAt(0).toUpperCase() + textureType.slice(1)}
              </span>
            </div>

            {/* Color swatches showing current selection */}
            <div className="absolute bottom-6 right-6 flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 uppercase">Primary</span>
                <div className="w-8 h-8 rounded border-2 border-white/20" style={{ backgroundColor: primaryColor }}></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 uppercase">Accent</span>
                <div className="w-8 h-8 rounded border-2 border-white/20" style={{ backgroundColor: accentColor }}></div>
              </div>
            </div>

            {/* Rotate hint */}
            <button className="absolute top-6 right-6 flex items-center gap-2 px-3 py-2 bg-surface/80 rounded-lg text-xs text-slate-400 hover:text-white transition-colors">
              <RotateCcw className="w-4 h-4" /> 3D View
            </button>
          </div>
        </main>

        {/* Right Panel - Tools */}
        <aside className="w-96 border-l border-steel/50 bg-surface overflow-y-auto custom-scrollbar shrink-0">
          {/* Color Target Indicator */}
          <div className="p-4 border-b border-steel/30 bg-primary/5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Editing: {activeColorTarget === 'primary' ? 'Primary Color' : 'Accent Color'}
              </span>
              <div 
                className="w-10 h-10 rounded-lg border-2 border-primary shadow-lg"
                style={{ backgroundColor: activeColorTarget === 'primary' ? primaryColor : accentColor }}
              ></div>
            </div>
          </div>

          {/* Color Palettes */}
          <div className="p-4 border-b border-steel/30">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Palette className="w-4 h-4 text-primary" /> Color Palette
            </h3>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-1 mb-4">
              {Object.keys(colorPalettes).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-colors ${
                    activeCategory === category 
                      ? 'bg-primary text-white' 
                      : 'bg-steel/30 text-slate-400 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Color Grid */}
            <div className="grid grid-cols-6 gap-2" data-testid="color-grid">
              {colorPalettes[activeCategory].map((color) => {
                const isSelected = (activeColorTarget === 'primary' ? primaryColor : accentColor) === color.hex;
                return (
                  <button
                    key={color.hex}
                    onClick={() => {
                      if (activeColorTarget === 'primary') {
                        setPrimaryColor(color.hex);
                      } else {
                        setAccentColor(color.hex);
                      }
                    }}
                    className={`group relative aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                      isSelected ? 'border-primary ring-2 ring-primary/50' : 'border-transparent hover:border-white/30'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    data-testid={`color-${color.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className={`w-4 h-4 ${color.hex === '#ffffff' || color.hex === '#fffdd0' || color.hex === '#e5e4e2' ? 'text-black' : 'text-white'}`} />
                      </div>
                    )}
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] text-slate-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {color.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Color Input */}
            <div className="mt-6 flex items-center gap-2">
              <input
                type="color"
                value={activeColorTarget === 'primary' ? primaryColor : accentColor}
                onChange={(e) => {
                  if (activeColorTarget === 'primary') {
                    setPrimaryColor(e.target.value);
                  } else {
                    setAccentColor(e.target.value);
                  }
                }}
                className="w-10 h-10 rounded cursor-pointer border-0"
              />
              <input
                type="text"
                value={activeColorTarget === 'primary' ? primaryColor : accentColor}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
                    if (activeColorTarget === 'primary') {
                      setPrimaryColor(val);
                    } else {
                      setAccentColor(val);
                    }
                  }
                }}
                className="flex-1 bg-background-dark border border-steel rounded px-3 py-2 text-sm uppercase font-mono focus:outline-none focus:border-primary"
                placeholder="#FFFFFF"
                data-testid="custom-color-input"
              />
            </div>
          </div>

          {/* Finish Type */}
          <div className="p-4 border-b border-steel/30">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> Finish Type
            </h3>
            <div className="grid grid-cols-2 gap-2" data-testid="finish-options">
              {finishes.map((finish) => {
                const Icon = finish.icon;
                const isSelected = finishType === finish.id;
                return (
                  <button
                    key={finish.id}
                    onClick={() => setFinishType(finish.id)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      isSelected 
                        ? 'border-primary bg-primary/10' 
                        : 'border-steel hover:border-primary/50'
                    }`}
                    data-testid={`finish-${finish.id}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-primary' : 'text-slate-400'}`} />
                      <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>{finish.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{finish.description}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Texture */}
          <div className="p-4 border-b border-steel/30">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" /> Texture
            </h3>
            <div className="grid grid-cols-2 gap-2" data-testid="texture-options">
              {textures.map((texture) => {
                const isSelected = textureType === texture.id;
                return (
                  <button
                    key={texture.id}
                    onClick={() => setTextureType(texture.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isSelected 
                        ? 'border-primary bg-primary/10' 
                        : 'border-steel hover:border-primary/50'
                    }`}
                    data-testid={`texture-${texture.id}`}
                  >
                    <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>{texture.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Business Name */}
          <div className="p-4 border-b border-steel/30">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Type className="w-4 h-4 text-primary" /> Business Name
            </h3>
            <input 
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value.toUpperCase())}
              className="w-full bg-background-dark border border-steel rounded-lg px-4 py-3 text-sm text-slate-200 uppercase tracking-widest focus:outline-none focus:border-primary"
              placeholder="YOUR BRAND NAME"
              maxLength={20}
              data-testid="business-name-input"
            />
            <p className="text-[10px] text-slate-500 mt-2">{20 - businessName.length} characters remaining</p>
          </div>

          {/* Quick Actions */}
          <div className="p-4">
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={handleResetDesign}
                className="py-3 border border-steel rounded-lg text-xs font-bold uppercase tracking-widest text-slate-400 hover:bg-steel/20 transition-colors"
              >
                Reset Design
              </button>
              <button 
                onClick={handleSaveDesign}
                disabled={isSaving}
                className="py-3 bg-primary rounded-lg text-xs font-bold uppercase tracking-widest text-white hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                data-testid="save-design-btn"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {isSaving ? "Saving..." : "Save Design"}
              </button>
            </div>
            
            {/* Upload Logo */}
            <div 
              onClick={() => toast.info("Logo upload coming soon", { description: "This feature is in development." })}
              className="mt-4 border-2 border-dashed border-steel/50 rounded-lg p-4 flex flex-col items-center gap-2 hover:border-primary/50 cursor-pointer transition-all"
            >
              <Upload className="w-6 h-6 text-slate-500" />
              <span className="text-[10px] uppercase font-bold text-slate-400">Upload Logo</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TruckDesignStudio;
