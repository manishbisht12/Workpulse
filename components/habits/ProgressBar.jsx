"use client";

import React from "react";

export default function ProgressBar({ progressPercentage }) {
  return (
    <div className="bg-[#0b0f17] border border-[#1e293b]/70 rounded-2xl p-5 space-y-3 shadow-sm">
      <div className="flex justify-between items-center text-xs font-semibold">
        <span className="text-slate-400 uppercase tracking-wider text-[11px]">Today's progress</span>
        <span className="text-[#00c8ec] font-bold">{progressPercentage}%</span>
      </div>

      <div className="w-full bg-[#0d131d] h-2.5 rounded-full overflow-hidden border border-[#1e293b]">
        <div
          className="bg-gradient-to-r from-[#00c8ec] to-teal-400 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(0,200,236,0.4)]"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}