import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Paintbrush, ChefHat, Truck, Store, Calculator, Users, BarChart2, Compass, Timer, Sparkles } from "lucide-react";
import SEO from "@/components/SEO";

const HERO_BG = "https://images.unsplash.com/photo-1761205059493-77cd6961c875?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwxfHxmb29kJTIwdHJ1Y2slMjBnb2xkZW4lMjBob3VyJTIwcHJlbWl1bSUyMHN1bnNldHxlbnwwfHx8fDE3NzgyNzkwMjR8MA&ixlib=rb-4.1.0&q=85";
const FEATURE_IMG_1 = "https://images.unsplash.com/photo-1585736764233-fd792a9e0b27?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwzfHxmb29kJTIwdHJ1Y2slMjBuaWdodCUyMHVyYmFuJTIwY2luZW1hdGljfGVufDB8fHx8MTc3ODI3OTAxNnww&ixlib=rb-4.1.0&q=85";
const FEATURE_IMG_2 = "https://images.unsplash.com/photo-1602533438197-c9c47ae4b258?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHwzfHxjb21tZXJjaWFsJTIwa2l0Y2hlbiUyMHN0YWlubGVzcyUyMHN0ZWVsJTIwcHJvZmVzc2lvbmFsfGVufDB8fHx8MTc3ODI3OTAyNXww&ixlib=rb-4.1.0&q=85";
const FEATURE_IMG_3 = "https://images.unsplash.com/photo-1691882723060-49e59f9c5b13?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHw0fHxnb3VybWV0JTIwc3RyZWV0JTIwZm9vZCUyMHByZXBhcmF0aW9uJTIwY2xvc2UlMjB1cHxlbnwwfHx8fDE3NzgyNzkwMjV8MA&ixlib=rb-4.1.0&q=85";
const OG_IMAGE = "/og-image.png";

const features = [
  { icon: Paintbrush, title: "Truck Configurator", desc: "Design your dream truck with real-time color, wrap, and accessory previews. See every detail before you commit.", img: FEATURE_IMG_1 },
  { icon: ChefHat, title: "Kitchen Builder", desc: "Plan your mobile kitchen layout with drag-and-drop equipment placement and code compliance validation.", img: FEATURE_IMG_2 },
  { icon: Timer, title: "Day One Training", desc: "Interactive scenario-based simulations prepare you for rush hours, customer surges, and real-world decisions.", img: FEATURE_IMG_3 },
];

const tools = [
  { icon: Store, label: "Equipment Showroom" },
  { icon: Calculator, label: "Break-Even Analyzer" },
  { icon: Users, label: "Customer Profiling" },
  { icon: BarChart2, label: "Recipe Costing" },
  { icon: Compass, label: "Permits Navigator" },
  { icon: Truck, label: "Payroll Planning" },
];

const steps = [
  { num: "01", title: "Design Your Truck", desc: "Choose your chassis, pick colors and finishes, add wraps and accessories in our real-time configurator." },
  { num: "02", title: "Plan Your Kitchen", desc: "Layout your equipment, validate code compliance, and estimate your startup costs with precision." },
  { num: "03", title: "Master Your Numbers", desc: "Run break-even analysis, build recipes with real costing, and plan your payroll before Day One." },
  { num: "04", title: "Launch With Confidence", desc: "Navigate permits, train your crew, and simulate your first day with battle-tested scenarios." },
];

