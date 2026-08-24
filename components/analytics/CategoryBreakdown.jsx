"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export default function CategoryBreakdown({ data }) {
  const categories = data;

  if (!categories || categories.length === 0) {
    return (
      <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-6 space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-100">Category Breakdown</h3>
          <p className="text-xs text-slate-500 mt-0.5">Time allocation this period</p>
        </div>
        <div className="h-52 w-full flex items-center justify-center text-slate-500">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-6 space-y-6">
      <div>
        <h3 className="text-base font-bold text-slate-100">Category Breakdown</h3>
        <p className="text-xs text-slate-500 mt-0.5">Time allocation this period</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Donut Chart */}
        <div className="md:col-span-4 h-52 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="percentage"
                stroke="none"
              >
                {categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111923",
                  borderColor: "rgba(6,182,212,0.3)",
                  borderRadius: "12px",
                  color: "#f8fafc",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Progress List */}
        <div className="md:col-span-8 space-y-4">
          {categories.map((cat) => (
            <div key={cat.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-slate-300">{cat.name}</span>
                </div>
                <span className="text-slate-100 font-bold">{cat.percentage}%</span>
              </div>

              {/* Cyan dark background track */}
              <div className="w-full bg-[#111923] h-2 rounded-full overflow-hidden border border-cyan-900/20">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}