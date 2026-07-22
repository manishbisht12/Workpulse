"use client";

import React from "react";

export default function ContributionHeatmap() {
  const columns = Array.from({ length: 28 });
  const rows = Array.from({ length: 7 });

  const getDotColor = () => {
    const rand = Math.random();
    if (rand < 0.4) return "bg-[#101b26]"; // Low
    if (rand < 0.7) return "bg-[#0b3842]"; // Medium
    if (rand < 0.9) return "bg-[#085363]"; // High
    return "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"; // Max Streak
  };

  return (
    <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-6 space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-100">
          2026 Contribution Heatmap
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Daily productivity — January to June
        </p>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {columns.map((_, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-1.5">
            {rows.map((_, rowIdx) => (
              <div
                key={rowIdx}
                className={`w-3 h-3 rounded-full transition-transform hover:scale-125 cursor-pointer ${getDotColor()}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}