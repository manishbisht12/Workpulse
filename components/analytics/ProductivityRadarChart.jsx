"use client";

import React from "react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from "recharts";

const data = [
  { subject: "Tasks", A: 85 },
  { subject: "Habits", A: 78 },
  { subject: "Focus", A: 90 },
  { subject: "Goals", A: 70 },
  { subject: "Balance", A: 65 },
  { subject: "Energy", A: 80 },
];

export default function ProductivityRadarChart() {
  return (
    <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-6 space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-100">Productivity Radar</h3>
        <p className="text-xs text-slate-500 mt-0.5">Performance across 6 dimensions</p>
      </div>

      <div className="h-56 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="rgba(6, 182, 212, 0.15)" />
            <PolarAngleAxis 
              dataKey="subject" 
              stroke="#94a3b8" 
              fontSize={11} 
              tick={{ fill: "#94a3b8" }}
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
            <Radar
              name="Performance"
              dataKey="A"
              stroke="#06b6d4"
              fill="#06b6d4"
              fillOpacity={0.25}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}