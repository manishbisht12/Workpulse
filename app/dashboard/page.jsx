"use client";

import React from "react";
import { 
  Flame, CheckSquare, Repeat, Clock, Plus, Target, Image as ImageIcon 
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10">
      
      {/* Header Info Section with Monthly Score Ring */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-cyan-400 font-medium">Good evening, Alex 🌙</p>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100 mt-1">Your Workspace</h1>
          <p className="text-xs text-slate-500 mt-1">Monday, June 15, 2026 — Week 25</p>
        </div>

        {/* 83% Score Circle */}
        <div className="flex items-center gap-4 bg-[#0d131a] border border-cyan-900/30 p-3 rounded-2xl w-full sm:w-auto justify-start sm:justify-none">
          <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
            {/* SVG Progress Arc */}
            <svg className="absolute w-full h-full transform -rotate-90">
              <circle cx="28" cy="28" r="24" className="stroke-slate-800" strokeWidth="4" fill="transparent" />
              <circle cx="28" cy="28" r="24" className="stroke-cyan-400" strokeWidth="4" fill="transparent" 
                strokeDasharray={150} strokeDashoffset={150 - (150 * 83) / 100} strokeLinecap="round" />
            </svg>
            <span className="text-sm font-bold text-slate-100">83%</span>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Productivity Score</p>
            <p className="text-xs text-slate-500">Monthly Target Status</p>
          </div>
        </div>
      </div>

      {/* Grid 1: 4 Main Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak Card */}
        <div className="bg-gradient-to-br from-[#181310] to-[#0d131a] border border-amber-500/20 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/40 transition">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
            <Flame size={20} fill="currentColor" />
          </div>
          <span className="text-3xl font-bold text-slate-100">14</span> <span className="text-sm text-slate-500">days</span>
          <p className="text-xs text-slate-400 font-medium mt-1">Current Streak</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Best: 21 days</p>
        </div>

        {/* Tasks Card */}
        <div className="bg-[#0d131a] border border-cyan-900/30 p-5 rounded-2xl hover:border-cyan-500/40 transition">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
            <CheckSquare size={20} />
          </div>
          <span className="text-3xl font-bold text-slate-100">8</span> <span className="text-sm text-slate-500">/ 12</span>
          <p className="text-xs text-slate-400 font-medium mt-1">Tasks Today</p>
          <p className="text-[10px] text-slate-500 mt-0.5">4 remaining</p>
        </div>

        {/* Habits Card */}
        <div className="bg-[#0d131a] border border-cyan-900/30 p-5 rounded-2xl hover:border-cyan-500/40 transition">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-4">
            <Repeat size={20} />
          </div>
          <span className="text-3xl font-bold text-slate-100">4</span> <span className="text-sm text-slate-500">/ 6</span>
          <p className="text-xs text-slate-400 font-medium mt-1">Habits Today</p>
          <p className="text-[10px] text-slate-500 mt-0.5">67% completion</p>
        </div>

        {/* Time Card */}
        <div className="bg-gradient-to-br from-[#0a1c1a] to-[#0d131a] border border-emerald-500/20 p-5 rounded-2xl hover:border-emerald-500/40 transition">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
            <Clock size={20} />
          </div>
          <span className="text-3xl font-bold text-slate-100">6.5</span> <span className="text-sm text-slate-500">h</span>
          <p className="text-xs text-slate-400 font-medium mt-1">Hours Worked</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Target: 8h</p>
        </div>
      </div>

      {/* Quick Action Buttons Row */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        <button className="flex-1 sm:flex-initial justify-center flex items-center gap-2 px-4 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl text-xs font-semibold transition whitespace-nowrap">
          <Plus size={14} /> Add Task
        </button>
        <button className="flex-1 sm:flex-initial justify-center flex items-center gap-2 px-4 py-2.5 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/30 rounded-xl text-xs font-semibold transition whitespace-nowrap">
          <Plus size={14} /> Add Habit
        </button>
        <button className="flex-1 sm:flex-initial justify-center flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-semibold transition whitespace-nowrap">
          <Target size={14} /> Add Goal
        </button>
        <button className="flex-1 sm:flex-initial justify-center flex items-center gap-2 px-4 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-semibold transition whitespace-nowrap">
          <Clock size={14} /> Log Time
        </button>
        <button className="flex-1 sm:flex-initial justify-center flex items-center gap-2 px-4 py-2.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded-xl text-xs font-semibold transition whitespace-nowrap">
          <ImageIcon size={14} /> Upload Photo
        </button>
      </div>

      {/* Grid 2: Weekly Productivity & Recent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Productivity chart placeholder */}
        <div className="lg:col-span-2 bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-4 md:p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-100">Weekly Productivity</h2>
              <p className="text-xs text-slate-500 mt-0.5">Score, tasks & habits tracking</p>
            </div>
            <span className="text-xs bg-slate-800/60 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700/50 font-medium flex-shrink-0">This Week</span>
          </div>
          
          {/* Chart placeholder with responsive SVG formatting */}
          <div className="h-56 w-full flex flex-col justify-between relative pt-4">
            <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-slate-600 pointer-events-none pb-6">
              <div className="border-b border-slate-800/60 w-full pb-1 flex justify-between"><span>100</span></div>
              <div className="border-b border-slate-800/60 w-full pb-1 flex justify-between"><span>75</span></div>
              <div className="border-b border-slate-800/60 w-full pb-1 flex justify-between"><span>50</span></div>
              <div className="border-b border-slate-800/60 w-full pb-1 flex justify-between"><span>25</span></div>
              <div className="flex justify-between"><span>0</span></div>
            </div>
            
            {/* Cyan/Teal Vector Line Chart */}
            <svg className="w-full h-36 mt-auto overflow-visible mb-6" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 0,80 Q 15,20 35,70 T 70,30 T 100,60" fill="none" stroke="rgba(6, 182, 212, 0.8)" strokeWidth="2" />
              <path d="M 0,85 Q 50,88 100,85" fill="none" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" strokeDasharray="2" />
            </svg>
            
            <div className="flex w-full justify-between text-[10px] text-slate-500 z-10 bg-[#0d131a]">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        {/* Recent Tasks List */}
        <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-4 md:p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base font-bold text-slate-100">Recent Tasks</h2>
              <button className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex-shrink-0">View all &rarr;</button>
            </div>

            <div className="space-y-3">
              {[
                { name: "Redesign marketing landing...", dept: "Design", tag: "High", color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
                { name: "Review authentication PR...", dept: "Development", tag: "Medium", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
                { name: "Write OpenAPI documentation...", dept: "Documentation", tag: "Low", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
              ].map((task, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/40 transition gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] flex-shrink-0"></span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-200 truncate">{task.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{task.dept}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${task.color}`}>{task.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}