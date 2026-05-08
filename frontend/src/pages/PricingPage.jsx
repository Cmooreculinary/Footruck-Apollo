import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Check, Truck, Rocket, Crown, ArrowRight, Clock, Shield, Zap, Star, ChefHat, Store, Loader2, XCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/lib/api";

const plans = [
  {
    id: "standard",
    name: "Standard",
    icon: Rocket,
    description: "Everything you need to plan your food truck launch",
    firstMonth: 10,
    regular: 14,
    features: [
      "All 14 Launch Pad modules",
      "Equipment Showroom access",
      "Recipe Builder with PDF export",
      "Break-even calculator",
      "Customer profiling tools",
      "Cloud save & sync",
      "Email support",
    ],
    notIncluded: [
      "Kitchen Builder Pro features",
      "Paint Shop premium wraps",
      "Priority support",
      "Custom branding exports",
    ],
    color: "blue",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    icon: Crown,
    description: "Full power for serious food truck entrepreneurs",
    firstMonth: 15,
    regular: 20,
    features: [
      "Everything in Standard",
      "Kitchen Builder Pro features",
      "Paint Shop premium wraps & textures",
      "Advanced analytics dashboard",
      "Custom branding on PDF exports",
      "Priority email & chat support",
      "Early access to new features",
      "Unlimited saved designs",
    ],
    notIncluded: [],
    color: "orange",
    popular: true,
  },
];

const PricingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, login, user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isStartingTrial, setIsStartingTrial] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for payment success/cancel on page load
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const success = searchParams.get("success");
    const cancelled = searchParams.get("cancelled");

    if (sessionId && success) {
      // Poll for payment status
      pollPaymentStatus(sessionId);
    } else if (cancelled) {
      toast.error("Payment cancelled", { description: "You can try again anytime." });
      // Clear params
      navigate("/pricing", { replace: true });
    }
  }, [searchParams, navigate]);

  // Check subscription status on load
  useEffect(() => {
    const checkSubscription = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await apiClient.request("/api/subscription/status");
        setSubscription(response.subscription);
      } catch (error) {
        // No subscription
      } finally {
        setIsLoading(false);
      }
    };
    checkSubscription();
  }, [isAuthenticated]);

  const pollPaymentStatus = async (sessionId, attempts = 0) => {
    const maxAttempts = 10;
    const pollInterval = 2000;

    if (attempts >= maxAttempts) {
      toast.error("Payment verification timed out", { description: "Please check your email for confirmation." });
      navigate("/pricing", { replace: true });
      return;
    }

    try {
      const response = await apiClient.request(`/api/subscription/checkout/status/${sessionId}`);
      
      if (response.payment_status === "paid") {
        toast.success("Payment successful!", { 
          description: "Welcome to Food Truck Launch Pad! Your subscription is now active.",
          duration: 5000
        });
        navigate("/dashboard", { replace: true });
        return;
      } else if (response.status === "expired") {
        toast.error("Payment session expired", { description: "Please try again." });
        navigate("/pricing", { replace: true });
        return;
      }

      // Continue polling
      setTimeout(() => pollPaymentStatus(sessionId, attempts + 1), pollInterval);
    } catch (error) {
      console.error("Payment status error:", error);
      setTimeout(() => pollPaymentStatus(sessionId, attempts + 1), pollInterval);
    }
  };

  const handleStartTrial = async (planId) => {
    setSelectedPlan(planId);
    setIsStartingTrial(true);
    
    if (!isAuthenticated) {
      toast.info("Sign in to start your trial", { 
        description: "Create a free account to begin your 24-hour trial",
        action: {
          label: "Sign In",
          onClick: () => login()
        }
      });
      setIsStartingTrial(false);
      return;
    }

    try {
      const response = await apiClient.request("/api/subscription/start-trial", {
        method: "POST",
        body: JSON.stringify({ plan_id: planId })
      });
      
      const plan = plans.find(p => p.id === planId);
      toast.success(`${plan.name} Trial Started!`, { 
        description: "Your 24-hour free trial is now active. Enjoy full access!",
        duration: 5000
      });
      
      setSubscription(response.subscription);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to start trial", { description: error.message });
    } finally {
      setIsStartingTrial(false);
    }
  };

  const handleSubscribe = async (planId) => {
    setSelectedPlan(planId);
    setIsCheckingOut(true);
    
    if (!isAuthenticated) {
      toast.info("Sign in to subscribe", { 
        description: "Create a free account to continue",
        action: {
          label: "Sign In",
          onClick: () => login()
        }
      });
      setIsCheckingOut(false);
      return;
    }

    try {
      const response = await apiClient.request("/api/subscription/checkout", {
        method: "POST",
        body: JSON.stringify({ 
          plan_id: planId,
          origin_url: window.location.origin,
          is_first_month: true
        })
      });
      
      // Redirect to Stripe checkout
      if (response.url) {
        window.location.href = response.url;
      }
    } catch (error) {
      toast.error("Checkout failed", { description: error.message });
      setIsCheckingOut(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm("Are you sure you want to cancel your subscription?")) return;
    
    try {
      await apiClient.request("/api/subscription/cancel", { method: "POST" });
      toast.success("Subscription cancelled");
      setSubscription({ ...subscription, status: "cancelled" });
    } catch (error) {
      toast.error("Failed to cancel", { description: error.message });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d14] text-white">
      <SEO 
        title="Pricing - Food Truck Launch Pad"
        description="Choose your plan and start your 24-hour free trial. No credit card required. Standard from $10/mo, Pro from $15/mo."
        url="/pricing"
      />

      {/* Header */}
      <header className="glass sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-[#E8592F] flex items-center justify-center">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading text-lg font-bold">FTLP</span>
          </Link>
          <Link 
            to="/dashboard" 
            className="text-zinc-500 hover:text-white transition-colors text-sm font-medium"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-[#E8592F]/10 border border-[#E8592F]/30 rounded-full px-4 py-2 mb-6">
          <Clock className="w-4 h-4 text-[#E8592F]" />
          <span className="text-[#E8592F] text-sm font-semibold">24-Hour Free Trial • No Credit Card</span>
        </div>
        
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-zinc-500 text-lg max-w-2xl mx-auto mb-4">
          Start your food truck journey today. Try any plan free for 24 hours, 
          then continue at our introductory rate.
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-green-500" />
            No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-yellow-500" />
            Instant access
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-orange-500" />
            Cancel anytime
          </span>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border ${
                plan.popular 
                  ? "border-orange-500/50 bg-gradient-to-b from-orange-500/10 to-transparent" 
                  : "border-slate-700 bg-slate-800/30"
              } p-8 transition-all hover:border-opacity-100`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  plan.popular ? "bg-orange-500/20" : "bg-blue-500/20"
                }`}>
                  <plan.icon className={`w-6 h-6 ${plan.popular ? "text-orange-500" : "text-blue-500"}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-slate-400 text-sm">{plan.description}</p>
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold">${plan.firstMonth}</span>
                  <span className="text-slate-400">/first month</span>
                </div>
                <p className="text-slate-500 text-sm">
                  Then ${plan.regular}/month after trial
                </p>
              </div>

              {/* CTA Buttons */}
              {subscription?.status === "active" && subscription?.plan_id === plan.id ? (
                <div className="space-y-2">
                  <div className="w-full py-4 rounded-xl bg-green-500/20 border border-green-500/50 text-green-400 font-bold text-lg flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Current Plan
                  </div>
                  <button
                    onClick={handleCancelSubscription}
                    className="w-full py-2 text-slate-500 hover:text-red-400 text-sm transition-colors"
                  >
                    Cancel Subscription
                  </button>
                </div>
              ) : subscription?.status === "trial" && subscription?.plan_id === plan.id ? (
                <div className="space-y-2">
                  <div className="w-full py-4 rounded-xl bg-blue-500/20 border border-blue-500/50 text-blue-400 font-bold text-lg flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5" />
                    Trial Active
                  </div>
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={isCheckingOut && selectedPlan === plan.id}
                    className="w-full py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isCheckingOut && selectedPlan === plan.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : null}
                    Subscribe Now - ${plan.firstMonth}
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => handleStartTrial(plan.id)}
                    disabled={isStartingTrial && selectedPlan === plan.id}
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                      plan.popular
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-slate-700 hover:bg-slate-600 text-white"
                    } disabled:opacity-50`}
                  >
                    {isStartingTrial && selectedPlan === plan.id ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Starting Trial...
                      </>
                    ) : (
                      <>
                        Start Free Trial
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={isCheckingOut && selectedPlan === plan.id}
                    className="w-full py-3 border border-slate-600 hover:border-slate-500 rounded-lg text-sm font-medium text-slate-400 hover:text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isCheckingOut && selectedPlan === plan.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : null}
                    Skip Trial - Subscribe ${plan.firstMonth}
                  </button>
                </div>
              )}
              <p className="text-center text-slate-500 text-xs mt-3">
                24-hour free trial • No credit card required
              </p>

              {/* Features */}
              <div className="mt-8 pt-6 border-t border-slate-700">
                <p className="text-sm font-semibold text-slate-300 mb-4">What's included:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className={`w-5 h-5 shrink-0 mt-0.5 ${plan.popular ? "text-orange-500" : "text-blue-500"}`} />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.notIncluded.length > 0 && (
                  <>
                    <p className="text-sm font-semibold text-slate-500 mt-6 mb-3">Not included:</p>
                    <ul className="space-y-2">
                      {plan.notIncluded.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-500">
                          <span className="w-5 h-5 shrink-0 flex items-center justify-center">—</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16 px-4 bg-[#0d1018] border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">All Plans Include</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Store, title: "Equipment Showroom", desc: "Browse 60+ products with photorealistic images" },
              { icon: ChefHat, title: "Recipe Builder", desc: "Build and cost recipes with PDF export" },
              { icon: Truck, title: "Truck Design Tools", desc: "Paint Shop & Kitchen Builder access" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-orange-500" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "How does the 24-hour free trial work?",
                a: "Start your trial instantly with no credit card. You get full access to all features in your chosen plan for 24 hours. After the trial, you can subscribe to continue."
              },
              {
                q: "Can I switch plans later?",
                a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle."
              },
              {
                q: "What happens after the first month?",
                a: "After your introductory first month, your plan renews at the regular rate (Standard: $14/mo, Pro: $20/mo). You can cancel anytime before renewal."
              },
              {
                q: "Is my data safe?",
                a: "Absolutely. All your designs, recipes, and business plans are securely stored in the cloud and backed up regularly."
              },
            ].map((faq, i) => (
              <div key={i} className="bg-slate-800/30 rounded-xl p-5 border border-slate-700">
                <h4 className="font-semibold mb-2">{faq.q}</h4>
                <p className="text-slate-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 px-4 border-t border-slate-800">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-4">Ready to launch your food truck?</h3>
          <p className="text-slate-400 mb-6">Start your 24-hour free trial today. No credit card required.</p>
          <button
            onClick={() => handleStartTrial("pro")}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-slate-500 text-sm">
          <span>© {new Date().getFullYear()} Blue Collar Apps Co.</span>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;
