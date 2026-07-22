"use client";

import React, { useState } from "react";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import MonthGrid from "@/components/calendar/MonthGrid";
import ContributionHeatmap from "@/components/calendar/ContributionHeatmap";

// July 2026 Grid Data (Starts on Wednesday)
const JULY_2026_DAYS = [
  ...Array(3).fill({ isCurrentMonth: false }), // Empty Sun, Mon, Tue
  { day: 1, tasksDone: 8, isCurrentMonth: true },
  { day: 2, tasksDone: 5, isCurrentMonth: true },
  { day: 3, tasksDone: 12, isCurrentMonth: true },
  { day: 4, tasksDone: 3, isCurrentMonth: true },
  { day: 5, tasksDone: 9, isCurrentMonth: true },
  { day: 6, tasksDone: 0, isCurrentMonth: true },
  { day: 7, tasksDone: 4, isCurrentMonth: true },
  { day: 8, tasksDone: 11, isCurrentMonth: true },
  { day: 9, tasksDone: 7, isCurrentMonth: true },
  { day: 10, tasksDone: 6, isCurrentMonth: true },
  { day: 11, tasksDone: 2, isCurrentMonth: true },
  { day: 12, tasksDone: 8, isCurrentMonth: true },
  { day: 13, tasksDone: 14, isCurrentMonth: true },
  { day: 14, tasksDone: 5, isCurrentMonth: true },
  { day: 15, tasksDone: 0, isCurrentMonth: true },
  { day: 16, tasksDone: 0, isCurrentMonth: true },
  { day: 17, tasksDone: 0, isCurrentMonth: true },
  { day: 18, tasksDone: 0, isCurrentMonth: true },
  { day: 19, tasksDone: 0, isCurrentMonth: true },
  { day: 20, tasksDone: 0, isCurrentMonth: true },
  { day: 21, tasksDone: 0, isCurrentMonth: true },
  { day: 22, tasksDone: 0, isCurrentMonth: true },
  { day: 23, tasksDone: 0, isCurrentMonth: true },
  { day: 24, tasksDone: 0, isCurrentMonth: true },
  { day: 25, tasksDone: 0, isCurrentMonth: true },
  { day: 26, tasksDone: 0, isCurrentMonth: true },
  { day: 27, tasksDone: 0, isCurrentMonth: true },
  { day: 28, tasksDone: 0, isCurrentMonth: true },
  { day: 29, tasksDone: 0, isCurrentMonth: true },
  { day: 30, tasksDone: 0, isCurrentMonth: true },
  { day: 31, tasksDone: 0, isCurrentMonth: true },
];

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState("July 2026");

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <CalendarHeader
        monthYear={currentMonth}
        onPrev={() => {}}
        onNext={() => {}}
      />

      <MonthGrid monthData={JULY_2026_DAYS} />

      <ContributionHeatmap />
    </div>
  );
}