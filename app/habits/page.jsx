"use client";

import React, { useState, useMemo } from "react";
import HabitHeader from "@/components/habits/HabitHeader";
import ProgressBar from "@/components/habits/ProgressBar";
import HabitCard from "@/components/habits/HabitCard";

const INITIAL_HABITS = [
  {
    id: "1",
    title: "Morning Meditation",
    category: "Wellness",
    emoji: "🧘",
    rate: 87,
    streak: 14,
    bestStreak: 21,
    completedToday: true,
    colorClass: "stroke-violet-500",
  },
  {
    id: "2",
    title: "Read 30 minutes",
    category: "Learning",
    emoji: "📚",
    rate: 72,
    streak: 7,
    bestStreak: 30,
    completedToday: false,
    colorClass: "stroke-purple-500",
  },
  {
    id: "3",
    title: "Exercise 45 min",
    category: "Fitness",
    emoji: "🏃",
    rate: 68,
    streak: 5,
    bestStreak: 45,
    completedToday: true,
    colorClass: "stroke-emerald-400",
  },
  {
    id: "4",
    title: "Drink 8 glasses water",
    category: "Health",
    emoji: "💧",
    rate: 94,
    streak: 21,
    bestStreak: 21,
    completedToday: true,
    colorClass: "stroke-cyan-400",
  },
  {
    id: "5",
    title: "Evening journal",
    category: "Mindfulness",
    emoji: "✍️",
    rate: 58,
    streak: 3,
    bestStreak: 15,
    completedToday: false,
    colorClass: "stroke-amber-400",
  },
  {
    id: "6",
    title: "No screens before 9am",
    category: "Digital Wellness",
    emoji: "🌅",
    rate: 79,
    streak: 9,
    bestStreak: 12,
    completedToday: true,
    colorClass: "stroke-rose-400",
  },
];

export default function HabitsPage() {
  const [habits, setHabits] = useState(INITIAL_HABITS);

  const completedCount = useMemo(
    () => habits.filter((h) => h.completedToday).length,
    [habits]
  );

  const progressPercentage = useMemo(
    () => Math.round((completedCount / (habits.length || 1)) * 100),
    [completedCount, habits.length]
  );

  const toggleComplete = (id) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === id) {
          const nextState = !habit.completedToday;
          return {
            ...habit,
            completedToday: nextState,
            streak: nextState ? habit.streak + 1 : Math.max(0, habit.streak - 1),
          };
        }
        return habit;
      })
    );
  };

  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <HabitHeader
        completedCount={completedCount}
        totalCount={habits.length}
        onNewHabit={() => {}}
      />

      <ProgressBar progressPercentage={progressPercentage} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggleComplete={toggleComplete}
            onDelete={deleteHabit}
          />
        ))}
      </div>
    </div>
  );
}