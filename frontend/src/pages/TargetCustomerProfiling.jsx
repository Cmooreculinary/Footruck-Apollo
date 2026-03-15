import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Briefcase, GraduationCap, Camera, PartyPopper, UsersRound, Plus, Check, Download, User, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { apiClient } from "@/lib/api";

const archetypes = [
  { id: "corporate", icon: Briefcase, title: "Corporate Worker", desc: "Short lunch breaks, higher disposable income, values speed.", persona: "The Power Luncher", estSpend: "$15 – $22", peakTime: "11:30 – 13:30", drivers: ["Fast Service", "Healthy", "Quality"], painPoints: ["Long wait times", "Heavy/greasy food", "No seating available"] },
  { id: "student", icon: GraduationCap, title: "Student", desc: "Budget-conscious, late-night hours, social dining.", persona: "The Campus Cruiser", estSpend: "$8 – $12", peakTime: "17:00 – 22:00", drivers: ["Affordable", "Large Portions", "Late Hours"], painPoints: ["Limited budget", "Boring options", "Long lines"] },
  { id: "tourist", icon: Camera, title: "Tourist / Visitor", desc: "Experiential dining, weekend peaks, higher spend.", persona: "The Foodie Explorer", estSpend: "$18 – $28", peakTime: "12:00 – 20:00", drivers: ["Unique Experience", "Photo-worthy", "Local Flavor"], painPoints: ["Hard to find", "No reviews", "Language barriers"] },
  { id: "event", icon: PartyPopper, title: "Event Goer", desc: "Captive audience, quick service needed, mood-based.", persona: "The Festival Fan", estSpend: "$12 – $18", peakTime: "Event Hours", drivers: ["Convenience", "Quick Service", "Comfort Food"], painPoints: ["Long queues", "Limited options", "High prices"] },
  { id: "families", icon: UsersRound, title: "Families", desc: "Group ordering, kid-friendly options, weekends.", persona: "The Weekend Warrior", estSpend: "$35 – $55", peakTime: "11:00 – 15:00", drivers: ["Kid-Friendly", "Value", "Seating"], painPoints: ["Messy food", "No kids menu", "Slow service"] },
];

const incomeLabels = ["$", "$$", "$$$", "$$$$"];

