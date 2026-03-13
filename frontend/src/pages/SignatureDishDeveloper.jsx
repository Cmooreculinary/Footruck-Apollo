import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Utensils, ChevronRight, BookOpen, Camera, Lightbulb, Trash2, Eye, Upload } from "lucide-react";
import SEO from "@/components/SEO";

const SignatureDishDeveloper = () => {
  const [dishName, setDishName] = useState("");
  const [narrative, setNarrative] = useState("");
  const [primaryComponent, setPrimaryComponent] = useState("");
  const [xFactor, setXFactor] = useState("");
  const [flavorProfiles, setFlavorProfiles] = useState(["SMOKY", "UMAMI", "CRUNCHY"]);

  const addFlavorProfile = () => {
    const profile = prompt("Enter flavor profile:");
    if (profile) {
      setFlavorProfiles([...flavorProfiles, profile.toUpperCase()]);
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-dark font-work text-slate-100 antialiased">
      <SEO 
        title="Signature Dish Developer"
        description="Create your food truck's hero item with industrial-luxe precision. Build dish narratives, highlight ingredients, and craft your brand's calling card."
        url="/signature-dish"
      />
      {/* Header */}
      <header className="flex items-center justify-between border-b border-industrial-gray px-6 lg:px-10 py-3 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-primary">
            <Utensils className="w-8 h-8" />
            <h2 className="text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">Food Truck Launch Pad</h2>
          </div>
          <nav className="hidden md:flex items-center gap-9">
            <Link to="/" className="text-slate-100 hover:text-primary transition-colors text-sm font-medium">Dashboard</Link>
            <a href="#" className="text-slate-100 hover:text-primary transition-colors text-sm font-medium">Menu Builder</a>
            <a href="#" className="text-slate-100 hover:text-primary transition-colors text-sm font-medium">Location Finder</a>
            <a href="#" className="text-slate-100 hover:text-primary transition-colors text-sm font-medium">Analytics</a>
          </nav>
        </div>
        <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary-dark text-white text-sm font-bold transition-all hover:brightness-110 active:scale-95">
          Save Progress
        </button>
      </header>

      {/* Main */}
      <main className="flex-1 px-4 lg:px-40 py-8">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap gap-2 items-center mb-6 text-slate-400">
          <Link to="/" className="hover:text-primary transition-colors text-sm font-medium">Phase 3: IRON CHEF</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="hover:text-primary transition-colors text-sm font-medium">Signature Dish Developer</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-100 text-sm font-medium">Create New Hero Item</span>
        </nav>

        {/* Title Section */}
        <div className="flex flex-wrap justify-between items-end gap-6 mb-12">
          <div className="flex flex-col gap-2">
            <h1 className="text-slate-100 text-5xl font-black leading-tight tracking-tight uppercase">
              Signature Dish <span className="text-primary-dark">Developer</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              Perfect your food truck's hero item with industrial-luxe precision. Your signature dish is your brand's calling card.
            </p>
          </div>
          <button className="flex min-w-[160px] cursor-pointer items-center justify-center gap-2 rounded-lg h-12 px-6 bg-industrial-gray text-white text-sm font-bold border border-steel hover:bg-steel transition-colors">
            <Eye className="w-5 h-5" />
            <span>Preview on Menu</span>
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-10">
            {/* Dish Narrative */}
            <section className="bg-industrial-gray/20 p-8 rounded-xl border border-industrial-gray" data-testid="dish-narrative-section">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-primary-dark" />
                <h2 className="text-primary-dark text-2xl font-bold uppercase tracking-wider">Dish Narrative</h2>
              </div>
              <div className="flex flex-col gap-4">
                <label className="flex flex-col gap-2">
                  <p className="text-slate-100 text-base font-semibold">The Story Behind the Dish</p>
                  <textarea
                    value={narrative}
                    onChange={(e) => setNarrative(e.target.value)}
                    className="w-full rounded-lg text-slate-100 focus:ring-primary/50 border border-steel bg-background-dark/50 focus:border-primary min-h-40 placeholder:text-slate-500 p-4 text-base leading-relaxed outline-none"
                    placeholder="Describe the inspiration, heritage, and unique flair of this signature item..."
                    data-testid="dish-narrative-input"
                  />
                </label>
              </div>
            </section>

            {/* Ingredient Highlights */}
            <section className="bg-industrial-gray/20 p-8 rounded-xl border border-industrial-gray" data-testid="ingredient-section">
              <div className="flex items-center gap-3 mb-6">
                <Utensils className="w-6 h-6 text-primary-dark" />
                <h2 className="text-primary-dark text-2xl font-bold uppercase tracking-wider">Ingredient Highlights</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold uppercase tracking-tighter text-slate-400">Primary Component</p>
                  <input
                    type="text"
                    value={primaryComponent}
                    onChange={(e) => setPrimaryComponent(e.target.value)}
                    className="bg-background-dark/50 border border-steel focus:border-primary rounded-lg text-slate-100 px-4 py-3 outline-none"
                    placeholder="e.g. 48-hour Braised Short Rib"
                    data-testid="primary-component-input"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold uppercase tracking-tighter text-slate-400">The 'X' Factor</p>
                  <input
                    type="text"
                    value={xFactor}
                    onChange={(e) => setXFactor(e.target.value)}
                    className="bg-background-dark/50 border border-steel focus:border-primary rounded-lg text-slate-100 px-4 py-3 outline-none"
                    placeholder="e.g. House-made Yuzu Chimichurri"
                    data-testid="x-factor-input"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <p className="text-sm font-semibold uppercase tracking-tighter text-slate-400">Flavor Profile Notes</p>
                  <div className="flex gap-2 flex-wrap">
                    {flavorProfiles.map((profile, index) => (
                      <span key={index} className="px-3 py-1 bg-primary-dark/20 border border-primary-dark/40 rounded-full text-xs font-bold text-primary-dark">
                        {profile}
                      </span>
                    ))}
                    <button 
                      onClick={addFlavorProfile}
                      className="px-3 py-1 border border-dashed border-steel rounded-full text-xs font-bold text-slate-500 hover:text-slate-300 hover:border-slate-300 transition-colors"
                      data-testid="add-profile-btn"
                    >
                      + ADD PROFILE
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Photo Upload */}
          <div className="space-y-10">
            <section className="bg-industrial-gray/20 p-8 rounded-xl border border-industrial-gray h-full flex flex-col" data-testid="photo-section">
              <div className="flex items-center gap-3 mb-6">
                <Camera className="w-6 h-6 text-primary-dark" />
                <h2 className="text-primary-dark text-2xl font-bold uppercase tracking-wider">Visual Presentation</h2>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex flex-col gap-2 mb-6">
                  <p className="text-slate-100 text-base font-semibold">Hero Shot</p>
                  <p className="text-slate-500 text-xs">Upload a high-resolution photo that captures the textures and colors of the dish.</p>
                </div>
                <div className="relative flex-1 min-h-[300px] border-2 border-dashed border-steel rounded-xl flex flex-col items-center justify-center bg-background-dark/30 hover:bg-background-dark/50 transition-all cursor-pointer group">
                  <Upload className="w-12 h-12 text-steel group-hover:text-primary transition-colors mb-4" />
                  <p className="text-slate-400 font-medium group-hover:text-slate-200">Drop image here or click to browse</p>
                  <p className="text-slate-600 text-xs mt-2 uppercase tracking-widest">JPG, PNG up to 10MB</p>
                </div>
                <div className="mt-10 p-6 bg-background-dark/80 rounded-lg border border-primary-dark/20 italic text-slate-400 text-sm relative">
                  <div className="absolute -top-3 -left-3 bg-primary-dark text-white rounded-full p-1">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  "Lighting is the secret ingredient. Use natural side-light to emphasize the texture of the glaze and the crust of the protein."
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 pt-8 border-t border-industrial-gray flex justify-between items-center">
          <button className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Discard Draft
          </button>
          <div className="flex gap-4">
            <button className="px-8 py-3 rounded-lg border border-steel text-slate-100 font-bold hover:bg-industrial-gray transition-colors" data-testid="save-draft-btn">
              Save as Draft
            </button>
            <button className="px-8 py-3 rounded-lg bg-primary-dark text-white font-bold hover:brightness-110 shadow-lg shadow-primary-dark/20 transition-all" data-testid="publish-btn">
              Publish to Menu
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 lg:px-40 py-10 bg-background-dark text-slate-600 text-xs uppercase tracking-[0.2em] border-t border-industrial-gray mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2024 Industrial Luxe Systems</p>
          <div className="flex gap-8">
            <a className="hover:text-primary transition-colors" href="#">Privacy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">Chef Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignatureDishDeveloper;
