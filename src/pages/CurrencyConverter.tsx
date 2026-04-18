import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { ArrowRightLeft, Search, ChevronDown, Coins, RefreshCcw } from 'lucide-react';
import { CURRENCIES } from '../constants';
import { fetchExchangeRates } from '../services/currencyService';
import { ExchangeRates } from '../types';
import { cn } from '../lib/utils';
import { useAuth } from '../AuthContext';

export default function CurrencyConverter() {
  const { preferences, updatePreferences, isAuthReady } = useAuth();

  const [fromAmount, setFromAmount] = useState<string>('1000');
  const [fromCurrencyCode, setFromCurrencyCode] = useState<string>('USD');
  const [toCurrencyCode, setToCurrencyCode] = useState<string>('MXN');
  
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const data = await fetchExchangeRates();
        if (data) {
          setRates(data.rates);
          setLastUpdated(data.lastUpdated);
        }
      } catch (err) {
        console.error("Converter initialization error:", err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  // Sync with user preferences once auth is ready
  useEffect(() => {
    if (isAuthReady && preferences) {
      if (preferences.baseCurrency && preferences.baseCurrency !== fromCurrencyCode) {
        setFromCurrencyCode(preferences.baseCurrency);
      }
    }
  }, [isAuthReady, preferences]);

  const handleFromCurrencySelect = async (code: string) => {
      setFromCurrencyCode(code);
      if (isAuthReady && preferences) {
         await updatePreferences({ baseCurrency: code });
      }
  };

  const fromCurrency = useMemo(() => 
    CURRENCIES.find(c => c.code === fromCurrencyCode) || CURRENCIES[0],
    [fromCurrencyCode]
  );
  
  const toCurrency = useMemo(() => 
    CURRENCIES.find(c => c.code === toCurrencyCode) || CURRENCIES[12] || CURRENCIES[1],
    [toCurrencyCode]
  );

  const convertedAmount = useMemo(() => {
    if (!rates || !fromAmount) return 0;
    const numAmount = parseFloat(fromAmount) || 0;
    const amountInUSD = numAmount / (rates[fromCurrencyCode] || 1);
    return amountInUSD * (rates[toCurrencyCode] || 1);
  }, [fromAmount, fromCurrencyCode, toCurrencyCode, rates]);

  const exchangeRate = useMemo(() => {
    if (!rates) return 0;
    return (1 / (rates[fromCurrencyCode] || 1)) * (rates[toCurrencyCode] || 1);
  }, [fromCurrencyCode, toCurrencyCode, rates]);

  const handleSwap = () => {
    setFromCurrencyCode(toCurrencyCode);
    setToCurrencyCode(fromCurrencyCode);
  };

  const formatConverterValue = (val: number) => {
    if (val === 0) return "0.00";
    const absVal = Math.abs(val);
    if (absVal < 0.01) {
      return val.toLocaleString(undefined, { maximumSignificantDigits: 4 });
    }
    return val.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  };

  const formatRateValue = (rate: number) => {
    if (rate === 0) return "0.00";
    if (rate < 0.01) {
      return rate.toLocaleString(undefined, { maximumSignificantDigits: 5 });
    } else if (rate < 1) {
      return rate.toLocaleString(undefined, { maximumFractionDigits: 6, minimumFractionDigits: 4 });
    }
    return rate.toLocaleString(undefined, { maximumFractionDigits: 4, minimumFractionDigits: 2 });
  };

  return (
    <div className="pt-20 min-h-screen bg-[#fcfaf7]">
      <SEO 
        title="Live Global Currency Converter | penniesusa"
        description="Convert between 130+ global currencies with real-time exchange rates. Accurately calculate your international purchasing power instantly."
        schema={{
          "@context": "https://schema.org",
          "@type": "ExchangeRateSpecification",
          "name": "Live Currency Exchange Rates",
          "url": window.location.href,
          "currency": "USD"
        }}
      />
      <header className="relative pt-20 pb-16 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-100/30 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-100/30 blur-[120px] rounded-full" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-semibold tracking-widest uppercase mb-6 border border-brand-200">
              Live Exchange Rates
            </span>
            <h1 className="text-5xl md:text-6xl font-display font-black tracking-tight text-[#0a192f] mb-6">
              Global Currency <span className="text-brand-600 italic">Converter</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Convert between 130+ global currencies with real-time exchange rates.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-20 relative z-10">
        {loading ? (
          <div className="flex flex-col flex-1 items-center justify-center p-20">
             <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-24 h-24 rounded-3xl bg-[#14b8a6] relative flex items-center justify-center shadow-2xl shadow-teal-900/20 overflow-hidden"
             >
                <div className="relative translate-y-1 -translate-x-3 scale-150">
                  {/* Coin 1 */}
                  <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center transform -rotate-12 translate-x-4 translate-y-1 bg-[#14b8a6]">
                    <span className="text-[18px] font-black text-white leading-none">1</span>
                  </div>
                  {/* Coin 2 */}
                  <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center absolute -top-8 left-9 transform rotate-12 bg-[#14b8a6] shadow-[-4px_4px_8px_rgba(0,0,0,0.15)]">
                    <span className="text-[18px] font-black text-white leading-none">1</span>
                  </div>
                </div>
                {/* Brand Accent Dot */}
                <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                  <div className="w-3.5 h-3.5 bg-[#14b8a6] rounded-full" />
                </div>
             </motion.div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 md:p-12 rounded-[2.5rem] bg-white border border-brand-100 shadow-2xl shadow-brand-900/10"
          >
            <div className="flex flex-col gap-6">
              {/* From Section */}
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="w-full md:flex-1 relative group">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 pl-2">Amount</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <span className="text-lg font-medium">{fromCurrency.symbol}</span>
                    </div>
                    <input
                      type="number"
                      step="any"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-gray-900"
                    />
                  </div>
                </div>
                <div className="w-full md:w-auto">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 pl-2 hidden md:block">&nbsp;</label>
                    <CurrencySelector 
                      selectedCode={fromCurrencyCode} 
                      onSelect={handleFromCurrencySelect} 
                    />
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center -my-2 relative z-10">
                <button 
                  onClick={handleSwap}
                  className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-brand-500 hover:text-white hover:bg-brand-500 hover:border-brand-500 hover:scale-110 shadow-lg shadow-brand-500/10 transition-all"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                </button>
              </div>

              {/* To Section */}
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="w-full md:flex-1 relative group">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 pl-2">Converted</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-600">
                      <span className="text-lg font-medium">{toCurrency.symbol}</span>
                    </div>
                    <div className="w-full pl-10 pr-4 py-5 bg-brand-50/50 border border-brand-100 rounded-2xl text-2xl font-bold text-brand-700 overflow-hidden text-ellipsis whitespace-nowrap">
                      {formatConverterValue(convertedAmount)}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-auto">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 pl-2 hidden md:block">&nbsp;</label>
                    <CurrencySelector 
                      selectedCode={toCurrencyCode} 
                      onSelect={setToCurrencyCode} 
                    />
                </div>
              </div>
            </div>

            {/* Exchange Rate Info */}
            <div className="mt-8 p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center flex flex-col items-center justify-center relative">
              <span className="text-xs text-brand-600 font-bold uppercase tracking-widest mb-2">Live Rate</span>
              <p className="text-xl font-display font-medium text-gray-900 mb-2">
                1 {fromCurrencyCode} = {formatRateValue(exchangeRate)} {toCurrencyCode}
              </p>
              {lastUpdated && (
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-1">
                  Last Updated: {new Date(lastUpdated).toLocaleString()}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

// Sub-component for Currency Selector Dropdown to keep it clean
function CurrencySelector({ selectedCode, onSelect }: { selectedCode: string, onSelect: (code: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  const selected = useMemo(() => CURRENCIES.find(c => c.code === selectedCode) || CURRENCIES[0], [selectedCode]);

  const filtered = useMemo(() => {
    const s = search.toLowerCase().trim();
    if (!s) return CURRENCIES;
    return CURRENCIES.filter(c => 
      c.code.toLowerCase().includes(s) || 
      c.name.toLowerCase().includes(s) ||
      c.country.toLowerCase().includes(s)
    );
  }, [search]);

  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setSearch('');
        }}
        className="w-full md:w-auto h-[68px] px-6 flex items-center justify-between gap-3 bg-white hover:bg-gray-50 rounded-2xl transition-colors border border-gray-200 min-w-[160px]"
      >
        <span className="flex items-center gap-3">
          <img 
            src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/${selected.iso}.svg`} 
            alt={selected.country}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            className="w-6 h-4 object-cover rounded-sm shadow-sm"
            referrerPolicy="no-referrer"
          />
          <span className="font-bold text-lg text-gray-900">{selected.code}</span>
        </span>
        <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute right-0 top-full mt-2 w-72 max-h-[360px] overflow-hidden bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-brand-100 z-[100] flex flex-col origin-top-right"
            >
              <div className="p-3 border-b border-gray-100 bg-white sticky top-0 z-20">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-500" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search currency..."
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                    autoFocus
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                {filtered.length > 0 ? (
                  filtered.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        onSelect(c.code);
                        setIsOpen(false);
                        setSearch('');
                      }}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-xl transition-all text-left mb-1 last:mb-0 group/item",
                        selectedCode === c.code 
                          ? "bg-brand-50 text-brand-700 border border-brand-100" 
                          : "hover:bg-gray-50 border border-transparent hover:border-gray-100"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <div className="relative">
                          <img 
                            src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/${c.iso}.svg`} 
                            alt={c.country}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            className="w-7 h-5 object-cover rounded shadow-sm border border-gray-100"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-sm leading-none text-gray-900">{c.code}</div>
                          <div className="text-[10px] text-gray-500 mt-1 font-medium uppercase tracking-wider">{c.name}</div>
                        </div>
                      </span>
                      {selectedCode === c.code && (
                        <div className="w-2 h-2 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
                      )}
                    </button>
                  ))
                ) : (
                  <div className="py-8 px-4 text-center text-gray-400 text-sm">
                    No currencies found
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
