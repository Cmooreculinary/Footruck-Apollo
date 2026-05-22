import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Truck, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { apiClient } from "@/lib/api";

// ═══════════════════════════════════════════════════════════════
// FTLP SHOWROOM — COMPLETE PRODUCTION BUILD
// All 8 categories, all products, full interactive UI
// ═══════════════════════════════════════════════════════════════

const TIERS = {
  standard: { label: "Standard", color: "#94A3B8", bg: "#94A3B815", desc: "Reliable workhorse. Gets the job done." },
  premium: { label: "Premium", color: "#F4A623", bg: "#F4A62315", desc: "Commercial grade. Built to last." },
  elite: { label: "Elite", color: "#E8592F", bg: "#E8592F15", desc: "Top of the line. Chef's choice." },
};

// ═══════════════════════════════════════════════════════════════
// PRODUCT IMAGES — Photorealistic images for key products
// ═══════════════════════════════════════════════════════════════
const PRODUCT_IMAGES = {};

const CATEGORIES = [
  { id: "chassis", name: "Chassis", icon: "🚛", sub: "Base Vehicle Selection" },
  { id: "cooking", name: "Cooking", icon: "🔥", sub: "Griddles, Fryers, Ovens & More" },
  { id: "refrigeration", name: "Refrigeration", icon: "❄️", sub: "Coolers, Freezers & Prep Tables" },
  { id: "smallwares", name: "Smallwares", icon: "🍳", sub: "Pans, Utensils & Supplies" },
  { id: "hvac", name: "HVAC", icon: "💨", sub: "Hoods, Fans & Climate" },
  { id: "plumbing", name: "Plumbing", icon: "🚿", sub: "Sinks, Tanks & Water" },
  { id: "electrical", name: "Electrical", icon: "⚡", sub: "Power, Panels & Lighting" },
  { id: "serving", name: "Serving & POS", icon: "🏷️", sub: "Windows, Displays & Registers" },
];

// ═══════════════════════════════════════════════════════════════
// COMPLETE PRODUCT DATABASE — ALL 8 CATEGORIES
// ═══════════════════════════════════════════════════════════════

