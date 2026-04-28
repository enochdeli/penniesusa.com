import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Earth, 
  TrendingUp, 
  DollarSign, 
  Wallet,
  Globe2
} from 'lucide-react';
import { lifestyleData } from '../lifestyleData';

const GlobalExplorer: React.FC = () => {
  const [netWorth, setNetWorth] = useState<number | ''>('');

  return (
    <div className="bg-[#F9FAFB] min-h-screen font-sans overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-[1000px] mx-auto px-6 pt-20 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-600 text-[10px] font-bold tracking-widest uppercase mb-8"
        >
          GLOBAL WEALTH PERSPECTIVE
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6"
        >
          Where Are You a<br />
          <span className="text-teal-500 italic">Millionaire?</span> <span className="inline-block transform hover:rotate-12 transition-transform cursor-default">🌍</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-500 max-w-xl mx-auto mb-10"
        >
          Discover how far your money really goes around the world.
        </motion.p>

        {/* Input Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-xl mx-auto bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 p-2 mb-6 flex items-center transition-all focus-within:ring-2 focus-within:ring-teal-500/50"
        >
          <div className="pl-6 text-slate-400 font-medium text-lg">$</div>
          <input 
            type="number" 
            value={netWorth}
            onChange={(e) => setNetWorth(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="Enter net worth..." 
            className="flex-1 bg-transparent border-none focus:outline-none text-xl lg:text-2xl font-bold px-4 py-4 text-slate-900 placeholder:text-slate-300" 
          />
          <div className="px-5 py-3.5 bg-[#F9FAFB] rounded-xl font-bold flex items-center gap-2 border border-slate-200 mr-2 text-sm text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors">
            🇺🇸 USD <span className="ml-1 text-[10px] text-slate-400">▼</span>
          </div>
        </motion.div>
        
        <motion.button 
          onClick={() => {
            document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="px-8 py-4 bg-teal-500 text-white font-bold rounded-2xl shadow-lg shadow-teal-500/20 hover:scale-105 transition-transform active:scale-95 text-lg"
        >
          Check My Status
        </motion.button>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-slate-400 mt-6 font-medium"
        >
          Takes 2 seconds • Saves automatically if connected
        </motion.p>
      </div>

      {/* Status Bar */}
      <div id="results" className="border-t border-b border-teal-500/10 bg-white relative z-10 shadow-sm">
        <div className="max-w-5xl mx-auto py-8 px-6 grid grid-cols-3 gap-8 text-center divide-x divide-slate-100">
           <div className="flex flex-col items-center justify-center">
             <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-600 mb-3">
               <Globe2 className="w-5 h-5" />
             </div>
             <div className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mb-1">Countries Scanned</div>
             <div className="text-xl font-black text-slate-900">{lifestyleData.length}</div>
           </div>
           <div className="flex flex-col items-center justify-center">
             <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-600 mb-3">
               <TrendingUp className="w-5 h-5" />
             </div>
             <div className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mb-1">Millionaire Status</div>
             <div className="text-xl font-black text-slate-900">
               {lifestyleData.filter(country => {
                  const wealthMultiplier = 100 / country.costLivingIndex;
                  const currentWorthPPP = (netWorth === '' ? 0 : netWorth) * wealthMultiplier;
                  return currentWorthPPP >= 1000000;
               }).length} Countries
             </div>
           </div>
           <div className="flex flex-col items-center justify-center">
             <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-600 mb-3">
               <DollarSign className="w-5 h-5" />
             </div>
             <div className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mb-1">Base Currency</div>
             <div className="text-xl font-black text-slate-900">US Dollar</div>
           </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-8">
        {[
          {
            icon: TrendingUp,
            title: "Grow your wealth globally.",
            desc: "Discover international investment strategies to diversify your portfolio and accelerate your path to global millionaire status.",
            btn: "EXPLORE STRATEGIES"
          },
          {
            icon: Wallet,
            title: "Track your net worth.",
            desc: "Use our premium dashboard to monitor your assets across all currencies and see your real-time global standing.",
            btn: "START TRACKING"
          },
          {
            icon: Earth,
            title: "Live like a millionaire abroad.",
            desc: "Find the perfect balance between luxury and cost. Discover countries where your current wealth provides a high-end lifestyle.",
            btn: "VIEW DESTINATIONS"
          }
        ].map((feat, i) => (
          <div key={i} className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-1 duration-300">
            <div className="w-12 h-12 rounded-full bg-[#f0fdfa] text-teal-600 flex items-center justify-center mb-8">
              <feat.icon className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight leading-snug">{feat.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">{feat.desc}</p>
            <button className="w-full py-4 text-[10px] font-bold tracking-widest bg-[#F9FAFB] rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors uppercase border border-slate-100 flex items-center justify-center gap-2">
              {feat.btn} <span className="text-slate-400">→</span>
            </button>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="py-24 text-center bg-white border-t border-slate-100 mix-blend-multiply">
        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-20 tracking-tight">How It Works</h2>
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-12 lg:gap-16">
          <div>
            <div className="text-6xl font-black text-[#bbf7d0] italic mb-6">01</div>
            <h4 className="font-bold text-slate-900 mb-3 text-lg tracking-tight">Convert your money</h4>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">Instantly see your net worth in 130+ global currencies.</p>
          </div>
          <div>
            <div className="text-6xl font-black text-[#86efac] italic mb-6">02</div>
            <h4 className="font-bold text-slate-900 mb-3 text-lg tracking-tight">Compare globally</h4>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">Understand your purchasing power across different economies.</p>
          </div>
          <div>
            <div className="text-6xl font-black text-[#4ade80] italic mb-6">03</div>
            <h4 className="font-bold text-slate-900 mb-3 text-lg tracking-tight">Discover millionaire status</h4>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">Find exactly where you're considered a millionaire today.</p>
          </div>
        </div>
      </div>

      {/* CTA section placed right before country grid */}
      <div className="max-w-4xl mx-auto px-6 py-12 pt-24">
        <div className="bg-[#0b162c] rounded-[2.5rem] p-12 lg:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[80px] pointer-events-none rounded-full" />
          <div className="relative z-10">
            <h3 className="text-3xl lg:text-4xl font-black mb-5 tracking-tight">Get your global wealth report</h3>
            <p className="text-slate-400 text-sm lg:text-base mb-10 max-w-lg mx-auto leading-relaxed">Receive a detailed analysis of your purchasing power and investment opportunities worldwide.</p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input type="email" placeholder="Enter your email..." className="flex-1 bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all font-medium" />
              <button className="bg-teal-500 text-white font-bold rounded-2xl px-8 py-4 hover:bg-teal-400 transition-colors">Get Report</button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of countries */}
      <div className="max-w-7xl mx-auto px-6 py-12 pb-32">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {lifestyleData.map((country) => {
            const wealthMultiplier = 100 / country.costLivingIndex;
            const currentWorthPPP = (netWorth === '' ? 0 : netWorth) * wealthMultiplier;
            const costOfMillionaire = 1000000 / wealthMultiplier;
            
            const isMillionaire = currentWorthPPP >= 1000000;

            const flagEmoji = country.code.split('').map(char => String.fromCodePoint(char.charCodeAt(0) + 127397)).join('');

            return (
              <div key={country.id} className="bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-1 duration-300 group">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl shadow-sm bg-slate-50 p-1 rounded-lg border border-slate-100 leading-none">{flagEmoji}</div>
                    <div>
                      <div className="font-bold text-slate-900 leading-none mb-1.5 text-lg">{country.name}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest leading-none font-bold">{country.currency}</div>
                    </div>
                  </div>
                  <div className={`text-[9px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded-lg border ${isMillionaire ? 'bg-teal-50 text-teal-600 border-teal-100' : 'bg-[#FAFAFA] text-slate-400 border-slate-100'}`}>
                    {isMillionaire ? 'MILLIONAIRE' : 'FAR FROM IT'}
                  </div>
                </div>
                
                <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">Your Worth Here</div>
                <div className="text-3xl font-black text-slate-900 mb-2 font-mono tabular-nums tracking-tight">
                  {country.currencySymbol} {Math.floor(currentWorthPPP).toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400 italic mb-8 font-medium">
                  {country.costLivingIndex > 80 ? 'High cost country' : country.costLivingIndex > 50 ? 'Moderate cost country' : 'Low cost country'}
                </div>
                
                <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-3">Cost of Millionaire Status</div>
                <div className="flex items-center justify-between text-sm text-slate-600 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="font-mono text-xs">{Number(1000000).toLocaleString()} {country.currency}</span>
                  <span className="text-slate-300 mx-2">&rarr;</span>
                  <span className="text-slate-900 font-bold font-mono text-xs">${Math.floor(costOfMillionaire).toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 bg-transparent border-2 border-slate-900 text-slate-900 font-bold rounded-2xl hover:bg-slate-900 hover:text-white transition-colors"
          >
            Try another amount
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalExplorer;
