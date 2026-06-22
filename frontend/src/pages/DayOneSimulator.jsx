import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Truck, ChevronLeft, ChevronRight, Check, Timer, Lock, Brain, Award, Smile, Gauge, CreditCard, Sun, Utensils, Zap, Loader2 } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { apiClient } from "@/lib/api";

const scenarios = [
  {
    id: 1,
    title: "Long line forming - what do you do?",
    stressLevel: 3,
    options: [
      { id: "A", title: "Stop taking orders", desc: "Focus entirely on the current tickets until the queue is cleared.", correct: false },
      { id: "B", title: "Streamline the menu", desc: "Temporarily offer only 'Best Sellers' to speed up the kitchen output.", correct: true },
      { id: "C", title: "Hand out samples", desc: "Keep the customers in line engaged and happy while they wait.", correct: false },
      { id: "D", title: "Call for backup", desc: "Activate your on-call team member to assist with front-of-house window.", correct: false },
    ],
    feedback: "Streamlining the menu reduces complexity in the kitchen by 40%. This is the most effective way to handle a massive surge without sacrificing quality."
  },
  {
    id: 2,
    title: "Customer complains food is cold - your move?",
    stressLevel: 2,
    options: [
      { id: "A", title: "Offer a refund", desc: "Immediately refund and apologize for the inconvenience.", correct: false },
      { id: "B", title: "Remake the order", desc: "Rush a fresh, hot replacement to the customer with priority.", correct: true },
      { id: "C", title: "Explain the situation", desc: "Tell them the rush is affecting timing and they should be patient.", correct: false },
      { id: "D", title: "Offer a discount", desc: "Give them 20% off their next visit as compensation.", correct: false },
    ],
    feedback: "Remaking the order immediately shows commitment to quality. A fresh hot replacement usually wins back customer trust better than refunds."
  },
  {
    id: 3,
    title: "Your fryer just went down mid-service. What's your first move?",
    stressLevel: 5,
    options: [
      { id: "A", title: "Close the truck", desc: "Shut down service, apologize to customers, and call a technician.", correct: false },
      { id: "B", title: "86 the fryer items", desc: "Immediately update the menu board, inform customers in line, and pivot to non-fried items.", correct: true },
      { id: "C", title: "Borrow a fryer", desc: "Ask the vendor next to you if you can use their equipment.", correct: false },
      { id: "D", title: "Keep taking orders", desc: "Continue taking orders and hope the fryer resets on its own.", correct: false },
    ],
    feedback: "\"86\" means out — pros adapt fast. Cutting fryer items immediately protects ticket time on everything else and keeps the line moving. Customers respect honesty over waiting."
  },
  {
    id: 4,
    title: "You're running out of your signature protein with 2 hours left in service. What do you do?",
    stressLevel: 4,
    options: [
      { id: "A", title: "Rush to the store", desc: "Close the window briefly and send a crew member to buy more supplies.", correct: false },
      { id: "B", title: "Raise the price", desc: "Increase the price of remaining items to slow demand and maximize revenue.", correct: false },
      { id: "C", title: "Limit portions & notify", desc: "Post a 'limited quantities remaining' notice and offer a substitute when it runs out.", correct: true },
      { id: "D", title: "Keep quiet", desc: "Continue selling normally until you run out, then deal with it.", correct: false },
    ],
    feedback: "Transparent scarcity builds anticipation and protects customer experience. Customers who know supply is limited often feel lucky to get one — and return tomorrow."
  },
  {
    id: 5,
    title: "Your POS system crashes and customers can't pay by card. What now?",
    stressLevel: 4,
    options: [
      { id: "A", title: "Cash only, no change", desc: "Accept cash only but you don't have a float for making change.", correct: false },
      { id: "B", title: "Switch to Venmo/CashApp", desc: "Post your payment handles and accept digital transfers until POS is back.", correct: true },
      { id: "C", title: "Close for 30 minutes", desc: "Shut the window and wait for the system to reboot.", correct: false },
      { id: "D", title: "Give food for free", desc: "Serve the current line for free to maintain goodwill.", correct: false },
    ],
    feedback: "Pivoting to app-based payments keeps revenue flowing and shows customers you're resourceful. Always have a backup payment method ready before service starts."
  },
  {
    id: 6,
    title: "A customer gets verbally aggressive about their wait time. How do you handle it?",
    stressLevel: 3,
    options: [
      { id: "A", title: "Argue back", desc: "Defend your service and explain why their attitude is unacceptable.", correct: false },
      { id: "B", title: "Ignore them", desc: "Keep your head down and focus on cooking until they leave.", correct: false },
      { id: "C", title: "De-escalate & comp", desc: "Step to the window, speak calmly, apologize for the wait, and offer a free drink or side.", correct: true },
      { id: "D", title: "Refund and dismiss", desc: "Immediately refund their order and tell them you're too busy to help them today.", correct: false },
    ],
    feedback: "A calm, public de-escalation shows every customer in line that you care. A small comp costs $1–2 and turns an angry customer into a storyteller who praises your response."
  },
  {
    id: 7,
    title: "A health inspector arrives unannounced during peak service. Your move?",
    stressLevel: 5,
    options: [
      { id: "A", title: "Ask them to come back", desc: "Politely request they return when it's less busy.", correct: false },
      { id: "B", title: "Panic and stall", desc: "Ask your crew to quickly clean everything while you chat with the inspector.", correct: false },
      { id: "C", title: "Welcome them professionally", desc: "Greet them warmly, show your permits, and keep service running normally.", correct: true },
      { id: "D", title: "Close service immediately", desc: "Stop cooking until the inspection is complete.", correct: false },
    ],
    feedback: "Inspectors know you're busy — that's often the point. A calm welcome and clean, organized workspace speaks louder than any explanation. Never stall or ask them to leave."
  },
  {
    id: 8,
    title: "It starts raining hard 90 minutes into your busiest lunch service. What do you do?",
    stressLevel: 3,
    options: [
      { id: "A", title: "Close up early", desc: "Pack down the truck and head home — weather kills foot traffic anyway.", correct: false },
      { id: "B", title: "Deploy your awning & announce it", desc: "Open your retractable awning, post a social story about the 'rainy day special,' and keep going.", correct: true },
      { id: "C", title: "Drop prices", desc: "Slash prices by 30% to attract rain-brave customers.", correct: false },
      { id: "D", title: "Wait it out inside", desc: "Pause service until the rain stops, then resume.", correct: false },
    ],
    feedback: "Bad weather separates committed operators from quitters. An awning + a fun social post can turn a rainy day into a brand moment. The customers who brave rain are your most loyal."
  },
  {
    id: 9,
    title: "Your crew member doesn't show up 20 minutes before opening. You're short-handed. What's your plan?",
    stressLevel: 4,
    options: [
      { id: "A", title: "Open late", desc: "Push opening back 45 minutes and text your regulars that you'll be late.", correct: false },
      { id: "B", title: "Simplify the menu & open on time", desc: "Cut the menu to your 5 fastest items, handle all stations yourself, and open on schedule.", correct: true },
      { id: "C", title: "Cancel the day", desc: "Post on social that you're closed and reschedule.", correct: false },
      { id: "D", title: "Hire a stranger", desc: "Ask a bystander near the truck if they want to earn cash for a few hours.", correct: false },
    ],
    feedback: "Every experienced operator has a 'solo survival menu' — 5 items you can run alone without sacrifice in quality. Opening on time, even with a slimmed menu, protects your reputation."
  },
  {
    id: 10,
    title: "A viral social post puts you on the map — 3x normal crowd shows up tomorrow. How do you prepare tonight?",
    stressLevel: 3,
    options: [
      { id: "A", title: "Wing it", desc: "You've handled rushes before — just see how the day goes.", correct: false },
      { id: "B", title: "Triple all your inventory", desc: "Order 3x ingredients, extend hours, and hire extra help for the day.", correct: false },
      { id: "C", title: "Cap orders & set expectations", desc: "Post a 'limited daily quantity' announcement, prep 2x normal inventory, and plan a clean sell-out.", correct: true },
      { id: "D", title: "Raise prices significantly", desc: "Double your prices to manage demand and capitalize on the moment.", correct: false },
    ],
    feedback: "Selling out on a viral day is GOOD — it fuels the mystique. Capping quantities protects quality, prevents burnout, and creates scarcity buzz. Oversupplying too far risks waste and fatigue."
  }
];

