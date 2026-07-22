"use client";

import React from "react";

export default function MonthGrid({ monthData }) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Exact Cyan/Teal Intensity Matching Dashboard Palette
  const getIntensityStyle = (count) => {
    if (!count) return "bg-[#0d131a] border-cyan-900/20 text-slate-400 hover:border-cyan-500/30";
    if (count <= 3) return "bg-[#092229] border-cyan-800/40 text-cyan-200 hover:border-cyan-500/50";
    if (count <= 6) return "bg-[#0b3842] border-cyan-700/60 text-cyan-100 hover:border-cyan-400/60";
    if (count <= 9) return "bg-[#085363] border-cyan-500/80 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]";
    return "bg-cyan-500 border-cyan-300 text-slate-950 font-extrabold shadow-[0_0_20px_rgba(6,182,212,0.4)]";
  };

  return (
    <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-6 space-y-4">
      {/* Days Header */}
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-400 pb-2">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-3">
        {monthData.map((cell, idx) => (
          <div
            key={idx}
            className={`min-h-[100px] p-3 rounded-xl border flex flex-col justify-between transition-all duration-200 cursor-pointer ${
              cell.isCurrentMonth ? getIntensityStyle(cell.tasksDone) : "opacity-0 pointer-events-none"
            }`}
          >
            <span className="text-sm font-bold">{cell.day}</span>
            {cell.tasksDone > 0 && (
              <span className="text-[10px] opacity-90 self-end font-semibold">
                {cell.tasksDone}t
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Intensity Legend */}
      <div className="flex items-center justify-end gap-2 pt-4 text-xs text-slate-400 font-medium">
        <span>Less productive</span>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-md bg-[#0d131a] border border-cyan-900/30" />
          <span className="w-3.5 h-3.5 rounded-md bg-[#092229]" />
          <span className="w-3.5 h-3.5 rounded-md bg-[#0b3842]" />
          <span className="w-3.5 h-3.5 rounded-md bg-[#085363]" />
          <span className="w-3.5 h-3.5 rounded-md bg-cyan-500" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}