"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

export default function WorkHoursChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-6 space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-100">Daily Work Hours</h3>
          <p className="text-xs text-slate-500 mt-0.5">Target: 8 hours/day</p>
        </div>
        <div className="h-56 w-full flex items-center justify-center text-slate-500">
          No data available
        </div>
      </div>
    );
  }

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