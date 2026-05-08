import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Palette, Layers, Type, Upload, Settings, Camera, RotateCcw, Save, Download, Share2, ZoomIn, ZoomOut, Maximize2, X, Check } from "lucide-react";
import { toast } from "sonner";
import api from "../lib/api";

// ============================================================================
// TRUCK CHASSIS LIBRARY - 6 Models with Black Background Images (processed)
// ============================================================================
const TRUCK_MODELS = {
  truck_01: {
    id: "truck_01",
    name: "Classic Step Van",
    description: "Street food, BBQ, comfort food",
    photo: "/trucks/truck_01.png"
  },
  truck_02: {
    id: "truck_02", 
    name: "Modern Sprinter Van",
    description: "Coffee, juice, health food, desserts",
    photo: "/trucks/truck_02.png"
  },
  truck_03: {
    id: "truck_03",
    name: "Large Box Truck", 
    description: "High-volume, catering, events",
    photo: "/trucks/truck_03.png"
  },
  truck_04: {
    id: "truck_04",
    name: "Compact Transit Van",
    description: "Urban tight spaces, lunch rush", 
    photo: "/trucks/truck_04.png"
  },
  truck_05: {
    id: "truck_05",
    name: "Retro Airstream",
    description: "Premium, wine, artisan, brunch",
    photo: "/trucks/truck_05.png"
  },
  truck_06: {
    id: "truck_06",
    name: "Open-Air Trailer",
    description: "Farmers markets, festivals",
    photo: "/trucks/truck_06.png"
  }
};

// ============================================================================
// COLOR PALETTES - 7 Themed Palettes + Custom
// ============================================================================
const COLOR_PALETTES = {
  classic: {
    name: "Classic Fleet",
    description: "Traditional commercial food trucks",
    colors: [
      { name: "Fleet White", hex: "#FFFFFF" },
      { name: "Signal Red", hex: "#CE2029" },
      { name: "Royal Blue", hex: "#4169E1" },
      { name: "Forest Green", hex: "#228B22" },
      { name: "Jet Black", hex: "#0A0A0A" },
      { name: "Chrome Silver", hex: "#C0C0C0" },
      { name: "Safety Orange", hex: "#FF6600" },
      { name: "Cream", hex: "#FFFDD0" }
    ]
  },
  copper_steel: {
    name: "Copper & Steel",
    description: "Industrial-luxe — matches FTLP brand",
    colors: [
      { name: "Burnt Copper", hex: "#E8592F" },
      { name: "Brushed Steel", hex: "#71797E" },
      { name: "Forge Orange", hex: "#CC5500" },
      { name: "Anvil Black", hex: "#2C2C2C" },
      { name: "Ember Red", hex: "#8B2500" },
      { name: "Iron Gray", hex: "#48494B" },
      { name: "Bronze", hex: "#CD7F32" },
      { name: "Rust", hex: "#B7410E" }
    ]
  },
  street_food: {
    name: "Street Food",
    description: "Vibrant, appetizing, food-forward",
    colors: [
      { name: "Chili Red", hex: "#C41E3A" },
      { name: "Jalapeno Green", hex: "#4F7942" },
      { name: "Mustard Yellow", hex: "#FFDB58" },
      { name: "Smoky Brown", hex: "#5D432C" },
      { name: "Salsa Orange", hex: "#FF4500" },
      { name: "Avocado", hex: "#568203" },
      { name: "Charcoal", hex: "#36454F" },
      { name: "Cream", hex: "#FFFDD0" }
    ]
  },
  coastal: {
    name: "Coastal",
    description: "Beach towns, seafood, fresh fare",
    colors: [
      { name: "Ocean Blue", hex: "#006994" },
      { name: "Sea Foam", hex: "#93E9BE" },
      { name: "Sandy Tan", hex: "#D2B48C" },
      { name: "Driftwood Gray", hex: "#8B8378" },
      { name: "Coral", hex: "#FF7F50" },
      { name: "Navy", hex: "#000080" },
      { name: "Pearl White", hex: "#F0EAD6" },
      { name: "Seafoam", hex: "#71EEB8" }
    ]
  },
  luxury: {
    name: "Luxury",
    description: "Premium positioning, fine dining mobile",
    colors: [
      { name: "Midnight Black", hex: "#191970" },
      { name: "Champagne Gold", hex: "#F7E7CE" },
      { name: "Burgundy", hex: "#800020" },
      { name: "Slate Gray", hex: "#708090" },
      { name: "Ivory", hex: "#FFFFF0" },
      { name: "Deep Purple", hex: "#301934" },
      { name: "Rose Gold", hex: "#B76E79" },
      { name: "Charcoal", hex: "#36454F" }
    ]
  },
  neon_city: {
    name: "Neon City",
    description: "Late night, urban, Gen Z market",
    colors: [
      { name: "Hot Pink", hex: "#FF69B4" },
      { name: "Electric Blue", hex: "#7DF9FF" },
      { name: "Lime Green", hex: "#32CD32" },
      { name: "Neon Orange", hex: "#FF6700" },
      { name: "Violet", hex: "#EE82EE" },
      { name: "Cyan", hex: "#00FFFF" },
      { name: "Magenta", hex: "#FF00FF" },
      { name: "Ultra White", hex: "#FFFFFF" }
    ]
  },
  custom: {
    name: "Custom",
    description: "Full creative freedom",
    colors: []
  }
};

// ============================================================================
// FINISH TYPES - 7 Paint Finishes with DRAMATIC CSS Effects
// ============================================================================
const FINISH_TYPES = {
  MATTE: {
    name: "Matte",
    filter: "contrast(0.85) saturate(0.7) brightness(0.92)",
    overlay: null,
    description: "Flat, chalky, no reflection"
  },
  GLOSS: {
    name: "Gloss",
    filter: "contrast(1.15) saturate(1.25) brightness(1.05)",
    overlay: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 40%, rgba(255,255,255,0.08) 80%)",
    description: "Wet, reflective, showroom shine"
  },
  METALLIC: {
    name: "Metallic",
    filter: "contrast(1.2) saturate(0.85) brightness(1.1)",
    overlay: "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)",
    description: "Metalflake sparkle, depth"
  },
  CHROME: {
    name: "Chrome",
    filter: "contrast(1.5) saturate(0.2) brightness(1.25)",
    overlay: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 25%, rgba(255,255,255,0.15) 50%, transparent 75%, rgba(255,255,255,0.3) 100%)",
    description: "Mirror finish, extreme reflection"
  },
  ENAMEL: {
    name: "Enamel",
    filter: "contrast(1.1) saturate(1.4) brightness(1.0)",
    overlay: "linear-gradient(160deg, rgba(255,255,255,0.1) 0%, transparent 60%)",
    description: "Deep, rich, vintage diner look"
  },
  SATIN: {
    name: "Satin",
    filter: "contrast(0.95) saturate(1.05) brightness(0.96)",
    overlay: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
    description: "Between matte and gloss"
  },
  PEARL: {
    name: "Pearl",
    filter: "contrast(1.05) saturate(0.9) brightness(1.12)",
    overlay: "linear-gradient(135deg, rgba(255,180,255,0.2) 0%, rgba(180,255,255,0.2) 35%, rgba(255,255,180,0.2) 70%, rgba(255,200,255,0.15) 100%)",
    description: "Color-shifting pearl effect"
  }
};

