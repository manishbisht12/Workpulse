"use client";

import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import GoalHeader from "@/components/goals/GoalHeader";
import GoalCard from "@/components/goals/GoalCard";
import GoalModal from "@/components/goals/GoalModal";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
const GOALS_API_URL = `${BASE_URL}/api/goals`;

const getAuthHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. GET: Fetch all goals from Backend
  const fetchGoals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(GOALS_API_URL, {
        headers: getAuthHeaders(),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to fetch goals");
      }

      const goalsList = Array.isArray(data)
        ? data
        : data?.goals || data?.data || [];

      setGoals(goalsList);
    } catch (err) {
      console.error("Error fetching goals:", err);
      setError(err.message);
      toast.error("Failed to load goals");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  // 2. POST: Add New Goal
  const handleAddGoal = async (newGoalData) => {
    const loadingToast = toast.loading("Creating goal...");
    try {
      const response = await fetch(GOALS_API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newGoalData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || data?.error || "Failed to create goal");
      }

      const savedGoal = data?.goal || data?.data || data;

      if (savedGoal) {
        setGoals((prev) => [savedGoal, ...prev]);
        toast.success("Goal created successfully!", { id: loadingToast });
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      console.error("Error adding goal:", err);
      toast.error(err.message || "Failed to add goal", { id: loadingToast });
    }
  };

  // 3. DELETE: Delete Goal by ID
  const deleteGoal = async (id) => {
    const loadingToast = toast.loading("Deleting goal...");
    try {
      const response = await fetch(`${GOALS_API_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to delete goal");
      }

      setGoals((prev) => prev.filter((g) => (g._id || g.id) !== id));
      toast.success("Goal deleted successfully!", { id: loadingToast });
    } catch (err) {
      console.error("Error deleting goal:", err);
      toast.error(err.message || "Failed to delete goal", { id: loadingToast });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <GoalHeader
        activeCount={goals.length}
        onNewGoal={() => setIsModalOpen(true)}
      />

      {loading ? (
        <div className="text-center py-16 bg-[#0f1520] rounded-2xl border border-slate-800 text-cyan-400 font-medium">
          Loading goals...
        </div>
      ) : error ? (
        <div className="text-center py-16 bg-[#0f1520] rounded-2xl border border-rose-900/30 text-rose-400 font-medium">
          {error}. Make sure your backend API is running.
        </div>
      ) : goals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {goals.map((goal) => (
            <GoalCard
              key={goal._id || goal.id}
              goal={goal}
              onDelete={deleteGoal}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#0f1520] rounded-2xl border border-slate-800 text-slate-500 font-medium">
          No goals found. Click <strong className="text-cyan-400">"New Goal"</strong> to get started!
        </div>
      )}

      <GoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddGoal}
      />
    </div>
  );
}