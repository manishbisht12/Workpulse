"use client";

import React from "react";
import { TrendingUp } from "lucide-react";

export default function StatCard({ title, value, changeText, icon: Icon, colorTheme }) {
  // Individual style mappings for each card to keep them distinct
  const themeStyles = {
    cyan: {
      cardBg: "bg-[#0c1926]/80 border-cyan-500/20 hover:border-cyan-500/40",
      iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      textAccent: "text-cyan-400",
    },
    teal: {
      cardBg: "bg-[#0b1c20]/80 border-teal-500/20 hover:border-teal-500/40",
      iconBg: "bg-teal-500/10 text-teal-400 border-teal-500/30",
      textAccent: "text-teal-400",
    },
    emerald: {
      cardBg: "bg-[#091f1c]/80 border-emerald-500/20 hover:border-emerald-500/40",
      iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      textAccent: "text-emerald-400",
    },
    amber: {
      cardBg: "bg-[#1f1911]/80 border-amber-500/20 hover:border-amber-500/40",
      iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      textAccent: "text-amber-400",
    },
  };

  const currentTheme = themeStyles[colorTheme] || themeStyles.cyan;

  return (
    <div
      className={`p-5 rounded-2xl border ${currentTheme.cardBg} flex flex-col justify-between space-y-4 transition-all duration-300`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center border ${currentTheme.iconBg}`}
      >
        <Icon size={20} />
      </div>

      <div>
        <h2 className="text-3xl font-bold text-slate-100 tracking-tight">{value}</h2>
        <p className="text-xs text-slate-400 mt-1 font-medium">{title}</p>
        
        <div className={`flex items-center gap-1 text-xs ${currentTheme.textAccent} font-semibold mt-2`}>
          <TrendingUp size={14} />
          <span>{changeText}</span>
        </div>
      </div>
    </div>
  );
}