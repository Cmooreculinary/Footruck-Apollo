import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Truck, BookOpen, Palette, Users, Calculator, FileText, DollarSign, Utensils, Gauge, Timer, School, ClipboardList, Banknote, Compass, BarChart2, UserCircle, BookMarked, Paintbrush, ChefHat, LogIn, LogOut, User, Store, Settings, Camera } from "lucide-react";
import { Toaster } from "sonner";
import SEO from "@/components/SEO";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AuthCallback from "@/components/AuthCallback";

// Import pages
import LandingPage from "@/pages/LandingPage";
import DayOneSimulator from "@/pages/DayOneSimulator";
import SignatureDishDeveloper from "@/pages/SignatureDishDeveloper";
import CrewQuartersTraining from "@/pages/CrewQuartersTraining";
import DreamKitchen from "@/pages/DreamKitchen";
import TruckDesignStudio from "@/pages/TruckDesignStudio";
import PayrollPlanning from "@/pages/PayrollPlanning";
import ScalingPrepCalculator from "@/pages/ScalingPrepCalculator";
import PaperTrailPermits from "@/pages/PaperTrailPermits";
import BreakEvenAnalyzer from "@/pages/BreakEvenAnalyzer";
import TargetCustomerProfiling from "@/pages/TargetCustomerProfiling";
import RecipeBuilder from "@/pages/RecipeBuilder";
import PaintShop from "@/pages/PaintShop";
import KitchenBuilder from "@/pages/KitchenBuilder";
import KitchenOutfitter from "@/pages/KitchenOutfitter";
import PricingPage from "@/pages/PricingPage";
import TruckShowroom from "@/pages/TruckShowroom";

// Hero image for OG tags
const HERO_IMAGE = "https://images.unsplash.com/photo-1761205059493-77cd6961c875?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwxfHxmb29kJTIwdHJ1Y2slMjBnb2xkZW4lMjBob3VyJTIwcHJlbWl1bSUyMHN1bnNldHxlbnwwfHx8fDE3NzgyNzkwMjR8MA&ixlib=rb-4.1.0&q=85";