const PRODUCTS = {
  chassis: [
    { id:"ch-1", name:"Ford E-450 Step Van", tier:"standard", price:28500, dims:"14' × 7' interior", specs:["7.3L V8 Gas","GVWR 14,500 lbs","158\" wheelbase"], features:["Automatic transmission","Dual rear wheels","Power steering","AC cab","Walk-through to cab","Roll-up rear door"], popular:true, type:"truck" },
    { id:"ch-2", name:"Freightliner MT-45", tier:"premium", price:42000, dims:"16' × 7' interior", specs:["6.7L Cummins Diesel","GVWR 16,000 lbs","170\" wheelbase"], features:["Cummins diesel reliability","Air brakes","Aluminum body panels","Walk-through cab","Cruise control","Tilt steering"], popular:true, type:"truck" },
    { id:"ch-3", name:"Ford Transit 350 HD", tier:"standard", price:22000, dims:"10' × 5.5' interior", specs:["3.5L EcoBoost V6","GVWR 10,360 lbs","148\" wheelbase"], features:["Best fuel economy","Easy to drive","Fits standard parking","Rear camera","Sliding side door","High roof"], type:"van" },
    { id:"ch-4", name:"Isuzu NPR-HD Cab Forward", tier:"premium", price:38000, dims:"14' × 7.5' interior", specs:["5.2L Diesel","GVWR 14,500 lbs","150\" wheelbase"], features:["Low cab entry","Tight turning radius","Diesel economy","Custom box ready","Tilt cab for service","Dual rear wheels"], type:"truck" },
    { id:"ch-5", name:"Airstream-Style Trailer", tier:"elite", price:55000, dims:"16' × 7' interior", specs:["Towed — no engine","GVWR 7,000 lbs","Tandem axle"], features:["Iconic aluminum look","All-aluminum body","No CDL required","Separate from tow vehicle","Easy to relocate","Premium brand appeal"], popular:true, type:"trailer" },
    { id:"ch-6", name:"Vintage VW-Style Custom", tier:"elite", price:62000, dims:"10' × 6' interior", specs:["Custom powertrain","GVWR 8,500 lbs","Custom wheelbase"], features:["Head-turning design","Full custom build","Instagram magnet","Chrome detail package","Retro interior trim","LED retro lights"], type:"vintage" },
  ],
  cooking: [
    { id:"ck-1", name:'36" Chrome Flat Top Griddle', tier:"premium", price:2850, dims:'36" × 21" × 14"', specs:["90,000 BTU","3/4\" chrome plate","Thermostat control"], features:["Chrome cooking surface","Grease trough w/ drawer","Stainless body","Easy-clean surface","Even heat distribution"], popular:true, type:"griddle" },
    { id:"ck-2", name:'24" Steel Flat Top Griddle', tier:"standard", price:1450, dims:'24" × 21" × 14"', specs:["60,000 BTU","1/2\" steel plate","Manual controls"], features:["Compact footprint","Manual temp control","Easy to clean","Durable steel plate"], type:"griddle" },
    { id:"ck-3", name:"Double Well Deep Fryer", tier:"premium", price:2200, dims:'24" × 18" × 32"', specs:["120,000 BTU","Twin 40-lb capacity","Millivolt ignition"], features:["Twin fry pots","Front drain valves","Stainless baskets included","Safety shutoff","Snap thermostat"], popular:true, type:"fryer" },
    { id:"ck-4", name:"Single Well Countertop Fryer", tier:"standard", price:980, dims:'14" × 16" × 18"', specs:["55,000 BTU","25-lb capacity","Countertop"], features:["Compact size","Includes basket","Snap-action thermostat","Front drain"], type:"fryer" },
    { id:"ck-5", name:"TurboChef Rapid Cook Oven", tier:"elite", price:8500, dims:'26" × 28" × 23"', specs:["Electric 7.2kW","Cooks 12x faster","Ventless"], features:["No hood required","Programmable recipes","Touchscreen controls","Catalytic converter","Compact countertop"], popular:true, type:"oven" },
    { id:"ck-6", name:"Convection Oven — Half Size", tier:"premium", price:3200, dims:'24" × 24" × 30"', specs:["Electric 5.5kW","5 rack positions","Steam injection"], features:["Digital timer","Interior light","Cool-touch door","Stackable design","Even airflow"], type:"oven" },
    { id:"ck-7", name:"4-Burner Gas Range Top", tier:"standard", price:1650, dims:'24" × 28" × 12"', specs:["128,000 BTU total","32K per burner","Cast iron grates"], features:["Heavy cast iron grates","Removable drip trays","Natural or LP gas","Manual controls"], type:"range" },
    { id:"ck-8", name:"High-Power Wok Burner", tier:"premium", price:1900, dims:'16" × 20" × 12"', specs:["100,000 BTU","Single ring","Waterproof ignition"], features:["Extreme heat output","Wok ring included","Cast iron body","LP or NG compatible"], type:"range" },
    { id:"ck-9", name:"Wood-Fired Pizza Oven", tier:"elite", price:12000, dims:'48" × 36" × 24"', specs:["900°F+ capable","Refractory brick","90-sec cook"], features:["Authentic Neapolitan","Brick dome interior","Stainless facade","Insulated chimney","LP-assist ignition","Stunning centerpiece"], popular:true, type:"oven" },
    { id:"ck-10", name:"Conveyor Pizza Oven", tier:"premium", price:5800, dims:'55" × 32" × 20"', specs:["Electric 6.2kW","18\" belt","Stackable"], features:["Consistent quality","High throughput","Digital speed/temp","Woven mesh belt","Easy clean"], type:"oven" },
    { id:"ck-11", name:"Salamander Broiler", tier:"premium", price:1800, dims:'24" × 16" × 18"', specs:["30,000 BTU","Adjustable rack","Wall-mount"], features:["Overhead broiling","Adjustable height rack","Cheese melting","Finishing and browning","Compact wall-mount"], type:"grill" },
    { id:"ck-12", name:'Roller Grill — 24"', tier:"standard", price:650, dims:'24" × 18" × 12"', specs:["Electric 1.4kW","10 roller capacity","Non-stick"], features:["Hot dog staple","Non-stick rollers","Dual zone control","Sneeze guard included","Easy clean drip tray"], type:"grill" },
  ],
  refrigeration: [
    { id:"rf-1", name:'48" Sandwich Prep Table', tier:"premium", price:3400, dims:'48" × 30" × 36"', specs:["33–41°F","12 pan slots","Cutting board top"], features:["Refrigerated base","Pans included","Self-closing doors","Digital thermostat","Heavy-duty casters"], popular:true, type:"prep" },
    { id:"rf-2", name:"Under-Counter Fridge — Single", tier:"standard", price:1800, dims:'27" × 30" × 34"', specs:["33–40°F","5.5 cu ft","Front breathing"], features:["Adjustable shelves","Self-closing door","Interior LED","115V plug-in","Compact fit"], type:"fridge" },
    { id:"rf-3", name:"Under-Counter Fridge — Double", tier:"premium", price:2900, dims:'48" × 30" × 34"', specs:["33–40°F","12 cu ft","Digital display"], features:["2 sections","Casters included","Interior LED","Heavy-duty gaskets","Front breathing"], type:"fridge" },
    { id:"rf-4", name:"Chef Base Refrigerated Stand", tier:"elite", price:4200, dims:'48" × 32" × 26"', specs:["33–40°F","2 drawers","500 lb top rating"], features:["Equipment stand on top","Refrigerated drawers below","Maximizes vertical space","Marine-grade gaskets","Heavy-duty casters"], popular:true, type:"fridge" },
    { id:"rf-5", name:"Under-Counter Freezer", tier:"standard", price:2400, dims:'27" × 30" × 34"', specs:["-10°F – 0°F","4 cu ft","Frost-free"], features:["Heavy duty compressor","Self-closing door","Front controls","Thick insulated walls"], type:"freezer" },
    { id:"rf-6", name:"Glass Door Beverage Cooler", tier:"premium", price:2100, dims:'24" × 24" × 34"', specs:["33–45°F","Double-pane glass","LED interior"], features:["Customer-facing display","Adjustable shelves","Auto defrost","LED lit interior","Digital thermostat"], type:"fridge" },
    { id:"rf-7", name:"Commercial Ice Machine", tier:"premium", price:3800, dims:'22" × 24" × 34"', specs:["200 lbs/day","80 lb bin","Air cooled"], features:["High production","Storage bin","Self-cleaning cycle","Water filtration ready","LED status light"], popular:true, type:"ice" },
    { id:"rf-8", name:"Blast Chiller", tier:"elite", price:7500, dims:'32" × 28" × 34"', specs:["37°F in 90 min","5 pan capacity","HACCP compliant"], features:["Probe thermometer","Soft & hard chill modes","Touch display","USB data export","Heavy insulation"], type:"freezer" },
    { id:"rf-9", name:'60" Pizza Prep Table', tier:"premium", price:4100, dims:'60" × 32" × 36"', specs:["33–41°F","16 pan slots","Granite top option"], features:["Wide prep surface","Refrigerated base","2 doors","Pan rails","Heavy-duty construction"], type:"prep" },
    { id:"rf-10", name:"Milk / Beverage Cooler — Countertop", tier:"standard", price:890, dims:'24" × 20" × 28"', specs:["33–45°F","Glass door","Countertop"], features:["Compact countertop","Glass display door","LED lit","Adjustable temp","Light and portable"], type:"fridge" },
  ],
  smallwares: [
    { id:"sw-1", name:"Pro Chef Starter Kit — 40pc", tier:"standard", price:420, dims:"Assorted", specs:["40 pieces","NSF certified","Black handles"], features:["8\" chef knife","10\" slicer","Paring knife","3 tongs sizes","3 spatulas","Ladles","Whisks","Peeler","Thermometer","Bench scraper"], popular:true, type:"kit" },
    { id:"sw-2", name:"Premium NSF Pan Set — 24pc", tier:"premium", price:680, dims:"Full/half/third/sixth", specs:["24 pans","Clear lids","NSF rated"], features:["4 full size","6 half size","6 third size","8 sixth size","Lids included","Stackable"], type:"pans" },
    { id:"sw-3", name:"Sheet Pan & Rack Bundle", tier:"standard", price:340, dims:'18" × 26" pans', specs:["20 pans","20-slot rack","Aluminum"], features:["Full-size sheet pans","Rolling rack","Casters","Rolled edges","Commercial grade"], type:"pans" },
    { id:"sw-4", name:"Digital Portion Scale", tier:"standard", price:185, dims:'8" × 8" × 3"', specs:["0.1 oz precision","Waterproof","USB rechargeable"], features:["Tare function","Oz and gram display","NSF certified","Compact","Long battery"], type:"tool" },
    { id:"sw-5", name:"Japanese Knife Set — 7pc", tier:"elite", price:1250, dims:"Assorted blades", specs:["VG-10 Damascus","67 layers","Pakkawood handles"], features:["Gyuto 8\"","Santoku 7\"","Nakiri 6.5\"","Petty 5\"","Paring 3.5\"","Sujihiki 10.5\"","Bread 9\""], popular:true, type:"knives" },
    { id:"sw-6", name:"Squeeze Bottle & Container Kit", tier:"standard", price:95, dims:"Assorted", specs:["12 bottles","24 containers","Label maker"], features:["Color-coded lids","Bottle organizer rack","NSF rated","Portion control","Easy labeling"], type:"kit" },
    { id:"sw-7", name:"Cast Iron Collection — 5pc", tier:"premium", price:380, dims:'8" to 15" skillets', specs:["Pre-seasoned","5 pieces","Induction safe"], features:["8\", 10\", 12\", 15\" skillets","Grill pan included","Lifetime warranty","Heat retention","Versatile cooking"], type:"pans" },
    { id:"sw-8", name:"Pro Thermometer Kit", tier:"premium", price:275, dims:"Assorted probes", specs:["3 thermometers","NSF certified","Cases included"], features:["Instant-read pen","Infrared gun","Leave-in probe","Calibration wrench","Silicone cases"], type:"tool" },
    { id:"sw-9", name:"Stainless Mixing Bowl Set — 8pc", tier:"standard", price:120, dims:"1qt to 13qt", specs:["8 bowls","Stainless steel","Flat bottoms"], features:["Nested storage","Non-slip bottoms","Measurement marks","Rolled rims","Versatile sizes"], type:"kit" },
    { id:"sw-10", name:"Cutting Board Set — Color Coded", tier:"standard", price:165, dims:'18" × 24" each', specs:["6 boards","HDPE","NSF rated"], features:["Red = meat","Blue = fish","Green = produce","Yellow = poultry","White = dairy","Brown = cooked"], type:"tool" },
  ],
  hvac: [
    { id:"hv-1", name:'8-Foot Type I Exhaust Hood', tier:"premium", price:4800, dims:'96" × 30" × 24"', specs:["4 baffle filters","LED lighting","SS construction"], features:["Stainless steel","Baffle grease filters","Integrated LED lights","Grease cups","Make-up air collar","Fire suppression ready"], popular:true, type:"hood" },
    { id:"hv-2", name:'6-Foot Type I Exhaust Hood', tier:"standard", price:3200, dims:'72" × 28" × 22"', specs:["3 baffle filters","LED lighting","UL 710 listed"], features:["Compact for food trucks","Removable filters","LED task lights","Grease cups included","Exhaust collar on top"], type:"hood" },
    { id:"hv-3", name:"Ansul Fire Suppression", tier:"premium", price:3500, dims:"Integrated into hood", specs:["Wet chemical agent","Auto detection","Manual pull"], features:["Automatic heat detection","Manual pull station","Covers all cooking equip","Required by code","Annual inspection tags","Piping and nozzles"], popular:true, type:"safety" },
    { id:"hv-4", name:"Exhaust Fan — 1500 CFM", tier:"standard", price:1200, dims:'24" × 24" × 18"', specs:["1500 CFM","Direct drive","Weatherproof"], features:["Upblast design","Bird screen","Speed controller","Roof curb mount","Low maintenance"], type:"fan" },
    { id:"hv-5", name:"Exhaust Fan — 2500 CFM", tier:"premium", price:1800, dims:'30" × 30" × 20"', specs:["2500 CFM","Belt drive","Grease containment"], features:["High capacity","Grease cup on top","Hinged for cleaning","Vibration dampeners","Speed controller"], type:"fan" },
    { id:"hv-6", name:"Mini-Split A/C — 12K BTU", tier:"premium", price:2800, dims:'Indoor: 32" × 8"', specs:["12,000 BTU","Heat pump","Inverter"], features:["Cooling and heating","Remote control","Whisper quiet","Food truck certified","Easy install","Digital display"], popular:true, type:"ac" },
    { id:"hv-7", name:"Portable Evaporative Cooler", tier:"standard", price:650, dims:'18" × 14" × 36"', specs:["3-speed fan","10 gal tank","Portable"], features:["Rolling casters","Oscillating vents","No compressor needed","Low power draw","Dry climate ideal"], type:"ac" },
    { id:"hv-8", name:"Make-Up Air Unit", tier:"elite", price:5500, dims:'36" × 24" × 18"', specs:["Matches exhaust CFM","Heated supply","Rooftop mount"], features:["Balances exhaust air","Prevents negative pressure","Reduces smoke blowback","Filter access panel","Required for large hoods","Weatherproof cabinet"], type:"ac" },
  ],
  plumbing: [
    { id:"pl-1", name:"3-Compartment Sink", tier:"premium", price:2800, dims:'60" × 24" × 36"', specs:["3 basins","2 drainboards","Goose-neck faucet"], features:["Health dept required","18\" × 18\" basins","14\" deep","Sprayer hose","Adjustable feet","Stainless steel"], popular:true, type:"sink" },
    { id:"pl-2", name:"Hand Wash Sink — Wall Mount", tier:"standard", price:450, dims:'12" × 10" × 18"', specs:["Wall-mounted","Wrist blades","Compact"], features:["Health dept required","No-touch operation","Soap dispenser mount","Paper towel holder","Splash guard","Low profile"], popular:true, type:"sink" },
    { id:"pl-3", name:"Pre-Rinse Faucet Assembly", tier:"standard", price:380, dims:'Overhead mount', specs:["High pressure","Spring coil hose","Squeeze trigger"], features:["Coiled spring hose","Spray head trigger","Wall bracket mount","Add-on faucet","Heavy duty chrome"], type:"faucet" },
    { id:"pl-4", name:"Fresh Water Tank — 50 Gal", tier:"standard", price:220, dims:'30" × 18" × 18"', specs:["50 gallon","Food grade poly","Translucent"], features:["See-through level check","Threaded fittings","Food-grade polyethylene","Under-counter fit","Molded handles"], type:"tank" },
    { id:"pl-5", name:"Fresh Water Tank — 100 Gal", tier:"premium", price:380, dims:'48" × 24" × 18"', specs:["100 gallon","Food grade poly","High capacity"], features:["Extended operation","Dual outlets","Reinforced walls","Level indicator","Clean-out port"], type:"tank" },
    { id:"pl-6", name:"Gray Water Tank — 50 Gal", tier:"standard", price:200, dims:'30" × 18" × 18"', specs:["50 gallon","Waste rated","Opaque gray"], features:["Must equal fresh tank","Bottom drain valve","Reinforced fittings","Opaque material","Under-counter mount"], type:"tank" },
    { id:"pl-7", name:"Hot Water Heater — 6 Gal", tier:"standard", price:480, dims:'14" × 14" × 18"', specs:["6 gallon","Gas or electric","120°F+ output"], features:["Under-counter fit","T&P relief valve","Thermostat control","Fast recovery","Compact design"], type:"heater" },
    { id:"pl-8", name:"Water Pump — 12V Demand", tier:"standard", price:145, dims:'6" × 4" × 4"', specs:["12V DC","3 GPM","45 PSI"], features:["On-demand activation","Quiet operation","Self-priming","Barb fittings","Pressure switch"], type:"pump" },
    { id:"pl-9", name:"Water Filtration — 2 Stage", tier:"premium", price:320, dims:'Wall mount system', specs:["Sediment + carbon","Quick-disconnect","NSF certified"], features:["Clear filter housings","Wall bracket","Filter life indicator","Improves taste","Protects equipment"], type:"filter" },
    { id:"pl-10", name:"Mop Sink — Floor Level", tier:"standard", price:550, dims:'24" × 24" × 12"', specs:["Floor mount","Stainless","Faucet included"], features:["Required by many codes","Low profile","Service faucet","Drain strainer","Stainless steel"], type:"sink" },
  ],
  electrical: [
    { id:"el-1", name:"Generator — 7500W Gas", tier:"standard", price:3200, dims:'30" × 22" × 24"', specs:["7,500 watts","Gas powered","Pull + electric start"], features:["Multiple 120V/240V outlets","Circuit breakers","Fuel gauge","Hour meter","Fold-down handles","Wheel kit"], popular:true, type:"generator" },
    { id:"el-2", name:"Generator — 12000W Diesel", tier:"elite", price:8500, dims:'42" × 24" × 30"', specs:["12,000 watts","Diesel","Sound-dampened"], features:["Enclosed cabinet","Digital readouts","Heavy-duty outlets","Auto-idle","Remote start capable","Extreme durability"], popular:true, type:"generator" },
    { id:"el-3", name:"Electrical Panel — 100A", tier:"standard", price:650, dims:'14" × 18" × 4"', specs:["100 amp main","20 circuit slots","Grounding bus"], features:["Main breaker","Individual circuits","Labeled directory","GFCI protection","Proper grounding","Steel enclosure"], type:"panel" },
    { id:"el-4", name:"LED Light Panel — Overhead", tier:"standard", price:180, dims:'24" × 48" × 1"', specs:["50W LED","5000K daylight","Surface mount"], features:["Bright even light","Energy efficient","Slim profile","Long life 50K hrs","Instant on","No flicker"], type:"lighting" },
    { id:"el-5", name:"Undercabinet LED Task Light", tier:"standard", price:85, dims:'24" × 2" × 1"', specs:["12W LED","4000K neutral","Linkable"], features:["Focused task light","Slim aluminum housing","Linkable end-to-end","Mounting brackets","Frosted lens"], type:"lighting" },
    { id:"el-6", name:"Inverter/Charger — 3000W", tier:"premium", price:1200, dims:'14" × 8" × 4"', specs:["3000W pure sine","12V to 120V AC","Digital display"], features:["Pure sine wave output","Battery charger built-in","Digital monitoring","Cooling fan","Multiple outlets","Protects electronics"], type:"power" },
    { id:"el-7", name:"Shore Power Inlet — 50A", tier:"standard", price:240, dims:'6" × 6" face plate', specs:["50 amp","Twist-lock","Weatherproof"], features:["Flush exterior mount","Weatherproof flip cover","Heavy-duty receptacle","Stainless face plate","NEMA compliant"], type:"power" },
    { id:"el-8", name:"Lithium Battery Bank", tier:"elite", price:4800, dims:'24" × 16" × 16"', specs:["LiFePO4","200Ah capacity","BMS included"], features:["Silent operation","5000+ cycle life","Battery management system","Parallel expandable","No generator needed","Lightweight vs lead-acid"], type:"power" },
    { id:"el-9", name:"Exterior LED Flood Lights", tier:"standard", price:195, dims:'Pair — 10" × 8" each', specs:["50W each","6500K daylight","IP65 rated"], features:["Weatherproof","Bright white output","Adjustable aim","Serving area illumination","Long life","Low power draw"], type:"lighting" },
    { id:"el-10", name:"Interior Outlet Strip — 6 Port", tier:"standard", price:120, dims:'24" × 3" × 2"', specs:["20A rated","6 outlets","GFCI protected"], features:["Wall-mount","GFCI protection","Circuit breaker","Stainless housing","Cord management","Heavy-duty plugs"], type:"power" },
  ],
  serving: [
    { id:"sv-1", name:"Fold-Down Serving Counter", tier:"premium", price:1400, dims:'60" × 18" counter', specs:["Stainless steel","Piano hinge","Support arms"], features:["Extends from serving window","Locking support arms","Brushed stainless surface","Customer-facing","Fold-up when closed","Heavy-duty hinge"], popular:true, type:"counter" },
    { id:"sv-2", name:'Digital Menu Board — 32"', tier:"premium", price:1800, dims:'32" diagonal', specs:["LED display","High brightness","Wall mount"], features:["Dynamic content","Day-part scheduling","Weather-resistant","Remote update","Anti-glare coating","HDMI + USB input"], popular:true, type:"display" },
    { id:"sv-3", name:"Heat Lamp Station — 4 Bulb", tier:"standard", price:420, dims:'24" × 12" overhead', specs:["4 infrared bulbs","Adjustable height","Chain mount"], features:["Keeps plates warm","Golden warm light","Height adjustable","Chain suspension","Bulbs included","Food-safe infrared"], type:"warming" },
    { id:"sv-4", name:"POS Terminal Setup", tier:"premium", price:1600, dims:'Tablet + reader + printer', specs:["10\" touchscreen","Card reader","Receipt printer"], features:["Tap / chip / swipe","Tablet on stand","Receipt printer","Inventory tracking","Sales reporting","Cloud-based"], popular:true, type:"pos" },
    { id:"sv-5", name:"Cash Drawer — Heavy Duty", tier:"standard", price:180, dims:'16" × 18" × 4"', specs:["Steel construction","5 bill / 5 coin","Lock + key"], features:["Auto-open with POS","5 bill compartments","5 coin cups","Removable tray","Under-counter mount","Key lock security"], type:"pos" },
    { id:"sv-6", name:'Order Ticket Rail — 36"', tier:"standard", price:65, dims:'36" × 3"', specs:["Stainless steel","Spring clips","Wall mount"], features:["Classic kitchen tool","Spring-loaded clips","Wall-mount screws included","Easy to install","Holds 12+ tickets","Food-safe stainless"], type:"kitchen" },
    { id:"sv-7", name:"Condiment Organizer Station", tier:"standard", price:210, dims:'24" × 12" × 10"', specs:["Stainless frame","6 bottle slots","Napkin dispenser"], features:["Squeeze bottle slots","Sauce cup holders","Napkin dispenser","Straw compartment","Customer-facing","Easy to refill"], type:"counter" },
    { id:"sv-8", name:'Customer Display — 10"', tier:"standard", price:350, dims:'10" screen + stand', specs:["LCD display","POS integrated","Adjustable angle"], features:["Order confirmation","Running total","Customer-facing mount","Adjustable tilt","USB powered","Clear bright display"], type:"pos" },
    { id:"sv-9", name:'Slide-Up Serving Window — 60"', tier:"premium", price:2200, dims:'60" × 30" opening', specs:["Tempered glass","Gas struts","Locking"], features:["Smooth slide-up action","Gas strut assisted","Tempered safety glass","Locking mechanism","Weatherproof seal","Frame matches truck paint"], type:"window" },
    { id:"sv-10", name:"Retractable Awning — 10ft", tier:"premium", price:1600, dims:"10' wide × 8' projection", specs:["Manual crank","Fabric canopy","Aluminum frame"], features:["Customer shade","Rain protection","Manual retraction","Multiple fabric colors","LED light strip option","Aluminum arms"], type:"exterior" },
  ],
};

