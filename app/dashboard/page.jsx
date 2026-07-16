"use client";

import React from "react";
import { 
  Flame, CheckSquare, Repeat, Clock, Plus, Target, Image as ImageIcon 
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      
      {/* Header Info Section with Monthly Score Ring */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-violet-400 font-medium">Good evening, Alex 🌙</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">Your Workspace</h1>
          <p className="text-xs text-gray-500 mt-1">Monday, June 15, 2026 — Week 25</p>
        </div>

        {/* 83% Score Circle */}
        <div className="flex items-center gap-4 bg-[#111226]/40 border border-gray-800/20 p-3 rounded-2xl">
          <div className="relative w-14 h-14 flex items-center justify-center">
            {/* SVG Progress Arc */}
            <svg className="absolute w-full h-full transform -rotate-90">
              <circle cx="28" cy="28" r="24" className="stroke-gray-800/60" strokeWidth="4" fill="transparent" />
              <circle cx="28" cy="28" r="24" className="stroke-violet-500" strokeWidth="4" fill="transparent" 
                strokeDasharray={150} strokeDashoffset={150 - (150 * 83) / 100} strokeLinecap="round" />
            </svg>
            <span className="text-sm font-bold text-white">83%</span>
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Productivity Score</p>
            <p className="text-xs text-gray-500">Monthly Target Status</p>
          </div>
        </div>
      </div>

      {/* Grid 1: 4 Main Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak Card */}
        <div className="bg-gradient-to-br from-[#1b1512] to-[#111226] border border-orange-500/10 p-5 rounded-2xl relative overflow-hidden group hover:border-orange-500/20 transition">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4">
            <Flame size={20} fill="currentColor" />
          </div>
          <span className="text-3xl font-bold text-white">14</span> <span className="text-sm text-gray-500">days</span>
          <p className="text-xs text-gray-400 font-medium mt-1">Current Streak</p>
          <p className="text-[10px] text-gray-500 mt-0.5">Best: 21 days</p>
        </div>

        {/* Tasks Card */}
        <div className="bg-[#111226] border border-gray-800/40 p-5 rounded-2xl hover:border-violet-500/20 transition">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
            <CheckSquare size={20} />
          </div>
          <span className="text-3xl font-bold text-white">8</span> <span className="text-sm text-gray-500">/ 12</span>
          <p className="text-xs text-gray-400 font-medium mt-1">Tasks Today</p>
          <p className="text-[10px] text-gray-500 mt-0.5">4 remaining</p>
        </div>

        {/* Habits Card */}
        <div className="bg-[#111226] border border-gray-800/40 p-5 rounded-2xl hover:border-violet-500/20 transition">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
            <Repeat size={20} />
          </div>
          <span className="text-3xl font-bold text-white">4</span> <span className="text-sm text-gray-500">/ 6</span>
          <p className="text-xs text-gray-400 font-medium mt-1">Habits Today</p>
          <p className="text-[10px] text-gray-500 mt-0.5">67% completion</p>
        </div>

        {/* Time Card */}
        <div className="bg-gradient-to-br from-[#0c1c1a] to-[#111226] border border-emerald-500/10 p-5 rounded-2xl hover:border-emerald-500/20 transition">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
            <Clock size={20} />
          </div>
          <span className="text-3xl font-bold text-white">6.5</span> <span className="text-sm text-gray-500">h</span>
          <p className="text-xs text-gray-400 font-medium mt-1">Hours Worked</p>
          <p className="text-[10px] text-gray-500 mt-0.5">Target: 8h</p>
        </div>
      </div>

      {/* Quick Action Buttons Row */}
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-violet-600/10 hover:bg-violet-600/20 text-violet-400 border border-violet-500/20 rounded-xl text-xs font-semibold transition">
          <Plus size={14} /> Add Task
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-fuchsia-600/10 hover:bg-fuchsia-600/20 text-fuchsia-400 border border-fuchsia-500/20 rounded-xl text-xs font-semibold transition">
          <Plus size={14} /> Add Habit
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-semibold transition">
          <Target size={14} /> Add Goal
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-amber-600/10 hover:bg-amber-600/20 text-amber-400 border border-amber-500/20 rounded-xl text-xs font-semibold transition">
          <Clock size={14} /> Log Time
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-sky-600/10 hover:bg-sky-600/20 text-sky-400 border border-sky-500/20 rounded-xl text-xs font-semibold transition">
          <ImageIcon size={14} /> Upload Photo
        </button>
      </div>

      {/* Grid 2: Weekly Productivity & Recent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Productivity chart placeholder */}
        <div className="lg:col-span-2 bg-[#111226] border border-gray-800/40 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-base font-bold text-white">Weekly Productivity</h2>
              <p className="text-xs text-gray-500 mt-0.5">Score, tasks & habits tracking</p>
            </div>
            <span className="text-xs bg-gray-800/40 text-gray-300 px-3 py-1.5 rounded-lg border border-gray-800/60 font-medium">This Week</span>
          </div>
          {/* Chart placeholder with gradient styling */}
          <div className="h-56 w-full flex items-end justify-between px-2 pt-6 relative">
            <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-gray-600 pointer-events-none">
              <span className="border-b border-gray-800/30 pb-1">100</span>
              <span className="border-b border-gray-800/30 pb-1">75</span>
              <span className="border-b border-gray-800/30 pb-1">50</span>
              <span className="border-b border-gray-800/30 pb-1">25</span>
              <span>0</span>
            </div>
            {/* Visual SVG Path Graph Mockup */}
            <svg className="absolute inset-x-0 bottom-4 h-36 w-full overflow-visible">
              <path d="M0,100 C100,20 200,120 300,30 C400,30 500,90 600,110" fill="none" stroke="rgba(139, 92, 246, 0.8)" strokeWidth="3" />
              <path d="M0,130 Q300,135 600,138" fill="none" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1.5" strokeDasharray="4" />
            </svg>
            <div className="flex w-full justify-between text-[10px] text-gray-500 pt-2 mt-auto z-10 px-4">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        {/* Recent Tasks List */}
        <div className="bg-[#111226] border border-gray-800/40 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base font-bold text-white">Recent Tasks</h2>
              <button className="text-xs text-violet-400 hover:text-violet-300 font-medium">View all &rarr;</button>
            </div>

            <div className="space-y-4">
              {[
                { name: "Redesign marketing landing...", dept: "Design", tag: "High", color: "text-red-400 bg-red-400/10" },
                { name: "Review authentication PR...", dept: "Development", tag: "Medium", color: "text-amber-400 bg-amber-400/10" },
                { name: "Write OpenAPI documentation...", dept: "Documentation", tag: "Low", color: "text-emerald-400 bg-emerald-400/10" },
              ].map((task, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-800/10 transition">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                    <div>
                      <p className="text-xs font-semibold text-gray-200">{task.name}</p>
                      <p className="text-[10px] text-gray-500">{task.dept}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${task.color}`}>{task.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}