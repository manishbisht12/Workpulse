"use client";

import React, { useState } from "react";
import { TrendingUp, Clock, CheckSquare, Repeat } from "lucide-react";
import AnalyticsHeader from "@/components/analytics/AnalyticsHeader";
import StatCard from "@/components/analytics/StatCard";
import ProductivityScoreChart from "@/components/analytics/ProductivityScoreChart";
import MonthlyCompletionChart from "@/components/analytics/MonthlyCompletionChart";
import ProductivityRadarChart from "@/components/analytics/ProductivityRadarChart";
import CategoryBreakdown from "@/components/analytics/CategoryBreakdown";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/analytics");
        if (!response.ok) {
          throw new Error("Failed to fetch analytics data");
        }
        const data = await response.json();
        setAnalyticsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!analyticsData) return null;

  const { topStats } = analyticsData;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Title & Time Range Filter */}
      <AnalyticsHeader timeRange={timeRange} setTimeRange={setTimeRange} />

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Task Completion"
          value={topStats.avgProductivity.value}
          changeText={topStats.avgProductivity.changeText}
          icon={TrendingUp}
          colorTheme={topStats.avgProductivity.colorTheme}
        />
        <StatCard
          title="Total Goals"
          value={topStats.totalHours.value}
          changeText={topStats.totalHours.changeText}
          icon={Clock}
          colorTheme={topStats.totalHours.colorTheme}
        />
        <StatCard
          title="Tasks Done"
          value={topStats.tasksDone.value}
          changeText={topStats.tasksDone.changeText}
          icon={CheckSquare}
          colorTheme={topStats.tasksDone.colorTheme}
        />
        <StatCard
          title="Habit Rate"
          value={topStats.habitRate.value}
          changeText={topStats.habitRate.changeText}
          icon={Repeat}
          colorTheme={topStats.habitRate.colorTheme}
        />
      </div>

      {/* Row 1: Line Area Chart (Full Width now) */}
      <div className="grid grid-cols-1 gap-5">
        <ProductivityScoreChart data={analyticsData.productivityScore} />
      </div>

      {/* Row 2: Monthly Completion Trend & Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <MonthlyCompletionChart data={analyticsData.monthlyCompletion} />
        <ProductivityRadarChart data={analyticsData.productivityRadar} />
      </div>

      {/* Row 3: Category Breakdown */}
      <CategoryBreakdown data={analyticsData.categoryBreakdown} />
    </div>
  );
}