"use client";

import React from "react";
import { Flame, Check, Trash2 } from "lucide-react";

export default function HabitCard({ habit, onToggleComplete, onDelete }) {
  const isCompleted = habit.completedToday;

  // Rate Circle Color based on percentage/theme
  const ringColorClass = habit.colorClass || "stroke-violet-500";

  return (
    <div className="bg-[#0f1520] border border-slate-800/80 hover:border-violet-500/30 rounded-2xl p-5 flex flex-col justify-between space-y-5 transition-all">
      {/* Top Title & Icon Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-xl">
            {habit.emoji}
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100">{habit.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{habit.category}</p>
          </div>
        </div>

        <button
          onClick={() => onDelete(habit.id)}
          className="text-slate-600 hover:text-rose-400 transition-colors p-1"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Circle Rate & Streak Bar Row */}
      <div className="flex items-center justify-between gap-4 py-1">
        {/* SVG Percentage Circle */}
        <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="22"
              className="stroke-slate-800"
              strokeWidth="4"
              fill="transparent"
            />
            <circle
              cx="28"
              cy="28"
              r="22"
              className={ringColorClass}
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={138}
              strokeDashoffset={138 - (138 * habit.rate) / 100}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-[11px] font-bold text-slate-100 block leading-none">
              {habit.rate}%
            </span>
            <span className="text-[8px] text-slate-500 uppercase tracking-tighter">rate</span>
          </div>
        </div>

        {/* Streak Details */}
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Flame size={14} className="text-violet-400" fill="currentColor" />
            <span className="font-bold">{habit.streak}</span>
            <span className="text-slate-500">day streak</span>
          </div>
          <p className="text-[10px] text-slate-500">Best: {habit.bestStreak}d</p>

          {/* Mini Progress Indicator */}
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-violet-500 h-full rounded-full"
              style={{ width: `${Math.min((habit.streak / habit.bestStreak) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Complete Button */}
      <button
        onClick={() => onToggleComplete(habit.id)}
        className={`w-full py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
          isCompleted
            ? "bg-emerald-950/40 text-emerald-400 border border-emerald-800/40 hover:bg-emerald-900/40"
            : "bg-slate-800/50 hover:bg-slate-800 text-slate-300 border border-slate-700/40"
        }`}
      >
        {isCompleted ? (
          <>
            <Check size={16} className="text-emerald-400" />
            <span>Completed today!</span>
          </>
        ) : (
          <span>Mark Complete</span>
        )}
      </button>
    </div>
  );
}