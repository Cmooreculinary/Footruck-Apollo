import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";

const SHOWROOM_TRUCKS = [
  // FREE (first 10)
  { id: 1,  name: "The Copperhead",  chassis: "truck_01", category: "Classic",  style: "BBQ · Rustic",              price: "$2,400", locked: false },
  { id: 2,  name: "Midnight Runner", chassis: "truck_02", category: "Urban",    style: "Coffee · Minimal",          price: "$2,800", locked: false },
  { id: 3,  name: "The Baja King",   chassis: "truck_03", category: "Festival", style: "Mexican · Bold",            price: "$3,200", locked: false },
  { id: 4,  name: "Silver Dollar",   chassis: "truck_05", category: "Premium",  style: "Brunch · Upscale",          price: "$4,100", locked: false },
  { id: 5,  name: "The Iron Skillet",chassis: "truck_01", category: "Classic",  style: "Southern · Comfort",        price: "$2,600", locked: false },
  { id: 6,  name: "Coast Runner",    chassis: "truck_04", category: "Modern",   style: "Seafood · Fresh",           price: "$3,000", locked: false },
  { id: 7,  name: "Ember & Oak",     chassis: "truck_06", category: "Festival", style: "BBQ · Artisan",             price: "$2,900", locked: false },
  { id: 8,  name: "The Neon Spoon",  chassis: "truck_02", category: "Urban",    style: "Asian Fusion · Trendy",     price: "$2,750", locked: false },
  { id: 9,  name: "Desert Rose",     chassis: "truck_05", category: "Premium",  style: "Southwest · Elevated",      price: "$3,800", locked: false },
  { id: 10, name: "The Grid Iron",   chassis: "truck_03", category: "Classic",  style: "Burgers · American",        price: "$2,500", locked: false },

  // LOCKED (20 remaining)
  { id: 11, name: "La Llama Roja",   chassis: "truck_01", category: "Festival", style: "Latin · Vibrant",           price: "$2,700", locked: true },
  { id: 12, name: "The Gilded Fork", chassis: "truck_05", category: "Premium",  style: "French · Refined",          price: "$4,500", locked: true },
  { id: 13, name: "Blue Smoke",      chassis: "truck_03", category: "Classic",  style: "BBQ · Competition",         price: "$3,100", locked: true },
  { id: 14, name: "Tokyo Drift",     chassis: "truck_02", category: "Urban",    style: "Japanese · Street",         price: "$2,900", locked: true },
  { id: 15, name: "The Piedmont",    chassis: "truck_06", category: "Festival", style: "NC BBQ · Heritage",         price: "$2,800", locked: true },
  { id: 16, name: "Crescent City",   chassis: "truck_01", category: "Classic",  style: "Cajun · NOLA",              price: "$2,600", locked: true },
  { id: 17, name: "The Forge",       chassis: "truck_04", category: "Modern",   style: "Craft · Industrial",        price: "$3,300", locked: true },
  { id: 18, name: "Harvest Moon",    chassis: "truck_06", category: "Festival", style: "Farm-to-Truck · Seasonal",  price: "$3,000", locked: true },
  { id: 19, name: "Miami Vice",      chassis: "truck_02", category: "Urban",    style: "Cuban · Coastal",           price: "$2,850", locked: true },
  { id: 20, name: "The Smokehouse",  chassis: "truck_03", category: "Classic",  style: "BBQ · Texas",               price: "$3,200", locked: true },
  { id: 21, name: "Sakura Street",   chassis: "truck_04", category: "Modern",   style: "Japanese · Clean",          price: "$2,950", locked: true },
  { id: 22, name: "The Cardinal",    chassis: "truck_05", category: "Premium",  style: "Steakhouse · Bold",         price: "$4,200", locked: true },
  { id: 23, name: "Porch Light",     chassis: "truck_01", category: "Classic",  style: "Southern · Homestyle",      price: "$2,400", locked: true },
  { id: 24, name: "The Atlas",       chassis: "truck_03", category: "Modern",   style: "Global · Adventure",        price: "$3,100", locked: true },
  { id: 25, name: "Gold Rush",       chassis: "truck_06", category: "Festival", style: "California · Fresh",        price: "$2,700", locked: true },
  { id: 26, name: "The Vault",       chassis: "truck_05", category: "Premium",  style: "Speakeasy · Dark",          price: "$4,800", locked: true },
  { id: 27, name: "Rio Grande",      chassis: "truck_01", category: "Festival", style: "Tex-Mex · Fiesta",          price: "$2,550", locked: true },
  { id: 28, name: "The Workshop",    chassis: "truck_04", category: "Modern",   style: "Craft Beer · Casual",       price: "$3,000", locked: true },
  { id: 29, name: "Magnolia",        chassis: "truck_06", category: "Classic",  style: "Southern · Elegant",        price: "$2,900", locked: true },
  { id: 30, name: "The Summit",      chassis: "truck_02", category: "Premium",  style: "Mountain · Elevated",       price: "$3,600", locked: true },
];

