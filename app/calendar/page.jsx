"use client";

import React, { useState, useEffect } from "react";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import MonthGrid from "@/components/calendar/MonthGrid";
import ContributionHeatmap from "@/components/calendar/ContributionHeatmap";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState({ monthGrid: [], heatmapData: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        setLoading(true);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const response = await fetch(`http://localhost:5000/api/calendar?year=${year}&month=${month}`);
        if (!response.ok) {
          throw new Error("Failed to fetch calendar data");
        }
        const data = await response.json();
        setCalendarData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCalendarData();
  }, [currentDate]);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthStr = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  const handlePrev = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNext = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <CalendarHeader
        monthYear={currentMonthStr}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64 text-red-500">
          Error: {error}
        </div>
      ) : (
        <>
          <MonthGrid monthData={calendarData.monthGrid} />
          <ContributionHeatmap data={calendarData.heatmapData} />
        </>
      )}
    </div>
  );
}