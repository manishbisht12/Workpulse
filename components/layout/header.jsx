"use client";

import { Bell, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 border-b border-cyan-900/20 px-4 sm:px-6 md:px-8 flex items-center justify-between bg-[#0d131a]/80 backdrop-blur-md w-full sticky top-0 z-30">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold tracking-wider text-slate-500 uppercase min-w-0">
        <span className="hidden sm:inline hover:text-slate-300 transition-colors cursor-pointer">Workspace</span>
        <span className="text-slate-700 hidden sm:inline">/</span>
        <span className="text-cyan-400 truncate">Dashboard</span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 transition-all duration-200">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full ring-2 ring-[#0d131a] shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
        </button>

        {/* Profile Menu Dropdown Button */}
        <button className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-cyan-900/30 hover:opacity-90 transition-opacity text-left group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-xs font-bold text-slate-950 shadow-md shadow-cyan-500/20 flex-shrink-0">
            AM
          </div>
          
          <div className="hidden md:block">
            <p className="text-xs font-semibold text-slate-200 group-hover:text-slate-100 transition-colors">Alex M.</p>
            <p className="text-[10px] text-cyan-500/80 font-medium">Premium Plan</p>
          </div>
          
          <ChevronDown size={14} className="text-slate-500 group-hover:text-slate-400 transition-colors flex-shrink-0" />
        </button>
      </div>
    </header>
  );
}