const FILTERS = ["All", "Classic", "Modern", "Premium", "Festival", "Urban"];

const TruckShowroom = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = SHOWROOM_TRUCKS.filter(
    t => activeFilter === "All" || t.category === activeFilter
  );

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-zinc-100">

      {/* Hero Header */}
      <div
        className="relative overflow-hidden border-b border-[#2a2a2a]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.98) 100%), " +
            "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.03) 39px, rgba(255,255,255,0.03) 40px), " +
            "repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.03) 39px, rgba(255,255,255,0.03) 40px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-14">
          <Link
            to="/paint-shop"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Paint Shop
          </Link>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-none mb-3">
            The Showroom
          </h1>
          <p className="text-xl text-zinc-400 font-medium mb-3">
            <span className="text-[#EC5B13] font-bold">30</span> signature builds. Find yours.
          </p>
          <p className="text-sm text-zinc-600">
            First 10 are free. Unlock all 30 with a{" "}
            <span className="text-[#EC5B13] font-semibold">Showroom Pass</span>.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-5">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                activeFilter === f
                  ? "bg-[#EC5B13] border-[#EC5B13] text-white"
                  : "border-[#2a2a2a] text-zinc-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="text-xs text-zinc-600">
          Showing <span className="text-zinc-400 font-semibold">{filtered.length}</span> builds
        </p>
      </div>

      {/* Truck Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(truck => (
            <div
              key={truck.id}
              className="rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] overflow-hidden flex flex-col"
            >
              {/* Image area */}
              <div className="relative h-48 bg-[#0D0D0D] overflow-hidden">
                <img
                  src={`/trucks/${truck.chassis}.png`}
                  alt={truck.name}
                  className={`w-full h-full object-cover transition-all ${truck.locked ? "blur-sm scale-105" : ""}`}
                />
                {truck.locked && (
                  <>
                    <div
                      className="absolute inset-0"
                      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Lock className="w-8 h-8 text-white/60" />
                    </div>
                    <span className="absolute top-3 right-3 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#8b5cf6] text-white tracking-wider">
                      Showroom Pass
                    </span>
                  </>
                )}
                {!truck.locked && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#EC5B13]/20 text-[#EC5B13] border border-[#EC5B13]/30 tracking-wider">
                    {truck.category}
                  </span>
                )}
              </div>

              {/* Card body */}
              <div className="p-4 flex flex-col gap-3 flex-1">
                <div>
                  <h3 className={`text-base font-bold leading-tight ${truck.locked ? "text-zinc-500" : "text-white"}`}>
                    {truck.name}
                  </h3>
                  <p className="text-xs text-zinc-600 mt-0.5">{truck.style}</p>
                  {truck.locked && (
                    <span className="inline-block mt-1.5 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#8b5cf6]/10 text-[#8b5cf6] border border-[#8b5cf6]/20 tracking-wider">
                      {truck.category}
                    </span>
                  )}
                </div>

                {!truck.locked && (
                  <p className="text-xs font-semibold text-[#EC5B13]">
                    Build from {truck.price}
                  </p>
                )}

                <div className="mt-auto flex gap-2">
                  {truck.locked ? (
                    <Link
                      to="/pricing"
                      className="flex-1 py-2 text-xs font-semibold rounded-xl border border-[#8b5cf6]/40 text-[#8b5cf6] hover:bg-[#8b5cf6]/10 transition-colors text-center"
                    >
                      Unlock Showroom Pass
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => navigate("/paint-shop")}
                        className="flex-1 py-2 text-xs font-semibold rounded-xl bg-[#EC5B13] text-white hover:bg-[#d14a24] transition-colors"
                      >
                        Customize This
                      </button>
                      <button
                        disabled
                        className="flex-1 py-2 text-xs font-semibold rounded-xl border border-[#2a2a2a] text-zinc-600 flex items-center justify-center gap-1.5 cursor-not-allowed"
                        title="Coming soon"
                      >
                        <Lock className="w-3 h-3" />
                        Save to Garage
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unlock Banner */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] border-l-4 border-l-[#EC5B13] px-6 py-6">
          <div>
            <p className="text-base font-bold text-white">
              🔒 20 more builds locked
            </p>
            <p className="text-sm text-zinc-500 mt-1 max-w-md">
              Unlock the full Showroom — all 30 builds, new drops monthly.
            </p>
          </div>
          <Link
            to="/pricing"
            className="shrink-0 px-6 py-3 bg-[#EC5B13] text-white text-sm font-bold rounded-xl hover:bg-[#d14a24] transition-colors whitespace-nowrap"
          >
            Get Showroom Pass — $149
          </Link>
        </div>
      </div>

    </div>
  );
};

export default TruckShowroom;
