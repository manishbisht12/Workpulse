"use client";

import React from "react";
import { Play, Square } from "lucide-react";

export default function TimerHeader({
  taskName,
  setTaskName,
  category,
  setCategory,
  isTimerRunning,
  seconds,
  formatTime,
  onStart,
  onStop,
}) {
  return (
    <div className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1">
        <input
          type="text"
          placeholder="What are you working on?"
          value={taskName}
          disabled={isTimerRunning}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full bg-slate-900/90 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#00c8ec] transition-all disabled:opacity-60"
        />

        <select
          value={category}
          disabled={isTimerRunning}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:w-44 bg-slate-900/90 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-[#00c8ec] transition-all disabled:opacity-60 cursor-pointer"
        >
          <option value="Development">Development</option>
          <option value="Design">Design</option>
          <option value="Learning">Learning</option>
          <option value="Meeting">Meeting</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
        <span className="font-mono text-3xl font-bold text-white tracking-widest">
          {formatTime(seconds)}
        </span>

        {!isTimerRunning ? (
          <button
            onClick={onStart}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00c8ec] hover:bg-[#00b4d8] text-black font-bold text-sm shadow-[0_0_15px_rgba(0,200,236,0.3)] transition-all active:scale-[0.98]"
          >
            <Play size={18} fill="currentColor" />
            <span>Start</span>
          </button>
        ) : (
          <button
            onClick={onStop}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all active:scale-[0.98]"
          >
            <Square size={18} fill="currentColor" />
            <span>Stop</span>
          </button>
        )}
      </div>
    </div>
  );
}