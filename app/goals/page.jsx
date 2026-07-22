"use client";

import React, { useState } from "react";
import GoalHeader from "@/components/goals/GoalHeader";
import GoalCard from "@/components/goals/GoalCard";

const INITIAL_GOALS = [
  {
    id: "1",
    title: "Complete React Course",
    category: "Learning",
    current: 14,
    target: 20,
    unit: "lessons",
    dueDate: "2026-07-01",
    isOverdue: true,
    colorTheme: "purple",
  },
  {
    id: "2",
    title: "Run 5K in under 25 min",
    category: "Fitness",
    current: 3.2,
    target: 5,
    unit: "km",
    dueDate: "2026-06-30",
    isOverdue: true,
    colorTheme: "purple",
  },
  {
    id: "3",
    title: "Build Emergency Fund",
    category: "Finance",
    current: 7500,
    target: 10000,
    formattedCurrent: "$7,500",
    formattedTarget: "$10,000",
    unit: "",
    dueDate: "2026-09-01",
    timeLeft: "41d left",
    colorTheme: "emerald",
  },
  {
    id: "4",
    title: "Read 12 books this year",
    category: "Learning",
    current: 5,
    target: 12,
    unit: "books",
    dueDate: "2026-12-31",
    timeLeft: "162d left",
    colorTheme: "orange",
  },
  {
    id: "5",
    title: "Lose 10 pounds",
    category: "Health",
    current: 4,
    target: 10,
    unit: "lbs",
    dueDate: "2026-08-15",
    timeLeft: "24d left",
    colorTheme: "orange",
  },
];

export default function GoalsPage() {
  const [goals, setGoals] = useState(INITIAL_GOALS);

  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <GoalHeader activeCount={goals.length} onNewGoal={() => {}} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} onDelete={deleteGoal} />
        ))}
      </div>
    </div>
  );
}