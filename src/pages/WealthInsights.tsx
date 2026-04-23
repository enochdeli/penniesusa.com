import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, BarChart3, LineChart, Globe, Zap, ShieldCheck } from 'lucide-react';

const WealthInsights: React.FC = () => {
  const insights = [
    {
      title: "The Nomad Arbitrage",
      desc: "By moving to a country with a 40% lower cost of living, you essentially give yourself a 66% raise without changing your output.",
      icon: Zap,
      color: "text-amber-400",
      bg: "bg-amber-400/10"
    },
    {
      title: "Purchasing Power Parity",
      desc: "Your $100k net worth in NYC is equivalent to $340k in Southeast Asia when measuring local lifestyle and services.",
      icon: PieChart,
      color: "text-teal-400",
      bg: "bg-teal-400/10"
    },
    {
      title: "Golden Visas",
      desc: "Portugal and Spain are tightening rules, but 'Wealth Independent' visas remain a key path for the financially free.",
      icon: ShieldCheck,
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <header className="mb-20 text-center max-w-3xl mx-auto">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center text-teal-500 mx-auto mb-6"
        >
          <BarChart3 className="w-8 h-8" />
        </motion.div>
        <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">Data-Driven <span className="text-teal-500">Freedom</span></h1>
        <p className="text-xl text-slate-400 leading-relaxed">Understanding the hidden math behind global wealth and lifestyle migration.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {insights.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 glass rounded-[2.5rem] border border-white/10 hover:border-teal-500/40 transition-all flex flex-col h-full"
          >
            <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-6`}>
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <p className="text-slate-400 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-[3rem] p-8 lg:p-16 border border-white/10 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-teal-500/20 blur-[100px] pointer-events-none" />
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-black leading-tight">The 2026 Shift: Remote Wealth is Mobile</h2>
          <p className="text-slate-400 text-lg">
            As cities like Lisbon and Mexico City become "expensive" by local standards, a new wave of wealth is moving toward Albania, Vietnam, and Colombia. 
            Real wealth isn't just about what's in your bank—it's about where you stand in the market.
          </p>
          <div className="flex gap-4">
             <div className="flex items-center gap-2 text-sm font-bold text-teal-400">
                <Globe className="w-4 h-4" /> 130+ Markets Tracked
             </div>
             <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                <LineChart className="w-4 h-4" /> Daily Index Updates
             </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 aspect-square glass rounded-3xl border border-white/10 flex items-center justify-center p-8 bg-teal-500/5">
           <div className="text-center">
              <div className="text-7xl font-black text-white mb-2">94%</div>
              <p className="text-slate-500 font-medium uppercase tracking-tighter text-sm">Of expats report higher happiness after geo-arbitrage</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default WealthInsights;
