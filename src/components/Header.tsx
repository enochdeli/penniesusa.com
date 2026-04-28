import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coins } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'GLOBAL EXPLORER', path: '/' },
    { name: 'CONVERTER', path: '/converter' },
    { name: 'WEALTH INSIGHTS', path: '/insights' },
    { name: 'BLOG', path: '/blog' },
    { name: 'ABOUT', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F9FAFB]/90 backdrop-blur-md border-b border-slate-200 py-5 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(20,184,166,0.2)]">
             <Coins className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900 hidden sm:block">
            pennies<span className="text-teal-500">usa</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "hidden md:block text-xs font-bold tracking-wider transition-all duration-300",
                  isActive 
                    ? "text-teal-500" 
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                {item.name}
              </Link>
            );
          })}
          
          <button className="ml-4 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold tracking-wider rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95">
            CONNECT
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
