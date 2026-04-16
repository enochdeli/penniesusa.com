import { motion } from 'motion/react';
import { TrendingUp, Coins, Globe2, ArrowRight, Shield, Zap, BarChart3 } from 'lucide-react';

export default function WealthInsights() {
  const insights = [
    {
      title: "Global Diversification",
      desc: "Why holding assets in multiple currencies is the ultimate hedge against local inflation.",
      icon: <Globe2 className="w-6 h-6" />,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Emerging Markets",
      desc: "Identifying high-growth economies where your capital can appreciate faster than domestic markets.",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Asset Protection",
      desc: "Legal frameworks and offshore structures used by global millionaires to safeguard wealth.",
      icon: <Shield className="w-6 h-6" />,
      color: "bg-brand-50 text-brand-600"
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-brand-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Intelligence</span>
          <h1 className="text-5xl md:text-6xl font-display font-black text-[#0a192f] mb-6">Wealth Insights</h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-light text-lg">
            Strategic intelligence for the global citizen. Learn how to manage, grow, and protect your wealth across borders.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {insights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[2.5rem] bg-white border border-brand-100 shadow-xl shadow-brand-900/5 hover:border-brand-400 transition-all duration-500 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-display font-bold text-[#0a192f] mb-4">{item.title}</h3>
              <p className="text-gray-500 font-light leading-relaxed mb-8">{item.desc}</p>
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600 hover:text-brand-700 transition-colors">
                Read Analysis <ArrowRight className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Featured Article */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] bg-[#0a192f] text-white overflow-hidden p-12 md:p-20"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-500/10 blur-[120px] rounded-full translate-x-1/4" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-brand-500 mb-6">
                <Zap className="w-5 h-5 fill-current" />
                <span className="text-xs font-bold uppercase tracking-widest">Premium Strategy</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black mb-6 leading-tight">The Geo-Arbitrage <br /><span className="text-brand-500 italic">Masterclass</span></h2>
              <p className="text-gray-400 text-lg font-light mb-10 leading-relaxed">
                Learn how to earn in a strong currency while living in a high-growth, low-cost economy. This is the secret to accelerating your path to financial freedom.
              </p>
              <button className="px-10 py-5 rounded-2xl bg-brand-500 text-white font-bold hover:bg-brand-600 transition-all active:scale-95 shadow-xl shadow-brand-900/20">
                Unlock Full Guide
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <BarChart3 className="w-8 h-8 text-brand-500 mb-4" />
                <div className="text-2xl font-display font-bold mb-1">12%</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Avg. Yield</div>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm mt-8">
                <Coins className="w-8 h-8 text-brand-500 mb-4" />
                <div className="text-2xl font-display font-bold mb-1">4.5x</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Buying Power</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
