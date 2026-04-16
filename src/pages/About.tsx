import { motion } from 'motion/react';
import { Heart, Target, Globe2, Users, ShieldCheck, Sparkles } from 'lucide-react';

export default function About() {
  const values = [
    {
      title: "Global Perspective",
      desc: "We believe wealth isn't just a number, but a measure of freedom across borders.",
      icon: <Globe2 className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Radical Transparency",
      desc: "Providing real-time, accurate data to help you make informed global decisions.",
      icon: <Target className="w-6 h-6 text-red-500" />
    },
    {
      title: "Financial Empowerment",
      desc: "Tools designed to help you discover opportunities you didn't know existed.",
      icon: <Sparkles className="w-6 h-6 text-brand-500" />
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-brand-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Mission</span>
            <h1 className="text-5xl md:text-6xl font-display font-black text-[#0a192f] mb-8 leading-tight">
              Redefining Wealth for the <span className="text-brand-600 italic">Modern Nomad.</span>
            </h1>
            <p className="text-gray-500 text-lg font-light leading-relaxed mb-8">
              <span className="font-bold text-[#0a192f]">penniesusa</span> was born from a simple realization: your net worth is relative. In a world that is increasingly connected yet economically diverse, understanding your purchasing power globally is the first step toward true financial freedom.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://picsum.photos/seed/${i + 10}/100/100`} alt="User" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium text-gray-900">
                Joined by <span className="text-brand-600 font-bold">50,000+</span> global explorers
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] bg-brand-100 overflow-hidden">
              <img 
                src="https://picsum.photos/seed/luxury-travel/800/800" 
                alt="Luxury Travel" 
                className="w-full h-full object-cover mix-blend-multiply opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 p-8 rounded-3xl bg-white shadow-2xl border border-brand-100 max-w-xs">
              <Heart className="w-8 h-8 text-red-500 mb-4 fill-current" />
              <p className="text-sm font-medium text-[#0a192f]">
                "This tool changed how I view my retirement. I'm not just saving; I'm planning my global life."
              </p>
              <div className="mt-4 text-xs text-gray-400 font-bold uppercase tracking-widest">— Sarah J., Digital Nomad</div>
            </div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-lg border border-gray-50 flex items-center justify-center mx-auto mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-[#0a192f] mb-4">{value.title}</h3>
              <p className="text-gray-500 font-light leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Team/Trust Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 md:p-20 rounded-[3rem] bg-gray-50 border border-brand-100 text-center"
        >
          <Users className="w-12 h-12 text-brand-500 mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0a192f] mb-6">Built for the Global Community</h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-light text-lg mb-12">
            We are a team of economists, developers, and travelers dedicated to making global wealth data accessible to everyone.
          </p>
          <div className="flex flex-wrap justify-center gap-12">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-green-500" />
              <span className="font-bold text-[#0a192f] uppercase tracking-widest text-xs">Verified Data</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe2 className="w-6 h-6 text-blue-500" />
              <span className="font-bold text-[#0a192f] uppercase tracking-widest text-xs">130+ Countries</span>
            </div>
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-brand-500" />
              <span className="font-bold text-[#0a192f] uppercase tracking-widest text-xs">AI Powered Insights</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