const TargetCustomerProfiling = () => {
  const [selectedArchetypes, setSelectedArchetypes] = useState(["corporate"]);
  const [ageRange, setAgeRange] = useState([24, 45]);
  const [incomeLevel, setIncomeLevel] = useState(2);
  const [isSaving, setIsSaving] = useState(false);

  const toggleArchetype = (id) => {
    if (selectedArchetypes.includes(id)) {
      setSelectedArchetypes(selectedArchetypes.filter(a => a !== id));
    } else {
      setSelectedArchetypes([...selectedArchetypes, id]);
    }
  };

  const handleSaveProfile = async () => {
    if (selectedArchetypes.length === 0) {
      toast.error("Select at least one archetype", { description: "Choose a customer type to save your profile." });
      return;
    }
    setIsSaving(true);
    try {
      await apiClient.saveCustomerProfile({
        archetypes: selectedArchetypes,
        age_range: ageRange,
        income_level: incomeLevel,
      });
      toast.success("Profile saved!", { description: "Your target customer profile has been saved." });
    } catch (error) {
      toast.error("Failed to save", { description: "Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadPDF = () => {
    toast.info("PDF export coming soon", { description: "This feature is in development." });
  };

  const primaryArchetype = archetypes.find(a => a.id === selectedArchetypes[0]) || archetypes[0];

  return (
    <div className="bg-background-dark font-display text-slate-100 min-h-screen">
      <SEO 
        title="Target Customer Profiling"
        description="Define your ideal food truck customer. Build customer archetypes, set demographics, and generate real-time persona profiles."
        url="/target-customer"
      />
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border-col bg-surface flex flex-col shrink-0">
          <div className="p-5 border-b border-border-col flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-primary rounded-sm"></div>
              <div className="w-3 h-3 bg-primary/50 rounded-sm"></div>
            </div>
            <h2 className="font-bold text-white">Food Truck Launchpad</h2>
          </div>
          <div className="p-4 flex-1">
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-4 px-2">Workshop Phases</p>
            <nav className="space-y-1">
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 text-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18c-4.51 2-5-2-7-2l2-2c1-1 2-1 3 0 1.5 1.5 3.5 1.5 5 0 1-1 2-1 3 0l2 2c-2 0-2.49 4-7 2" /><circle cx="12" cy="9" r="4" /></svg>
                <span>1. Concept Definition</span>
                <Check className="ml-auto w-4 h-4 text-emerald-400" />
              </div>
              <div className="px-3 py-2.5 rounded-lg bg-primary/15 border border-primary/30">
                <div className="flex items-center gap-3 text-primary font-bold text-sm mb-2">
                  <Users className="w-5 h-5" />
                  <span>2. Target Profiling</span>
                </div>
                <div className="ml-8 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-white"><span className="size-1.5 rounded-full bg-primary inline-block"></span> Demographics</div>
                  <div className="flex items-center gap-2 text-xs text-slate-400"><span className="size-1.5 rounded-full bg-border-col inline-block"></span> Psychographics</div>
                  <div className="flex items-center gap-2 text-xs text-slate-400"><span className="size-1.5 rounded-full bg-border-col inline-block"></span> Dining Habits</div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 text-sm opacity-60">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19h16M4 15h16M4 11h16M4 7h16"/></svg>
                <span>3. Menu Design</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 text-sm opacity-60">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                <span>4. Business Plan</span>
              </div>
            </nav>
          </div>
          <div className="p-4 border-t border-border-col">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-slate-500">Workshop Progress</p>
              <p className="text-xs font-bold text-primary">35%</p>
            </div>
            <div className="w-full h-1.5 bg-border-col rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{width: '35%'}}></div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto p-8">
            {/* Breadcrumb + Header */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <span className="text-primary font-bold uppercase tracking-wider">Module 2</span>
              <span>›</span>
              <span className="uppercase tracking-wider">Target Customer Profiling</span>
            </div>
            <h1 className="text-4xl font-black text-white mb-2">Define Your Ideal Customer</h1>
            <p className="text-slate-400 mb-8">Build the archetype of the person waiting in line at your truck.</p>

            {/* Core Archetypes */}
            <div className="bg-surface border border-border-col rounded-xl p-6 mb-6" data-testid="archetypes-section">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="size-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-black text-primary">01</span>
                  <h2 className="font-bold text-lg">Core Archetypes</h2>
                </div>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Multiple Choice</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {archetypes.map((arch) => {
                  const Icon = arch.icon;
                  const isSelected = selectedArchetypes.includes(arch.id);
                  return (
                    <div
                      key={arch.id}
                      onClick={() => toggleArchetype(arch.id)}
                      className={`relative cursor-pointer rounded-xl p-5 transition-colors ${
                        isSelected 
                          ? 'border-2 border-primary bg-primary/5' 
                          : 'border border-border-col hover:border-primary/50'
                      }`}
                      data-testid={`archetype-${arch.id}`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 size-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <Icon className={`w-7 h-7 mb-3 ${isSelected ? 'text-primary' : 'text-slate-400'}`} />
                      <h3 className="font-bold text-white mb-1">{arch.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{arch.desc}</p>
                    </div>
                  );
                })}
                <div className="border-2 border-dashed border-border-col rounded-xl p-5 cursor-pointer hover:border-primary/50 transition-colors flex items-center justify-center gap-2 text-slate-500 hover:text-slate-300">
                  <Plus className="w-6 h-6" />
                  <span className="font-bold">Add Custom</span>
                </div>
              </div>
            </div>

            {/* Demographic Details */}
            <div className="bg-surface border border-border-col rounded-xl p-6" data-testid="demographics-section">
              <div className="flex items-center gap-3 mb-5">
                <span className="size-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-black text-primary">02</span>
                <h2 className="font-bold text-lg">Demographic Details</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Target Age Range</p>
                    <p className="text-sm font-bold text-primary">{ageRange[0]} – {ageRange[1]} yrs</p>
                  </div>
                  <input 
                    className="w-full accent-primary" 
                    type="range" 
                    min="16" 
                    max="65" 
                    value={ageRange[1]}
                    onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>16</span><span>25</span><span>35</span><span>45</span><span>55</span><span>65+</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Disposable Income Level</p>
                    <p className="text-sm font-bold text-primary">{incomeLabels[incomeLevel]} ({['Low', 'Medium', 'High', 'Premium'][incomeLevel]})</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {incomeLabels.map((label, idx) => (
                      <button
                        key={label}
                        onClick={() => setIncomeLevel(idx)}
                        className={`py-2 border rounded-lg text-xs font-bold transition-colors ${
                          incomeLevel === idx 
                            ? 'border-2 border-primary text-primary bg-primary/10' 
                            : 'border-border-col text-slate-500 hover:border-primary/50'
                        }`}
                        data-testid={`income-${label}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Profile Preview Panel */}
          <aside className="w-72 border-l border-border-col bg-surface flex flex-col shrink-0 overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Profile Preview</p>
                <p className="text-xs text-slate-400">Updates in real-time</p>
              </div>
              <User className="w-5 h-5 text-primary" />
            </div>
            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
              <div className="size-20 rounded-full border-4 border-primary/50 bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center mb-3 overflow-hidden">
                <User className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="font-bold text-white text-lg">"{primaryArchetype.persona}"</h3>
              <p className="text-primary text-sm font-medium">{primaryArchetype.title}</p>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-background-dark rounded-xl p-4">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Est. Spend</p>
                <p className="text-xl font-black text-white">{primaryArchetype.estSpend}</p>
              </div>
              <div className="bg-background-dark rounded-xl p-4">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Peak Time</p>
                <p className="text-xl font-black text-white">{primaryArchetype.peakTime}</p>
              </div>
            </div>
            {/* Key Drivers */}
            <div className="mb-5">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">Key Drivers</p>
              <div className="flex flex-wrap gap-2">
                {primaryArchetype.drivers.map((driver, idx) => (
                  <span key={idx} className="px-3 py-1 bg-background-dark border border-border-col rounded-full text-xs font-bold text-slate-300">{driver}</span>
                ))}
              </div>
            </div>
            {/* Pain Points */}
            <div className="mb-6">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">Pain Points</p>
              <ul className="space-y-1 text-sm text-slate-400 list-disc list-inside">
                {primaryArchetype.painPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
            <button 
              onClick={handleDownloadPDF}
              className="w-full py-3 border border-border-col rounded-xl text-sm font-bold text-slate-300 flex items-center justify-center gap-2 hover:bg-white/5 transition-colors" 
              data-testid="download-persona-btn"
            >
              <Download className="w-5 h-5" /> Download Persona PDF
            </button>
            <button 
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="w-full py-3 bg-primary rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 mt-3" 
              data-testid="save-profile-btn"
            >
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isSaving ? "Saving..." : "Save Profile"}
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TargetCustomerProfiling;
