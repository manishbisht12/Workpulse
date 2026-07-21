"use client";

import React from "react";
import { Plus } from "lucide-react";

export default function HabitHeader({ completedCount, totalCount, onNewHabit }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">
          Habit Tracker
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          <span className="text-purple-400 font-semibold">{completedCount}</span> of {totalCount} habits completed today
        </p>
      </div>

      <button
        onClick={onNewHabit}
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all"
      >
        <Plus size={18} strokeWidth={2.5} />
        <span>New Habit</span>
      </button>
    </div>
  );
}