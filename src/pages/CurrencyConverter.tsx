import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, DollarSign, ArrowRightLeft } from 'lucide-react';
import { lifestyleData } from '../lifestyleData';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [targetCurrency, setTargetCurrency] = useState(lifestyleData[1]); // Default to Euro/Portugal

  const convertedAmount = (amount * targetCurrency.exchangeRate).toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-black mb-6">Global <span className="text-teal-500">Currency</span> Converter</h1>
        <p className="text-slate-400 text-lg">Real-time exchange rates for the world's most popular expat destinations.</p>
      </motion.div>

      <div className="glass rounded-[3rem] p-12 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500" />
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex-1 w-full space-y-4">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest text-left block ml-4">You Send (USD)</label>
            <div className="relative">
              <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-400 w-6 h-6" />
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-slate-900 border border-white/10 rounded-3xl py-6 pl-14 pr-8 text-2xl font-black focus:outline-none focus:ring-4 focus:ring-teal-500/20 transition-all"
              />
            </div>
          </div>

          <div className="bg-teal-500 p-4 rounded-full shadow-xl shadow-teal-500/30">
            <ArrowRightLeft className="w-8 h-8 text-white" />
          </div>

          <div className="flex-1 w-full space-y-4">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest text-left block ml-4">You Receive ({targetCurrency.currency})</label>
            <select
              value={targetCurrency.id}
              onChange={(e) => setTargetCurrency(lifestyleData.find(c => c.id === e.target.value) || lifestyleData[0])}
              className="w-full bg-slate-900 border border-white/10 rounded-3xl py-6 px-8 text-2xl font-black focus:outline-none focus:ring-4 focus:ring-teal-500/20 transition-all appearance-none cursor-pointer"
            >
              {lifestyleData.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.currency})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-16">
          <div className="text-sm text-slate-400 mb-2 font-medium">Estimated Conversion</div>
          <div className="text-6xl lg:text-8xl font-black text-white tracking-tighter">
            {targetCurrency.currencySymbol}{convertedAmount}
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-teal-500 font-bold">
            <RefreshCcw className="w-4 h-4 animate-spin-slow" />
            <span>Rates updated: April 22, 2026</span>
          </div>
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {lifestyleData.slice(1, 4).map(country => (
          <button 
            key={country.id}
            onClick={() => setTargetCurrency(country)}
            className="p-6 glass rounded-2xl border border-white/5 hover:border-teal-500/30 transition-all text-left group"
          >
            <div className="text-slate-400 text-xs mb-1 group-hover:text-teal-400 transition-colors uppercase font-bold">{country.name}</div>
            <div className="text-lg font-bold">${(amount * country.exchangeRate).toLocaleString()} {country.currency}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CurrencyConverter;
