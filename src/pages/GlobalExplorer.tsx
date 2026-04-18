import { useState, useEffect, useMemo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { 
  Coins, 
  Globe2, 
  Search, 
  TrendingUp, 
  ChevronDown,
  ArrowRight,
  Twitter,
  Facebook,
  Link,
  MessageCircle,
  Check,
  Share2,
  X,
  MapPin,
  Utensils,
  Home,
  Plane
} from 'lucide-react';
import { CURRENCIES } from '../constants';
import { fetchExchangeRates } from '../services/currencyService';
import { ExchangeRates, MillionaireResult } from '../types';
import { cn } from '../lib/utils';
import { getLifestyleData } from '../lifestyleData';
import { useAuth } from '../AuthContext';

export default function GlobalExplorer() {
  const { preferences, updatePreferences, isAuthReady } = useAuth();
  
  // Local state falls back to preferences or defaults
  const [amount, setAmount] = useState<string>('');
  const [baseCurrencyCode, setBaseCurrencyCode] = useState<string>('USD');
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [currencySearch, setCurrencySearch] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedResult, setSelectedResult] = useState<MillionaireResult | null>(null);
  const [activeFeature, setActiveFeature] = useState<{ title: string; content: ReactNode } | null>(null);

  useEffect(() => {
    async function init() {
      const data = await fetchExchangeRates();
      setRates(data ? data.rates : null);
      setLoading(false);
    }
    init();
  }, []);

  // Sync with user preferences once auth is ready
  useEffect(() => {
    if (isAuthReady && preferences) {
      if (preferences.baseCurrency && preferences.baseCurrency !== baseCurrencyCode) {
        setBaseCurrencyCode(preferences.baseCurrency);
      }
      if (preferences.netWorth && !amount) {
         setAmount(preferences.netWorth.toString());
      }
    }
  }, [isAuthReady, preferences]);

  const handleCurrencyChange = async (code: string) => {
    setBaseCurrencyCode(code);
    setIsCurrencyDropdownOpen(false);
    setCurrencySearch('');
    
    // Save to user profile if logged in
    if (isAuthReady && preferences) {
      await updatePreferences({ baseCurrency: code });
    }
  };

  const handleSearchCheck = async () => {
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    
    // Save net worth preference and history
    if (isAuthReady && preferences && amount) {
      await updatePreferences({ 
        netWorth: parseFloat(amount),
        searchHistory: [`${amount} ${baseCurrencyCode}`]
      });
    }
  };

  const baseCurrency = useMemo(() => 
    CURRENCIES.find(c => c.code === baseCurrencyCode) || CURRENCIES[0],
    [baseCurrencyCode]
  );

  const results = useMemo(() => {
    if (!rates) return [];

    const numAmount = parseFloat(amount) || 0;
    const amountInUSD = numAmount / (rates[baseCurrencyCode] || 1);

    return CURRENCIES.map(currency => {
      const rateToUSD = rates[currency.code];
      if (!rateToUSD) return null;

      const localAmount = amountInUSD * rateToUSD;
      const isMillionaire = localAmount >= 1000000;
      
      const valueForOneMillion = (1000000 / rateToUSD) * (rates[baseCurrencyCode] || 1);

      return {
        currency,
        localAmount,
        isMillionaire,
        valueForOneMillion
      };
    }).filter((r): r is MillionaireResult => r !== null)
      .sort((a, b) => b.localAmount - a.localAmount);
  }, [amount, baseCurrencyCode, rates]);

  const millionaireCount = useMemo(() => 
    results.filter(r => r.isMillionaire).length,
    [results]
  );

  const closestCountry = useMemo(() => {
    const nonMillionaires = results.filter(r => !r.isMillionaire);
    if (nonMillionaires.length === 0) return null;
    return nonMillionaires[0];
  }, [results]);

  const furthestCountry = useMemo(() => {
    if (results.length === 0) return null;
    return results[0];
  }, [results]);

  const filteredCurrencies = useMemo(() => {
    const search = currencySearch.toLowerCase().trim();
    if (!search) return CURRENCIES;
    return CURRENCIES.filter(c => 
      c.code.toLowerCase().includes(search) || 
      c.name.toLowerCase().includes(search) ||
      c.country.toLowerCase().includes(search)
    );
  }, [currencySearch]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
    );
  }

  return (
    <div className="pt-20">
      <SEO 
        title="Where Are You a Millionaire? | Global Wealth Explorer"
        description={`Find exactly where you are a millionaire today. Your net worth converted into 130+ currencies with real-time exchange rates.`}
        schema={{
          "@context": "https://schema.org",
          "@type": "FinancialService",
          "name": "penniesusa Global Explorer",
          "description": "Discover your purchasing power globally. Convert your net worth and see where your money goes furthest.",
          "url": window.location.href,
          "serviceType": "Currency Valuation & Wealth Analysis"
        }}
      />
      {/* Hero Section */}
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
              Global Wealth Perspective
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight text-[#0a192f] mb-6">
              Where Are You a <span className="text-brand-600 italic">Millionaire? 🌍</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Discover how far your money really goes around the world.
            </p>
          </motion.div>

          {/* Input Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 max-w-xl mx-auto"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-brand-500/5 blur-2xl group-focus-within:bg-brand-500/10 transition-colors rounded-3xl pointer-events-none" />
              <div className="relative flex flex-col md:flex-row items-stretch gap-2 p-2 bg-white rounded-2xl shadow-xl shadow-brand-900/5 border border-brand-100">
                <div className="relative flex-1">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <span className="text-lg font-medium">{baseCurrency.symbol}</span>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter net worth..."
                    className="w-full pl-10 pr-4 py-4 bg-transparent text-2xl font-medium focus:outline-none placeholder:text-gray-300"
                  />
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);
                      if (!isCurrencyDropdownOpen) setCurrencySearch('');
                    }}
                    className="h-full px-6 py-4 flex items-center justify-between gap-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-100 min-w-[140px]"
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      <img 
                        src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/${baseCurrency.iso}.svg`} 
                        alt={baseCurrency.country}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        className="w-6 h-4 object-cover rounded-sm shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                      <span>{baseCurrency.code}</span>
                    </span>
                    <ChevronDown className={cn("w-4 h-4 transition-transform", isCurrencyDropdownOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {isCurrencyDropdownOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setIsCurrencyDropdownOpen(false)} 
                        />
                        <motion.div
                          key="currency-dropdown"
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          className="absolute right-0 top-full mt-2 w-72 max-h-[400px] overflow-hidden bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-brand-100 z-[100] flex flex-col"
                        >
                          <div className="p-3 border-b border-gray-100 bg-white sticky top-0 z-20">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-500" />
                              <input
                                type="text"
                                value={currencySearch}
                                onChange={(e) => setCurrencySearch(e.target.value)}
                                placeholder="Search by name, code or country..."
                                className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                                autoFocus
                              />
                            </div>
                          </div>
                          <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                            {filteredCurrencies.length > 0 ? (
                              filteredCurrencies.map((c) => (
                                <button
                                  key={c.code}
                                  onClick={() => handleCurrencyChange(c.code)}
                                  className={cn(
                                    "w-full flex items-center justify-between p-3 rounded-xl transition-all text-left mb-1 last:mb-0 group/item",
                                    baseCurrencyCode === c.code 
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
                                  {baseCurrencyCode === c.code ? (
                                    <div className="w-2 h-2 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
                                  ) : (
                                    <ArrowRight className="w-3 h-3 text-gray-300 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                  )}
                                </button>
                              ))
                            ) : (
                              <div className="py-12 px-4 text-center">
                                <Search className="w-8 h-8 text-gray-200 mx-auto mb-3" />
                                <p className="text-sm text-gray-400 font-medium">No currencies found for "{currencySearch}"</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="relative z-10 mt-6 flex flex-col items-center gap-4">
                <button 
                  onClick={handleSearchCheck}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 text-white text-lg font-bold hover:from-brand-700 hover:to-brand-600 transition-all shadow-xl shadow-brand-900/20 active:scale-95 cursor-pointer"
                >
                  Check My Status
                </button>
                <p className="text-xs text-gray-400 font-medium tracking-wide">
                  Takes 2 seconds • Saves automatically if connected
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Stats / Summary */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-8 py-8 border-y border-brand-200/50"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Countries Scanned</div>
              <div className="text-xl font-display font-bold">{results.length}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Millionaire Status</div>
              <div className="text-xl font-display font-bold">{millionaireCount} Countries</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Base Currency</div>
              <div className="text-xl font-display font-bold">{baseCurrency.name}</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Emotional Result Section */}
      <section id="results-section" className="max-w-7xl mx-auto px-6 mb-16">
        <AnimatePresence mode="wait">
          {parseFloat(amount) > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative p-8 md:p-12 rounded-[2.5rem] bg-white border border-brand-100 shadow-2xl shadow-brand-900/10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50/50 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-4xl md:text-6xl font-display font-black text-[#0a192f] leading-tight mb-4">
                      You are a <span className="text-brand-600 italic">MILLIONAIRE</span> in <span className="underline decoration-brand-300 underline-offset-8">{millionaireCount}</span> countries 💰
                    </h2>
                    <p className="text-lg text-gray-500 font-light">
                      Your current net worth of {baseCurrency.symbol}{parseFloat(amount).toLocaleString()} {baseCurrency.code} grants you extraordinary status across the globe.
                    </p>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {closestCountry && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="p-6 rounded-3xl bg-gray-50 border border-gray-100 group hover:border-brand-200 transition-colors"
                    >
                      <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-4">Closest Milestone</div>
                      <div className="flex items-center gap-3 mb-3">
                        <img 
                          src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/${closestCountry.currency.iso}.svg`} 
                          alt={closestCountry.currency.country}
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          className="w-8 h-5 object-cover rounded shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-display font-bold text-gray-900">{closestCountry.currency.country}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        You need <span className="font-bold text-brand-600">{baseCurrency.symbol}{Math.ceil(closestCountry.valueForOneMillion - parseFloat(amount)).toLocaleString()}</span> more to be a millionaire here.
                      </div>
                    </motion.div>
                  )}

                  {furthestCountry && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="p-6 rounded-3xl bg-brand-50/30 border border-brand-100 group hover:border-brand-300 transition-colors"
                    >
                      <div className="text-[10px] text-brand-500 uppercase tracking-widest font-bold mb-4">Maximum Power</div>
                      <div className="flex items-center gap-3 mb-3">
                        <img 
                          src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/${furthestCountry.currency.iso}.svg`} 
                          alt={furthestCountry.currency.country}
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          className="w-8 h-5 object-cover rounded shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-display font-bold text-gray-900">{furthestCountry.currency.country}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Your money goes furthest in <span className="font-bold text-brand-600">{furthestCountry.currency.country}</span>, where you are worth <span className="font-bold text-brand-600">{furthestCountry.currency.symbol}{furthestCountry.localAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>.
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Sharing Section */}
      <AnimatePresence>
        {parseFloat(amount) > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="max-w-7xl mx-auto px-6 mb-16"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-3xl bg-brand-50/20 border border-brand-100/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-brand-100 flex items-center justify-center text-brand-600 shadow-sm">
                  <Share2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-gray-900 italic text-lg">Share your global status</h4>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Let the world know your worth</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    const msg = `I’m a millionaire in ${millionaireCount} countries 💰🌍 — check yours: ${window.location.href}`;
                    navigator.clipboard.writeText(msg);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-gray-100 hover:border-brand-300 transition-all shadow-sm text-sm font-bold text-gray-700 group"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link className="w-4 h-4 text-brand-500 group-hover:scale-110 transition-transform" />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>

                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I’m a millionaire in ${millionaireCount} countries 💰🌍 — check yours: ${window.location.href}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-black/10"
                  title="Share on X"
                >
                  <Twitter className="w-5 h-5" />
                </a>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-[#1877F2]/10"
                  title="Share on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>

                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`I’m a millionaire in ${millionaireCount} countries 💰🌍 — check yours: ${window.location.href}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-[#25D366]/10"
                  title="Share on WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Recommendations Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Grow your wealth globally.",
              description: "Discover international investment strategies to diversify your portfolio and accelerate your path to global millionaire status.",
              cta: "Explore Strategies",
              icon: <TrendingUp className="w-5 h-5" />,
              link: "#"
            },
            {
              title: "Track your net worth.",
              description: "Use our premium dashboard to monitor your assets across all currencies and see your real-time global standing.",
              cta: "Start Tracking",
              icon: <Coins className="w-5 h-5" />,
              link: "#"
            },
            {
              title: "Live like a millionaire abroad.",
              description: "Find the perfect balance between luxury and cost. Discover countries where your current wealth provides a high-end lifestyle.",
              cta: "View Destinations",
              icon: <Globe2 className="w-5 h-5" />,
              link: "#"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-[2rem] bg-white border border-brand-100/50 hover:border-brand-300 transition-all duration-500 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-[#0a192f] mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed mb-8">
                  {item.description}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const content = {
                    "Grow your wealth globally.": (
                      <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-brand-50/30 border border-brand-100">
                          <h4 className="font-bold text-[#0a192f] mb-2">Offshore Banking</h4>
                          <p className="text-sm text-gray-600">Diversify your holdings in stable, high-privacy jurisdictions to protect your capital from local volatility.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-brand-50/30 border border-brand-100">
                          <h4 className="font-bold text-[#0a192f] mb-2">Emerging Market Real Estate</h4>
                          <p className="text-sm text-gray-600">Invest in high-growth economies like Thailand or Mexico where property appreciation and rental yields often outpace Western markets.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-brand-50/30 border border-brand-100">
                          <h4 className="font-bold text-[#0a192f] mb-2">Global Index Funds</h4>
                          <p className="text-sm text-gray-600">Broaden your portfolio beyond domestic stocks to capture the growth of the entire global economy.</p>
                        </div>
                      </div>
                    ),
                    "Track your net worth.": (
                      <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-brand-50/30 border border-brand-100">
                          <h4 className="font-bold text-[#0a192f] mb-2">Multi-Currency Dashboard</h4>
                          <p className="text-sm text-gray-600">Monitor your assets across 130+ currencies in real-time. See your total wealth consolidated into your base currency instantly.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-brand-50/30 border border-brand-100">
                          <h4 className="font-bold text-[#0a192f] mb-2">Purchasing Power Tracking</h4>
                          <p className="text-sm text-gray-600">Don't just track numbers; track what they can buy. See how your lifestyle potential changes as exchange rates fluctuate.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-brand-50/30 border border-brand-100">
                          <h4 className="font-bold text-[#0a192f] mb-2">Asset Allocation Insights</h4>
                          <p className="text-sm text-gray-600">Visualize your global footprint and identify where you are over-exposed or under-invested.</p>
                        </div>
                      </div>
                    ),
                    "Live like a millionaire abroad.": (
                      <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-brand-50/30 border border-brand-100">
                          <h4 className="font-bold text-[#0a192f] mb-2">Value-Luxury Destinations</h4>
                          <p className="text-sm text-gray-600">Discover countries where $1,000/month buys a penthouse and a private chef. We curate the best balance of safety, infrastructure, and cost.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-brand-50/30 border border-brand-100">
                          <h4 className="font-bold text-[#0a192f] mb-2">Residency by Investment</h4>
                          <p className="text-sm text-gray-600">Learn about 'Golden Visas' and digital nomad programs that allow you to live a high-end lifestyle in beautiful countries legally and long-term.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-brand-50/30 border border-brand-100">
                          <h4 className="font-bold text-[#0a192f] mb-2">Global Lifestyle Concierge</h4>
                          <p className="text-sm text-gray-600">Access exclusive data on the best neighborhoods, international schools, and luxury amenities in emerging millionaire hubs.</p>
                        </div>
                      </div>
                    )
                  }[item.title];
                  setActiveFeature({ title: item.title, content });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-50 text-[#0a192f] text-xs font-bold uppercase tracking-widest hover:bg-brand-500 hover:text-white transition-all cursor-pointer"
              >
                {item.cta}
                <ArrowRight className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-[#0a192f]">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { step: "01", title: "Convert your money", desc: "Instantly see your net worth in 130+ global currencies." },
            { step: "02", title: "Compare globally", desc: "Understand your purchasing power across different economies." },
            { step: "03", title: "Discover millionaire status", desc: "Find exactly where you're considered a millionaire today." }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-display font-black italic text-brand-200 mb-4">{item.step}</div>
              <h4 className="text-lg font-bold text-[#0a192f] mb-2">{item.title}</h4>
              <p className="text-sm text-gray-500 font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Email Capture Section */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="p-10 rounded-[2.5rem] bg-[#0a192f] text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <h2 className="text-3xl font-display font-bold mb-4">Get your global wealth report</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">Receive a detailed analysis of your purchasing power and investment opportunities worldwide.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email..." 
              className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-brand-500 transition-colors"
            />
            <button className="px-8 py-4 rounded-xl bg-brand-500 text-white font-bold hover:bg-brand-600 transition-colors">
              Get Report
            </button>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <main className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {results.map((result, index) => (
              <motion.div
                layout
                key={result.currency.code}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.4, 
                  delay: Math.min(index * 0.05, 1)
                }}
                onClick={() => setSelectedResult(result)}
                className={cn(
                  "group relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer",
                  result.isMillionaire 
                    ? "bg-white border-brand-200 shadow-lg shadow-brand-900/5 ring-1 ring-brand-100 hover:scale-[1.02]" 
                    : "bg-white/40 border-gray-100 opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0 hover:scale-[1.02]"
                )}
              >

                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <img 
                      src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/${result.currency.iso}.svg`} 
                      alt={result.currency.country}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      className="w-12 h-8 object-cover rounded-md shadow-md border border-gray-100"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="font-display font-bold text-lg leading-tight group-hover:text-brand-700 transition-colors flex items-center flex-wrap gap-2">
                        {result.currency.country}
                        {result.isMillionaire && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tight bg-brand-100 text-brand-700 border border-brand-200">
                            Millionaire
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                        {result.currency.name}
                      </p>
                    </div>
                  </div>
                  <div className={cn(
                    "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter",
                    result.localAmount >= 1000000 ? "bg-brand-500 text-white shadow-sm" :
                    result.localAmount >= 250000 ? "bg-gray-100 text-gray-600 border border-gray-200" :
                    "bg-gray-50 text-gray-400 border border-gray-100"
                  )}>
                    {result.localAmount >= 1000000 ? "Millionaire" :
                     result.localAmount >= 250000 ? "Almost There" :
                     "Far From It"}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Your Worth Here</div>
                    <div className={cn(
                      "text-2xl font-display font-bold",
                      result.isMillionaire ? "text-brand-600" : "text-gray-900"
                    )}>
                      {result.currency.symbol} {result.localAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-[10px] mt-1 font-medium text-gray-400 italic">
                      {result.localAmount >= 1000000 ? "Your money goes far here." :
                       result.localAmount >= 250000 ? "Moderate cost of living" :
                       "High cost country"}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-50">
                    <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Cost of Millionaire Status</div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">1,000,000 {result.currency.code}</span>
                      <ArrowRight className="w-3 h-3 text-gray-300" />
                      <span className="font-medium text-gray-700">
                        {baseCurrency.symbol}{result.valueForOneMillion.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {results.length === 0 && !loading && (
          <div className="text-center py-20">
            <Globe2 className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-display font-medium text-gray-400">No data available for the selected currency.</h3>
          </div>
        )}

        {/* Final CTA */}
        <div className="mt-20 text-center">
          <button 
            onClick={() => {
              setAmount('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-10 py-5 rounded-2xl border-2 border-[#0a192f] text-[#0a192f] font-bold text-lg hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all active:scale-95"
          >
            Try another amount
          </button>
        </div>
      </main>

      {/* Country Detail Modal */}
      <AnimatePresence>
        {selectedResult && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedResult(null)}
              className="fixed inset-0 z-[60] bg-gray-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-x-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[70] w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl border border-brand-100 overflow-hidden"
            >
              <button 
                onClick={() => setSelectedResult(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[85vh] overflow-y-auto">
                {/* Header */}
                <div className="relative h-48 bg-brand-50 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-400 via-transparent to-transparent" />
                  <motion.img 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/${selectedResult.currency.iso}.svg`} 
                    alt={selectedResult.currency.country}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    className="relative w-48 h-32 object-cover rounded-xl shadow-2xl border-4 border-white"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-8 md:p-12">
                  <div className="mb-8">
                    <h2 className="text-4xl font-display font-bold text-gray-900 mb-2">{selectedResult.currency.country}</h2>
                    <p className="text-brand-600 font-medium tracking-widest uppercase text-xs">{selectedResult.currency.name}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="space-y-6">
                      <div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Local Net Worth</div>
                        <div className="text-3xl font-display font-bold text-gray-900">
                          {selectedResult.currency.symbol}{selectedResult.localAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Millionaire Threshold</div>
                        <div className="text-lg font-medium text-gray-600">
                          1,000,000 {selectedResult.currency.code}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-brand-50/30 border border-brand-100">
                      <div className="text-[10px] text-brand-500 uppercase tracking-widest font-bold mb-2">Status Insight</div>
                      <div className="text-gray-700 font-medium mb-4">
                        {selectedResult.isMillionaire 
                          ? "You have achieved elite status in this economy." 
                          : `You are ${Math.round((selectedResult.localAmount / 1000000) * 100)}% of the way to a million.`}
                      </div>
                      {!selectedResult.isMillionaire && (
                        <div className="text-sm text-gray-500">
                          Gap: <span className="text-brand-600 font-bold">{baseCurrency.symbol}{Math.ceil(selectedResult.valueForOneMillion - parseFloat(amount)).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Lifestyle Section */}
                  <div className="pt-8 border-t border-gray-100">
                    <h3 className="text-xl font-display font-bold text-gray-900 mb-2">Live Like a Millionaire in {selectedResult.currency.country}</h3>
                    <p className="text-sm text-gray-600 italic mb-6 leading-relaxed">
                      "{getLifestyleData(selectedResult.currency.code).culturalInsight}"
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {getLifestyleData(selectedResult.currency.code).items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-brand-600 shadow-sm">
                            {item.icon === 'Home' && <Home className="w-4 h-4" />}
                            {item.icon === 'Utensils' && <Utensils className="w-4 h-4" />}
                            {item.icon === 'Plane' && <Plane className="w-4 h-4" />}
                            {item.icon === 'MapPin' && <MapPin className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="text-[10px] text-gray-400 uppercase font-bold">{item.label}</div>
                            <div className="text-sm font-bold text-gray-700">{item.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Feature Detail Modal */}
      <AnimatePresence>
        {activeFeature && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveFeature(null)}
              className="fixed inset-0 bg-[#0a192f]/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 m-auto w-full max-w-2xl h-fit max-h-[90vh] overflow-y-auto bg-white rounded-[2.5rem] shadow-2xl z-[70] outline-none"
            >
              <div className="relative">
                <button 
                  onClick={() => setActiveFeature(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="p-8 md:p-12">
                  <div className="mb-8">
                    <h2 className="text-3xl font-display font-bold text-[#0a192f] mb-4">{activeFeature.title}</h2>
                    <div className="w-20 h-1 bg-brand-500 rounded-full" />
                  </div>

                  <div className="prose prose-brand max-w-none">
                    {activeFeature.content}
                  </div>

                  <div className="mt-12 pt-8 border-t border-gray-100">
                    <button 
                      onClick={() => setActiveFeature(null)}
                      className="w-full py-4 rounded-2xl bg-[#0a192f] text-white font-bold uppercase tracking-widest text-xs hover:bg-brand-600 transition-colors"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
