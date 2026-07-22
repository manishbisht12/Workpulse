"use client";

import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { day: "Mon", score: 72 },
  { day: "Tue", score: 85 },
  { day: "Wed", score: 68 },
  { day: "Thu", score: 90 },
  { day: "Fri", score: 78 },
  { day: "Sat", score: 55 },
  { day: "Sun", score: 40 },
];

export default function ProductivityScoreChart() {
  return (
    <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-6 space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-100">Daily Productivity Score</h3>
        <p className="text-xs text-slate-500 mt-0.5">This week vs target (80)</p>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="cyanScoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            
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
              domain={[0, 100]} 
              ticks={[0, 25, 50, 75, 100]} 
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
            
            <Area 
              type="monotone" 
              dataKey="score" 
              stroke="#06b6d4" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#cyanScoreGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}