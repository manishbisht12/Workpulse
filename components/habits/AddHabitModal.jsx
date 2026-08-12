"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const COLOR_OPTIONS = [
  { label: "Cyan", value: "stroke-cyan-400", activeClass: "bg-cyan-500/15 border-cyan-400 text-cyan-400" },
  { label: "Sky", value: "stroke-sky-400", activeClass: "bg-sky-500/15 border-sky-400 text-sky-400" },
  { label: "Teal", value: "stroke-teal-400", activeClass: "bg-teal-500/15 border-teal-400 text-teal-400" },
  { label: "Emerald", value: "stroke-emerald-400", activeClass: "bg-emerald-500/15 border-emerald-400 text-emerald-400" },
  { label: "Violet", value: "stroke-violet-400", activeClass: "bg-violet-500/15 border-violet-400 text-violet-400" },
  { label: "Rose", value: "stroke-rose-400", activeClass: "bg-rose-500/15 border-rose-400 text-rose-400" },
];

export default function AddHabitModal({ isOpen, onClose, onHabitAdded }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Wellness");
  const [emoji, setEmoji] = useState("🔥");
  const [colorClass, setColorClass] = useState("stroke-cyan-400");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const loadingToast = toast.loading("Creating habit...");
    setSubmitting(true);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    try {
      const res = await fetch(`${BASE_URL}/api/habits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          title: title.trim(),
          category: category.trim() || "General",
          emoji: emoji || "⚡",
          colorClass,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add habit");

      toast.success("Habit created successfully!", { id: loadingToast });
      
      const createdHabit = data.habit || data.data || data;
      onHabitAdded(createdHabit);

      // Reset form & close
      setTitle("");
      onClose();
    } catch (err) {
      console.error("Error creating habit:", err);
      toast.error(err.message || "Could not create habit", { id: loadingToast });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0b0f17] border border-[#1e293b]/70 rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-2xl relative text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1e293b]/60">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00c8ec] shadow-[0_0_8px_#00c8ec]" />
            <h2 className="text-xl font-bold tracking-tight text-white">Create New Habit</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#111827] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Habit Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Morning Meditation"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#0d131d] border border-[#1e293b] rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#00c8ec]/80 transition-colors"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Emoji
              </label>
              <input
                type="text"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                className="w-full bg-[#0d131d] border border-[#1e293b] rounded-xl px-4 py-3 text-sm text-center text-slate-200 focus:outline-none focus:border-[#00c8ec]/80 transition-colors"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Category
              </label>
              <input
                type="text"
                placeholder="Fitness, Learning..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0d131d] border border-[#1e293b] rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#00c8ec]/80 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Theme Ring Color
            </label>
            <div className="bg-[#0d131d] border border-[#1e293b] p-1.5 rounded-xl grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {COLOR_OPTIONS.map((c) => (
                <button
                  type="button"
                  key={c.value}
                  onClick={() => setColorClass(c.value)}
                  className={`py-2 px-1 rounded-lg text-xs font-semibold border transition-all ${
                    colorClass === c.value
                      ? c.activeClass
                      : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#1e293b]/60 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="text-slate-300 hover:text-white font-semibold text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-[#00c8ec] hover:bg-[#00b4d8] text-black font-bold text-sm shadow-[0_0_15px_rgba(0,200,236,0.3)] transition-all disabled:opacity-50"
            >
              Add Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}