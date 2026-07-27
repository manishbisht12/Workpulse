"use client";

import React from "react";

const metrics = [
  { name: "Total Work Hours", value: "487h", percentage: 81, color: "from-cyan-500 to-teal-400" },
  { name: "Monthly Score", value: "83/100", percentage: 83, color: "from-cyan-500 to-teal-400" },
  { name: "Habit Completion", value: "79%", percentage: 79, color: "from-teal-500 to-emerald-400" },
  { name: "Goal Progress", value: "68%", percentage: 68, color: "from-sky-500 to-cyan-400" },
];

export default function ProductivityOverview() {
  return (
    <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-6 space-y-5">
      <h3 className="text-base font-bold text-slate-100">Productivity Overview</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        {metrics.map((item) => (
          <div key={item.name} className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-400">{item.name}</span>
              <span className="text-slate-100 font-bold">{item.value}</span>
            </div>

            {/* Custom Progress Bar */}
            <div className="w-full bg-[#111923] h-2.5 rounded-full overflow-hidden border border-cyan-900/20">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-500`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}