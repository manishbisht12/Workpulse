"use client";

import React from "react";
import { Clock } from "lucide-react";

export default function TimelineHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100">
          Activity Timeline
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          All your logs, completions, and milestones
        </p>
      </div>

      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
        <Clock size={16} />
        <span>Real-time Updates</span>
      </div>
    </div>
  );
}