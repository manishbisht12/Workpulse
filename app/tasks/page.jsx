"use client";

import React, { useState, useMemo } from "react";
import TaskHeader from "@/components/tasks/TaskHeader";
import TaskFilterBar from "@/components/tasks/TaskFilterBar";
import TaskCard from "@/components/tasks/TaskCard";

const INITIAL_TASKS = [
  { id: "1", title: "Redesign marketing landing page", category: "Design", dueDate: "2026-06-17", priority: "High", status: "In Progress" },
  { id: "2", title: "Review authentication PR #147", category: "Development", dueDate: "2026-06-16", priority: "Medium", status: "Pending" },
  { id: "3", title: "Write OpenAPI documentation", category: "Documentation", dueDate: "2026-06-15", priority: "Low", status: "Completed" },
  { id: "4", title: "Sprint planning & retrospective", category: "Meeting", dueDate: "2026-06-15", priority: "High", status: "Completed" },
  { id: "5", title: "Fix session expiry bug", category: "Development", dueDate: "2026-06-16", priority: "High", status: "In Progress" },
  { id: "6", title: "Onboarding flow improvements", category: "Design", dueDate: "2026-06-20", priority: "Medium", status: "Pending" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const stats = useMemo(() => {
    const done = tasks.filter((t) => t.status === "Completed").length;
    const inProgress = tasks.filter((t) => t.status === "In Progress").length;
    return { done, inProgress, total: tasks.length };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || task.status === statusFilter;
      const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const nextStatus =
            task.status === "Completed" ? "Pending" : task.status === "Pending" ? "In Progress" : "Completed";
          return { ...task, status: nextStatus };
        }
        return task;
      })
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="text-slate-200 space-y-8">
      <TaskHeader stats={stats} onNewTask={() => {}} />

      <TaskFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />

      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={toggleTaskStatus}
              onDelete={deleteTask}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-[#111923] rounded-2xl border border-cyan-900/20 text-slate-500">
            No tasks found.
          </div>
        )}
      </div>
    </div>
  );
}