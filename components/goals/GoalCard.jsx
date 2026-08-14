"use client";

import React, { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";

export default function GoalCard({ goal, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const percentage = Math.min(
    100,
    Math.round(((goal.current || 0) / (goal.target || 1)) * 100)
  );

  const categoryStyles = {
    Learning: "bg-indigo-950/60 text-indigo-300 border-indigo-800/40",
    Fitness: "bg-emerald-950/60 text-emerald-300 border-emerald-800/40",
    Finance: "bg-amber-950/60 text-amber-300 border-amber-800/40",
    Health: "bg-rose-950/60 text-rose-300 border-rose-800/40",
  };

  const barGradients = {
    purple: "from-violet-500 to-indigo-500",
    emerald: "from-emerald-400 to-teal-500",
    orange: "from-amber-500 to-orange-500",
    cyan: "from-cyan-400 to-blue-500",
    violet: "from-purple-500 to-pink-500",
    rose: "from-rose-500 to-red-500",
  };

  const handleDeleteConfirm = () => {
    onDelete(goal._id || goal.id);
    setShowConfirm(false);
  };

  return (
    <>
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
                <span className="text-xs text-slate-400">{goal.timeLeft || "Active"}</span>
              )}
            </div>

            <button
              onClick={() => setShowConfirm(true)}
              className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-all p-1 rounded-lg hover:bg-slate-800/50"
              title="Delete Goal"
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

          <div className="relative w-full bg-slate-900/80 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${
                barGradients[goal.colorTheme] || barGradients.purple
              } transition-all duration-500 ease-out`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <p className="text-slate-300 font-medium">
              <span className="font-bold text-slate-100">
                {goal.formattedCurrent || goal.current}
              </span>
              <span className="text-slate-500">
                {" "}
                / {goal.formattedTarget || goal.target} {goal.unit}
              </span>
            </p>
            <span className="text-slate-500 text-[11px]">Due {goal.dueDate}</span>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#111923] border border-cyan-900/40 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl text-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 flex-shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-sm">Delete Goal?</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Are you sure you want to delete <strong className="text-slate-200">"{goal.title}"</strong>?
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-lg transition-all"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}