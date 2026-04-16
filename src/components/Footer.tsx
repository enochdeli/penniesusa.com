import { Info, Search, TrendingUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 py-12 border-t border-copper-100 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="font-sans text-2xl font-black tracking-tighter text-gray-900">
            pennies<span className="text-[#b87333]">usa</span>
          </span>
        </div>
        <p className="text-sm text-gray-500 font-light max-w-md mx-auto">
          Exchange rates are updated in real-time. Wealth is relative, but your potential is global.
        </p>
        <div className="mt-8 flex items-center justify-center gap-6 text-gray-400">
          <Info className="w-4 h-4 hover:text-copper-500 cursor-help transition-colors" />
          <Search className="w-4 h-4 hover:text-copper-500 cursor-help transition-colors" />
          <TrendingUp className="w-4 h-4 hover:text-copper-500 cursor-help transition-colors" />
        </div>
        <div className="mt-8 text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
          © {new Date().getFullYear()} penniesusa. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
