import React from 'react';
import { Layers, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export type ActiveView = 'storefront' | 'tracker' | 'billing' | 'agency';

interface NavbarProps {
  currentView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  onStartProject: () => void;
  activeClientCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onStartProject,
  activeClientCount
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onNavigate('storefront')}
          className="text-lg font-bold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 font-display"
        >
          Foundry Web Studio
        </button>

        {/* Zone 2: Navigation Links (Clean text with hover highlights) */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-slate-300">
          <button
            onClick={() => onNavigate('storefront')}
            className={`transition-colors hover:text-white ${
              currentView === 'storefront' ? 'text-amber-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Service Packages
          </button>
          <button
            onClick={() => onNavigate('tracker')}
            className={`transition-colors hover:text-white flex items-center gap-1.5 ${
              currentView === 'tracker' ? 'text-amber-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <span>Project Tracker</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </button>
          <button
            onClick={() => onNavigate('billing')}
            className={`transition-colors hover:text-white ${
              currentView === 'billing' ? 'text-amber-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Automated Billing & Care
          </button>
          <button
            onClick={() => onNavigate('agency')}
            className={`transition-colors hover:text-white flex items-center gap-1.5 ${
              currentView === 'agency' ? 'text-amber-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <span>Agency Cockpit</span>
            <span className="text-[10px] font-mono text-slate-500">({activeClientCount})</span>
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Perspective Selector for Testing */}
          <div className="flex items-center p-0.5 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            <button
              onClick={() => onNavigate('tracker')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
                currentView === 'tracker'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Client Portal
            </button>
            <button
              onClick={() => onNavigate('agency')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
                currentView === 'agency'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Agency View
            </button>
          </div>

          <button
            onClick={onStartProject}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            <span>Build Your Site</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
