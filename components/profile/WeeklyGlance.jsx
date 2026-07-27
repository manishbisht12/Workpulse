"use client";

import React from "react";

const weekData = [
  { day: "Mon", height: "55%", active: false },
  { day: "Tue", height: "75%", active: false },
  { day: "Wed", height: "60%", active: false },
  { day: "Thu", height: "90%", active: true },
  { day: "Fri", height: "80%", active: false },
  { day: "Sat", height: "50%", active: false },
  { day: "Sun", height: "35%", active: false },
];

export default function WeeklyGlance() {
  return (
    <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-6 space-y-5">
      <h3 className="text-base font-bold text-slate-100">This Week at a Glance</h3>

      <div className="h-44 w-full flex items-end justify-between gap-3 pt-4 px-2">
        {weekData.map((item) => (
          <div key={item.day} className="flex-1 flex flex-col items-center h-full justify-end gap-2 group">
            <div className="w-full bg-[#111923] h-full rounded-xl flex items-end overflow-hidden p-1 border border-cyan-900/20">
              <div
                className={`w-full rounded-lg transition-all duration-500 ${
                  item.active
                    ? "bg-gradient-to-t from-cyan-500 to-teal-400 shadow-lg shadow-cyan-500/20"
                    : "bg-cyan-900/30 group-hover:bg-cyan-800/40"
                }`}
                style={{ height: item.height }}
              />
            </div>
            <span className="text-xs font-semibold text-slate-400">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}