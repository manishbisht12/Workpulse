"use client";

import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function AppearanceSection() {
  const [isDark, setIsDark] = useState(true);
  const [themeMode, setThemeMode] = useState("dark"); // "dark" | "light"

  return (
    <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-6 space-y-6">
      <h3 className="text-base font-bold text-slate-100">Appearance</h3>

      {/* Dark Mode Toggle Switch */}
      <div className="flex items-center justify-between pb-2">
        <div>
          <p className="text-sm font-semibold text-slate-200">Dark Mode</p>
          <p className="text-xs text-slate-400 mt-0.5">
            Use dark theme throughout
          </p>
        </div>

        <button
          onClick={() => {
            setIsDark(!isDark);
            setThemeMode(!isDark ? "dark" : "light");
          }}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 p-1 ${
            isDark ? "bg-cyan-500" : "bg-slate-700"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-slate-950 shadow-md transition-transform duration-300 ${
              isDark ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Dark vs Light Theme Selector Cards */}
      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-cyan-900/20">
        <button
          onClick={() => {
            setThemeMode("dark");
            setIsDark(true);
          }}
          className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all ${
            themeMode === "dark"
              ? "bg-cyan-950/30 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              : "bg-[#111923] border-cyan-900/20 text-slate-400 hover:border-cyan-900/40"
          }`}
        >
          <Moon size={24} className="mb-2" />
          <span className="text-xs font-bold">Dark Mode</span>
        </button>

        <button
          onClick={() => {
            setThemeMode("light");
            setIsDark(false);
          }}
          className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all ${
            themeMode === "light"
              ? "bg-cyan-950/30 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              : "bg-[#111923] border-cyan-900/20 text-slate-400 hover:border-cyan-900/40"
          }`}
        >
          <Sun size={24} className="mb-2" />
          <span className="text-xs font-bold">Light Mode</span>
        </button>
      </div>
    </div>
  );
}