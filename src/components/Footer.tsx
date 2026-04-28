import React from 'react';
import { Info, Search, TrendingUp } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-100 bg-[#F9FAFB] py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <span className="text-2xl font-black tracking-tight text-slate-900">
            pennies<span className="text-teal-500">usa</span>
          </span>
        </div>
        
        <p className="text-slate-500 text-sm xl:text-base mx-auto max-w-lg mb-8 leading-relaxed">
          Exchange rates are updated in real-time. Wealth is relative, but your potential is global.
        </p>

        <div className="flex items-center justify-center gap-6 text-slate-400 mb-10">
          <button className="hover:text-slate-900 transition-colors">
             <Info className="w-5 h-5" />
          </button>
          <button className="hover:text-slate-900 transition-colors">
             <Search className="w-5 h-5" />
          </button>
          <button className="hover:text-slate-900 transition-colors">
             <TrendingUp className="w-5 h-5" />
          </button>
        </div>
        
        <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
          © {new Date().getFullYear()} PENNIESUSA. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
