import React from "react";
import { Link } from "react-router-dom";
import { Rocket, ChefHat, Truck, Store, Calculator, Users, ArrowRight, Check, Sparkles } from "lucide-react";
import SEO from "@/components/SEO";

const HERO_IMAGE = "https://ftlp-showroom-dev.preview.emergentagent.com/og-image.png";

const features = [
  { icon: Store, title: "Equipment Showroom", desc: "60+ commercial products across 8 categories with photorealistic previews" },
  { icon: Truck, title: "Paint Shop Configurator", desc: "Design your truck exterior with colors, wraps, and accessories" },
  { icon: ChefHat, title: "Kitchen Builder", desc: "Drag-and-drop equipment layout with compliance validation" },
  { icon: Calculator, title: "Financial Tools", desc: "Break-even analysis, recipe costing, and payroll planning" },
  { icon: Users, title: "Customer Profiling", desc: "Build target customer archetypes with demographics" },
  { icon: Rocket, title: "Day One Simulator", desc: "Interactive scenario training for rush hour decisions" },
];

const stats = [
  { value: "14", label: "Feature Modules" },
  { value: "60+", label: "Equipment Items" },
  { value: "8", label: "Categories" },
  { value: "7", label: "Launch Phases" },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0d14] text-white overflow-hidden">
      <SEO 
        title="Food Truck Launch Pad"
        description="The ultimate platform for food truck entrepreneurs. From concept to Day One - design your truck, plan your kitchen, master your finances."
        image={HERO_IMAGE}
        url="/"
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
        
        {/* Hero Image */}
        <div className="relative z-10 mb-8 max-w-3xl w-full">
          <img 
            src={HERO_IMAGE} 
            alt="Food Truck Launch Pad" 
            className="w-full h-auto drop-shadow-2xl"
            style={{ filter: "drop-shadow(0 0 60px rgba(59, 130, 246, 0.3))" }}
          />
        </div>
        
        {/* CTA */}
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            The ultimate platform for food truck entrepreneurs. From concept to Day One — design your truck, plan your kitchen, master your finances.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/dashboard" 
              className="group flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-orange-500/25"
            >
              Launch Your Truck
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/showroom" 
              className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all border border-slate-700"
            >
              <Store className="w-5 h-5" />
              Browse Equipment
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-slate-500 rounded-full animate-pulse" />
          </div>
        </div>
      </section>
      
      {/* Stats Bar */}
      <section className="bg-slate-900/50 border-y border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">{stat.value}</div>
                <div className="text-slate-400 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Launch</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Industrial-grade tools designed specifically for food truck entrepreneurs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="group p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-800 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-t from-orange-900/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-orange-400 text-sm font-semibold">Now with Photorealistic Equipment</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Build Your<br/>
            <span className="text-orange-500">Mobile Food Empire?</span>
          </h2>
          
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of food truck entrepreneurs who trust our platform to design, plan, and launch their mobile culinary dreams.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {["Free to Start", "14 Feature Modules", "Cloud Saved Progress", "No Credit Card Required"].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-300">
                <Check className="w-5 h-5 text-green-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/dashboard" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-10 rounded-xl text-xl transition-all transform hover:scale-105 shadow-lg shadow-orange-500/25"
            >
              Get Started Free
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link 
              to="/pricing" 
              className="text-slate-400 hover:text-white transition-colors font-medium"
            >
              View Pricing →
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-orange-500" />
            <span className="font-bold text-slate-300">Food Truck Launch Pad</span>
          </div>
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Blue Collar Apps Co. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors">Dashboard</Link>
            <Link to="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link>
            <Link to="/showroom" className="text-slate-400 hover:text-white transition-colors">Showroom</Link>
            <Link to="/paint-shop" className="text-slate-400 hover:text-white transition-colors">Paint Shop</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
