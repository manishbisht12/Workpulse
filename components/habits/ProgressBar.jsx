"use client";

import React from "react";

export default function ProgressBar({ progressPercentage }) {
  return (
    <div className="bg-[#0f1520] border border-violet-900/30 rounded-2xl p-5 space-y-3">
      <div className="flex justify-between items-center text-xs font-semibold">
        <span className="text-slate-400">Today's progress</span>
        <span className="text-violet-400">{progressPercentage}%</span>
      </div>

      <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
        <div
          className="bg-gradient-to-r from-violet-500 to-purple-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}