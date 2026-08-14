"use client";

import React, { useState } from "react";
import { Flame, Check, Trash2, AlertTriangle } from "lucide-react";

export default function HabitCard({ habit, onToggleComplete, onDelete }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isCompleted = habit.completedToday;
  const habitId = habit._id || habit.id;

  const ringColorClass = habit.colorClass || "stroke-cyan-400";
  const completionRate = habit.rate ?? 0;
  const currentStreak = habit.streak ?? 0;
  const maxStreak = habit.bestStreak || Math.max(currentStreak, 1);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(false);
    onDelete(habitId);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="bg-[#0f1520] border border-slate-800/80 hover:border-violet-500/30 rounded-2xl p-5 flex flex-col justify-between space-y-5 transition-all">
        {/* Top Title & Icon Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-xl">
              {habit.emoji || "⚡"}
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-100">{habit.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{habit.category || "General"}</p>
            </div>
          </div>

          <button
            onClick={handleDeleteClick}
            className="text-slate-600 hover:text-rose-400 transition-colors p-1"
            title="Delete Habit"
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
                strokeDashoffset={138 - (138 * completionRate) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-[11px] font-bold text-slate-100 block leading-none">
                {completionRate}%
              </span>
              <span className="text-[8px] text-slate-500 uppercase tracking-tighter">rate</span>
            </div>
          </div>

          {/* Streak Details */}
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <Flame size={14} className="text-violet-400" fill="currentColor" />
              <span className="font-bold">{currentStreak}</span>
              <span className="text-slate-500">day streak</span>
            </div>
            <p className="text-[10px] text-slate-500">Best: {maxStreak}d</p>

            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-violet-500 h-full rounded-full"
                style={{ width: `${Math.min((currentStreak / maxStreak) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Complete Button */}
        <button
          onClick={() => onToggleComplete(habitId)}
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0f1520] border border-slate-800 w-full max-w-sm rounded-2xl p-6 shadow-2xl space-y-4 text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-100">Delete Habit?</h4>
              <p className="text-xs text-slate-400">
                Are you sure you want to delete <strong className="text-slate-200">{habit.title}</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={cancelDelete}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700/50"
              >
                No, Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white transition-colors shadow-lg shadow-rose-600/20"
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