"use client";

import React from "react";
import { Trash2 } from "lucide-react";

export default function GoalCard({ goal, onDelete }) {
  const percentage = Math.round((goal.current / goal.target) * 100);

  // Category Badge Colors
  const categoryStyles = {
    Learning: "bg-indigo-950/60 text-indigo-300 border-indigo-800/40",
    Fitness: "bg-emerald-950/60 text-emerald-300 border-emerald-800/40",
    Finance: "bg-amber-950/60 text-amber-300 border-amber-800/40",
    Health: "bg-rose-950/60 text-rose-300 border-rose-800/40",
  };

  // Progress Bar Gradient Variants
  const barGradients = {
    purple: "from-violet-500 to-indigo-500",
    emerald: "from-emerald-400 to-teal-500",
    orange: "from-amber-500 to-orange-500",
  };

  return (
    <div className="group relative bg-[#0f1520] border border-slate-800/80 hover:border-violet-500/30 rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all">
      {/* Top Title & Tag Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <h3 className="font-bold text-base text-slate-100">{goal.title}</h3>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
              categoryStyles[goal.category] || categoryStyles.Learning
            }`}
          >
            {goal.category}
          </span>
        </div>

        {/* Status / Percentage & Delete */}
        <div className="flex items-start gap-3">
          <div className="text-right">
            <span className="text-2xl font-bold text-slate-100 block leading-tight">
              {percentage}%
            </span>
            {goal.isOverdue ? (
              <span className="text-xs font-semibold text-rose-400">Overdue</span>
            ) : (
              <span className="text-xs text-slate-400">{goal.timeLeft}</span>
            )}
          </div>

          <button
            onClick={() => onDelete(goal.id)}
            className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-all p-1"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Progress Bar & Details */}
      <div className="space-y-2">
        <div className="flex justify-end text-[11px] font-semibold text-slate-400">
          <span>{percentage}%</span>
        </div>

        {/* Progress Bar Container with notch marks */}
        <div className="relative w-full bg-slate-900/80 h-2.5 rounded-full overflow-hidden border border-slate-800">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${
              barGradients[goal.colorTheme] || barGradients.purple
            } transition-all duration-500 ease-out`}
            style={{ width: `${percentage}%` }}
          />
          {/* Subtle Segment Dividers */}
          <div className="absolute inset-0 flex justify-between px-1/4 pointer-events-none">
            <div className="w-[1px] h-full bg-slate-900/40" />
            <div className="w-[1px] h-full bg-slate-900/40" />
            <div className="w-[1px] h-full bg-slate-900/40" />
          </div>
        </div>

        {/* Bottom Counts & Due Date */}
        <div className="flex items-center justify-between text-xs pt-1">
          <p className="text-slate-300 font-medium">
            <span className="font-bold text-slate-100">{goal.formattedCurrent || goal.current}</span>
            <span className="text-slate-500"> / {goal.formattedTarget || goal.target} {goal.unit}</span>
          </p>
          <span className="text-slate-500 text-[11px]">Due {goal.dueDate}</span>
        </div>
      </div>
    </div>
  );
}