import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Coins, Menu, X, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../AuthContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signIn, logOut, isAuthReady } = useAuth();

  const navItems = [
    { name: 'Global Explorer', path: '/' },
    { name: 'Converter', path: '/converter' },
    { name: 'Wealth Insights', path: '/insights' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            {/* High-fidelity CSS Logo Reconstruction */}
            <div className="w-10 h-10 rounded-xl bg-[#14b8a6] relative flex items-center justify-center shadow-lg shadow-teal-900/20 group-hover:scale-110 transition-transform duration-500 overflow-hidden">
              <div className="relative translate-y-0.5 -translate-x-1 scale-110">
                {/* Coin 1 */}
                <div className="w-5 h-5 rounded-full border-[1.5px] border-white flex items-center justify-center transform -rotate-12 translate-x-1.5 translate-y-0.5 bg-[#14b8a6]">
                  <span className="text-[9px] font-black text-white leading-none">1</span>
                </div>
                {/* Coin 2 */}
                <div className="w-5 h-5 rounded-full border-[1.5px] border-white flex items-center justify-center absolute -top-2.5 left-3.5 transform rotate-12 bg-[#14b8a6] shadow-[-2px_2px_4px_rgba(0,0,0,0.1)]">
                  <span className="text-[9px] font-black text-white leading-none">1</span>
                </div>
              </div>
              {/* Brand Accent Dot */}
              <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center shadow-sm">
                <div className="w-1.5 h-1.5 bg-[#14b8a6] rounded-full" />
              </div>
            </div>
            
            {/* Activity Indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
              <div className="w-2.5 h-2.5 bg-brand-500 rounded-full animate-pulse" />
            </div>
          </div>
          <span className="font-sans text-2xl font-black tracking-tighter text-gray-900">
            pennies<span className="text-[#14b8a6]">usa</span>
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <NavLink 
              key={item.name} 
              to={item.path} 
              className={({ isActive }) => cn(
                "text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-brand-600",
                isActive ? "text-brand-600" : "text-gray-500"
              )}
            >
              {item.name}
            </NavLink>
          ))}
          {isAuthReady && user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 group">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
              <button 
                onClick={logOut}
                className="text-gray-400 hover:text-gray-900 transition-colors p-2"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={signIn}
              className="px-8 py-3 rounded-full bg-[#0a192f] text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-brand-600 transition-all duration-300 shadow-xl shadow-navy-900/10 active:scale-95">
              Connect
            </button>
          )}
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
            className="absolute top-full left-0 right-0 bg-white border-b border-brand-100 shadow-2xl md:hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navItems.map((item) => (
                <NavLink 
                  key={item.name} 
                  to={item.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => cn(
                    "text-sm font-bold uppercase tracking-[0.2em] transition-colors",
                    isActive ? "text-brand-600" : "text-gray-500"
                  )}
                >
                  {item.name}
                </NavLink>
              ))}
              {isAuthReady && user ? (
                <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                     {user.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full border border-gray-200" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700">
                          <User className="w-5 h-5" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{user.displayName || 'User'}</span>
                        <span className="text-xs text-gray-500 truncate max-w-[200px]">{user.email}</span>
                      </div>
                  </div>
                  <button 
                    onClick={() => { logOut(); setIsMobileMenuOpen(false); }}
                    className="w-full py-4 rounded-xl border border-gray-200 text-gray-700 text-sm font-bold uppercase tracking-[0.2em] hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => { signIn(); setIsMobileMenuOpen(false); }}
                  className="w-full py-4 rounded-xl bg-[#0a192f] text-white text-sm font-bold uppercase tracking-[0.2em] hover:bg-brand-600 transition-colors">
                  Connect
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