// ============================================================================
// TWO-TONE SPLIT PATTERNS
// ============================================================================
const TWO_TONE_SPLITS = {
  horizontal: {
    name: "Horizontal Split",
    clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
    description: "Top primary, bottom secondary"
  },
  diagonal_fwd: {
    name: "Forward Diagonal",
    clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
    description: "Dynamic forward motion"
  },
  diagonal_bwd: {
    name: "Rear Diagonal", 
    clipPath: "polygon(0 0, 100% 100%, 0 100%)",
    description: "Sporty reverse sweep"
  },
  panel_side: {
    name: "Racing Stripe",
    clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)",
    description: "Center horizontal band"
  },
  chevron: {
    name: "Chevron",
    clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
    description: "V-shape pointing forward"
  },
  lower_accent: {
    name: "Lower Accent",
    clipPath: "polygon(0 70%, 100% 70%, 100% 100%, 0 100%)",
    description: "Accent stripe at bottom"
  },
  hood_roof: {
    name: "Hood & Roof",
    clipPath: "polygon(0 0, 100% 0, 100% 25%, 0 25%)",
    description: "Top section contrast"
  }
};

// ============================================================================
// WRAP PATTERNS - CSS Generated
// ============================================================================
const WRAP_PATTERNS = {
  none: { name: "No Wrap", css: null },
  stripes_h: {
    name: "Horizontal Stripes",
    css: "repeating-linear-gradient(0deg, transparent, transparent 12px, rgba(255,255,255,0.45) 12px, rgba(255,255,255,0.45) 24px)"
  },
  stripes_d: {
    name: "Diagonal Stripes",
    css: "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.45) 12px, rgba(255,255,255,0.45) 24px)"
  },
  carbon: {
    name: "Carbon Fiber",
    css: "repeating-linear-gradient(45deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 3px, transparent 3px, transparent 6px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 3px, transparent 3px, transparent 6px)"
  },
  dots: {
    name: "Polka Dots",
    css: "radial-gradient(circle, rgba(255,255,255,0.5) 12%, transparent 12%), radial-gradient(circle, rgba(255,255,255,0.5) 12%, transparent 12%)",
    size: "30px 30px",
    position: "0 0, 15px 15px"
  },
  hex: {
    name: "Hex Grid",
    css: "repeating-linear-gradient(60deg, transparent, transparent 12px, rgba(255,255,255,0.3) 12px, rgba(255,255,255,0.3) 14px), repeating-linear-gradient(-60deg, transparent, transparent 12px, rgba(255,255,255,0.3) 12px, rgba(255,255,255,0.3) 14px)"
  },
  chevrons: {
    name: "Chevrons",
    css: "repeating-linear-gradient(135deg, transparent, transparent 20px, rgba(255,255,255,0.4) 20px, rgba(255,255,255,0.4) 40px)"
  },
  brushed: {
    name: "Brushed Metal",
    css: "repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 4px)"
  },
  camo: {
    name: "Camo",
    css: "radial-gradient(ellipse at 20% 30%, rgba(74,93,35,0.6) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(85,107,47,0.6) 0%, transparent 40%), radial-gradient(ellipse at 40% 80%, rgba(107,142,35,0.5) 0%, transparent 45%)"
  }
};

// ============================================================================
// LETTERING FONTS
// ============================================================================
const LETTERING_FONTS = {
  STENCIL: { name: "Stencil", fontFamily: "'Stencil Std', 'Impact', sans-serif", fontWeight: "900" },
  GOTHIC: { name: "Gothic", fontFamily: "'Oswald', 'Impact', sans-serif", fontWeight: "700" },
  SANS: { name: "Modern", fontFamily: "'Inter', 'Helvetica Neue', sans-serif", fontWeight: "600" },
  SCRIPT: { name: "Script", fontFamily: "'Pacifico', cursive", fontWeight: "400" },
  BLOCK: { name: "Block", fontFamily: "'Anton', 'Impact', sans-serif", fontWeight: "400" }
};

