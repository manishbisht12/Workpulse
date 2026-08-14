"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

const COLOR_THEMES = ["purple", "emerald", "orange", "cyan", "violet", "rose"];

export default function GoalModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Learning");
  const [current, setCurrent] = useState("");
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("");
  const [dueDate, setDueDate] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !target || !dueDate) return;

    const randomColorTheme =
      COLOR_THEMES[Math.floor(Math.random() * COLOR_THEMES.length)];

    const now = new Date();
    const targetDate = new Date(dueDate);
    const diffTime = targetDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const isOverdue = diffDays < 0;
    const timeLeft = isOverdue ? null : `${diffDays}d left`;

    onSave({
      title,
      category,
      current: Number(current) || 0,
      target: Number(target),
      unit: unit || "",
      dueDate,
      isOverdue,
      timeLeft,
      colorTheme: randomColorTheme,
    });

    // Reset form
    setTitle("");
    setCategory("Learning");
    setCurrent("");
    setTarget("");
    setUnit("");
    setDueDate("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all">
      <div className="relative w-full max-w-lg bg-[#0b0f17] border border-[#1e293b]/70 rounded-2xl p-6 shadow-2xl space-y-6 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1e293b]/60">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00c8ec] shadow-[0_0_8px_#00c8ec]" />
            <h2 className="text-xl font-bold tracking-tight text-white">Create New Goal</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#0d131d] border border-[#1e293b] flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Goal Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Master TypeScript"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#0d131d] border border-[#1e293b] rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-[#00c8ec]/80 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#0d131d] border border-[#1e293b] rounded-xl px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-[#00c8ec]/80 transition-colors"
            >
              <option value="Learning">Learning</option>
              <option value="Fitness">Fitness</option>
              <option value="Finance">Finance</option>
              <option value="Health">Health</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Current</label>
              <input
                type="number"
                placeholder="0"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="w-full bg-[#0d131d] border border-[#1e293b] rounded-xl px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-[#00c8ec]/80 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target <span className="text-rose-400">*</span>
              </label>
              <input
                type="number"
                required
                placeholder="100"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full bg-[#0d131d] border border-[#1e293b] rounded-xl px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-[#00c8ec]/80 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Unit</label>
              <input
                type="text"
                placeholder="e.g. hrs, km"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full bg-[#0d131d] border border-[#1e293b] rounded-xl px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-[#00c8ec]/80 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Due Date <span className="text-rose-400">*</span>
            </label>
            <input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-[#0d131d] border border-[#1e293b] rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-[#00c8ec]/80 transition-colors [color-scheme:dark]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1e293b]/60">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#1e293b] text-slate-300 hover:text-white hover:bg-[#0d131d] text-sm font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#00c8ec] hover:bg-[#00b4d8] text-black font-bold text-sm shadow-[0_0_15px_rgba(0,200,236,0.3)] transition-all active:scale-[0.98]"
            >
              Add Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}