"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

const data = [
  { day: "Mon", hours: 7.2, color: "#6366f1" },
  { day: "Tue", hours: 8.1, color: "#10b981" },
  { day: "Wed", hours: 6.8, color: "#6366f1" },
  { day: "Thu", hours: 9.0, color: "#10b981" },
  { day: "Fri", hours: 7.9, color: "#10b981" },
  { day: "Sat", hours: 4.5, color: "#8b5cf6" },
  { day: "Sun", hours: 3.0, color: "#8b5cf6" },
];

export default function WorkHoursChart() {
  return (
    <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-6 space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-100">Daily Work Hours</h3>
        <p className="text-xs text-slate-500 mt-0.5">Target: 8 hours/day</p>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
              dataKey="day" 
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
              domain={[0, 12]} 
              ticks={[0, 3, 6, 9, 12]} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#111923", 
                borderColor: "rgba(6,182,212,0.3)", 
                borderRadius: "12px", 
                color: "#f8fafc",
                fontSize: "12px"
              }} 
            />
            <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}