// ============================================================================
// TRUCK CANVAS COMPONENT - Isolated Truck Preview with All Effects
// All truck images now have BLACK backgrounds (processed via PIL).
// Technique: render truck normally, then overlay selected color with
// mix-blend-mode: multiply. multiply(color, black)=black, multiply(color, white)=color.
// ============================================================================
const TruckCanvas = ({ state, zoom = 1 }) => {
  const truckModel = TRUCK_MODELS[state.truckModel] || TRUCK_MODELS.truck_01;
  const finishType = FINISH_TYPES[state.finish] || FINISH_TYPES.GLOSS;
  const splitPattern = TWO_TONE_SPLITS[state.twoToneSplit];
  const wrapPattern = WRAP_PATTERNS[state.wrapPattern];
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  const getContrastColor = (hexColor) => {
    if (!hexColor) return "#FFFFFF";
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? "#000000" : "#FFFFFF";
  };

  const truckImageUrl = state.userPhotoUrl || truckModel.photo;
  const hasColor = state.primaryColor && state.primaryColor !== "#FFFFFF" && state.primaryColor !== "#fff";

  // Reset load state on image change
  React.useEffect(() => { setImgLoaded(false); setImgError(false); }, [truckImageUrl]);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-xl bg-black"
      style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
      data-testid="truck-canvas"
    >
      {/* Loading indicator */}
      {!imgLoaded && !imgError && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-8 h-8 border-2 border-[#E8592F] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {imgError && (
        <div className="absolute inset-0 flex items-center justify-center z-20 text-zinc-500 text-sm">
          Failed to load truck image
        </div>
      )}

      {/* Blend group — isolated so multiply stays contained */}
      <div className="absolute inset-0 bg-black" style={{ isolation: "isolate" }}>
        {/* Layer 1: Truck image (white truck on black bg) */}
        <img
          src={truckImageUrl}
          alt={truckModel.name}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{ filter: finishType.filter }}
          draggable="false"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
        />

        {/* Layer 2: Color overlay — multiply colors white areas, leaves black untouched */}
        {hasColor && (
          <div className="absolute inset-0" style={{ mixBlendMode: "multiply" }}>
            <div className="absolute inset-0" style={{ backgroundColor: state.primaryColor }} />
            {state.twoToneEnabled && state.secondaryColor && splitPattern && (
              <div
                className="absolute inset-0"
                style={{ backgroundColor: state.secondaryColor, clipPath: splitPattern.clipPath }}
              />
            )}
          </div>
        )}

        {/* Layer 3: Wrap pattern — overlay blend shows on colored truck, invisible on black bg */}
        {wrapPattern && wrapPattern.css && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: wrapPattern.css,
              backgroundSize: wrapPattern.size || "20px 20px",
              backgroundPosition: wrapPattern.position || "0 0",
              opacity: state.wrapOpacity || 0.5,
              mixBlendMode: "overlay",
            }}
          />
        )}

        {/* Layer 4: Finish highlight */}
        {finishType.overlay && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: finishType.overlay, mixBlendMode: "soft-light" }}
          />
        )}

        {/* Layer 5: Racing stripe — overlay blend shows on truck, hidden on black bg */}
        {/* Moved to accessories section outside blend group for better visibility */}
      </div>

      {/* Accessories — outside blend group, rendered normally */}
      {state.racingStripeEnabled && (
        <div
          className="absolute pointer-events-none"
          style={{
            top: "44%",
            left: "5%",
            right: "5%",
            height: state.racingStripeWidth === "thin" ? "8px" : state.racingStripeWidth === "bold" ? "24px" : "14px",
            backgroundColor: state.racingStripeColor || "#FFFFFF",
            opacity: 0.85,
            boxShadow: `0 0 8px ${state.racingStripeColor || "#FFFFFF"}60`,
          }}
        />
      )}
      {state.lightsEnabled && (
        <div
          className="absolute bottom-[12%] left-[15%] right-[15%] h-6 rounded-full"
          style={{
            backgroundColor: state.lightsColor || state.primaryColor || "#FF6600",
            opacity: 0.9,
            boxShadow: `0 0 20px 8px ${state.lightsColor || state.primaryColor || "#FF6600"}80, 0 0 40px 16px ${state.lightsColor || state.primaryColor || "#FF6600"}40`,
            filter: "blur(4px)",
          }}
        />
      )}
      {state.awningEnabled && (
        <div
          className="absolute top-[18%] left-[6%]"
          style={{
            backgroundColor: state.awningColor || "#CC0000",
            width: state.awningStyle === "full" ? "55%" : "35%",
            height: "24px",
            borderRadius: "0 0 12px 12px",
            backgroundImage:
              state.awningStyle === "striped"
                ? `repeating-linear-gradient(90deg, ${state.awningColor || "#CC0000"}, ${state.awningColor || "#CC0000"} 10px, white 10px, white 20px)`
                : state.awningStyle === "scalloped"
                ? `radial-gradient(circle at 50% 100%, transparent 8px, ${state.awningColor || "#CC0000"} 8px)`
                : "none",
            backgroundSize: state.awningStyle === "scalloped" ? "20px 24px" : "auto",
            boxShadow: `0 4px 12px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)`,
          }}
        />
      )}
      {state.signageEnabled && (
        <div
          className="absolute top-[6%] left-1/2 -translate-x-1/2 px-8 py-3 rounded-lg"
          style={{
            backgroundColor: state.signageIlluminated ? "#1a1a1a" : "#333",
            border: state.signageIlluminated ? `2px solid ${state.primaryColor || "#FF6600"}` : "2px solid #555",
            boxShadow: state.signageIlluminated
              ? `0 0 20px ${state.primaryColor || "#FF6600"}, 0 0 40px ${state.primaryColor || "#FF6600"}60, inset 0 0 10px ${state.primaryColor || "#FF6600"}30`
              : "0 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          <span
            className="text-base font-bold tracking-wider whitespace-nowrap"
            style={{
              color: state.signageIlluminated ? state.primaryColor || "#FF6600" : "#FFF",
              textShadow: state.signageIlluminated ? `0 0 10px ${state.primaryColor || "#FF6600"}, 0 0 20px ${state.primaryColor || "#FF6600"}80` : "none",
            }}
          >
            {state.businessName || "OPEN"}
          </span>
        </div>
      )}
      {state.logoUrl && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${state.logoX || 50}%`,
            top: `${state.logoY || 35}%`,
            transform: `translate(-50%, -50%) scale(${state.logoScale || 1}) rotate(${state.logoRotation || 0}deg)`,
            maxWidth: "25%",
            maxHeight: "25%",
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))",
          }}
        >
          <img src={state.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
        </div>
      )}
      {state.businessName && (
        <div
          className="absolute pointer-events-none text-center"
          style={{
            left: `${state.letteringX || 50}%`,
            top: `${state.letteringY || 40}%`,
            transform: "translate(-50%, -50%)",
            width: "70%",
          }}
        >
          <span
            style={{
              fontFamily: LETTERING_FONTS[state.letteringFont]?.fontFamily || LETTERING_FONTS.GOTHIC.fontFamily,
              fontWeight: LETTERING_FONTS[state.letteringFont]?.fontWeight || "700",
              fontSize: `${(state.letteringSize || 3) * 0.9}rem`,
              color: state.letteringColor || "#FFFFFF",
              textShadow:
                state.letteringOutline === "bold"
                  ? `3px 3px 0 ${getContrastColor(state.letteringColor)}, -3px -3px 0 ${getContrastColor(state.letteringColor)}, 3px -3px 0 ${getContrastColor(state.letteringColor)}, -3px 3px 0 ${getContrastColor(state.letteringColor)}, 0 0 10px rgba(0,0,0,0.8)`
                  : state.letteringOutline === "thin"
                  ? `1px 1px 0 ${getContrastColor(state.letteringColor)}, 0 0 8px rgba(0,0,0,0.6)`
                  : "2px 2px 6px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.4)",
              letterSpacing:
                state.letterSpacing === "tight" ? "-0.02em"
                : state.letterSpacing === "wide" ? "0.1em"
                : state.letterSpacing === "ultra" ? "0.2em"
                : "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            {state.businessName}
          </span>
        </div>
      )}
      <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 rounded text-[10px] text-white/70 uppercase tracking-wider">
        {state.viewAngle?.replace("-", " ") || "Side View"}
      </div>
    </div>
  );
};

// ============================================================================
// HSV UTILITIES
// ============================================================================
const hsvToHex = (h, s, v) => {
  const f = (n) => {
    const k = (n + h / 60) % 6;
    return Math.round((v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)) * 255);
  };
  return `#${[f(5), f(3), f(1)].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
};
const hexToHsv = (hex) => {
  if (!hex) return { h: 0, s: 1, v: 1 };
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + 6) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return { h, s: max === 0 ? 0 : d / max, v: max };
};

// ============================================================================
// COLOR WHEEL COMPONENT — Circular hue ring + SV square
// ============================================================================
const ColorWheel = ({ value, onChange }) => {
  const wheelRef = React.useRef(null);
  const svRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(null); // "wheel" | "sv"
  const [hsv, setHsv] = React.useState(() => hexToHsv(value || "#E8592F"));
  const [hexInput, setHexInput] = React.useState(value || "#E8592F");
  const hsvRef = React.useRef(hsv);
  hsvRef.current = hsv;

  // Sync external value changes
  React.useEffect(() => {
    if (value) {
      const next = hexToHsv(value);
      setHsv(next);
      setHexInput(value.toUpperCase());
    }
  }, [value]);

  const WHEEL_SIZE = 220;
  const RING_WIDTH = 24;
  const SV_SIZE = WHEEL_SIZE - RING_WIDTH * 2 - 16;

  const emit = React.useCallback((h, s, v) => {
    const hex = hsvToHex(h, s, v);
    setHexInput(hex.toUpperCase());
    onChange(hex);
  }, [onChange]);

  // --- Wheel (Hue) drag ---
  const handleWheelPointer = React.useCallback((e) => {
    if (!wheelRef.current) return;
    const rect = wheelRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI;
    const hue = (angle + 360) % 360;
    setHsv((p) => ({ ...p, h: hue }));
    emit(hue, hsvRef.current.s, hsvRef.current.v);
  }, [emit]);

  // --- SV square drag ---
  const handleSvPointer = React.useCallback((e) => {
    if (!svRef.current) return;
    const rect = svRef.current.getBoundingClientRect();
    const s = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const v = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));
    setHsv((p) => ({ ...p, s, v }));
    emit(hsvRef.current.h, s, v);
  }, [emit]);

  React.useEffect(() => {
    if (!dragging) return;
    const handler = (e) => {
      e.preventDefault();
      const pt = e.touches ? e.touches[0] : e;
      if (dragging === "wheel") handleWheelPointer(pt);
      else handleSvPointer(pt);
    };
    const up = () => setDragging(null);
    window.addEventListener("mousemove", handler, { passive: false });
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", handler, { passive: false });
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", handler);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", handler);
      window.removeEventListener("touchend", up);
    };
  }, [dragging, handleWheelPointer, handleSvPointer]);

  // Hue indicator position on the ring
  const hueAngle = (hsv.h * Math.PI) / 180;
  const ringR = WHEEL_SIZE / 2 - RING_WIDTH / 2;
  const hx = WHEEL_SIZE / 2 + ringR * Math.cos(hueAngle);
  const hy = WHEEL_SIZE / 2 + ringR * Math.sin(hueAngle);

  const hexValid = /^#[0-9a-fA-F]{6}$/.test(hexInput);

  return (
    <div className="flex flex-col items-center gap-3" data-testid="color-wheel">
      {/* Wheel + SV square */}
      <div
        className="relative"
        style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}
      >
        {/* Hue ring */}
        <div
          ref={wheelRef}
          className="absolute inset-0 rounded-full cursor-crosshair"
          style={{
            background: `conic-gradient(
              hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),
              hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%)
            )`,
            WebkitMask: `radial-gradient(circle, transparent ${WHEEL_SIZE / 2 - RING_WIDTH}px, black ${WHEEL_SIZE / 2 - RING_WIDTH}px, black ${WHEEL_SIZE / 2}px, transparent ${WHEEL_SIZE / 2}px)`,
            mask: `radial-gradient(circle, transparent ${WHEEL_SIZE / 2 - RING_WIDTH}px, black ${WHEEL_SIZE / 2 - RING_WIDTH}px, black ${WHEEL_SIZE / 2}px, transparent ${WHEEL_SIZE / 2}px)`,
          }}
          onMouseDown={(e) => { setDragging("wheel"); handleWheelPointer(e); }}
          onTouchStart={(e) => { setDragging("wheel"); handleWheelPointer(e.touches[0]); }}
        />
        {/* Hue indicator */}
        <div
          className="absolute w-5 h-5 rounded-full border-2 border-white shadow-lg pointer-events-none"
          style={{
            left: hx - 10,
            top: hy - 10,
            backgroundColor: hsvToHex(hsv.h, 1, 1),
            boxShadow: "0 0 4px rgba(0,0,0,0.6)",
          }}
        />
        {/* SV square — centered inside ring */}
        <div
          ref={svRef}
          className="absolute cursor-crosshair rounded-md overflow-hidden"
          style={{
            width: SV_SIZE,
            height: SV_SIZE,
            left: (WHEEL_SIZE - SV_SIZE) / 2,
            top: (WHEEL_SIZE - SV_SIZE) / 2,
            background: `
              linear-gradient(to top, #000, transparent),
              linear-gradient(to right, #fff, ${hsvToHex(hsv.h, 1, 1)})
            `,
          }}
          onMouseDown={(e) => { setDragging("sv"); handleSvPointer(e); }}
          onTouchStart={(e) => { setDragging("sv"); handleSvPointer(e.touches[0]); }}
        >
          {/* SV indicator */}
          <div
            className="absolute w-4 h-4 rounded-full border-2 border-white shadow pointer-events-none"
            style={{
              left: `calc(${hsv.s * 100}% - 8px)`,
              top: `calc(${(1 - hsv.v) * 100}% - 8px)`,
              backgroundColor: hsvToHex(hsv.h, hsv.s, hsv.v),
              boxShadow: "0 0 3px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      </div>

      {/* HEX input + current color preview */}
      <div className="flex items-center gap-2 w-full max-w-[220px]">
        <div
          className="w-10 h-10 rounded-lg border border-white/10 shrink-0"
          style={{ backgroundColor: value || "#E8592F" }}
        />
        <input
          type="text"
          value={hexInput}
          onChange={(e) => {
            const v = e.target.value;
            setHexInput(v);
            if (/^#[0-9a-fA-F]{6}$/.test(v)) {
              const next = hexToHsv(v);
              setHsv(next);
              onChange(v);
            }
          }}
          className={`flex-1 px-3 py-2 bg-white/[0.06] border rounded-lg text-white text-sm font-mono uppercase
            ${hexValid ? "border-white/10 focus:border-[#E8592F]" : "border-red-500"} focus:outline-none`}
          maxLength={7}
          data-testid="hex-input"
        />
      </div>
    </div>
  );
};

