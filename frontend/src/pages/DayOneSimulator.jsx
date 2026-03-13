import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Truck, ChevronLeft, ChevronRight, Check, Timer, Lock, Brain, Award, Smile, Gauge, CreditCard, Sun, Utensils, Zap } from "lucide-react";

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
  }
];

const DayOneSimulator = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [progress, setProgress] = useState(35);

  const scenario = scenarios[currentScenario];

  const handleAnswerSelect = (optionId) => {
    setSelectedAnswer(optionId);
    setShowFeedback(true);
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
      {/* Header */}
      <header className="flex items-center justify-between border-b border-steel px-6 md:px-10 py-4 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-primary">
            <Truck className="w-9 h-9" />
          </Link>
          <div className="flex flex-col">
            <h2 className="font-header text-xl font-bold leading-tight tracking-wider uppercase">Food Truck Launch Pad</h2>
            <span className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase">Phase 7: Launchpad</span>
          </div>
        </div>
        <div className="flex flex-1 justify-end gap-8 items-center">
          <nav className="hidden lg:flex items-center gap-9">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
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
                  <p className="text-2xl font-header font-bold text-emerald-500">$1,420.50</p>
                </div>
                <CreditCard className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Customer Satisfaction</p>
                  <p className="text-2xl font-header font-bold text-primary">88%</p>
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
