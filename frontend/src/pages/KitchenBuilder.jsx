import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Truck, Save, ArrowLeft, Search, AlertTriangle, CheckCircle, 
  Loader2, Trash2, RotateCw, ZoomIn, ZoomOut, Layers, Grid3X3,
  Flame, Snowflake, Wrench, Droplets, Wind, Coffee, UtensilsCrossed, Zap,
  FileText, Eye, Download
} from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { apiClient } from "@/lib/api";

// ============================================================================
// EQUIPMENT CATALOG
// ============================================================================
const equipmentCatalog = {
  "Cooking": [
    { id: "griddle_24", name: "24\" Flat Top Griddle", w: 24, d: 24, cost: 1200, icon: "🔥" },
    { id: "griddle_36", name: "36\" Flat Top Griddle", w: 36, d: 24, cost: 1600, icon: "🔥" },
    { id: "griddle_48", name: "48\" Flat Top Griddle", w: 48, d: 24, cost: 2200, icon: "🔥" },
    { id: "fryer_single", name: "Single Fryer", w: 14, d: 16, cost: 800, icon: "🍟" },
    { id: "fryer_double", name: "Double Fryer", w: 24, d: 16, cost: 1400, icon: "🍟" },
    { id: "charbroiler_24", name: "24\" Charbroiler", w: 24, d: 24, cost: 1100, icon: "🥩" },
    { id: "charbroiler_36", name: "36\" Charbroiler", w: 36, d: 24, cost: 1500, icon: "🥩" },
    { id: "range_2burner", name: "2-Burner Range", w: 12, d: 24, cost: 600, icon: "🔥" },
    { id: "range_4burner", name: "4-Burner Range", w: 24, d: 24, cost: 900, icon: "🔥" },
    { id: "range_6burner", name: "6-Burner Range", w: 36, d: 24, cost: 1300, icon: "🔥" },
    { id: "convection_half", name: "Convection Oven (Half)", w: 24, d: 24, cost: 2500, icon: "🌡️" },
    { id: "convection_full", name: "Convection Oven (Full)", w: 36, d: 36, cost: 4000, icon: "🌡️" },
    { id: "pizza_deck", name: "Pizza Deck Oven", w: 36, d: 36, cost: 3500, icon: "🍕" },
    { id: "microwave", name: "Commercial Microwave", w: 18, d: 18, cost: 500, icon: "📡" },
  ],
  "Refrigeration": [
    { id: "undercounter_fridge_1", name: "Under-Counter Fridge (1-Door)", w: 27, d: 24, cost: 1800, icon: "❄️" },
    { id: "undercounter_fridge_2", name: "Under-Counter Fridge (2-Door)", w: 48, d: 24, cost: 2800, icon: "❄️" },
    { id: "undercounter_freezer", name: "Under-Counter Freezer", w: 27, d: 24, cost: 2200, icon: "🧊" },
    { id: "sandwich_prep_48", name: "Sandwich Prep Table (48\")", w: 48, d: 30, cost: 2400, icon: "🥪" },
    { id: "sandwich_prep_60", name: "Sandwich Prep Table (60\")", w: 60, d: 30, cost: 2900, icon: "🥪" },
    { id: "pizza_prep", name: "Pizza Prep Table (67\")", w: 67, d: 30, cost: 3200, icon: "🍕" },
    { id: "display_case", name: "Refrigerated Display Case", w: 36, d: 24, cost: 1600, icon: "🧁" },
    { id: "ice_bin", name: "Ice Bin (Drop-In)", w: 18, d: 18, cost: 400, icon: "🧊" },
    { id: "ice_machine", name: "Ice Machine (Under-Counter)", w: 24, d: 24, cost: 2000, icon: "🧊" },
  ],
  "Prep & Tables": [
    { id: "table_24", name: "Work Table (24×24)", w: 24, d: 24, cost: 200, icon: "🔲" },
    { id: "table_36", name: "Work Table (36×24)", w: 36, d: 24, cost: 280, icon: "🔲" },
    { id: "table_48", name: "Work Table (48×24)", w: 48, d: 24, cost: 350, icon: "🔲" },
    { id: "table_72", name: "Work Table (72×24)", w: 72, d: 24, cost: 450, icon: "🔲" },
    { id: "shelf_wall", name: "Wall-Mount Shelf (36\")", w: 36, d: 12, cost: 150, icon: "📦" },
    { id: "sheet_rack", name: "Sheet Pan Rack", w: 20, d: 26, cost: 300, icon: "🍳" },
    { id: "wire_shelf", name: "Wire Shelving Unit", w: 36, d: 18, cost: 200, icon: "📚" },
  ],
  "Sinks & Plumbing": [
    { id: "sink_3comp", name: "3-Compartment Sink", w: 60, d: 24, cost: 1200, required: true, icon: "🚰" },
    { id: "sink_hand", name: "Hand Wash Sink", w: 14, d: 10, cost: 300, required: true, icon: "🧼" },
    { id: "water_heater", name: "Hot Water Heater (6-Gal)", w: 12, d: 12, cost: 400, icon: "🔥" },
    { id: "water_tank_fresh", name: "Fresh Water Tank (50-Gal)", w: 24, d: 24, cost: 500, icon: "💧" },
    { id: "water_tank_gray", name: "Gray Water Tank (50-Gal)", w: 24, d: 24, cost: 500, icon: "💧" },
  ],
  "Ventilation": [
    { id: "hood_4ft", name: "Exhaust Hood (4')", w: 48, d: 30, cost: 2500, icon: "💨" },
    { id: "hood_6ft", name: "Exhaust Hood (6')", w: 72, d: 30, cost: 3200, icon: "💨" },
    { id: "hood_8ft", name: "Exhaust Hood (8')", w: 96, d: 30, cost: 4000, icon: "💨" },
    { id: "fire_ext", name: "Fire Extinguisher (K-Class)", w: 8, d: 8, cost: 150, required: true, icon: "🧯" },
  ],
  "Beverage": [
    { id: "espresso", name: "Espresso Machine (2-Group)", w: 24, d: 24, cost: 6000, icon: "☕" },
    { id: "coffee_brewer", name: "Pour-Over Coffee Brewer", w: 18, d: 18, cost: 800, icon: "☕" },
    { id: "tea_dispenser", name: "Iced Tea Dispenser", w: 12, d: 12, cost: 200, icon: "🧊" },
    { id: "fountain", name: "Fountain Drink (6-Valve)", w: 24, d: 24, cost: 3500, icon: "🥤" },
    { id: "smoothie", name: "Smoothie Machine (Dual)", w: 18, d: 18, cost: 1800, icon: "🍹" },
    { id: "soft_serve", name: "Soft-Serve Machine", w: 24, d: 30, cost: 4500, icon: "🍦" },
  ],
  "Serving": [
    { id: "heat_lamp", name: "Heat Lamp Station", w: 36, d: 18, cost: 400, icon: "💡" },
    { id: "warming_drawer", name: "Warming Drawer", w: 24, d: 24, cost: 600, icon: "🔥" },
    { id: "hot_cabinet", name: "Hot Holding Cabinet", w: 24, d: 24, cost: 1200, icon: "🔥" },
    { id: "steam_table", name: "Steam Table (4-Well)", w: 48, d: 24, cost: 1500, icon: "🍲" },
    { id: "pos_terminal", name: "POS Terminal Stand", w: 16, d: 16, cost: 300, icon: "💳" },
    { id: "ticket_rail", name: "Order Ticket Rail", w: 36, d: 4, cost: 50, icon: "📋" },
  ],
};