// ============================================================================
// COLOR SWATCH (kept for palette presets)
// ============================================================================
const ColorSwatch = ({ color, isSelected, onClick, size = "md" }) => {
  const sizeClasses = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-12 h-12" };
  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} rounded-full border-2 transition-all duration-150 flex items-center justify-center
        ${isSelected ? "border-[#E8592F] scale-110 ring-2 ring-[#E8592F] ring-offset-2 ring-offset-[#1a1a2e]" : "border-white/10 hover:border-white/20"}`}
      style={{ backgroundColor: color.hex }}
      title={color.name}
      data-testid={`color-swatch-${color.hex}`}
    >
      {isSelected && <Check className="w-4 h-4" style={{ color: parseInt(color.hex.slice(1), 16) > 0x808080 ? "#000" : "#FFF" }} />}
    </button>
  );
};

// ============================================================================
// CONTROL PANEL TABS
// ============================================================================
const ControlTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "paint", icon: Palette, label: "Paint" },
    { id: "wraps", icon: Layers, label: "Wraps" },
    { id: "lettering", icon: Type, label: "Text" },
    { id: "logo", icon: Upload, label: "Logo" },
    { id: "extras", icon: Settings, label: "Extras" },
    { id: "photo", icon: Camera, label: "Photo" }
  ];
  
  return (
    <div className="flex border-b border-white/5 mb-6">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 py-3 px-2 flex flex-col items-center gap-1 transition-colors text-xs font-medium
            ${activeTab === tab.id 
              ? "text-[#E8592F] border-b-2 border-[#E8592F] bg-[#E8592F]/5" 
              : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]"}`}
          data-testid={`tab-${tab.id}`}
        >
          <tab.icon className="w-4 h-4" />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