const Dashboard = () => {
  const { user, login, logout, loading, isAuthenticated } = useAuth();

  const categories = [
    {
      title: "Design & Build",
      desc: "Bring your truck to life",
      items: [
        { path: "/paint-shop", name: "Paint Shop", icon: Paintbrush, desc: "Real-time truck configurator with colors, wraps, and accessories", badge: "Popular" },
        { path: "/kitchen-builder", name: "Kitchen Builder", icon: ChefHat, desc: "Drag-and-drop equipment layout with compliance validation", badge: null },
        { path: "/kitchen-outfitter", name: "Equipment Showroom", icon: Store, desc: "Browse 60+ commercial products across 8 categories", badge: null },
        { path: "/truck-design", name: "Legacy Paint Shop", icon: Palette, desc: "Classic composite preview canvas with paint tools", badge: null },
      ],
    },
    {
      title: "Menu & Recipes",
      desc: "Perfect your offerings",
      items: [
        { path: "/signature-dish", name: "Signature Dish", icon: Utensils, desc: "Hero item creation with narrative, ingredients, and imagery", badge: null },
        { path: "/recipe-builder", name: "Recipe Builder", icon: BookMarked, desc: "Full recipe editor with ingredient costing and step-by-step method", badge: null },
        { path: "/scaling-prep", name: "Scaling Calculator", icon: Calculator, desc: "Ingredient matrix with batch scaling and cost-per-unit analysis", badge: null },
      ],
    },
    {
      title: "Business Planning",
      desc: "Know your numbers",
      items: [
        { path: "/break-even", name: "Break-Even Analyzer", icon: BarChart2, desc: "Financial modeling with cost inputs, revenue projections", badge: null },
        { path: "/target-customer", name: "Customer Profiling", icon: UserCircle, desc: "Build target customer archetypes with demographics", badge: null },
        { path: "/dream-kitchen", name: "Readiness Assessment", icon: ClipboardList, desc: "Tailored roadmap, risk analysis, and capital forecast", badge: null },
      ],
    },
    {
      title: "Operations",
      desc: "Run like a pro",
      items: [
        { path: "/day-one", name: "Day One Simulator", icon: Timer, desc: "Interactive rush-hour training with live decision metrics", badge: null },
        { path: "/crew-quarters", name: "Crew Training", icon: School, desc: "HACCP, sanitization, customer service standards", badge: null },
        { path: "/payroll", name: "Payroll Planning", icon: Banknote, desc: "Shift grid, wage compliance, labor analytics", badge: null },
        { path: "/paper-trail", name: "Permits Navigator", icon: Compass, desc: "Federal, health, city permits with progress tracking", badge: null },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0d14] text-zinc-100" data-testid="dashboard">
      <SEO 
        title="Dashboard - Food Truck Launch Pad"
        description="Your food truck command center. Design, plan, and launch your mobile food business."
        url="/dashboard"
      />

      {/* Nav */}
      <nav className="sticky top-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 rounded-lg bg-[#E8592F] flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight">FTLP</span>
          </Link>
          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />
            ) : isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full pl-1 pr-4 py-1">
                  {user.picture ? (
                    <img src={user.picture} alt={user.name} className="w-7 h-7 rounded-full" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#E8592F]/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-[#E8592F]" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-white">{user.name?.split(' ')[0]}</span>
                </div>
                <button onClick={logout} className="text-sm text-zinc-500 hover:text-white transition-colors font-medium" data-testid="logout-btn">
                  Sign Out
                </button>
              </div>
            ) : (
              <button onClick={login} className="flex items-center gap-2 px-5 py-2.5 bg-[#E8592F] text-white rounded-full text-sm font-semibold hover:bg-[#d14a24] transition-colors" data-testid="login-btn">
                <LogIn className="w-4 h-4" /> Sign In with Google
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight mb-2">Your Launch Pad</h1>
        <p className="text-zinc-500 text-lg max-w-lg">Everything you need to design, plan, and launch your food truck business.</p>
      </div>

      {/* Category Sections */}
      <div className="max-w-7xl mx-auto px-6 pb-16 space-y-12">
        {categories.map((cat, ci) => (
          <section key={ci}>
            <div className="flex items-baseline gap-3 mb-5">
              <h2 className="font-heading text-xl font-bold text-white">{cat.title}</h2>
              <span className="text-sm text-zinc-600">{cat.desc}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cat.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group relative p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#E8592F]/30 transition-all"
                  >
                    {item.badge && (
                      <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E8592F]/15 text-[#E8592F] border border-[#E8592F]/20">{item.badge}</span>
                    )}
                    <div className="w-11 h-11 rounded-xl bg-[#E8592F]/10 flex items-center justify-center mb-4 group-hover:bg-[#E8592F]/20 transition-colors">
                      <Icon className="w-5 h-5 text-[#E8592F]" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-white mb-1.5 group-hover:text-[#E8592F] transition-colors">{item.name}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="border-t border-white/5 pt-8 flex items-center justify-between text-xs text-zinc-600">
          <p>&copy; {new Date().getFullYear()} Blue Collar Apps Co.</p>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Handle auth callback in hash
const AppContent = () => {
  const location = useLocation();
  
  // Check if this is an auth callback
  if (location.hash?.includes('session_id=')) {
    return <AuthCallback />;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dream-kitchen" element={<DreamKitchen />} />
      <Route path="/day-one" element={<DayOneSimulator />} />
      <Route path="/signature-dish" element={<SignatureDishDeveloper />} />
      <Route path="/crew-quarters" element={<CrewQuartersTraining />} />
      <Route path="/truck-design" element={<TruckDesignStudio />} />
      <Route path="/payroll" element={<PayrollPlanning />} />
      <Route path="/scaling-prep" element={<ScalingPrepCalculator />} />
      <Route path="/paper-trail" element={<PaperTrailPermits />} />
      <Route path="/break-even" element={<BreakEvenAnalyzer />} />
      <Route path="/target-customer" element={<TargetCustomerProfiling />} />
      <Route path="/recipe-builder" element={<RecipeBuilder />} />
      <Route path="/paint-shop" element={<PaintShop />} />
      <Route path="/kitchen-builder" element={<KitchenBuilder />} />
      <Route path="/kitchen-outfitter" element={<KitchenOutfitter />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/truck-showroom" element={<TruckShowroom />} />
    </Routes>
  );
};

function App() {
  return (
    <div className="dark">
      <Toaster 
        position="top-right" 
        richColors 
        closeButton
        theme="dark"
        toastOptions={{
          style: {
            background: '#1a1714',
            border: '1px solid #2e2820',
            color: '#fff',
          },
        }}
      />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
