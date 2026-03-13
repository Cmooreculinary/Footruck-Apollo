import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Truck, Upload, Save, Wallet, ShoppingBag, Calendar, Flag, CheckCircle, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";

const BreakEvenAnalyzer = () => {
  const [fixedExpenses, setFixedExpenses] = useState(4500);
  const [avgMenuPrice, setAvgMenuPrice] = useState(14.00);
  const [avgCostPerPlate, setAvgCostPerPlate] = useState(4.50);
  const [operatingDays, setOperatingDays] = useState(20);
  const [avgCustomersPerDay, setAvgCustomersPerDay] = useState(65);

  // Calculations
  const contributionMargin = avgMenuPrice - avgCostPerPlate;
  const breakEvenUnits = Math.ceil(fixedExpenses / contributionMargin);
  const projectedSales = operatingDays * avgCustomersPerDay;
  const totalRevenue = projectedSales * avgMenuPrice;
  const cogs = projectedSales * avgCostPerPlate;
  const netProfit = totalRevenue - cogs - fixedExpenses;
  const marginOfSafety = ((projectedSales - breakEvenUnits) / breakEvenUnits * 100).toFixed(0);
  const breakEvenPercentage = Math.min((breakEvenUnits / projectedSales) * 100, 100);
  const currentPositionPercentage = Math.min((projectedSales / (projectedSales + 300)) * 100, 100);

  return (
    <div className="bg-background-dark text-white font-work overflow-x-hidden antialiased min-h-screen">
      <SEO 
        title="Break-Even Analyzer"
        description="Calculate your food truck break-even point. Model fixed costs, unit economics, and sales volume to understand your path to profitability."
        url="/break-even"
      />
      <div className="relative flex min-h-screen flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-solid border-border-dark bg-background-dark/95 backdrop-blur-sm px-5 py-3 md:px-10">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <div className="flex items-center justify-center text-primary">
                <Truck className="w-8 h-8" />
              </div>
              <Link to="/" className="text-lg font-bold leading-tight tracking-[-0.015em] uppercase hover:text-primary transition-colors">FT Launch Pad</Link>
            </div>
            <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
              <nav className="flex items-center gap-9">
                <Link to="/" className="text-text-muted hover:text-primary text-sm font-medium transition-colors">Dashboard</Link>
                <span className="text-white text-sm font-medium hover:text-primary transition-colors">Financials</span>
                <Link to="/signature-dish" className="text-text-muted hover:text-primary text-sm font-medium transition-colors">Menu Builder</Link>
              </nav>
              <div className="flex items-center gap-3 pl-6 border-l border-border-dark">
                <div className="h-8 w-8 rounded-full bg-surface-dark border border-primary text-primary flex items-center justify-center text-xs font-bold">
                  JD
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 flex flex-col items-center w-full pb-20">
          {/* Breadcrumb */}
          <div className="w-full border-b border-border-dark bg-surface-dark/50 py-4 px-4">
            <div className="mx-auto max-w-[1200px] flex items-center gap-2 text-sm">
              <Link to="/" className="text-text-muted hover:text-white">Financial Reality Check</Link>
              <span className="text-border-dark">/</span>
              <span className="text-primary font-semibold">Break-Even Analyzer</span>
            </div>
          </div>

          {/* Title Section */}
          <div className="w-full max-w-[1200px] px-4 md:px-6 py-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tight">Break-Even Analyzer</h1>
                <p className="text-text-muted text-lg max-w-2xl">Determine exactly how many burgers, tacos, or bowls you need to sell to cover your monthly costs.</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border-dark bg-surface-dark text-text-muted hover:text-white hover:border-primary transition-colors text-sm font-medium">
                  <Upload className="w-4 h-4" />
                  Import Data
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border-dark bg-surface-dark text-text-muted hover:text-white hover:border-primary transition-colors text-sm font-medium">
                  <Save className="w-4 h-4" />
                  Save Scenario
                </button>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="w-full max-w-[1200px] px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column - Inputs */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {/* Monthly Fixed Costs */}
                <div className="rounded-xl border border-border-dark bg-surface-dark overflow-hidden" data-testid="fixed-costs-card">
                  <div className="p-4 border-b border-border-dark flex justify-between items-center bg-[#2c231f]">
                    <h3 className="text-white font-bold uppercase tracking-wide text-sm flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-primary" />
                      Monthly Fixed Costs
                    </h3>
                    <span className="text-xs text-text-muted bg-background-dark px-2 py-1 rounded border border-border-dark">Step 2 Data</span>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-text-muted text-xs uppercase font-bold tracking-wider">Total Fixed Expenses</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
                        <input 
                          type="number"
                          value={fixedExpenses}
                          onChange={(e) => setFixedExpenses(parseFloat(e.target.value) || 0)}
                          className="w-full bg-background-dark border border-border-dark rounded-lg py-2 pl-8 pr-4 text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all font-mono"
                          data-testid="fixed-expenses-input"
                        />
                      </div>
                      <p className="text-xs text-text-muted italic mt-1">Includes commissary rent, insurance, loan payments, & permits.</p>
                    </div>
                  </div>
                </div>

                {/* Unit Economics */}
                <div className="rounded-xl border border-border-dark bg-surface-dark overflow-hidden" data-testid="unit-economics-card">
                  <div className="p-4 border-b border-border-dark flex justify-between items-center bg-[#2c231f]">
                    <h3 className="text-white font-bold uppercase tracking-wide text-sm flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-primary" />
                      Unit Economics
                    </h3>
                  </div>
                  <div className="p-6 flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                      <label className="text-text-muted text-xs uppercase font-bold tracking-wider flex justify-between">
                        Avg. Menu Price 
                        <span className="text-primary text-[10px]">What customer pays</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
                        <input 
                          type="number"
                          step="0.50"
                          value={avgMenuPrice}
                          onChange={(e) => setAvgMenuPrice(parseFloat(e.target.value) || 0)}
                          className="w-full bg-background-dark border border-border-dark rounded-lg py-2 pl-8 pr-4 text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all font-mono"
                          data-testid="menu-price-input"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-text-muted text-xs uppercase font-bold tracking-wider flex justify-between">
                        Avg. Cost Per Plate 
                        <span className="text-red-400 text-[10px]">Food & Packaging</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
                        <input 
                          type="number"
                          step="0.25"
                          value={avgCostPerPlate}
                          onChange={(e) => setAvgCostPerPlate(parseFloat(e.target.value) || 0)}
                          className="w-full bg-background-dark border border-border-dark rounded-lg py-2 pl-8 pr-4 text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all font-mono"
                          data-testid="cost-per-plate-input"
                        />
                      </div>
                    </div>
                    <div className="p-3 bg-background-dark/50 rounded border border-border-dark flex justify-between items-center">
                      <span className="text-sm text-text-muted">Contribution Margin:</span>
                      <span className="text-primary font-bold font-mono">${contributionMargin.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Sales Volume */}
                <div className="rounded-xl border border-border-dark bg-surface-dark overflow-hidden" data-testid="sales-volume-card">
                  <div className="p-4 border-b border-border-dark flex justify-between items-center bg-[#2c231f]">
                    <h3 className="text-white font-bold uppercase tracking-wide text-sm flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Sales Volume
                    </h3>
                  </div>
                  <div className="p-6 flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                      <label className="text-text-muted text-xs uppercase font-bold tracking-wider">Operating Days / Month</label>
                      <div className="flex items-center gap-4">
                        <input 
                          type="range"
                          min="1"
                          max="31"
                          value={operatingDays}
                          onChange={(e) => setOperatingDays(parseInt(e.target.value))}
                          className="w-full h-2 bg-background-dark rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <input 
                          type="number"
                          value={operatingDays}
                          onChange={(e) => setOperatingDays(parseInt(e.target.value))}
                          className="w-16 bg-background-dark border border-border-dark rounded-lg py-1 px-2 text-white text-center font-mono focus:border-primary outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-text-muted text-xs uppercase font-bold tracking-wider">Avg. Customers / Day</label>
                      <div className="flex items-center gap-4">
                        <input 
                          type="range"
                          min="10"
                          max="300"
                          value={avgCustomersPerDay}
                          onChange={(e) => setAvgCustomersPerDay(parseInt(e.target.value))}
                          className="w-full h-2 bg-background-dark rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <input 
                          type="number"
                          value={avgCustomersPerDay}
                          onChange={(e) => setAvgCustomersPerDay(parseInt(e.target.value))}
                          className="w-16 bg-background-dark border border-border-dark rounded-lg py-1 px-2 text-white text-center font-mono focus:border-primary outline-none"
                          data-testid="customers-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Results */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-surface-dark to-background-dark border border-primary/30 p-6 rounded-xl relative overflow-hidden group" data-testid="break-even-card">
                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Flag className="w-16 h-16 text-primary" />
                    </div>
                    <h4 className="text-text-muted text-xs uppercase font-bold tracking-wider mb-2">Break-Even Point</h4>
                    <div className="text-4xl font-black text-white mb-1 font-mono">{breakEvenUnits} <span className="text-sm font-medium text-text-muted font-work">units</span></div>
                    <p className="text-sm text-text-muted">Sales needed to cover ${fixedExpenses.toLocaleString()} monthly costs</p>
                  </div>
                  <div className="bg-surface-dark border border-border-dark p-6 rounded-xl relative overflow-hidden">
                    <h4 className="text-text-muted text-xs uppercase font-bold tracking-wider mb-2">Projected Sales</h4>
                    <div className="text-4xl font-black text-white mb-1 font-mono">{projectedSales.toLocaleString()} <span className="text-sm font-medium text-text-muted font-work">units</span></div>
                    <p className="text-sm text-text-muted">Based on {operatingDays} days @ {avgCustomersPerDay} customers</p>
                  </div>
                  <div className="bg-surface-dark border border-border-dark p-6 rounded-xl relative overflow-hidden">
                    <h4 className="text-text-muted text-xs uppercase font-bold tracking-wider mb-2">Est. Net Profit</h4>
                    <div className={`text-4xl font-black mb-1 font-mono ${netProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {netProfit >= 0 ? '+' : ''}${Math.abs(netProfit).toLocaleString()}
                    </div>
                    <p className="text-sm text-text-muted">Monthly take-home projection</p>
                  </div>
                </div>

                {/* Performance Visualizer */}
                <div className="bg-surface-dark border border-border-dark rounded-xl p-6 md:p-8 flex flex-col gap-8" data-testid="performance-visualizer">
                  <div className="flex justify-between items-end">
                    <h3 className="text-white text-xl font-bold uppercase tracking-tight">Performance Visualizer</h3>
                    <div className="flex gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-900/50 border border-red-500"></div>
                        <span className="text-text-muted">Loss Zone</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-900/50 border border-green-500"></div>
                        <span className="text-text-muted">Profit Zone</span>
                      </div>
                    </div>
                  </div>

                  {/* Visualizer Bar */}
                  <div className="relative w-full h-16 bg-background-dark rounded-lg border border-border-dark overflow-hidden flex items-center">
                    <div className="absolute inset-0 flex">
                      <div className="h-full bg-red-900/20 border-r border-red-500/30 flex items-center justify-center relative" style={{width: `${breakEvenPercentage}%`}}>
                        <span className="text-[10px] text-red-400 uppercase tracking-wider font-bold absolute bottom-2 left-2">Loss</span>
                      </div>
                      <div className="h-full bg-green-900/10 flex-1 relative">
                        <span className="text-[10px] text-green-400 uppercase tracking-wider font-bold absolute bottom-2 right-2">Profit</span>
                      </div>
                    </div>
                    {/* Break Even Marker */}
                    <div className="absolute top-0 bottom-0 border-l-2 border-dashed border-white z-10 flex flex-col items-center" style={{left: `${breakEvenPercentage}%`}}>
                      <div className="bg-white text-background-dark text-[10px] font-bold px-1 py-0.5 rounded-sm -mt-3 uppercase">Break Even</div>
                    </div>
                    {/* Current Progress Bar */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 left-0 h-6 bg-gradient-to-r from-primary/80 to-primary rounded-r-sm z-20 shadow-[0_0_15px_rgba(203,79,16,0.4)] transition-all duration-1000"
                      style={{width: `${currentPositionPercentage}%`}}
                    ></div>
                    {/* Position Indicator */}
                    <div className="absolute top-0 bottom-0 z-30 flex flex-col items-center" style={{left: `${currentPositionPercentage}%`}}>
                      <div className="w-4 h-4 rounded-full bg-primary border-2 border-white mt-[26px]"></div>
                      <div className="mt-2 bg-surface-dark border border-primary text-primary text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase whitespace-nowrap">You are here</div>
                    </div>
                  </div>

                  {/* Analysis Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div>
                      <h4 className="text-white font-bold mb-2">Reality Check</h4>
                      <p className="text-text-muted text-sm leading-relaxed">
                        Based on your inputs, you need to sell <span className="text-white font-bold">{Math.ceil(breakEvenUnits / operatingDays)} plates per day</span> (over {operatingDays} days) just to keep the lights on. You are projecting <span className="text-white font-bold">{avgCustomersPerDay} plates per day</span>.
                      </p>
                      {parseInt(marginOfSafety) > 0 && (
                        <div className="mt-4 flex items-center gap-2 text-green-400 text-sm font-bold bg-green-900/20 px-3 py-2 rounded border border-green-900/50 inline-flex">
                          <CheckCircle className="w-4 h-4" />
                          Healthy Margin of Safety ({marginOfSafety}%)
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2">Detailed P&L Preview</h4>
                      <ul className="flex flex-col gap-2 text-sm">
                        <li className="flex justify-between items-center border-b border-border-dark pb-1">
                          <span className="text-text-muted">Total Revenue</span>
                          <span className="text-white font-mono">${totalRevenue.toLocaleString()}</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-border-dark pb-1">
                          <span className="text-text-muted">COGS (Food Cost)</span>
                          <span className="text-red-400 font-mono">(${cogs.toLocaleString()})</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-border-dark pb-1">
                          <span className="text-text-muted">Fixed Expenses</span>
                          <span className="text-red-400 font-mono">(${fixedExpenses.toLocaleString()})</span>
                        </li>
                        <li className="flex justify-between items-center pt-1">
                          <span className="text-white font-bold">Net Profit</span>
                          <span className={`font-bold font-mono ${netProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            ${netProfit.toLocaleString()}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Tip & CTA */}
                <div className="flex justify-between items-center bg-surface-dark p-4 rounded-xl border border-border-dark">
                  <div className="text-sm text-text-muted">
                    <span className="text-primary font-bold">Tip:</span> Try adjusting your "Avg. Customers / Day" to see how sensitive your profit is to foot traffic.
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold shadow-[0_4px_14px_rgba(203,79,16,0.3)] transition-all" data-testid="save-plan-btn">
                    Save to Business Plan
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-border-dark bg-[#120e0c] py-12 px-4">
          <div className="mx-auto flex max-w-[1200px] flex-col md:flex-row justify-between gap-10">
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="flex items-center gap-2 text-white">
                <Truck className="w-5 h-5 text-primary" />
                <span className="font-bold text-lg uppercase tracking-tight">FT Launch Pad</span>
              </div>
              <p className="text-text-muted text-sm">Empowering culinary entrepreneurs to build sustainable, profitable mobile food businesses.</p>
            </div>
            <div className="flex gap-16 flex-wrap">
              <div className="flex flex-col gap-4">
                <h4 className="text-white font-bold uppercase text-sm tracking-wider">Platform</h4>
                <a className="text-text-muted hover:text-primary text-sm transition-colors" href="#">Features</a>
                <a className="text-text-muted hover:text-primary text-sm transition-colors" href="#">Pricing</a>
                <Link to="/paper-trail" className="text-text-muted hover:text-primary text-sm transition-colors">Permit Map</Link>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-white font-bold uppercase text-sm tracking-wider">Resources</h4>
                <a className="text-text-muted hover:text-primary text-sm transition-colors" href="#">Blog</a>
                <Link to="/scaling-prep" className="text-text-muted hover:text-primary text-sm transition-colors">Cost Calculator</Link>
                <a className="text-text-muted hover:text-primary text-sm transition-colors" href="#">Vendor Directory</a>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-white font-bold uppercase text-sm tracking-wider">Company</h4>
                <a className="text-text-muted hover:text-primary text-sm transition-colors" href="#">About Us</a>
                <a className="text-text-muted hover:text-primary text-sm transition-colors" href="#">Contact</a>
                <a className="text-text-muted hover:text-primary text-sm transition-colors" href="#">Privacy</a>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-[1200px] mt-12 pt-8 border-t border-border-dark text-center md:text-left">
            <p className="text-[#54433b] text-xs">© 2023 Food Truck Launch Pad. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BreakEvenAnalyzer;
