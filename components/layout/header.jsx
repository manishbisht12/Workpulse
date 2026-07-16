"use client";

import { Bell, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 border-b border-gray-800/30 px-8 flex items-center justify-between bg-[#090A15]/60 backdrop-blur-md">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
        <span>Workspace</span>
        <span className="text-gray-700">/</span>
        <span className="text-violet-400">Dashboard</span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <button className="relative p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/30 transition">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-gray-800/40">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-violet-500/20">
            AM
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-gray-200">Alex M.</p>
            <p className="text-[10px] text-gray-500">Premium Plan</p>
          </div>
          <ChevronDown size={14} className="text-gray-500" />
        </div>
      </div>
    </header>
  );
}