const DayOneSimulator = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [progress, setProgress] = useState(35);
  const [revenue, setRevenue] = useState(1420.50);
  const [satisfaction, setSatisfaction] = useState(88);

  const scenario = scenarios[currentScenario];

  const handleAnswerSelect = async (optionId) => {
    setSelectedAnswer(optionId);
    setShowFeedback(true);
    
    const isCorrect = scenario.options.find(o => o.id === optionId)?.correct || false;
    
    // Update metrics based on answer
    if (isCorrect) {
      setRevenue(prev => prev + 150);
      setSatisfaction(prev => Math.min(100, prev + 5));
      toast.success("Great decision!", { description: "+$150 revenue, +5% satisfaction" });
    } else {
      setSatisfaction(prev => Math.max(0, prev - 3));
      toast.warning("Room for improvement", { description: "-3% satisfaction" });
    }

    // Save progress
    try {
      await apiClient.saveSimulationProgress({
        scenario_id: scenario.id,
        selected_answer: optionId,
        is_correct: isCorrect,
        progress_percent: progress,
        revenue: revenue,
        satisfaction: satisfaction,
      });
    } catch (error) {
      // Silent fail for progress saving
      console.error("Failed to save progress:", error);
    }
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setProgress(Math.min(100, progress + 15));
    }
  };

  const handlePrevious = () => {
    if (currentScenario > 0) {
      setCurrentScenario(currentScenario - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-dark concrete-overlay font-display text-slate-100">
      <SEO 
        title="Day One Simulator"
        description="Interactive scenario-based training for food truck operators. Practice rush hour decision making with live metrics and real-time feedback."
        url="/day-one"
      />
      {/* Header */}
      <header className="flex items-center justify-between border-b border-steel px-6 md:px-10 py-4 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-primary">
            <Truck className="w-9 h-9" />
          </Link>
          <div className="flex flex-col">
            <h2 className="font-header text-xl font-bold leading-tight tracking-wider uppercase">Food Truck Launch Pad</h2>
            <span className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase">Phase 7: Launchpad</span>
          </div>
        </div>
        <div className="flex flex-1 justify-end gap-8 items-center">
          <nav className="hidden lg:flex items-center gap-9">
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/crew-quarters" className="text-sm font-medium hover:text-primary transition-colors">Training</Link>
            <Link to="/truck-design" className="text-sm font-medium hover:text-primary transition-colors">Equipment</Link>
            <span className="text-primary text-sm font-bold border-b-2 border-primary pb-1">Launchpad</span>
          </nav>
          <button className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold hover:bg-primary/90 transition-all uppercase tracking-wider font-header">
            Profile
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col lg:flex-row max-w-[1400px] mx-auto w-full p-6 gap-8">
        {/* Left Sidebar - Mission Control */}
        <aside className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-white/5 p-6 rounded-xl border border-steel">
            <div className="flex flex-col mb-6">
              <h3 className="font-header text-2xl font-bold uppercase tracking-tight">Mission Control</h3>
              <p className="text-slate-400 text-sm">Real-time operation simulation</p>
            </div>
            <div className="relative space-y-0">
              {/* Pre-Opening - Complete */}
              <div className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className="z-10 flex items-center justify-center size-10 rounded-full bg-primary text-background-dark shadow-lg">
                    <Check className="w-5 h-5" />
                  </div>
                  <div className="w-0.5 h-16 bg-primary"></div>
                </div>
                <div className="pt-1">
                  <h4 className="font-header text-lg font-bold uppercase text-primary">Pre-Opening</h4>
                  <p className="text-xs text-slate-400">Inventory & Prep complete</p>
                </div>
              </div>
              {/* Service Peak - Current */}
              <div className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className="z-10 flex items-center justify-center size-10 rounded-full bg-primary ring-4 ring-primary/20 text-background-dark animate-pulse shadow-lg scenario-glow">
                    <Timer className="w-5 h-5" />
                  </div>
                  <div className="w-0.5 h-16 bg-steel"></div>
                </div>
                <div className="pt-1">
                  <h4 className="font-header text-lg font-bold uppercase text-white">Service Peak</h4>
                  <p className="text-xs text-primary font-medium italic">Current Stage: Rush Hour</p>
                </div>
              </div>
              {/* Closing - Locked */}
              <div className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className="z-10 flex items-center justify-center size-10 rounded-full bg-steel text-slate-400">
                    <Lock className="w-5 h-5" />
                  </div>
                </div>
                <div className="pt-1">
                  <h4 className="font-header text-lg font-bold uppercase text-slate-400">Closing</h4>
                  <p className="text-xs text-slate-500">Scheduled: 10:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mentor Insight */}
          <div className="bg-primary/10 border border-primary/30 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <Brain className="w-5 h-5 text-primary" />
              <span className="font-header font-bold uppercase tracking-wider text-primary">Mentor Insight</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-300 italic">
              "Speed is king, but accuracy keeps the customers coming back. When the line grows, don't panic—delegate."
            </p>
          </div>
        </aside>

        {/* Main Scenario Area */}
        <section className="flex-1 flex flex-col gap-6">
          <div className="bg-white/5 border border-steel p-8 rounded-xl scenario-glow" data-testid="scenario-card">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest mb-2 inline-block">
                  Scenario {scenario.id} of {scenarios.length}
                </span>
                <h1 className="font-header text-4xl font-bold uppercase text-white leading-none">{scenario.title}</h1>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Stress Level</p>
                <div className="flex gap-1 mt-1">
                  {[1,2,3,4,5].map((level) => (
                    <div key={level} className={`w-4 h-2 rounded-sm ${level <= scenario.stressLevel ? 'bg-primary' : 'bg-steel'}`}></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenario.options.map((option) => {
                const isSelected = selectedAnswer === option.id;
                const isCorrect = option.correct;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    data-testid={`option-${option.id}`}
                    className={`group flex items-start gap-4 p-5 rounded-lg border-2 transition-all text-left ${
                      isSelected 
                        ? 'border-primary bg-primary/5' 
                        : 'border-steel hover:border-primary bg-background-dark/50'
                    }`}
                  >
                    <span className={`size-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      isSelected 
                        ? 'bg-primary text-background-dark' 
                        : 'border-2 border-steel group-hover:border-primary'
                    }`}>
                      {option.id}
                    </span>
                    <div>
                      <p className="font-bold text-slate-100">{option.title}</p>
                      <p className="text-sm text-slate-400 mt-1">{option.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {showFeedback && selectedAnswer && (
              <div className={`mt-8 p-6 rounded-lg flex gap-4 items-start ${
                scenario.options.find(o => o.id === selectedAnswer)?.correct
                  ? 'bg-emerald-500/10 border border-emerald-500/30'
                  : 'bg-amber-500/10 border border-amber-500/30'
              }`} data-testid="feedback-panel">
                <Check className={`w-8 h-8 ${
                  scenario.options.find(o => o.id === selectedAnswer)?.correct
                    ? 'text-emerald-500'
                    : 'text-amber-500'
                }`} />
                <div>
                  <h5 className={`font-bold uppercase tracking-wide ${
                    scenario.options.find(o => o.id === selectedAnswer)?.correct
                      ? 'text-emerald-500'
                      : 'text-amber-500'
                  }`}>
                    {scenario.options.find(o => o.id === selectedAnswer)?.correct ? 'Excellent Choice!' : 'Not Quite!'}
                  </h5>
                  <p className="text-sm text-slate-300 mt-1">{scenario.feedback}</p>
                </div>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="bg-white/5 p-4 rounded-xl border border-steel mt-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase text-slate-500">Simulator Progress</span>
              <span className="text-xs font-bold text-primary">{progress}% Complete</span>
            </div>
            <div className="w-full h-3 bg-steel rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-500" style={{width: `${progress}%`}}></div>
            </div>
          </div>
        </section>

        {/* Right Sidebar - Live Metrics */}
        <aside className="w-full lg:w-72 flex flex-col gap-6">
          <div className="bg-white/5 p-6 rounded-xl border border-steel">
            <h3 className="font-header text-xl font-bold uppercase mb-4 border-b border-steel pb-2">Live Metrics</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Revenue</p>
                  <p className="text-2xl font-header font-bold text-emerald-500">${revenue.toFixed(2)}</p>
                </div>
                <CreditCard className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Customer Satisfaction</p>
                  <p className="text-2xl font-header font-bold text-primary">{satisfaction}%</p>
                </div>
                <Smile className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Ticket Time</p>
                  <p className="text-2xl font-header font-bold text-orange-400">07:12</p>
                </div>
                <Gauge className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-gradient-to-br from-copper/20 to-primary/10 border border-copper/30 p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-copper" />
              <span className="font-header font-bold uppercase tracking-wider text-copper">Badges Earned</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="size-10 rounded-full bg-steel/50 flex items-center justify-center border border-copper/50">
                <Sun className="w-5 h-5 text-copper" />
              </div>
              <div className="size-10 rounded-full bg-steel/50 flex items-center justify-center border border-slate-700">
                <Utensils className="w-5 h-5 text-slate-600" />
              </div>
              <div className="size-10 rounded-full bg-steel/50 flex items-center justify-center border border-slate-700">
                <Zap className="w-5 h-5 text-slate-600" />
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer Navigation */}
      <footer className="mt-auto border-t border-steel bg-white/5 backdrop-blur-sm px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <button 
          onClick={handlePrevious}
          disabled={currentScenario === 0}
          className="text-slate-500 hover:text-white disabled:opacity-50 transition-colors flex items-center gap-2"
          data-testid="prev-scenario-btn"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-bold uppercase font-header">Previous Scenario</span>
        </button>
        <div className="flex items-center gap-6">
          <button className="text-xs uppercase font-bold tracking-widest text-slate-500 hover:text-primary underline">
            Restart Simulation
          </button>
          <button 
            onClick={handleNext}
            disabled={currentScenario === scenarios.length - 1}
            className="bg-primary hover:bg-primary/90 text-background-dark px-8 py-3 rounded-lg font-header font-bold uppercase tracking-widest flex items-center gap-2 group transition-all disabled:opacity-50"
            data-testid="next-scenario-btn"
          >
            Next Challenge
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default DayOneSimulator;
