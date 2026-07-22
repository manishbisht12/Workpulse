"use client";

import React, { useState } from "react";
import { TrendingUp, Clock, CheckSquare, Repeat } from "lucide-react";
import AnalyticsHeader from "@/components/analytics/AnalyticsHeader";
import StatCard from "@/components/analytics/StatCard";
import ProductivityScoreChart from "@/components/analytics/ProductivityScoreChart";
import WorkHoursChart from "@/components/analytics/WorkHoursChart";
import MonthlyCompletionChart from "@/components/analytics/MonthlyCompletionChart";
import ProductivityRadarChart from "@/components/analytics/ProductivityRadarChart";
import CategoryBreakdown from "@/components/analytics/CategoryBreakdown";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Title & Time Range Filter */}
      <AnalyticsHeader timeRange={timeRange} setTimeRange={setTimeRange} />

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Avg Productivity"
          value="81%"
          changeText="+4% vs prev"
          icon={TrendingUp}
          colorTheme="cyan"
        />
        <StatCard
          title="Total Hours"
          value="47.5h"
          changeText="+2.1h vs prev"
          icon={Clock}
          colorTheme="teal"
        />
        <StatCard
          title="Tasks Done"
          value="60"
          changeText="+12 vs prev"
          icon={CheckSquare}
          colorTheme="emerald"
        />
        <StatCard
          title="Habit Rate"
          value="79%"
          changeText="+5% vs prev"
          icon={Repeat}
          colorTheme="amber"
        />
      </div>

      {/* Row 1: Line Area Chart & Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ProductivityScoreChart />
        <WorkHoursChart />
      </div>

      {/* Row 2: Monthly Completion Trend & Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <MonthlyCompletionChart />
        <ProductivityRadarChart />
      </div>

      {/* Row 3: Category Breakdown */}
      <CategoryBreakdown />
    </div>
  );
}