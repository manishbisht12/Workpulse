"use client";

import React from "react";
import { Clock, Calendar } from "lucide-react";

export default function TimeStatsCards({ totalTimeFormatted, totalSessions }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-[#0f172a]/50 border border-slate-800/80 rounded-xl p-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400 font-medium">Total Time Tracked</p>
          <p className="text-2xl font-bold text-white mt-1">{totalTimeFormatted}</p>
        </div>
        <div className="p-3 bg-cyan-500/10 rounded-xl text-[#00c8ec]">
          <Clock size={24} />
        </div>
      </div>

      <div className="bg-[#0f172a]/50 border border-slate-800/80 rounded-xl p-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400 font-medium">Total Sessions</p>
          <p className="text-2xl font-bold text-white mt-1">{totalSessions}</p>
        </div>
        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
          <Calendar size={24} />
        </div>
      </div>
    </div>
  );
}