const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add("animate-fade-in-up"); observer.unobserve(el); }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`opacity-0 ${className}`}>{children}</div>;
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0d14] text-white overflow-hidden" data-testid="landing-page">
      <SEO title="Food Truck Launch Pad" description="The platform for serious food truck entrepreneurs. Design, plan, and launch your mobile food business with professional-grade tools." image={OG_IMAGE} url="/" />

      {/* === NAVIGATION === */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass" data-testid="main-nav">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#E8592F] flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-white">FTLP</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/paint-shop" className="text-sm text-zinc-400 hover:text-white transition-colors font-medium">Paint Shop</Link>
            <Link to="/showroom" className="text-sm text-zinc-400 hover:text-white transition-colors font-medium">Showroom</Link>
            <Link to="/pricing" className="text-sm text-zinc-400 hover:text-white transition-colors font-medium">Pricing</Link>
          </div>
          <Link to="/dashboard" className="flex items-center gap-2 px-5 py-2.5 bg-[#E8592F] hover:bg-[#d14a24] text-white text-sm font-semibold rounded-full transition-colors" data-testid="nav-get-started">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* === HERO === */}
      <section className="relative min-h-[100vh] flex items-end pb-20 pt-32" data-testid="hero-section">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover" loading="eager" fetchpriority="high" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/70 to-[#0a0d14]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0d14]/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E8592F]/30 bg-[#E8592F]/10 mb-8 animate-fade-in-up">
              <Sparkles className="w-3.5 h-3.5 text-[#E8592F]" />
              <span className="text-xs font-semibold text-[#E8592F] tracking-wide uppercase">Now with Real-Time Truck Configurator</span>
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6 animate-fade-in-up stagger-1">
              Build Your<br />
              <span className="text-gradient-warm">Food Truck</span><br />
              Empire
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-lg mb-10 animate-fade-in-up stagger-2">
              Professional-grade tools for designing your truck, planning your kitchen, and mastering your finances. From first sketch to opening day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-3">
              <Link to="/dashboard" className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#E8592F] hover:bg-[#d14a24] text-white font-bold rounded-full text-base transition-all hover:shadow-lg hover:shadow-[#E8592F]/20" data-testid="hero-cta-primary">
                Start Building Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link to="/paint-shop" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-full text-base transition-all" data-testid="hero-cta-secondary">
                <Paintbrush className="w-5 h-5" />
                Try the Paint Shop
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === SOCIAL PROOF BAR === */}
      <section className="relative border-y border-white/5 py-12 bg-[#0d1018]" data-testid="stats-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "14+", label: "Pro Tools" },
              { value: "60+", label: "Equipment Items" },
              { value: "6", label: "Truck Models" },
              { value: "7", label: "Launch Phases" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-heading text-4xl md:text-5xl font-extrabold text-gradient-warm mb-1">{s.value}</div>
                <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === FEATURES WITH IMAGES === */}
      <section className="py-24 px-6" data-testid="features-section">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="mb-20">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
                Everything you need.<br /><span className="text-zinc-500">Nothing you don't.</span>
              </h2>
            </div>
          </AnimatedSection>
          <div className="space-y-24">
            {features.map((f, i) => (
              <AnimatedSection key={i}>
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                  <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="w-14 h-14 rounded-2xl bg-[#E8592F]/10 border border-[#E8592F]/20 flex items-center justify-center mb-6">
                      <f.icon className="w-7 h-7 text-[#E8592F]" />
                    </div>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">{f.title}</h3>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-6">{f.desc}</p>
                    <Link to="/dashboard" className="inline-flex items-center gap-2 text-[#E8592F] font-semibold hover:gap-3 transition-all">
                      Explore this tool <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className={`relative rounded-2xl overflow-hidden aspect-[4/3] ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <img src={f.img} alt={f.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14]/60 to-transparent" />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* === HOW IT WORKS === */}
      <section className="py-24 px-6 bg-[#0d1018] border-y border-white/5" data-testid="process-section">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-20">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
                From dream to <span className="text-gradient-warm">Day One</span>
              </h2>
              <p className="text-zinc-500 text-lg max-w-xl mx-auto">A clear path from concept to your first customer.</p>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <AnimatedSection key={i} className={`stagger-${i + 1}`}>
                <div className="relative p-6 rounded-2xl border border-white/5 bg-[#0a0d14] hover:border-[#E8592F]/30 transition-colors group h-full">
                  <span className="font-heading text-5xl font-extrabold text-white/5 group-hover:text-[#E8592F]/10 transition-colors">{step.num}</span>
                  <h3 className="font-heading text-xl font-bold mt-2 mb-3">{step.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* === MORE TOOLS === */}
      <section className="py-24 px-6" data-testid="tools-section">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Plus a full suite of business tools</h2>
              <p className="text-zinc-500 text-lg">Everything an aspiring food truck owner needs, in one place.</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tools.map((t, i) => (
              <AnimatedSection key={i} className={`stagger-${i + 1}`}>
                <div className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#E8592F]/20 transition-all text-center group">
                  <div className="w-12 h-12 rounded-xl bg-[#E8592F]/10 flex items-center justify-center group-hover:bg-[#E8592F]/20 transition-colors">
                    <t.icon className="w-6 h-6 text-[#E8592F]" />
                  </div>
                  <span className="text-sm font-semibold text-zinc-300">{t.label}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="relative py-32 px-6 overflow-hidden" data-testid="final-cta">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E8592F]/5 to-[#E8592F]/10" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Ready to build<br />something <span className="text-gradient-warm">real</span>?
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
              Join the food truck owners who are designing, planning, and launching with confidence.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              {["Free to start", "No credit card", "Save your progress", "Professional tools"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-zinc-400 text-sm">
                  <Check className="w-4 h-4 text-[#E8592F]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Link to="/dashboard" className="group inline-flex items-center gap-3 px-10 py-5 bg-[#E8592F] hover:bg-[#d14a24] text-white font-bold rounded-full text-lg transition-all hover:shadow-xl hover:shadow-[#E8592F]/25" data-testid="final-cta-btn">
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="border-t border-white/5 py-12 px-6" data-testid="footer">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E8592F] flex items-center justify-center">
                <Truck className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading text-base font-bold text-white">Food Truck Launch Pad</span>
            </div>
            <div className="flex items-center gap-8">
              <Link to="/dashboard" className="text-sm text-zinc-500 hover:text-white transition-colors">Dashboard</Link>
              <Link to="/paint-shop" className="text-sm text-zinc-500 hover:text-white transition-colors">Paint Shop</Link>
              <Link to="/showroom" className="text-sm text-zinc-500 hover:text-white transition-colors">Showroom</Link>
              <Link to="/pricing" className="text-sm text-zinc-500 hover:text-white transition-colors">Pricing</Link>
            </div>
            <div className="text-xs text-zinc-600">&copy; {new Date().getFullYear()} Blue Collar Apps Co.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
