"use client";

import React from "react";

export default function ContributionHeatmap({ data }) {
  // We expect data to be an array of up to 196 days {date, count}
  const heatmapData = data || [];
  
  // Reshape into 28 columns of 7 rows
  const columns = Array.from({ length: 28 });
  const rows = Array.from({ length: 7 });

  const getDotColor = (count) => {
    if (!count) return "bg-[#101b26]"; // Empty/Low
    if (count <= 3) return "bg-[#0b3842]"; // Medium-low
    if (count <= 6) return "bg-[#085363]"; // Medium-high
    return "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"; // Max Streak
  };

  return (
    <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-6 space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-100">
          Contribution Heatmap
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Daily productivity — Last 196 days
        </p>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {columns.map((_, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-1.5">
            {rows.map((_, rowIdx) => {
              const dataIndex = colIdx * 7 + rowIdx;
              const cellData = heatmapData[dataIndex];
              const count = cellData ? cellData.count : 0;
              return (
                <div
                  key={rowIdx}
                  title={cellData ? `${cellData.date}: ${count} tasks` : ""}
                  className={`w-3 h-3 rounded-full transition-transform hover:scale-125 cursor-pointer ${getDotColor(count)}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}