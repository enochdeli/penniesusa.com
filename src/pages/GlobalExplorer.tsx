import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  ShoppingCart, 
  UtensilsCrossed, 
  TrendingUp, 
  DollarSign, 
  MapPin, 
  Info,
  ArrowRight,
  Calculator,
  Search,
  Wallet,
  BarChart3
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell
} from 'recharts';
import { lifestyleData } from '../lifestyleData';
import { CountryData } from '../types';

const GlobalExplorer: React.FC = () => {
  const [netWorth, setNetWorth] = useState<number>(100000);
  const [income, setIncome] = useState<number>(60000);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(lifestyleData[1]); // Default to Portugal

  const filteredCountries = useMemo(() => {
    return lifestyleData.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const calculatePPP = (country: CountryData, amount: number) => {
    // Relative to USA (index 100)
    const ratio = 100 / country.costLivingIndex;
    return amount * ratio;
  };

  const getWealthMultiplier = (country: CountryData) => {
    return (100 / country.costLivingIndex).toFixed(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Maximize Your Purchasing Power</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black tracking-tight balance leading-tight"
          >
            Where are you <span className="text-teal-500 italic">actually</span> rich?
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl leading-relaxed"
          >
            Stop measuring your success in absolute dollars. Discover your real quality of life by comparing costs across 100+ global destinations.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full lg:w-[450px] p-8 glass rounded-3xl border border-teal-500/20 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Calculator className="w-40 h-40" />
          </div>
          
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-teal-500" />
            Your Financial Profile
          </h3>
          
          <div className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex justify-between">
                <span>Current Net Worth</span>
                <span className="text-teal-400 font-mono">${netWorth.toLocaleString()}</span>
              </label>
              <input 
                type="range" 
                min="1000" 
                max="1000000" 
                step="1000"
                value={netWorth}
                onChange={(e) => setNetWorth(Number(e.target.value))}
                className="w-full accent-teal-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex justify-between">
                <span>Annual Income (USD)</span>
                <span className="text-teal-400 font-mono">${income.toLocaleString()}</span>
              </label>
              <input 
                type="range" 
                min="1000" 
                max="500000" 
                step="1000"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full accent-teal-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div className="pt-4 border-t border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Target Destination</span>
                <div className="relative group">
                   <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-500 font-bold cursor-pointer">
                      <MapPin className="w-4 h-4" />
                      {selectedCountry.name}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Explorer Interface */}
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Sidebar Selection */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text"
              placeholder="Search destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
            />
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredCountries.map(country => (
              <button
                key={country.id}
                onClick={() => setSelectedCountry(country)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                  selectedCountry.id === country.id 
                    ? 'bg-teal-500 border-teal-400 shadow-xl shadow-teal-500/20 scale-[1.02]' 
                    : 'bg-white/5 border-white/10 hover:border-teal-500/40 hover:bg-white/10'
                }`}
              >
                <div>
                  <h4 className={`font-bold transition-colors ${selectedCountry.id === country.id ? 'text-white' : 'text-slate-200'}`}>
                    {country.name}
                  </h4>
                  <p className={`text-xs ${selectedCountry.id === country.id ? 'text-teal-100' : 'text-slate-500'}`}>
                    Cost Index: {country.costLivingIndex}
                  </p>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  selectedCountry.id === country.id ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-500 group-hover:text-teal-400'
                }`}>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Insight Panel */}
        <div className="lg:col-span-8">
           <AnimatePresence mode="wait">
             <motion.div
               key={selectedCountry.id}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="glass rounded-[2.5rem] p-8 lg:p-12 border border-white/10 relative overflow-hidden h-full"
             >
                {/* Visual Flair */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 blur-[100px] pointer-events-none" />
                
                <div className="relative z-10">
                  <header className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-6xl">{selectedCountry.code.split('').map(char => String.fromCodePoint(char.charCodeAt(0) + 127397)).join('')}</span>
                      <div>
                        <h2 className="text-4xl lg:text-5xl font-black">{selectedCountry.name}</h2>
                        <p className="text-teal-500 font-medium">1 USD ≈ {selectedCountry.exchangeRate} {selectedCountry.currency}</p>
                      </div>
                    </div>
                  </header>

                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="p-6 rounded-3xl bg-teal-500/10 border border-teal-500/20 shadow-inner">
                      <span className="text-teal-400 text-sm font-bold uppercase tracking-widest mb-2 block">Net Worth Value</span>
                      <div className="text-4xl font-black mb-1">
                        ${calculatePPP(selectedCountry, netWorth).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <p className="text-slate-400 text-sm">
                        Your ${netWorth.toLocaleString()} has the purchasing power of roughly <span className="text-white font-bold">{getWealthMultiplier(selectedCountry)}x</span> in local markets.
                      </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 shadow-inner">
                      <span className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2 block">Income Value</span>
                      <div className="text-4xl font-black mb-1">
                         ${calculatePPP(selectedCountry, income).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <p className="text-slate-500 text-sm">Equivalent standard of living in {selectedCountry.name}.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: 'Housing', icon: Building2, val: selectedCountry.rentIndex },
                      { label: 'Groceries', icon: ShoppingCart, val: selectedCountry.groceriesIndex },
                      { label: 'Dining', icon: UtensilsCrossed, val: selectedCountry.restaurantIndex },
                      { label: 'Local Power', icon: DollarSign, val: selectedCountry.localPurchasingPowerIndex },
                    ].map((idx) => (
                      <div key={idx.label} className="text-center group">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-500/20 group-hover:text-teal-400 transition-colors">
                          <idx.icon className="w-6 h-6" />
                        </div>
                        <div className="text-2xl font-bold">{idx.val}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-tighter">{idx.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Comparison Chart */}
                  <div className="mt-12 p-8 rounded-[2rem] bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Cost of Living Index</h3>
                        <p className="text-xs text-slate-500">Benchmark against US (New York = 100)</p>
                      </div>
                    </div>

                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: 'United States', index: 100, fill: '#64748b' },
                            { name: selectedCountry.name, index: selectedCountry.costLivingIndex, fill: '#14b8a6' }
                          ]}
                          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                          <XAxis 
                            type="number" 
                            domain={[0, 120]} 
                            stroke="#475569" 
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis 
                            dataKey="name" 
                            type="category" 
                            stroke="#94a3b8" 
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            width={100}
                          />
                          <Tooltip 
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ 
                              backgroundColor: '#0f172a', 
                              border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '12px',
                              fontSize: '12px'
                            }}
                          />
                          <Bar 
                            dataKey="index" 
                            radius={[0, 4, 4, 0]}
                            barSize={40}
                          >
                            {[
                              { name: 'United States', index: 100 },
                              { name: selectedCountry.name, index: selectedCountry.costLivingIndex }
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index === 0 ? '#475569' : '#14b8a6'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-500" />
                        <span className="text-xs text-slate-400 font-medium">US Baseline</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-teal-500" />
                        <span className="text-xs text-slate-400 font-medium">{selectedCountry.name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/5">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Info className="w-4 h-4" />
                        <span>All indices are relative to New York, USA (100).</span>
                      </div>
                      <button className="px-6 py-3 bg-white text-slate-950 font-bold rounded-2xl hover:bg-teal-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2">
                        Get Relocation Plan
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
             </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GlobalExplorer;
