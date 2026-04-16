import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Coins, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Global Explorer', path: '/' },
    { name: 'Wealth Insights', path: '/insights' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gold-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center text-white shadow-lg shadow-gold-500/20 group-hover:scale-110 transition-transform duration-300">
            <Coins className="w-6 h-6" />
          </div>
          <span className="font-serif text-xl font-bold italic tracking-tight text-gray-900">
            Millionaire<span className="text-gold-600">.</span>
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <NavLink 
              key={item.name} 
              to={item.path} 
              className={({ isActive }) => cn(
                "text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-gold-600",
                isActive ? "text-gold-600" : "text-gray-500"
              )}
            >
              {item.name}
            </NavLink>
          ))}
          <button className="px-8 py-3 rounded-full bg-[#0a192f] text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gold-600 transition-all duration-300 shadow-xl shadow-navy-900/10 active:scale-95">
            Connect
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden w-10 h-10 flex items-center justify-center text-gray-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gold-100 shadow-2xl md:hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navItems.map((item) => (
                <NavLink 
                  key={item.name} 
                  to={item.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => cn(
                    "text-sm font-bold uppercase tracking-[0.2em] transition-colors",
                    isActive ? "text-gold-600" : "text-gray-500"
                  )}
                >
                  {item.name}
                </NavLink>
              ))}
              <button className="w-full py-4 rounded-xl bg-[#0a192f] text-white text-sm font-bold uppercase tracking-[0.2em] hover:bg-gold-600 transition-colors">
                Connect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
