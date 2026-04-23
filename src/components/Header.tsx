import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe2, BookOpen, Settings, LayoutDashboard } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Explorer', path: '/', icon: Globe2 },
    { name: 'Blog', path: '/blog', icon: BookOpen },
    { name: 'Admin', path: '/admin', icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-dark border-b border-teal-500/10 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(20,184,166,0.4)]">
            <span className="text-white font-black text-xl leading-none">P</span>
          </div>
          <span className="text-xl font-black tracking-tight text-white hidden sm:block">
            pennies<span className="text-teal-500 text-2xl">usa</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  isActive 
                    ? "bg-teal-500/10 text-teal-400 shadow-[inset_0_0_10px_rgba(20,184,166,0.05)]" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive && "animate-pulse")} />
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