// ═══════════════════════════════════════════════════════════════
// SVG PRODUCT ILLUSTRATIONS (with photorealistic image support)
// ═══════════════════════════════════════════════════════════════

function ProductSVG({ item, size = 160 }) {
  // Check if we have a photorealistic image for this product
  const imageUrl = PRODUCT_IMAGES[item.id];
  
  if (imageUrl) {
    return (
      <div style={{ 
        width: size, 
        height: size, 
        borderRadius: 12, 
        overflow: "hidden", 
        background: "#0B0F17",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <img 
          src={imageUrl} 
          alt={item.name}
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover",
            borderRadius: 12
          }}
          loading="lazy"
        />
      </div>
    );
  }
  
  // Fallback to SVG illustration
  const tc = TIERS[item.tier]?.color || "#999";
  const t = item.type || "";

  const bg = (
    <>
      <rect width="200" height="200" fill="#0B0F17"/>
      <rect x="40" y="150" width="120" height="3" rx="1" fill="#1E293B"/>
    </>
  );

  let content = null;

  if (t === "truck" || t === "van") {
    content = (
      <g>
        <rect x="30" y="85" width="140" height="55" rx="6" fill="#1E293B"/>
        <rect x="130" y="75" width="40" height="35" rx="4" fill="#1E293B"/>
        <rect x="135" y="80" width="25" height="20" rx="2" fill="#0B0F17" stroke={tc} strokeWidth="1"/>
        <circle cx="55" cy="140" r="15" fill="#0B0F17" stroke="#2A3A4E" strokeWidth="3"/>
        <circle cx="145" cy="140" r="15" fill="#0B0F17" stroke="#2A3A4E" strokeWidth="3"/>
        <rect x="45" y="100" width="70" height="25" rx="3" fill={tc} opacity="0.15"/>
      </g>
    );
  } else if (t === "trailer") {
    content = (
      <g>
        <ellipse cx="100" cy="100" rx="70" ry="35" fill={tc} opacity="0.1"/>
        <rect x="30" y="75" width="140" height="60" rx="30" fill="#1E293B"/>
        <rect x="35" y="80" width="130" height="50" rx="25" fill="#2A3A4E"/>
        <circle cx="60" cy="140" r="12" fill="#0B0F17" stroke="#2A3A4E" strokeWidth="3"/>
        <circle cx="140" cy="140" r="12" fill="#0B0F17" stroke="#2A3A4E" strokeWidth="3"/>
        <rect x="15" y="105" width="15" height="6" rx="2" fill="#2A3A4E"/>
      </g>
    );
  } else if (t === "vintage") {
    content = (
      <g>
        <rect x="40" y="80" width="120" height="55" rx="25" fill="#1E293B"/>
        <rect x="45" y="85" width="30" height="25" rx="12" fill="#0B0F17" stroke={tc} strokeWidth="1"/>
        <rect x="125" y="85" width="30" height="25" rx="12" fill="#0B0F17" stroke={tc} strokeWidth="1"/>
        <circle cx="60" cy="140" r="16" fill="#0B0F17" stroke={tc} strokeWidth="2"/>
        <circle cx="140" cy="140" r="16" fill="#0B0F17" stroke={tc} strokeWidth="2"/>
        <rect x="80" y="90" width="40" height="35" rx="4" fill={tc} opacity="0.15"/>
      </g>
    );
  } else if (t === "griddle") {
    content = (
      <g>
        <rect x="35" y="75" width="130" height="65" rx="6" fill="#1E293B"/>
        <rect x="40" y="80" width="120" height="40" rx="3" fill="#2A3A4E"/>
        {[50,80,110,140].map((x)=><rect key={x} x={x} y="85" width="15" height="30" rx="2" fill="#0B0F17" opacity="0.5"/>)}
        <rect x="35" y="125" width="130" height="15" rx="4" fill="#0B0F17"/>
      </g>
    );
  } else if (t === "fryer") {
    content = (
      <g>
        <rect x="45" y="65" width="110" height="80" rx="6" fill="#1E293B"/>
        <rect x="55" y="75" width="40" height="50" rx="4" fill="#0B0F17" stroke="#2A3A4E"/>
        <rect x="105" y="75" width="40" height="50" rx="4" fill="#0B0F17" stroke="#2A3A4E"/>
        <circle cx="75" cy="135" r="5" fill={tc}/>
        <circle cx="125" cy="135" r="5" fill={tc}/>
      </g>
    );
  } else if (t === "oven") {
    content = (
      <g>
        <rect x="45" y="55" width="110" height="95" rx="8" fill="#1E293B"/>
        <rect x="50" y="60" width="100" height="70" rx="4" fill="#0B0F17"/>
        {[55,72,89].map((y)=><rect key={y} x="55" y={y} width="90" height="2" fill="#2A3A4E"/>)}
        <rect x="55" y="135" width="90" height="10" rx="3" fill="#2A3A4E"/>
        {[65,95,125].map((x)=><circle key={x} cx={x} cy="140" r="3" fill={tc} opacity="0.6"/>)}
      </g>
    );
  } else if (t === "range") {
    content = (
      <g>
        <rect x="45" y="75" width="110" height="70" rx="6" fill="#1E293B"/>
        <rect x="50" y="80" width="100" height="45" rx="3" fill="#0B0F17"/>
        {[65,105].map((x)=><circle key={x} cx={x} cy="102" r="18" fill="none" stroke={tc} strokeWidth="2"/>)}
        {[55,80,105,130].map((x)=><circle key={x} cx={x} cy="135" r="4" fill="#2A3A4E"/>)}
      </g>
    );
  } else if (t === "grill") {
    content = (
      <g>
        <rect x="50" y="60" width="100" height="80" rx="6" fill="#1E293B"/>
        <rect x="55" y="65" width="90" height="55" rx="3" fill="#0B0F17"/>
        {[72,82,92,102].map((y)=><rect key={y} x="60" y={y} width="80" height="3" rx="1" fill="#2A3A4E"/>)}
        <rect x="55" y="125" width="90" height="10" rx="3" fill="#2A3A4E"/>
      </g>
    );
  } else if (t === "fridge" || t === "freezer") {
    content = (
      <g>
        <rect x="55" y="55" width="90" height="95" rx="6" fill="#1E293B"/>
        <rect x="60" y="60" width="80" height="85" rx="4" fill="#0B0F17"/>
        <rect x="138" y="85" width="4" height="30" rx="2" fill="#2A3A4E"/>
        {t==="freezer" && <><rect x="70" y="75" width="60" height="2" fill={tc} opacity="0.5"/>
        <rect x="70" y="95" width="60" height="2" fill={tc} opacity="0.5"/></>}
      </g>
    );
  } else if (t === "prep") {
    content = (
      <g>
        <rect x="25" y="80" width="150" height="65" rx="6" fill="#1E293B"/>
        <rect x="30" y="85" width="140" height="15" rx="3" fill="#2A3A4E"/>
        {[30,55,80,105,130,148].map((x)=><rect key={x} x={x} y="87" width="15" height="10" rx="2" fill="#0B0F17"/>)}
        <rect x="30" y="105" width="140" height="35" rx="3" fill="#0B0F17"/>
      </g>
    );
  } else if (t === "ice") {
    content = (
      <g>
        <rect x="55" y="60" width="90" height="85" rx="6" fill="#1E293B"/>
        <rect x="60" y="65" width="80" height="40" rx="4" fill="#0B0F17"/>
        {[60,70,80,90,100].map((x,i)=>[65,75,85,95].map((y,j)=>
          <rect key={`${i}-${j}`} x={x+5} y={y} width="6" height="6" rx="1" fill={tc} opacity="0.3"/>
        ))}
        <rect x="60" y="110" width="80" height="30" rx="3" fill="#0B0F17"/>
      </g>
    );
  } else if (t === "hood") {
    content = (
      <g>
        <path d="M30 120 L40 70 L160 70 L170 120 Z" fill="#1E293B"/>
        <rect x="45" y="75" width="110" height="35" rx="4" fill="#0B0F17"/>
        {[55,85,115,145].map((x)=><rect key={x} x={x} y="80" width="20" height="25" rx="2" fill="#2A3A4E"/>)}
        <rect x="30" y="115" width="140" height="8" rx="2" fill="#2A3A4E"/>
      </g>
    );
  } else if (t === "safety") {
    content = (
      <g>
        <rect x="60" y="50" width="80" height="100" rx="8" fill="#EF4444" opacity="0.2"/>
        <rect x="65" y="55" width="70" height="90" rx="6" fill="#1E293B"/>
        {[40,87,134].map((x)=><circle key={x} cx={x+40} cy="90" r="8" fill="#EF4444" opacity="0.6"/>)}
        <rect x="85" y="125" width="30" height="12" rx="3" fill="#EF4444"/>
        <text x="100" y="134" fill="#FFF" fontSize="8" textAnchor="middle" fontWeight="bold">PULL</text>
      </g>
    );
  } else if (t === "fan") {
    content = (
      <g>
        <rect x="55" y="55" width="90" height="95" rx="8" fill="#1E293B"/>
        <circle cx="100" cy="95" r="35" fill="#0B0F17" stroke="#2A3A4E" strokeWidth="2"/>
        {[0,60,120,180,240,300].map((a,i)=>{
          const r=20;const x=100+r*Math.cos(a*Math.PI/180);const y=95+r*Math.sin(a*Math.PI/180);
          return <circle key={i} cx={x} cy={y} r="8" fill={tc} opacity="0.4"/>
        })}
        <circle cx="100" cy="95" r="8" fill="#2A3A4E"/>
      </g>
    );
  } else if (t === "ac") {
    content = (
      <g>
        <rect x="40" y="70" width="120" height="30" rx="6" fill="#1E293B"/>
        <rect x="50" y="110" width="80" height="45" rx="4" fill="#1E293B"/>
        <rect x="55" y="115" width="70" height="35" rx="3" fill="#0B0F17"/>
        {[0,45,90,135,180,225,270,315].map((a,i)=>{
          const r=10;const x=90+r*Math.cos(a*Math.PI/180);const y=140+r*Math.sin(a*Math.PI/180);
          return <circle key={i} cx={x} cy={y} r="3" fill={tc} opacity="0.5"/>
        })}
      </g>
    );
  } else if (t === "sink") {
    content = (
      <g>
        <rect x="20" y="80" width="160" height="60" rx="6" fill="#1E293B"/>
        <rect x="25" y="85" width="150" height="40" rx="4" fill="#0B0F17"/>
        {[25,72,119].map((x)=><rect key={x} x={x} y="90" width="40" height="30" rx="3" fill="#2A3A4E"/>)}
        <rect x="90" y="55" width="6" height="30" rx="2" fill="#2A3A4E"/>
        <circle cx="93" cy="55" r="8" fill="#2A3A4E"/>
        {[20,162].map((x)=><rect key={x} x={x} y="85" width="5" height="50" rx="2" fill="#0B0F17"/>)}
      </g>
    );
  } else if (t === "tank" || t === "heater" || t === "pump" || t === "filter" || t === "faucet") {
    content = (
      <g>
        <rect x="60" y="60" width="80" height="90" rx="12" fill="#1E293B"/>
        <rect x="65" y="65" width="70" height="80" rx="10" fill="#0B0F17"/>
        {t==="tank" && <rect x="70" y="70" width="60" height="40" rx="4" fill={tc} opacity="0.1"/>}
        {t==="heater" && <><circle cx="100" cy="100" r="20" fill={tc} opacity="0.2"/>
        <circle cx="100" cy="100" r="10" fill={tc} opacity="0.4"/></>}
        {t==="pump" && <><rect x="75" y="90" width="50" height="30" rx="4" fill="#2A3A4E"/>
        <circle cx="125" cy="105" r="8" fill={tc} opacity="0.4"/></>}
      </g>
    );
  } else if (t === "generator") {
    content = (
      <g>
        <rect x="40" y="70" width="120" height="75" rx="8" fill="#1E293B"/>
        <rect x="45" y="75" width="110" height="50" rx="4" fill="#0B0F17"/>
        <text x="100" y="105" fill={tc} fontSize="12" textAnchor="middle" fontWeight="bold">7500W</text>
        <rect x="45" y="130" width="110" height="10" rx="3" fill="#2A3A4E"/>
        {[90,110,130,150].map((x)=><rect key={x} x={x-30} y="132" width="8" height="6" rx="1" fill="#0B0F17"/>)}
      </g>
    );
  } else if (t === "panel") {
    content = (
      <g>
        <rect x="55" y="55" width="90" height="95" rx="6" fill="#1E293B"/>
        <rect x="60" y="60" width="80" height="85" rx="4" fill="#0B0F17"/>
        <text x="100" y="75" fill={tc} fontSize="8" textAnchor="middle" fontWeight="bold">MAIN 100A</text>
        {[0,1,2,3,4,5,6,7].map(i=><>
          <rect key={`l${i}`} x="65" y={82+i*7} width="30" height="5" rx="1" fill="#2A3A4E"/>
          <rect key={`r${i}`} x="105" y={82+i*7} width="30" height="5" rx="1" fill="#2A3A4E"/>
        </>)}
      </g>
    );
  } else if (t === "lighting") {
    content = (
      <g>
        <rect x="30" y="90" width="140" height="25" rx="4" fill="#1E293B"/>
        <rect x="35" y="95" width="130" height="15" rx="2" fill={tc} opacity="0.2"/>
        <rect x="40" y="98" width="120" height="9" rx="2" fill={tc} opacity="0.4"/>
      </g>
    );
  } else if (t === "power") {
    content = (
      <g>
        <rect x="50" y="70" width="100" height="70" rx="8" fill="#1E293B"/>
        <rect x="55" y="75" width="90" height="60" rx="4" fill="#0B0F17"/>
        <text x="100" y="100" fill={tc} fontSize="10" textAnchor="middle" fontWeight="bold">120V</text>
        {[100,120,140].map((x)=><circle key={x} cx={x-20} cy="120" r="6" fill="#2A3A4E"/>)}
      </g>
    );
  } else if (t === "counter" || t === "window" || t === "exterior") {
    content = (
      <g>
        <rect x="30" y="75" width="140" height="70" rx="6" fill="#1E293B"/>
        <rect x="35" y="80" width="130" height="40" rx="4" fill="#0B0F17"/>
        <rect x="35" y="125" width="130" height="15" rx="3" fill={tc} opacity="0.2"/>
      </g>
    );
  } else if (t === "display" || t === "pos") {
    content = (
      <g>
        <rect x="55" y="60" width="90" height="70" rx="6" fill="#1E293B"/>
        <rect x="60" y="65" width="80" height="55" rx="3" fill="#0B0F17"/>
        <rect x="65" y="70" width="70" height="45" rx="2" fill={tc} opacity="0.1"/>
        <rect x="85" y="135" width="30" height="15" rx="3" fill="#2A3A4E"/>
      </g>
    );
  } else if (t === "warming" || t === "kitchen") {
    content = (
      <g>
        <rect x="50" y="70" width="100" height="20" rx="4" fill="#1E293B"/>
        {[60,85,110,135].map((x,i)=><>
          <rect key={`b${i}`} x={x} y="65" width="10" height="5" rx="1" fill="#F4A623" opacity="0.6"/>
          <rect key={`r${i}`} x={x+2} y="90" width="6" height="35" rx="1" fill="#2A3A4E"/>
        </>)}
      </g>
    );
  } else {
    content = (
      <g>
        <rect x="55" y="65" width="90" height="75" rx="8" fill="#1E293B"/>
        <rect x="60" y="70" width="80" height="65" rx="4" fill="#0B0F17"/>
        <circle cx="100" cy="102" r="20" fill={tc} opacity="0.15"/>
      </g>
    );
  }

  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={{ display:"block" }}>
      {bg}{content}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// UI COMPONENTS
// ═══════════════════════════════════════════════════════════════

function TierBadge({ tier }) {
  const t = TIERS[tier];
  return <span style={{ fontSize:9, fontWeight:700, padding:"3px 8px", borderRadius:20, background:t.bg, color:t.color, textTransform:"uppercase", letterSpacing:"0.06em" }}>{t.label}</span>;
}

function Card({ item, selected, onSelect, onDetail }) {
  const [h, setH] = useState(false);
  const tc = TIERS[item.tier]?.color || "#999";
  return (
    <div 
      onMouseEnter={()=>setH(true)} 
      onMouseLeave={()=>setH(false)} 
      onClick={()=>onDetail(item)}
      data-testid={`product-card-${item.id}`}
      style={{ 
        background: selected ? "#1E293B" : "#111827", 
        border: `1.5px solid ${selected ? tc : h ? "#2A3A4E" : "#1E293B"}`,
        borderRadius: 14, 
        overflow: "hidden", 
        cursor: "pointer", 
        transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
        transform: h ? "translateY(-4px)" : "translateY(0)", 
        boxShadow: h ? `0 12px 40px ${tc}15` : "0 2px 8px rgba(0,0,0,0.3)", 
        position: "relative" 
      }}
    >
      {item.popular && (
        <div style={{ position:"absolute", top:12, right:12, zIndex:2, background:"#E8592F", color:"#FFF", fontSize:8, fontWeight:800, padding:"3px 8px", borderRadius:20, textTransform:"uppercase", letterSpacing:"0.08em" }}>
          POPULAR
        </div>
      )}
      <div style={{ background:"#0B0F17", padding:16, display:"flex", justifyContent:"center" }}>
        <ProductSVG item={item} size={140}/>
      </div>
      <div style={{ padding:"14px 16px 16px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
          <TierBadge tier={item.tier}/>
          <span style={{ color:tc, fontWeight:800, fontSize:15, fontFamily:"'Outfit',sans-serif" }}>${item.price.toLocaleString()}</span>
        </div>
        <h3 style={{ color:"#E8ECF2", fontSize:13, fontWeight:700, marginBottom:4, fontFamily:"'Outfit',sans-serif", lineHeight:1.3 }}>{item.name}</h3>
        <p style={{ color:"#64748B", fontSize:10, marginBottom:10, fontFamily:"'Outfit',sans-serif" }}>{item.dims}{item.specs?` · ${item.specs[0]}`:""}</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:8 }}>
          {item.features.slice(0,3).map((f)=><span key={f} style={{ fontSize:9, background:"#1E293B", color:"#8896A8", padding:"3px 8px", borderRadius:6 }}>{f}</span>)}
          {item.features.length>3 && <span style={{ fontSize:9, color:"#64748B", padding:"3px 8px" }}>+{item.features.length-3}</span>}
        </div>
        <button 
          onClick={(e)=>{e.stopPropagation();onSelect(item)}} 
          data-testid={`add-to-build-${item.id}`}
          style={{ 
            width:"100%", 
            marginTop:10, 
            padding:"9px", 
            borderRadius:8,
            border: selected ? "none" : `1px solid ${tc}40`, 
            background: selected ? tc : "transparent", 
            color: selected ? "#0B0F17" : tc,
            fontWeight:700, 
            fontSize:10, 
            letterSpacing:"0.06em", 
            fontFamily:"'Outfit',sans-serif", 
            cursor:"pointer",
            transition:"all 0.2s", 
            textTransform:"uppercase" 
          }}
        >
          {selected ? "✓ Selected" : "Add to Build"}
        </button>
      </div>
    </div>
  );
}

function Modal({ item, selected, onClose, onSelect }) {
  if (!item) return null;
  const tc = TIERS[item.tier]?.color || "#999";
  return (
    <div 
      onClick={onClose} 
      style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}
    >
      <div 
        onClick={e=>e.stopPropagation()} 
        data-testid="product-modal"
        style={{ background:"#0F172A", borderRadius:20, maxWidth:700, width:"100%", overflow:"hidden", border:"1px solid #1E293B" }}
      >
        <div style={{ display:"flex", flexDirection:"row" }}>
          <div style={{ flex:"0 0 260px", background:"#0B0F17", display:"flex", alignItems:"center", justifyContent:"center", padding:30 }}>
            <ProductSVG item={item} size={200}/>
          </div>
          <div style={{ flex:1, padding:28 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <TierBadge tier={item.tier}/>
              <span style={{ color:"#64748B", fontSize:11 }}>{TIERS[item.tier].desc}</span>
            </div>
            <h2 style={{ color:"#E8ECF2", fontSize:22, fontWeight:800, marginBottom:16, fontFamily:"'Outfit',sans-serif" }}>{item.name}</h2>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:20 }}>
              {[{l:"Dimensions",v:item.dims}, ...item.specs.map(s=>({l:s.includes("BTU")?"Power":s.includes("°F")?"Temp":s.includes("lb")?"Weight":"Spec",v:s}))].map((sp)=>(
                <div key={`${sp.l}-${sp.v}`} style={{ background:"#1E293B", padding:"8px 14px", borderRadius:10 }}>
                  <div style={{ color:"#64748B", fontSize:9, marginBottom:2, textTransform:"uppercase", letterSpacing:"0.06em" }}>{sp.l}</div>
                  <div style={{ color:"#E8ECF2", fontSize:12, fontWeight:600 }}>{sp.v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom:20 }}>
              <div style={{ color:"#64748B", fontSize:10, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.08em" }}>Features</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {item.features.map((f)=><span key={f} style={{ fontSize:10, background:"#0B0F17", color:"#8896A8", padding:"5px 10px", borderRadius:8, border:"1px solid #1E293B" }}>✓ {f}</span>)}
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:16, borderTop:"1px solid #1E293B" }}>
              <div>
                <div style={{ color:"#64748B", fontSize:10, marginBottom:4, textTransform:"uppercase" }}>Price</div>
                <div style={{ color:tc, fontSize:28, fontWeight:800, fontFamily:"'Outfit',sans-serif" }}>${item.price.toLocaleString()}</div>
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <button 
                  onClick={onClose} 
                  style={{ padding:"10px 24px", borderRadius:10, border:"1px solid #2A3A4E", background:"transparent", color:"#8896A8", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}
                >
                  Close
                </button>
                <button 
                  onClick={()=>{onSelect(item);onClose()}} 
                  data-testid="modal-add-to-build"
                  style={{ 
                    padding:"10px 24px", 
                    borderRadius:10, 
                    border:"none", 
                    background: selected ? "#2A3A4E" : `linear-gradient(135deg,${tc},${tc}CC)`, 
                    color: selected ? "#8896A8" : "#0B0F17", 
                    fontSize:11, 
                    fontWeight:700, 
                    cursor:"pointer", 
                    fontFamily:"'Outfit',sans-serif", 
                    letterSpacing:"0.04em", 
                    textTransform:"uppercase" 
                  }}
                >
                  {selected ? "✓ In Build" : "Add to Build"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

const Showroom = () => {
  const [cat, setCat] = useState("chassis");
  const [sel, setSel] = useState({});
  const [detail, setDetail] = useState(null);
  const [tier, setTier] = useState(null);
  const [q, setQ] = useState("");
  const [anim, setAnim] = useState(0);
  const [drawer, setDrawer] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const switchCat = c => { setCat(c); setQ(""); setTier(null); setAnim(a=>a+1); };
  const toggle = item => setSel(p => { const n={...p}; n[item.id]?delete n[item.id]:n[item.id]=item; return n; });

  const items = PRODUCTS[cat] || [];
  const filtered = items.filter(i => {
    if (tier && i.tier !== tier) return false;
    if (q && !i.name.toLowerCase().includes(q.toLowerCase()) && !i.features.some(f=>f.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  });

  const selList = Object.values(sel);
  const total = selList.reduce((a,i)=>a+i.price, 0);
  const catInfo = CATEGORIES.find(c=>c.id===cat);

  const handleSaveBuild = async () => {
    if (selList.length === 0) {
      toast.error("No items selected", { description: "Add equipment to your build first." });
      return;
    }
    setIsSaving(true);
    try {
      await apiClient.saveScaledBatch({
        recipe_name: "Equipment Build",
        target_servings: selList.length,
        total_batch_cost: total,
        cost_per_unit: 0,
        prep_time_hours: 0,
        ingredients: selList.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          tier: item.tier,
          category: CATEGORIES.find(c => PRODUCTS[c.id]?.some(p => p.id === item.id))?.id
        })),
      });
      toast.success("Build saved!", { description: `${selList.length} items totaling $${total.toLocaleString()}` });
    } catch (error) {
      toast.error("Failed to save", { description: "Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#0a0d14", fontFamily:"'Manrope',sans-serif" }}>
      <SEO 
        title="Equipment Showroom - Food Truck Launch Pad"
        description="Browse and configure commercial food truck equipment. Chassis, cooking, refrigeration, HVAC, plumbing, electrical, and serving equipment."
        url="/showroom"
      />
      
      {/* Sidebar */}
      <aside style={{ width:240, background:"#0d1018", borderRight:"1px solid rgba(255,255,255,0.05)", display:"flex", flexDirection:"column", position:"sticky", top:0, height:"100vh", overflow:"auto" }}>
        <div style={{ padding:"16px 16px", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
          <Link to="/dashboard" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", marginBottom:12 }}>
            <div style={{ width:32, height:32, borderRadius:8, background:"#E8592F", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Truck className="w-4 h-4" style={{ color:"white" }} />
            </div>
            <div>
              <div style={{ color:"#fff", fontSize:15, fontWeight:700, fontFamily:"'Outfit',sans-serif" }}>FTLP</div>
            </div>
          </Link>
          <div style={{ color:"#52525b", fontSize:12, fontWeight:600, letterSpacing:"0.05em" }}>Equipment Showroom</div>
        </div>
        
        <div style={{ flex:1, padding:"12px 10px" }}>
          {CATEGORIES.map(c => {
            const active = cat===c.id;
            const count = (PRODUCTS[c.id]||[]).length;
            const selCount = Object.values(sel).filter(i=>(PRODUCTS[c.id]||[]).some(p=>p.id===i.id)).length;
            return (
              <div 
                key={c.id} 
                onClick={()=>switchCat(c.id)} 
                data-testid={`category-${c.id}`}
                style={{ 
                  display:"flex", 
                  alignItems:"center", 
                  gap:8, 
                  padding:"9px 10px", 
                  borderRadius:10, 
                  cursor:"pointer", 
                  marginBottom:1, 
                  background: active ? "#E8592F15" : "transparent", 
                  borderLeft: active ? "3px solid #E8592F" : "3px solid transparent", 
                  transition:"all 0.2s" 
                }}
              >
                <span style={{ fontSize:18 }}>{c.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ color: active ? "#E8ECF2" : "#8896A8", fontSize:12, fontWeight:600 }}>{c.name}</div>
                  <div style={{ color:"#64748B", fontSize:9 }}>{count} items</div>
                </div>
                {selCount>0 && <span style={{ background:"#E8592F", color:"#FFF", fontSize:9, fontWeight:700, padding:"2px 6px", borderRadius:10 }}>{selCount}</span>}
              </div>
            );
          })}
        </div>
        
        <div 
          onClick={()=>setDrawer(!drawer)} 
          data-testid="build-drawer-toggle"
          style={{ 
            padding:"16px", 
            borderTop:"1px solid #1E293B", 
            cursor:"pointer", 
            background: drawer ? "#1E293B" : "transparent", 
            transition:"all 0.2s" 
          }}
        >
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
            <span style={{ color:"#E8ECF2", fontSize:12, fontWeight:700 }}>Your Build</span>
            <span style={{ color:"#E8592F", fontSize:11, fontWeight:700 }}>{selList.length} items</span>
          </div>
          <div style={{ color:"#F4A623", fontSize:18, fontWeight:800 }}>${total.toLocaleString()}</div>
          <div style={{ color:"#64748B", fontSize:9, marginTop:4 }}>Click to expand</div>
        </div>
      </aside>
      
      {/* Main */}
      <main style={{ flex:1, padding:"28px 32px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
          <div>
            <h1 style={{ color:"#E8ECF2", fontSize:28, fontWeight:800, margin:0, display:"flex", alignItems:"center", gap:12 }}>
              {catInfo?.icon} {catInfo?.name}
            </h1>
            <p style={{ color:"#64748B", fontSize:13, marginTop:4 }}>{catInfo?.sub}</p>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <input 
              value={q} 
              onChange={e=>setQ(e.target.value)} 
              placeholder="Search..." 
              data-testid="search-input"
              style={{ 
                padding:"7px 12px", 
                borderRadius:8, 
                border:"1px solid #1E293B", 
                background:"#0B0F17", 
                color:"#E8ECF2", 
                fontSize:11, 
                width:180, 
                fontFamily:"'Outfit',sans-serif", 
                outline:"none" 
              }}
            />
          </div>
        </div>
        
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
          {[null,...Object.keys(TIERS)].map(k=>{
            const t = k?TIERS[k]:null;
            const active = tier===k;
            return (
              <button 
                key={k||"all"} 
                onClick={()=>setTier(tier===k?null:k)} 
                data-testid={`tier-filter-${k||"all"}`}
                style={{ 
                  padding:"4px 12px", 
                  borderRadius:20, 
                  fontSize:9, 
                  fontWeight:600, 
                  border:`1px solid ${active?(t?.color||"#E8592F"):"#1E293B"}`, 
                  background: active ? (t?.bg||"#E8592F15") : "transparent", 
                  color: active ? (t?.color||"#E8592F") : "#8896A8", 
                  cursor:"pointer", 
                  fontFamily:"'Outfit',sans-serif", 
                  letterSpacing:"0.06em", 
                  textTransform:"uppercase" 
                }}
              >
                {k?t.label:"All"}
              </button>
            );
          })}
          <span style={{ marginLeft:8, color:"#64748B", fontSize:10 }}>{filtered.length} items</span>
        </div>
        
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:20 }} key={anim}>
          {filtered.map((item,i)=>(
            <Card key={item.id} item={item} selected={!!sel[item.id]} onSelect={toggle} onDetail={setDetail}/>
          ))}
        </div>
        
        {filtered.length===0 && (
          <div style={{ textAlign:"center", padding:60, color:"#64748B" }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
            <div style={{ fontSize:16, fontWeight:600, marginBottom:8 }}>No matches</div>
            <div style={{ fontSize:12 }}>Try adjusting your search or tier filter.</div>
          </div>
        )}
      </main>
      
      {/* Build Drawer */}
      {drawer && (
        <div style={{ position:"fixed", right:0, top:0, bottom:0, width:360, background:"#0F172A", borderLeft:"1px solid #1E293B", padding:24, overflow:"auto", zIndex:100 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
            <h2 style={{ color:"#E8ECF2", fontSize:18, fontWeight:700, margin:0 }}>Your Build</h2>
            <span onClick={()=>setDrawer(false)} style={{ cursor:"pointer", color:"#8896A8", fontSize:16 }}>✕</span>
          </div>
          {selList.length===0
            ? <p style={{ color:"#64748B", fontSize:12 }}>No items yet. Browse and add equipment.</p>
            : (
              <div>
                {selList.map(item=>(
                  <div key={item.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 0", borderBottom:"1px solid #1E293B" }}>
                    <div>
                      <div style={{ color:"#E8ECF2", fontSize:12, fontWeight:600 }}>{item.name}</div>
                      <div style={{ color:"#64748B", fontSize:10 }}>${item.price.toLocaleString()}</div>
                    </div>
                    <span 
                      onClick={()=>toggle(item)} 
                      data-testid={`remove-${item.id}`}
                      style={{ cursor:"pointer", color:"#EF4444", fontSize:13, padding:3 }}
                    >
                      ✕
                    </span>
                  </div>
                ))}
                <div style={{ marginTop:20, paddingTop:16, borderTop:"1px solid #1E293B" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                    <span style={{ color:"#64748B", fontSize:11 }}>Items</span>
                    <span style={{ color:"#E8ECF2", fontSize:11, fontWeight:600 }}>{selList.length}</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
                    <span style={{ color:"#64748B", fontSize:11 }}>Total</span>
                    <span style={{ color:"#F4A623", fontSize:16, fontWeight:800 }}>${total.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={handleSaveBuild}
                    disabled={isSaving}
                    data-testid="save-build-btn"
                    style={{ 
                      width:"100%", 
                      padding:12, 
                      borderRadius:10, 
                      border:"none", 
                      background:"linear-gradient(135deg,#E8592F,#F4A623)", 
                      color:"#0B0F17", 
                      fontWeight:700, 
                      fontSize:11, 
                      cursor: isSaving ? "not-allowed" : "pointer", 
                      fontFamily:"'Outfit',sans-serif", 
                      textTransform:"uppercase", 
                      letterSpacing:"0.06em",
                      opacity: isSaving ? 0.7 : 1
                    }}
                  >
                    {isSaving ? "Saving..." : "Save Build"}
                  </button>
                </div>
              </div>
            )
          }
        </div>
      )}
      
      <Modal item={detail} selected={detail ? !!sel[detail.id] : false} onClose={()=>setDetail(null)} onSelect={toggle}/>
    </div>
  );
};

export default Showroom;
