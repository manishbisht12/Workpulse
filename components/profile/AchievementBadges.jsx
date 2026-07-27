"use client";

import React from "react";
import {
  Flame,
  Trophy,
  CheckSquare,
  Target,
  Moon,
  Sun,
  Award,
  Zap,
  Star,
  Layers,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const BADGES = [
  { id: 1, name: "7-Day Streak", icon: Flame, earned: true, color: "border-amber-500/30 bg-amber-500/10 text-amber-400" },
  { id: 2, name: "30-Day Streak", icon: Trophy, earned: true, color: "border-amber-500/30 bg-amber-500/10 text-amber-400" },
  { id: 3, name: "100 Tasks", icon: CheckSquare, earned: true, color: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400" },
  { id: 4, name: "Goal Crusher", icon: Target, earned: false, color: "" },
  { id: 5, name: "Night Owl", icon: Moon, earned: true, color: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400" },
  { id: 6, name: "Early Bird", icon: Sun, earned: false, color: "" },
  { id: 7, name: "Habit Master", icon: Award, earned: false, color: "" },
  { id: 8, name: "Focus Zone", icon: Zap, earned: true, color: "border-rose-500/30 bg-rose-500/10 text-rose-400" },
  { id: 9, name: "Overachiever", icon: Star, earned: false, color: "" },
  { id: 10, name: "Consistent", icon: Layers, earned: true, color: "border-teal-500/30 bg-teal-500/10 text-teal-400" },
  { id: 11, name: "Data Driven", icon: BarChart3, earned: false, color: "" },
  { id: 12, name: "Trusted Pro", icon: ShieldCheck, earned: false, color: "" },
];

export default function AchievementBadges() {
  return (
    <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-100">Achievement Badges</h3>
        <span className="text-xs text-slate-500 font-semibold">6 / 12 earned</span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {BADGES.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                badge.earned
                  ? `${badge.color} hover:scale-105`
                  : "border-slate-800/60 bg-[#111923]/40 text-slate-600 opacity-50"
              }`}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2">
                <Icon size={20} />
              </div>
              <span className="text-[11px] font-bold leading-tight">
                {badge.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}