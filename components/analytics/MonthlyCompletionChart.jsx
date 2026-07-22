"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", tasks: 145, habits: 90 },
  { month: "Feb", tasks: 160, habits: 95 },
  { month: "Mar", tasks: 175, habits: 102 },
  { month: "Apr", tasks: 155, habits: 98 },
  { month: "May", tasks: 190, habits: 115 },
  { month: "Jun", tasks: 85, habits: 60 },
];

export default function MonthlyCompletionChart() {
  return (
    <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-6 space-y-4">
      {/* Header & Legend Indicators */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-100">
            Monthly Task & Habit Completion
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">6-month trend — 2026</p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="text-slate-300">Tasks</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
            <span className="text-slate-300">Habits</span>
          </div>
        </div>
      </div>

      {/* Area Chart Container */}
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              {/* Tasks Cyan Gradient */}
              <linearGradient id="cyanTasks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>

              {/* Habits Teal Gradient */}
              <linearGradient id="tealHabits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 200]}
              ticks={[0, 50, 100, 150, 200]}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111923",
                borderColor: "rgba(6,182,212,0.3)",
                borderRadius: "12px",
                color: "#f8fafc",
                fontSize: "12px",
              }}
            />

            <Area
              type="monotone"
              dataKey="tasks"
              stroke="#06b6d4"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#cyanTasks)"
            />
            <Area
              type="monotone"
              dataKey="habits"
              stroke="#14b8a6"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#tealHabits)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}