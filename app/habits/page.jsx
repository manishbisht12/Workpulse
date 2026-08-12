"use client";

import React, { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import HabitHeader from "@/components/habits/HabitHeader";
import ProgressBar from "@/components/habits/ProgressBar";
import HabitCard from "@/components/habits/HabitCard";
import AddHabitModal from "@/components/habits/AddHabitModal";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function HabitsPage() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper to get Auth Token if using JWT
  const getAuthHeaders = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };

  // Fetch Habits from API
  const fetchHabits = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/habits`, {
        headers: getAuthHeaders(),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch habits");

      // Handle both array response or { data: [...] } structure
      const habitList = Array.isArray(data) ? data : data.habits || data.data || [];
      setHabits(habitList);
    } catch (err) {
      console.error("Error fetching habits:", err);
      toast.error(err.message || "Could not load habits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const completedCount = useMemo(
    () => habits.filter((h) => h.completedToday).length,
    [habits]
  );

  const progressPercentage = useMemo(
    () => (habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0),
    [completedCount, habits.length]
  );

  // Toggle Habit Completion (API Call)
  const toggleComplete = async (id) => {
    // Optimistic UI update
    setHabits((prev) =>
      prev.map((h) => {
        const habitId = h._id || h.id;
        if (habitId === id) {
          const nextState = !h.completedToday;
          const newStreak = nextState ? (h.streak || 0) + 1 : Math.max(0, (h.streak || 0) - 1);
   
          const newBest = Math.max(h.bestStreak || 0, newStreak);
       
          const newRate = newBest > 0 ? Math.round((newStreak / newBest) * 100) : 0;

          return {
            ...h,
            completedToday: nextState,
            streak: newStreak,
            bestStreak: newBest,
            rate: newRate, 
          };
        }
        return h;
      })
    );

    try {
      const res = await fetch(`${BASE_URL}/api/habits/${id}/toggle`, {
        method: "PATCH",
        headers: getAuthHeaders(),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to update habit status");
      toast.success("Habit status updated!");
    } catch (err) {
      console.error("Error toggling habit:", err);
      toast.error(err.message || "Failed to update");
      // Rollback on error
      fetchHabits();
    }
  };

  // Delete Habit (API Call)
  const deleteHabit = async (id) => {
    const loadingToast = toast.loading("Deleting habit...");
    try {
      const res = await fetch(`${BASE_URL}/api/habits/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to delete habit");

      setHabits((prev) => prev.filter((h) => (h._id || h.id) !== id));
      toast.success("Habit deleted", { id: loadingToast });
    } catch (err) {
      console.error("Error deleting habit:", err);
      toast.error(err.message || "Failed to delete", { id: loadingToast });
    }
  };

  // Add Habit (Called from Modal after successful API call)
  const handleHabitAdded = (newHabit) => {
    setHabits((prev) => [newHabit, ...prev]);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6">
      <HabitHeader
        completedCount={completedCount}
        totalCount={habits.length}
        onNewHabit={() => setIsModalOpen(true)}
      />

      <ProgressBar progressPercentage={progressPercentage} />

      {loading ? (
        <div className="text-center py-12 text-cyan-400 font-semibold">
          Loading your habits...
        </div>
      ) : habits.length === 0 ? (
        <div className="text-center py-12 bg-[#0b0f17] border border-[#1e293b]/70 rounded-2xl text-slate-400">
          No habits found. Click <strong>"New Habit"</strong> to create one!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {habits.map((habit) => (
            <HabitCard
              key={habit._id || habit.id}
              habit={habit}
              onToggleComplete={toggleComplete}
              onDelete={deleteHabit}
            />
          ))}
        </div>
      )}

      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onHabitAdded={handleHabitAdded}
      />
    </div>
  );
}