// Floor plan dimensions based on truck model (in inches)
const truckInteriors = {
  step_van_classic: { width: 168, depth: 84, name: "Step Van Classic" },
  step_van_modern: { width: 192, depth: 84, name: "Step Van Modern" },
  cargo_van: { width: 120, depth: 66, name: "Cargo Van" },
  trailer: { width: 192, depth: 84, name: "Food Trailer" },
  flatbed: { width: 168, depth: 90, name: "Flatbed Build-Out" },
  vintage: { width: 120, depth: 72, name: "Vintage / Retro" },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const KitchenBuilder = () => {
  const [truckModel, setTruckModel] = useState("step_van_classic");
  const [placedEquipment, setPlacedEquipment] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Cooking");
  const [isSaving, setIsSaving] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [showValidation, setShowValidation] = useState(false);
  
  const floorPlanRef = useRef(null);
  const interior = truckInteriors[truckModel];
  const GRID_SIZE = 6; // 6-inch grid

  // Calculate total cost
  const totalCost = placedEquipment.reduce((sum, item) => {
    const catalogItem = Object.values(equipmentCatalog).flat().find(e => e.id === item.equipmentId);
    return sum + (catalogItem?.cost || 0);
  }, 0);

  // Calculate space utilization
  const totalArea = interior.width * interior.depth;
  const usedArea = placedEquipment.reduce((sum, item) => {
    const catalogItem = Object.values(equipmentCatalog).flat().find(e => e.id === item.equipmentId);
    return sum + ((catalogItem?.w || 0) * (catalogItem?.d || 0));
  }, 0);
  const utilization = Math.round((usedArea / totalArea) * 100);

  // Validate layout
  const validateLayout = () => {
    const issues = [];
    const allEquipment = Object.values(equipmentCatalog).flat();
    
    // Check required items
    const requiredItems = allEquipment.filter(e => e.required);
    requiredItems.forEach(req => {
      const hasItem = placedEquipment.some(p => p.equipmentId === req.id);
      if (!hasItem) {
        issues.push({ type: "error", message: `Missing required: ${req.name}` });
      }
    });
    
    // Check for exhaust hood over cooking equipment
    const cookingItems = placedEquipment.filter(p => {
      const item = allEquipment.find(e => e.id === p.equipmentId);
      return item && (p.equipmentId.includes("griddle") || p.equipmentId.includes("fryer") || p.equipmentId.includes("charbroiler") || p.equipmentId.includes("range"));
    });
    const hasHood = placedEquipment.some(p => p.equipmentId.includes("hood"));
    if (cookingItems.length > 0 && !hasHood) {
      issues.push({ type: "warning", message: "Cooking equipment should be under exhaust hood" });
    }
    
    return issues;
  };

  const validationIssues = validateLayout();

  // Handle drag start from catalog
  const handleDragStart = (equipment) => {
    setDraggedItem(equipment);
  };

  // Handle drop on floor plan
  const handleDrop = (e) => {
    if (!draggedItem || !floorPlanRef.current) return;
    
    const rect = floorPlanRef.current.getBoundingClientRect();
    const scale = interior.width / rect.width;
    
    let x = Math.round(((e.clientX - rect.left) * scale) / GRID_SIZE) * GRID_SIZE;
    let y = Math.round(((e.clientY - rect.top) * scale) / GRID_SIZE) * GRID_SIZE;
    
    // Keep within bounds
    x = Math.max(0, Math.min(x, interior.width - draggedItem.w));
    y = Math.max(0, Math.min(y, interior.depth - draggedItem.d));
    
    // Check for collisions
    const hasCollision = placedEquipment.some(item => {
      const itemData = Object.values(equipmentCatalog).flat().find(e => e.id === item.equipmentId);
      if (!itemData) return false;
      return !(x + draggedItem.w <= item.x || x >= item.x + itemData.w ||
               y + draggedItem.d <= item.y || y >= item.y + itemData.d);
    });
    
    if (hasCollision) {
      toast.error("Collision detected!", { description: "Equipment cannot overlap." });
      setDraggedItem(null);
      return;
    }
    
    const newItem = {
      id: `${draggedItem.id}_${Date.now()}`,
      equipmentId: draggedItem.id,
      x,
      y,
      rotation: 0,
    };
    
    setPlacedEquipment([...placedEquipment, newItem]);
    toast.success(`${draggedItem.name} placed!`);
    setDraggedItem(null);
  };

  // Delete selected item
  const handleDelete = () => {
    if (!selectedItem) return;
    setPlacedEquipment(placedEquipment.filter(item => item.id !== selectedItem));
    setSelectedItem(null);
    toast.info("Equipment removed");
  };

  // Rotate selected item
  const handleRotate = () => {
    if (!selectedItem) return;
    setPlacedEquipment(placedEquipment.map(item => {
      if (item.id === selectedItem) {
        return { ...item, rotation: (item.rotation + 90) % 360 };
      }
      return item;
    }));
  };

  // Save layout
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await apiClient.saveScaledBatch({
        recipe_name: `Kitchen Layout - ${interior.name}`,
        target_servings: 0,
        total_batch_cost: totalCost,
        cost_per_unit: 0,
        prep_time_hours: 0,
        ingredients: placedEquipment.map(item => ({
          id: item.id,
          equipmentId: item.equipmentId,
          x: item.x,
          y: item.y,
          rotation: item.rotation,
        })),
      });
      toast.success("Layout saved!", { description: "Your kitchen configuration has been saved." });
    } catch (error) {
      toast.error("Failed to save", { description: "Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  // Filter equipment by search
  const filteredEquipment = Object.entries(equipmentCatalog).reduce((acc, [category, items]) => {
    const filtered = items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {});

  // Category icons
  const categoryIcons = {
    "Cooking": Flame,
    "Refrigeration": Snowflake,
    "Prep & Tables": Wrench,
    "Sinks & Plumbing": Droplets,
    "Ventilation": Wind,
    "Beverage": Coffee,
    "Serving": UtensilsCrossed,
  };

  return (
    <div className="min-h-screen bg-[#0f0f14] text-white font-sans">
      <SEO 
        title="Kitchen Builder - Equipment Layout"
        description="Design your food truck kitchen layout. Drag and drop commercial equipment, check compliance, and optimize your workspace."
        url="/kitchen-builder"
      />
      
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0f0f14]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-[#E8592F]">
              <Truck className="w-8 h-8" />
            </Link>
            <div>
              <h1 className="text-xl font-bold uppercase tracking-wide">Kitchen Builder</h1>
              <p className="text-xs text-white/50 uppercase tracking-widest">Interior Layout v2.0</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/paint-shop" className="text-white/60 hover:text-white text-sm font-medium transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Paint Shop
            </Link>
            <span className="text-[#E8592F] text-sm font-bold border-b-2 border-[#E8592F] pb-1">Kitchen Builder</span>
            <Link to="/" className="text-white/60 hover:text-white text-sm font-medium transition-colors">Dashboard</Link>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowValidation(!showValidation)}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
                validationIssues.length > 0 
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" 
                  : "bg-green-500/20 text-green-400 border border-green-500/30"
              }`}
            >
              {validationIssues.length > 0 ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
              {validationIssues.length} Issues
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2.5 bg-[#E8592F] rounded-lg text-sm font-bold uppercase tracking-wide hover:bg-[#E8592F]/90 transition-all flex items-center gap-2 disabled:opacity-50"
              data-testid="save-layout-btn"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSaving ? "Saving..." : "Save Layout"}
            </button>
          </div>
        </div>
      </header>

      <div className="flex max-w-[1800px] mx-auto">
        {/* Left Panel - Equipment Catalog */}
        <aside className="w-[320px] border-r border-white/10 h-[calc(100vh-73px)] overflow-y-auto custom-scrollbar bg-[#111118]">
          {/* Search */}
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search equipment..."
                className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#E8592F]"
              />
            </div>
          </div>
          
          {/* Category tabs */}
          <div className="p-4 border-b border-white/10">
            <div className="flex flex-wrap gap-1">
              {Object.keys(equipmentCatalog).map(cat => {
                const Icon = categoryIcons[cat] || Zap;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2 py-1.5 text-[10px] font-bold uppercase rounded flex items-center gap-1 transition-all ${
                      activeCategory === cat ? "bg-[#E8592F] text-white" : "bg-white/10 text-white/60 hover:bg-white/20"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {cat.split(" ")[0]}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Equipment list */}
          <div className="p-4 space-y-2">
            {(searchTerm ? Object.values(filteredEquipment).flat() : equipmentCatalog[activeCategory] || []).map(item => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item)}
                className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-grab hover:border-[#E8592F]/50 hover:bg-white/10 transition-all group"
                data-testid={`equipment-${item.id}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{item.name}</p>
                    <p className="text-[10px] text-white/50">{item.w}" × {item.d}"</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#E8592F]">${item.cost.toLocaleString()}</p>
                    {item.required && (
                      <span className="text-[8px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded uppercase font-bold">Required</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Floor Plan Area */}
        <main className="flex-1 h-[calc(100vh-73px)] bg-[#0a0a0e] relative overflow-hidden">
          {/* Toolbar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              {/* Truck model selector */}
              <select
                value={truckModel}
                onChange={(e) => {
                  setTruckModel(e.target.value);
                  setPlacedEquipment([]);
                }}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#E8592F]"
              >
                {Object.entries(truckInteriors).map(([id, info]) => (
                  <option key={id} value={id}>{info.name} ({info.width/12}' × {info.depth/12}')</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              {selectedItem && (
                <>
                  <button
                    onClick={handleRotate}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                    title="Rotate 90°"
                  >
                    <RotateCw className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </>
              )}
              <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
                <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="p-1.5 hover:bg-white/10 rounded">
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs w-12 text-center">{Math.round(zoom * 100)}%</span>
                <button onClick={() => setZoom(Math.min(2, zoom + 0.1))} className="p-1.5 hover:bg-white/10 rounded">
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Floor Plan */}
          <div 
            className="absolute inset-0 flex items-center justify-center p-20"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <div
              ref={floorPlanRef}
              className="relative bg-[#1a1a2e] border-4 border-white/20 rounded-lg shadow-2xl"
              style={{
                width: `${interior.width * 2.5 * zoom}px`,
                height: `${interior.depth * 2.5 * zoom}px`,
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                `,
                backgroundSize: `${GRID_SIZE * 2.5 * zoom}px ${GRID_SIZE * 2.5 * zoom}px`,
              }}
              data-testid="floor-plan"
            >
              {/* Serving Window indicator */}
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 bg-sky-500/30 border-2 border-sky-500 rounded-b-lg flex items-center justify-center text-sky-400 text-xs font-bold"
                style={{
                  width: `${60 * 2.5 * zoom}px`,
                  height: `${12 * 2.5 * zoom}px`,
                }}
              >
                SERVING WINDOW
              </div>
              
              {/* Rear door indicator */}
              <div 
                className="absolute bottom-0 right-4 bg-amber-500/30 border-2 border-amber-500 rounded-t-lg flex items-center justify-center text-amber-400 text-xs font-bold"
                style={{
                  width: `${30 * 2.5 * zoom}px`,
                  height: `${8 * 2.5 * zoom}px`,
                }}
              >
                DOOR
              </div>

              {/* Placed Equipment */}
              {placedEquipment.map(item => {
                const equipData = Object.values(equipmentCatalog).flat().find(e => e.id === item.equipmentId);
                if (!equipData) return null;
                
                const isSelected = selectedItem === item.id;
                const isRotated = item.rotation === 90 || item.rotation === 270;
                const displayW = isRotated ? equipData.d : equipData.w;
                const displayD = isRotated ? equipData.w : equipData.d;
                
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(isSelected ? null : item.id)}
                    className={`absolute cursor-pointer transition-all ${
                      isSelected ? "ring-2 ring-[#E8592F] z-10" : "hover:ring-2 hover:ring-white/50"
                    }`}
                    style={{
                      left: `${item.x * 2.5 * zoom}px`,
                      top: `${item.y * 2.5 * zoom}px`,
                      width: `${displayW * 2.5 * zoom}px`,
                      height: `${displayD * 2.5 * zoom}px`,
                      transform: `rotate(${item.rotation}deg)`,
                      transformOrigin: 'top left',
                    }}
                  >
                    <div className="w-full h-full bg-[#2a2a3e] border border-white/30 rounded flex flex-col items-center justify-center p-1">
                      <span className="text-lg">{equipData.icon}</span>
                      <span className="text-[8px] text-white/70 text-center leading-tight truncate w-full">{equipData.name.split(" ")[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Validation Panel */}
          {showValidation && validationIssues.length > 0 && (
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-4">
              <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Layout Issues
              </h3>
              <div className="space-y-1">
                {validationIssues.map((issue, i) => (
                  <div key={i} className={`text-xs flex items-center gap-2 ${
                    issue.type === "error" ? "text-red-400" : "text-amber-400"
                  }`}>
                    {issue.type === "error" ? "❌" : "⚠️"} {issue.message}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Right Panel - Summary */}
        <aside className="w-[280px] border-l border-white/10 h-[calc(100vh-73px)] overflow-y-auto custom-scrollbar bg-[#111118] p-5">
          {/* Space Stats */}
          <div className="mb-6">
            <h3 className="text-xs text-white/50 uppercase tracking-widest font-bold mb-3">Space Utilization</h3>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex justify-between items-end mb-2">
                <span className="text-4xl font-black text-[#E8592F]">{utilization}%</span>
                <span className="text-xs text-white/50">of {Math.round(totalArea / 144)} sq ft</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#E8592F] transition-all"
                  style={{ width: `${Math.min(utilization, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Equipment List */}
          <div className="mb-6">
            <h3 className="text-xs text-white/50 uppercase tracking-widest font-bold mb-3">
              Equipment ({placedEquipment.length})
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {placedEquipment.map(item => {
                const equipData = Object.values(equipmentCatalog).flat().find(e => e.id === item.equipmentId);
                if (!equipData) return null;
                return (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedItem(item.id)}
                    className={`p-2 rounded-lg cursor-pointer transition-all ${
                      selectedItem === item.id ? "bg-[#E8592F]/20 border border-[#E8592F]/50" : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{equipData.icon} {equipData.name}</span>
                      <span className="text-xs text-[#E8592F]">${equipData.cost}</span>
                    </div>
                  </div>
                );
              })}
              {placedEquipment.length === 0 && (
                <p className="text-xs text-white/40 text-center py-4">
                  Drag equipment from the catalog to place it on the floor plan
                </p>
              )}
            </div>
          </div>

          {/* Total Cost */}
          <div className="mb-6">
            <h3 className="text-xs text-white/50 uppercase tracking-widest font-bold mb-3">Estimated Cost</h3>
            <div className="bg-[#E8592F]/10 border border-[#E8592F]/30 rounded-lg p-4">
              <p className="text-3xl font-black text-[#E8592F]">${totalCost.toLocaleString()}</p>
              <p className="text-xs text-white/50 mt-1">Equipment only, excludes installation</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={() => toast.info("PDF export coming soon")}
              className="w-full py-3 border border-white/20 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
            >
              <Download className="w-4 h-4" /> Export PDF
            </button>
            <button
              onClick={() => toast.info("Quote request coming soon")}
              className="w-full py-3 bg-[#E8592F] rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#E8592F]/90 transition-all"
            >
              <FileText className="w-4 h-4" /> Get Quote
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default KitchenBuilder;
