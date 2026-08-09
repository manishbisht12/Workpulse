"use client";

import React from "react";
import { Plus } from "lucide-react";

export default function HabitHeader({ completedCount, totalCount, onNewHabit }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Habit Tracker
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          <span className="text-[#00c8ec] font-semibold">{completedCount}</span> of {totalCount} habits completed today
        </p>
      </div>

      <button
        onClick={onNewHabit}
        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#00c8ec] hover:bg-[#00b4d8] text-black font-bold text-sm shadow-[0_0_18px_rgba(0,200,236,0.3)] transition-all active:scale-[0.98]"
      >
        <Plus size={18} strokeWidth={2.5} />
        <span>New Habit</span>
      </button>
    </div>
  );
}