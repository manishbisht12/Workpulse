"use client";

import React from "react";
import { Zap } from "lucide-react";

export default function AppInfoFooter() {
  return (
    <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Brand & Version */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/20">
          <Zap size={20} className="fill-slate-950" />
        </div>
        <div>
          <h4 className="text-base font-extrabold text-slate-100">WorkPulse</h4>
          <p className="text-xs text-slate-400">v2.4.1 · Build 20260615 · Pro Plan</p>
        </div>
      </div>

      {/* Meta Specs */}
      <div className="flex items-center gap-6 text-right">
        <div>
          <span className="text-sm font-bold text-slate-200 block">2.4.1</span>
          <span className="text-[10px] text-slate-500 font-semibold uppercase">Version</span>
        </div>
        <div>
          <span className="text-sm font-bold text-slate-200 block">US-East</span>
          <span className="text-[10px] text-slate-500 font-semibold uppercase">Region</span>
        </div>
        <div>
          <span className="text-sm font-bold text-teal-400 block">99.9%</span>
          <span className="text-[10px] text-slate-500 font-semibold uppercase">Uptime</span>
        </div>
      </div>
    </div>
  );
}