import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Truck, Palette, Layers, Type, Lightbulb, Settings, RotateCcw, Camera, Upload, Printer } from "lucide-react";
import SEO from "@/components/SEO";

const TruckDesignStudio = () => {
  const [finishType, setFinishType] = useState("matte");
  const [businessName, setBusinessName] = useState("");
  const [selectedFont, setSelectedFont] = useState("Inter Bold");
  const [fontSize, setFontSize] = useState(24);

  return (
    <div className="bg-background-dark font-display text-slate-100 h-screen flex flex-col overflow-hidden">
      <SEO 
        title="Truck Design Studio - Paint Shop"
        description="Design your food truck wrap with industrial precision. Choose finishes, upload branding, add custom lettering, and export for your wrap shop."
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
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">Professional Grade V.2.4</p>
          </div>
        </div>
        <nav className="flex items-center gap-10">
          <Link to="/" className="text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Dashboard</Link>
          <a href="#" className="text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Specs</a>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary border-b-2 border-primary pb-1">Paint Shop</span>
          <a href="#" className="text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Approval</a>
        </nav>
        <button className="px-6 py-2 rounded border border-steel text-xs font-bold uppercase tracking-widest hover:bg-steel transition-all">
          Save Progress
        </button>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Tool Sidebar */}
        <aside className="w-20 border-r border-steel/50 bg-background-dark flex flex-col items-center py-8 gap-8 shrink-0">
          <div className="p-3 bg-primary/10 text-primary rounded-lg cursor-pointer">
            <Palette className="w-5 h-5" />
          </div>
          <div className="p-3 text-slate-500 hover:text-slate-200 cursor-pointer transition-colors">
            <Layers className="w-5 h-5" />
          </div>
          <div className="p-3 text-slate-500 hover:text-slate-200 cursor-pointer transition-colors">
            <Type className="w-5 h-5" />
          </div>
          <div className="p-3 text-slate-500 hover:text-slate-200 cursor-pointer transition-colors">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div className="mt-auto p-3 text-slate-500 hover:text-slate-200 cursor-pointer transition-colors">
            <Settings className="w-5 h-5" />
          </div>
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 bg-[#120d0b] relative overflow-hidden flex flex-col">
          {/* Top Breadcrumb */}
          <div className="p-6 flex justify-between items-center shrink-0">
            <nav className="flex gap-2 items-center text-[10px] uppercase tracking-[0.15em] text-slate-500">
              <Link to="/" className="hover:text-slate-300">Launch Pad</Link>
              <span>/</span>
              <span className="hover:text-slate-300">Phase 5: Paint Shop</span>
              <span>/</span>
              <span className="text-primary font-bold">Studio</span>
            </nav>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-3 py-1 bg-steel/30 rounded text-[10px] uppercase font-bold tracking-tighter hover:bg-steel/50 transition-colors">
                <RotateCcw className="w-4 h-4" /> 3D View
              </button>
              <button className="flex items-center gap-2 px-3 py-1 bg-steel/30 rounded text-[10px] uppercase font-bold tracking-tighter hover:bg-steel/50 transition-colors">
                <Camera className="w-4 h-4" /> Capture
              </button>
            </div>
          </div>

          {/* Truck Preview */}
          <div className="flex-1 flex items-center justify-center p-12" data-testid="truck-preview">
            <div className="w-full h-full max-w-5xl bg-gradient-to-br from-slate-900 to-black rounded-xl border border-steel/30 shadow-2xl relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  alt="Sleek food truck side view" 
                  className="w-4/5 object-contain opacity-90 group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvTdp2x1EH7zC9Yzpo8_IgqEkWzBquiFcjZBID13m7W3epzpHiWp-ihzJ7bRoQgwi5FYzW23EOYAHIe_4LAbDx5RSY3l559Xeqf2GxHadovCyag_5iWm-e0EU5CtyVOXoROCfHeb1joBXUH4gemRbMKjPKKhEEK1ObkEpNifA20did31O7imIUYwfggcNMhakuuv4kxnXf7LY1-YuV-kaJZm5hUD9slJDgKfPLRPxEFm-PtIDpymtTAqEQVtou2RBvdcigIsSxd18-"
                />
              </div>
              {/* Dot Grid Overlay */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #cb4f10 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }}
              ></div>
              <div className="absolute bottom-6 left-6 flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Composite Preview</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Orthographic Side View - Active Layer: Base Paint</span>
              </div>
            </div>
          </div>
        </main>

        {/* Right Panel - Tools */}
        <aside className="w-80 border-l border-steel/50 bg-background-dark overflow-y-auto custom-scrollbar shrink-0">
          {/* Paint & Finish */}
          <div className="p-6 border-b border-steel/30">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Palette className="w-4 h-4 text-primary" /> Paint & Finish
            </h3>
            <div className="space-y-4">
              <label className="text-[10px] uppercase font-semibold text-slate-400 tracking-widest">Finish Type</label>
              <div className="grid grid-cols-3 gap-2">
                {["matte", "gloss", "metallic"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFinishType(type)}
                    className={`p-2 border rounded text-[10px] font-bold uppercase tracking-tighter transition-colors ${
                      finishType === type 
                        ? "border-primary bg-primary/10 text-white" 
                        : "border-steel hover:border-slate-400"
                    }`}
                    data-testid={`finish-${type}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <label className="text-[10px] uppercase font-semibold text-slate-400 tracking-widest">Selected Hue</label>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded bg-primary border border-white/20"></div>
                <input 
                  type="range" 
                  className="flex-1 h-1.5 bg-steel rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
          </div>

          {/* Assets */}
          <div className="p-6 border-b border-steel/30">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Upload className="w-4 h-4 text-primary" /> Assets
            </h3>
            <div className="border-2 border-dashed border-steel/50 rounded-lg p-6 flex flex-col items-center gap-2 hover:border-primary/50 cursor-pointer transition-all">
              <Upload className="w-6 h-6 text-slate-500" />
              <span className="text-[10px] uppercase font-bold text-slate-400">Upload Branding</span>
            </div>
          </div>

          {/* Lettering Tool */}
          <div className="p-6 border-b border-steel/30">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Type className="w-4 h-4 text-primary" /> Lettering Tool
            </h3>
            <div className="space-y-4">
              <input 
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full bg-slate-900 border border-steel rounded p-2 text-sm text-slate-200 focus:outline-none focus:border-primary amber-glow"
                placeholder="Enter Business Name..."
                data-testid="business-name-input"
              />
              <div className="flex gap-2">
                <select 
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value)}
                  className="flex-1 bg-slate-900 border border-steel rounded text-[10px] p-2 uppercase font-bold focus:outline-none focus:border-primary"
                >
                  <option>Inter Bold</option>
                  <option>Space Grotesk</option>
                </select>
                <input 
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-16 bg-slate-900 border border-steel rounded text-[10px] p-2 focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Export Button */}
          <div className="p-6">
            <button className="w-full py-4 bg-primary text-white text-xs font-bold uppercase tracking-[0.2em] rounded shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2" data-testid="export-btn">
              <Printer className="w-5 h-5" />
              Export for Wrap Shop
            </button>
            <p className="text-[9px] text-center text-slate-500 uppercase mt-4 leading-relaxed font-medium">
              Project Alpha v.1.0 • Phase 5 Ready
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TruckDesignStudio;
