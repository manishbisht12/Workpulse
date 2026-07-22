"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarHeader({ monthYear, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">
          Calendar
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Monthly overview & contribution heatmap
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onPrev}
          className="p-2 rounded-xl bg-[#12142B] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
        >
          <ChevronLeft size={18} />
        </button>

        <span className="text-sm font-bold text-slate-200 min-w-[90px] text-center">
          {monthYear}
        </span>

        <button
          onClick={onNext}
          className="p-2 rounded-xl bg-[#12142B] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}