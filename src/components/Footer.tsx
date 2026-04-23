import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-teal-500/10 bg-slate-950 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
              <span className="text-teal-400 font-black text-sm">P</span>
            </div>
            <span className="text-lg font-bold text-slate-200">
              pennies<span className="text-teal-500">usa</span>
            </span>
          </div>
          
          <p className="text-slate-500 text-sm max-w-md text-center md:text-right">
            Helping you discover where your money works hardest. 
            Compare global purchasing power and cost of living.
            <br />
            <span className="mt-2 block opacity-50">© {new Date().getFullYear()} penniesusa. All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