// ============================================================================
// MAIN PAINT SHOP COMPONENT
// ============================================================================
const PaintShop = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("paint");
  const [activePalette, setActivePalette] = useState("copper_steel");
  const [zoom, setZoom] = useState(1);
  const [recentColors, setRecentColors] = useState([]);
  
  // Truck State - All customization options
  const [truckState, setTruckState] = useState({
    truckModel: "truck_01",
    primaryColor: "#E8592F",
    secondaryColor: "#2C2C2C",
    twoToneEnabled: false,
    twoToneSplit: "horizontal",
    finish: "GLOSS",
    wrapPattern: "none",
    wrapOpacity: 0.5,
    logoUrl: null,
    logoX: 50,
    logoY: 40,
    logoScale: 1,
    logoRotation: 0,
    businessName: "",
    letteringFont: "GOTHIC",
    letteringColor: "#FFFFFF",
    letteringSize: 3,
    letteringX: 50,
    letteringY: 45,
    letteringOutline: "none",
    letterSpacing: "normal",
    awningEnabled: false,
    awningColor: "#CC0000",
    awningStyle: "solid",
    lightsEnabled: false,
    lightsColor: "#FF6600",
    signageEnabled: false,
    signageIlluminated: true,
    racingStripeEnabled: false,
    racingStripeColor: "#FFFFFF",
    racingStripeWidth: "medium",
    userPhotoUrl: null
  });
  
  // Update truck state helper - instant, no debounce
  const updateState = useCallback((updates) => {
    setTruckState(prev => ({ ...prev, ...updates }));
  }, []);
  
  // Load saved design on mount
  useEffect(() => {
    const loadDesign = async () => {
      try {
        const savedDesign = await api.getLatestTruckDesign();
        if (savedDesign) {
          // Map backend schema to truckState
          setTruckState(prev => ({
            ...prev,
            primaryColor: savedDesign.primary_color || prev.primaryColor,
            secondaryColor: savedDesign.accent_color || prev.secondaryColor,
            finish: savedDesign.finish_type || prev.finish,
            businessName: savedDesign.business_name || prev.businessName,
            truckModel: savedDesign.base_model || prev.truckModel,
            twoToneEnabled: !!savedDesign.split_pattern,
            twoToneSplit: savedDesign.split_pattern || prev.twoToneSplit,
            wrapPattern: savedDesign.wrap_id || "none",
            awningEnabled: !!savedDesign.awning,
            awningStyle: savedDesign.awning || prev.awningStyle,
            lightsEnabled: savedDesign.accessories?.includes("led_underglow") || false,
            signageEnabled: savedDesign.accessories?.includes("roof_signage") || false,
            racingStripeEnabled: savedDesign.accessories?.includes("racing_stripe") || false,
          }));
        }
      } catch (error) {
        console.log("No saved design found, using defaults");
      } finally {
        setIsLoading(false);
      }
    };
    
    // Load recent colors from localStorage
    const saved = localStorage.getItem("ftlp_recent_colors");
    if (saved) {
      setRecentColors(JSON.parse(saved));
    }
    
    loadDesign();
  }, []);
  
  // Add color to recent colors
  const addToRecentColors = (hex) => {
    const updated = [hex, ...recentColors.filter(c => c !== hex)].slice(0, 8);
    setRecentColors(updated);
    localStorage.setItem("ftlp_recent_colors", JSON.stringify(updated));
  };
  
  // Handle color selection
  const selectColor = (hex, isSecondary = false) => {
    if (isSecondary) {
      updateState({ secondaryColor: hex });
    } else {
      updateState({ primaryColor: hex });
      addToRecentColors(hex);
    }
  };
  
  // Save design
  const saveDesign = async () => {
    setIsSaving(true);
    try {
      // Map truckState to backend schema
      const designPayload = {
        primary_color: truckState.primaryColor || "#FFFFFF",
        accent_color: truckState.secondaryColor || "#2C2C2C",
        finish_type: truckState.finish || "GLOSS",
        business_name: truckState.businessName || "",
        base_model: truckState.truckModel || "truck_01",
        split_pattern: truckState.twoToneEnabled ? truckState.twoToneSplit : null,
        wrap_id: truckState.wrapPattern !== "none" ? truckState.wrapPattern : null,
        awning: truckState.awningEnabled ? truckState.awningStyle : null,
        accessories: [
          truckState.lightsEnabled ? "led_underglow" : null,
          truckState.signageEnabled ? "roof_signage" : null,
          truckState.racingStripeEnabled ? "racing_stripe" : null,
        ].filter(Boolean)
      };
      await api.saveTruckDesign(designPayload);
      toast.success("Design saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save design");
    } finally {
      setIsSaving(false);
    }
  };
  
  // Reset design
  const resetDesign = () => {
    setTruckState({
      truckModel: "truck_01",
      primaryColor: "#FFFFFF",
      secondaryColor: "#2C2C2C",
      twoToneEnabled: false,
      twoToneSplit: "horizontal",
      finish: "GLOSS",
      wrapPattern: "none",
      wrapOpacity: 0.5,
      logoUrl: null,
      logoX: 50,
      logoY: 40,
      logoScale: 1,
      logoRotation: 0,
      businessName: "",
      letteringFont: "GOTHIC",
      letteringColor: "#FFFFFF",
      letteringSize: 3,
      letteringX: 50,
      letteringY: 45,
      letteringOutline: "none",
      letterSpacing: "normal",
      awningEnabled: false,
      awningColor: "#CC0000",
      awningStyle: "solid",
      lightsEnabled: false,
      lightsColor: "#FF6600",
      signageEnabled: false,
      signageIlluminated: true,
      racingStripeEnabled: false,
      racingStripeColor: "#FFFFFF",
      racingStripeWidth: "medium",
      userPhotoUrl: null
    });
    toast.success("Design reset to defaults");
  };
  
  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Logo must be under 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        updateState({ logoUrl: e.target?.result });
        toast.success("Logo uploaded!");
      };
      reader.readAsDataURL(file);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0d14] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#E8592F] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-500 font-medium">Loading Paint Shop...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0d14]" data-testid="paint-shop">
      {/* Header */}
      <header className="sticky top-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          
          <h1 className="font-heading text-lg font-bold text-white flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E8592F] flex items-center justify-center">
              <Palette className="w-4 h-4 text-white" />
            </div>
            Paint Shop
          </h1>
          
          <div className="flex items-center gap-3">
            <button
              onClick={resetDesign}
              className="p-2 text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              title="Reset Design"
              data-testid="reset-design-btn"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={saveDesign}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2 bg-[#E8592F] hover:bg-[#d14a24] text-white text-sm font-semibold rounded-full transition-colors disabled:opacity-50"
              data-testid="save-design-btn"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Design"}
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content - Split View */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
        
        {/* Left: Truck Preview */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
          {/* Preview Controls */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-heading text-sm font-semibold text-white">
              {TRUCK_MODELS[truckState.truckModel]?.name || "Classic Step Van"}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                className="p-2 text-zinc-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs text-zinc-600 w-10 text-center font-mono">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                className="p-2 text-zinc-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Truck Canvas */}
          <div className="aspect-[3/2] bg-black rounded-xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/5">
            <TruckCanvas state={truckState} zoom={zoom} />
          </div>
          
          {/* Truck Model Selector */}
          <div className="mt-5">
            <label className="block text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-3">Select Chassis</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {Object.values(TRUCK_MODELS).map(model => (
                <button
                  key={model.id}
                  onClick={() => updateState({ truckModel: model.id })}
                  className={`p-2 rounded-xl border transition-all text-center
                    ${truckState.truckModel === model.id 
                      ? "border-[#E8592F] bg-[#E8592F]/10" 
                      : "border-white/5 hover:border-white/15 bg-white/[0.02]"}`}
                  title={model.description}
                >
                  <img 
                    src={model.photo} 
                    alt={model.name}
                    className="w-full h-12 object-contain mb-1"
                  />
                  <span className="text-[10px] text-zinc-500 line-clamp-1">{model.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right: Control Panel */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
          <ControlTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
            
            {/* PAINT TAB */}
            {activeTab === "paint" && (
              <>
                {/* Color Wheel — main color selector */}
                <div data-testid="paint-color-section">
                  <label className="block text-sm text-zinc-400 mb-3">Paint Color</label>
                  <ColorWheel value={truckState.primaryColor} onChange={(hex) => selectColor(hex)} />
                </div>

                {/* Quick Palette Presets */}
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Preset Palettes</label>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {Object.entries(COLOR_PALETTES).filter(([k]) => k !== "custom").map(([key, palette]) => (
                      <button
                        key={key}
                        onClick={() => setActivePalette(key)}
                        className={`px-2.5 py-1 text-[11px] rounded-full border transition-colors
                          ${activePalette === key
                            ? "border-[#E8592F] bg-[#E8592F]/20 text-[#E8592F]"
                            : "border-white/10 text-zinc-400 hover:border-white/20"}`}
                        data-testid={`palette-${key}`}
                      >
                        {palette.name}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_PALETTES[activePalette]?.colors.map(color => (
                      <ColorSwatch
                        key={color.hex}
                        color={color}
                        isSelected={truckState.primaryColor === color.hex}
                        onClick={() => selectColor(color.hex)}
                      />
                    ))}
                  </div>
                  {/* Recent Colors */}
                  {recentColors.length > 0 && (
                    <div className="mt-3">
                      <label className="block text-xs text-zinc-500 mb-1.5">Recent</label>
                      <div className="flex gap-1.5">
                        {recentColors.map(hex => (
                          <button
                            key={hex}
                            onClick={() => selectColor(hex)}
                            className={`w-7 h-7 rounded-full border transition-all
                              ${truckState.primaryColor === hex ? "border-[#E8592F] scale-110" : "border-white/10 hover:border-white/20"}`}
                            style={{ backgroundColor: hex }}
                            data-testid={`recent-color-${hex}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Finish Type */}
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Finish Type</label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {Object.entries(FINISH_TYPES).map(([key, finish]) => (
                      <button
                        key={key}
                        onClick={() => updateState({ finish: key })}
                        className={`p-2 rounded-lg border text-center transition-all
                          ${truckState.finish === key 
                            ? "border-[#E8592F] bg-[#E8592F]/10" 
                            : "border-white/10 hover:border-white/15"}`}
                        title={finish.description}
                      >
                        <span className="text-xs text-zinc-300">{finish.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Two-Tone Toggle */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm text-zinc-400">Two-Tone Paint</label>
                    <button
                      onClick={() => updateState({ twoToneEnabled: !truckState.twoToneEnabled })}
                      className={`relative w-12 h-6 rounded-full transition-colors
                        ${truckState.twoToneEnabled ? "bg-[#E8592F]" : "bg-zinc-700"}`}
                    >
                      <span 
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                          ${truckState.twoToneEnabled ? "left-7" : "left-1"}`}
                      />
                    </button>
                  </div>
                  
                  {truckState.twoToneEnabled && (
                    <div className="space-y-3 pl-4 border-l-2 border-[#E8592F]/30">
                      {/* Secondary Color */}
                      <div>
                        <label className="block text-xs text-zinc-500 mb-2">Secondary Color</label>
                        <div className="flex flex-wrap gap-2">
                          {COLOR_PALETTES[activePalette]?.colors.map(color => (
                            <ColorSwatch
                              key={color.hex}
                              color={color}
                              size="sm"
                              isSelected={truckState.secondaryColor === color.hex}
                              onClick={() => selectColor(color.hex, true)}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Split Pattern */}
                      <div>
                        <label className="block text-xs text-zinc-500 mb-2">Split Pattern</label>
                        <div className="grid grid-cols-4 gap-2">
                          {Object.entries(TWO_TONE_SPLITS).map(([key, split]) => (
                            <button
                              key={key}
                              onClick={() => updateState({ twoToneSplit: key })}
                              className={`p-2 rounded-lg border text-center
                                ${truckState.twoToneSplit === key 
                                  ? "border-[#E8592F] bg-[#E8592F]/10" 
                                  : "border-white/10 hover:border-white/15"}`}
                              title={split.description}
                            >
                              <span className="text-[10px] text-zinc-400">{split.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {/* WRAPS TAB */}
            {activeTab === "wraps" && (
              <>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Wrap Pattern</label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(WRAP_PATTERNS).map(([key, pattern]) => (
                      <button
                        key={key}
                        onClick={() => updateState({ wrapPattern: key })}
                        className={`p-3 rounded-lg border text-center transition-all
                          ${truckState.wrapPattern === key 
                            ? "border-[#E8592F] bg-[#E8592F]/10" 
                            : "border-white/10 hover:border-white/15"}`}
                      >
                        <div 
                          className="w-full h-8 rounded mb-2 bg-zinc-700"
                          style={{ 
                            background: pattern.css || "#374151",
                            backgroundSize: pattern.size || "auto"
                          }}
                        />
                        <span className="text-xs text-zinc-300">{pattern.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {truckState.wrapPattern !== "none" && (
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Wrap Opacity: {Math.round(truckState.wrapOpacity * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={truckState.wrapOpacity}
                      onChange={(e) => updateState({ wrapOpacity: parseFloat(e.target.value) })}
                      className="w-full accent-[#E8592F]"
                    />
                  </div>
                )}
              </>
            )}
            
            {/* LETTERING TAB */}
            {activeTab === "lettering" && (
              <>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Business Name</label>
                  <input
                    type="text"
                    value={truckState.businessName}
                    onChange={(e) => updateState({ businessName: e.target.value.slice(0, 28) })}
                    placeholder="Enter your business name"
                    className="w-full px-4 py-3 bg-white/[0.06] border border-white/10 rounded-lg text-white focus:border-[#E8592F] focus:outline-none"
                    maxLength={28}
                  />
                  <span className="text-xs text-zinc-500">{truckState.businessName.length}/28</span>
                </div>
                
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Font Style</label>
                  <div className="grid grid-cols-5 gap-2">
                    {Object.entries(LETTERING_FONTS).map(([key, font]) => (
                      <button
                        key={key}
                        onClick={() => updateState({ letteringFont: key })}
                        className={`p-2 rounded-lg border text-center
                          ${truckState.letteringFont === key 
                            ? "border-[#E8592F] bg-[#E8592F]/10" 
                            : "border-white/10 hover:border-white/15"}`}
                      >
                        <span 
                          className="text-sm text-zinc-300"
                          style={{ fontFamily: font.fontFamily }}
                        >
                          {font.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Text Color</label>
                  <div className="flex flex-wrap gap-2">
                    {["#FFFFFF", "#000000", "#E8592F", "#FFD700", "#FF0000", "#00FF00", "#0000FF", "#FF00FF"].map(hex => (
                      <button
                        key={hex}
                        onClick={() => updateState({ letteringColor: hex })}
                        className={`w-8 h-8 rounded-full border-2 transition-all
                          ${truckState.letteringColor === hex ? "border-[#E8592F] scale-110" : "border-white/10"}`}
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Text Size: {["XS", "S", "M", "L", "XL"][truckState.letteringSize - 1]}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={truckState.letteringSize}
                    onChange={(e) => updateState({ letteringSize: parseInt(e.target.value) })}
                    className="w-full accent-[#E8592F]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Text Outline</label>
                  <div className="flex gap-2">
                    {[["none", "None"], ["thin", "Thin"], ["bold", "Bold"]].map(([value, label]) => (
                      <button
                        key={value}
                        onClick={() => updateState({ letteringOutline: value })}
                        className={`flex-1 py-2 rounded-lg border text-sm
                          ${truckState.letteringOutline === value 
                            ? "border-[#E8592F] bg-[#E8592F]/10 text-[#E8592F]" 
                            : "border-white/10 text-zinc-400 hover:border-white/15"}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {/* LOGO TAB */}
            {activeTab === "logo" && (
              <>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Upload Logo</label>
                  {!truckState.logoUrl ? (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-lg cursor-pointer hover:border-[#E8592F] transition-colors">
                      <Upload className="w-8 h-8 text-zinc-500 mb-2" />
                      <span className="text-sm text-zinc-500">PNG, SVG, WebP (max 5MB)</span>
                      <input
                        type="file"
                        accept=".png,.svg,.webp"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="relative">
                      <img 
                        src={truckState.logoUrl} 
                        alt="Logo preview" 
                        className="w-full h-32 object-contain bg-white/[0.06] rounded-lg"
                      />
                      <button
                        onClick={() => updateState({ logoUrl: null })}
                        className="absolute top-2 right-2 p-1 bg-red-600 rounded-full"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  )}
                </div>
                
                {truckState.logoUrl && (
                  <>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">
                        Scale: {truckState.logoScale.toFixed(1)}x
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={truckState.logoScale}
                        onChange={(e) => updateState({ logoScale: parseFloat(e.target.value) })}
                        className="w-full accent-[#E8592F]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">
                        Rotation: {truckState.logoRotation}°
                      </label>
                      <input
                        type="range"
                        min="-45"
                        max="45"
                        value={truckState.logoRotation}
                        onChange={(e) => updateState({ logoRotation: parseInt(e.target.value) })}
                        className="w-full accent-[#E8592F]"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Position X: {truckState.logoX}%
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="90"
                          value={truckState.logoX}
                          onChange={(e) => updateState({ logoX: parseInt(e.target.value) })}
                          className="w-full accent-[#E8592F]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Position Y: {truckState.logoY}%
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="90"
                          value={truckState.logoY}
                          onChange={(e) => updateState({ logoY: parseInt(e.target.value) })}
                          className="w-full accent-[#E8592F]"
                        />
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
            
            {/* EXTRAS TAB */}
            {activeTab === "extras" && (
              <>
                {/* Awning */}
                <div className="p-4 bg-white/[0.04] rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-zinc-300">Awning / Canopy</span>
                    <button
                      onClick={() => updateState({ awningEnabled: !truckState.awningEnabled })}
                      className={`relative w-12 h-6 rounded-full transition-colors
                        ${truckState.awningEnabled ? "bg-[#E8592F]" : "bg-zinc-700"}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                        ${truckState.awningEnabled ? "left-7" : "left-1"}`} />
                    </button>
                  </div>
                  {truckState.awningEnabled && (
                    <div className="space-y-3 pt-3 border-t border-white/10">
                      <div className="flex gap-2">
                        {["solid", "striped", "scalloped"].map(style => (
                          <button
                            key={style}
                            onClick={() => updateState({ awningStyle: style })}
                            className={`flex-1 py-1 text-xs rounded border
                              ${truckState.awningStyle === style ? "border-[#E8592F] text-[#E8592F]" : "border-white/10 text-zinc-400"}`}
                          >
                            {style.charAt(0).toUpperCase() + style.slice(1)}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500">Color:</span>
                        <input
                          type="color"
                          value={truckState.awningColor}
                          onChange={(e) => updateState({ awningColor: e.target.value })}
                          className="w-8 h-8 rounded cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* LED Lights */}
                <div className="p-4 bg-white/[0.04] rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-zinc-300">LED Underglow</span>
                    <button
                      onClick={() => updateState({ lightsEnabled: !truckState.lightsEnabled })}
                      className={`relative w-12 h-6 rounded-full transition-colors
                        ${truckState.lightsEnabled ? "bg-[#E8592F]" : "bg-zinc-700"}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                        ${truckState.lightsEnabled ? "left-7" : "left-1"}`} />
                    </button>
                  </div>
                  {truckState.lightsEnabled && (
                    <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                      <span className="text-xs text-zinc-500">Color:</span>
                      <input
                        type="color"
                        value={truckState.lightsColor}
                        onChange={(e) => updateState({ lightsColor: e.target.value })}
                        className="w-8 h-8 rounded cursor-pointer"
                      />
                    </div>
                  )}
                </div>
                
                {/* Roof Signage */}
                <div className="p-4 bg-white/[0.04] rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-zinc-300">Roof Signage</span>
                    <button
                      onClick={() => updateState({ signageEnabled: !truckState.signageEnabled })}
                      className={`relative w-12 h-6 rounded-full transition-colors
                        ${truckState.signageEnabled ? "bg-[#E8592F]" : "bg-zinc-700"}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                        ${truckState.signageEnabled ? "left-7" : "left-1"}`} />
                    </button>
                  </div>
                  {truckState.signageEnabled && (
                    <div className="flex items-center gap-4 pt-3 border-t border-white/10">
                      <label className="flex items-center gap-2 text-xs text-zinc-400">
                        <input
                          type="checkbox"
                          checked={truckState.signageIlluminated}
                          onChange={(e) => updateState({ signageIlluminated: e.target.checked })}
                          className="accent-[#E8592F]"
                        />
                        Illuminated
                      </label>
                    </div>
                  )}
                </div>
                
                {/* Racing Stripe */}
                <div className="p-4 bg-white/[0.04] rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-zinc-300">Racing Stripe</span>
                    <button
                      onClick={() => updateState({ racingStripeEnabled: !truckState.racingStripeEnabled })}
                      className={`relative w-12 h-6 rounded-full transition-colors
                        ${truckState.racingStripeEnabled ? "bg-[#E8592F]" : "bg-zinc-700"}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                        ${truckState.racingStripeEnabled ? "left-7" : "left-1"}`} />
                    </button>
                  </div>
                  {truckState.racingStripeEnabled && (
                    <div className="space-y-3 pt-3 border-t border-white/10">
                      <div className="flex gap-2">
                        {["thin", "medium", "bold"].map(width => (
                          <button
                            key={width}
                            onClick={() => updateState({ racingStripeWidth: width })}
                            className={`flex-1 py-1 text-xs rounded border
                              ${truckState.racingStripeWidth === width ? "border-[#E8592F] text-[#E8592F]" : "border-white/10 text-zinc-400"}`}
                          >
                            {width.charAt(0).toUpperCase() + width.slice(1)}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500">Color:</span>
                        <input
                          type="color"
                          value={truckState.racingStripeColor}
                          onChange={(e) => updateState({ racingStripeColor: e.target.value })}
                          className="w-8 h-8 rounded cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {/* PHOTO TAB */}
            {activeTab === "photo" && (
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Upload Your Own Truck Photo</label>
                <p className="text-xs text-zinc-500 mb-4">
                  Upload a photo of your actual truck to preview custom paint on it. 
                  Works best with light-colored trucks on a plain background.
                </p>
                {!truckState.userPhotoUrl ? (
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/10 rounded-lg cursor-pointer hover:border-[#E8592F] transition-colors">
                    <Camera className="w-10 h-10 text-zinc-500 mb-2" />
                    <span className="text-sm text-zinc-500">JPG, PNG, WebP (max 10MB)</span>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 10 * 1024 * 1024) {
                            toast.error("Photo must be under 10MB");
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            updateState({ userPhotoUrl: e.target?.result });
                            toast.success("Photo uploaded!");
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img 
                        src={truckState.userPhotoUrl} 
                        alt="Your truck" 
                        className="w-full h-40 object-contain bg-white/[0.06] rounded-lg"
                      />
                      <button
                        onClick={() => updateState({ userPhotoUrl: null })}
                        className="absolute top-2 right-2 p-1 bg-red-600 rounded-full"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <button
                      onClick={() => updateState({ userPhotoUrl: null })}
                      className="w-full py-2 border border-white/10 text-zinc-400 rounded-lg hover:border-white/20"
                    >
                      Use Model Truck Instead
                    </button>
                  </div>
                )}
              </div>
            )}
            
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default PaintShop;
