"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import TaskHeader from "@/components/tasks/TaskHeader";
import TaskFilterBar from "@/components/tasks/TaskFilterBar";
import TaskCard from "@/components/tasks/TaskCard";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskModal from "@/components/tasks/EditTaskModal";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
const TASKS_API_URL = `${BASE_URL}/api/tasks`;

const getAuthHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // 1. GET: Fetch all tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(TASKS_API_URL, { headers: getAuthHeaders() });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to fetch tasks from server");
      }

      const taskList = Array.isArray(data)
        ? data
        : data?.tasks || data?.data || [];

      setTasks(taskList);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err.message);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // 2. POST: Add New Task (Fixed Error & Payload Handling)
  const handleAddTask = async (newTaskData) => {
    const loadingToast = toast.loading("Creating task...");
    try {
      const response = await fetch(TASKS_API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newTaskData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        // Backend se exact error message extraction
        throw new Error(data?.message || data?.error || "Failed to create task");
      }

      const savedTask = data?.task || data?.data || data;

      if (savedTask) {
        setTasks((prev) => [savedTask, ...prev]);
        toast.success("Task created successfully!", { id: loadingToast });
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      console.error("Error adding task:", err);
      toast.error(err.message || "Failed to add task", { id: loadingToast });
    }
  };

  // 3. PUT: Toggle / Update Task Status
  const toggleTaskStatus = async (id) => {
    const targetTask = tasks.find((task) => (task._id || task.id) === id);
    if (!targetTask) return;

    const nextStatus =
      targetTask.status === "Completed"
        ? "Pending"
        : targetTask.status === "Pending"
        ? "In Progress"
        : "Completed";

    const loadingToast = toast.loading("Updating status...");

    try {
      const response = await fetch(`${TASKS_API_URL}/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...targetTask,
          status: nextStatus,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to update task status");
      }

      const updatedTask = data?.task || data?.data || data;

      // Optimistic state update
      setTasks((prev) =>
        prev.map((task) => {
          const taskId = task._id || task.id;
          return taskId === id ? { ...task, ...updatedTask, status: nextStatus } : task;
        })
      );

      toast.success(`Task marked as ${nextStatus}`, { id: loadingToast });
    } catch (err) {
      console.error("Error updating task:", err);
      toast.error(err.message || "Failed to update task", { id: loadingToast });
    }
  };

  // Update Task Modal Action
  const updateTask = async (id, updatedData) => {
    const loadingToast = toast.loading("Updating task...");

    try {
      const response = await fetch(`${TASKS_API_URL}/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to update task");
      }

      const updatedTask = data?.task || data?.data || data;

      setTasks((prev) =>
        prev.map((task) => {
          const taskId = task._id || task.id;
          return taskId === id ? { ...task, ...updatedTask } : task;
        })
      );

      toast.success("Task updated successfully!", {
        id: loadingToast,
      });
    } catch (err) {
      console.error("Error updating task:", err);
      toast.error(err.message || "Failed to update task", {
        id: loadingToast,
      });
    }
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  // 4. DELETE: Delete Task
  const deleteTask = async (id) => {
    const loadingToast = toast.loading("Deleting task...");

    try {
      const response = await fetch(`${TASKS_API_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to delete task");
      }

      setTasks((prev) => prev.filter((task) => (task._id || task.id) !== id));
      toast.success("Task deleted successfully!", { id: loadingToast });
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error(err.message || "Failed to delete task", { id: loadingToast });
    }
  };

  // Stats Calculation
  const stats = useMemo(() => {
    const done = tasks.filter((t) => t.status === "Completed").length;
    const inProgress = tasks.filter((t) => t.status === "In Progress").length;
    return { done, inProgress, total: tasks.length };
  }, [tasks]);

  // Filtering Logic
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const title = task.title || "";
      const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || task.status === statusFilter;
      const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  return (
    <div className="text-slate-200 space-y-8">
      <TaskHeader stats={stats} onNewTask={() => setIsModalOpen(true)} />

      <TaskFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />

      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-12 bg-[#111923] rounded-2xl border border-cyan-900/20 text-cyan-400">
            Loading tasks...
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-[#111923] rounded-2xl border border-rose-900/30 text-rose-400">
            {error}. Check if backend server is running.
          </div>
        ) : filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task._id || task.id}
              task={{
                ...task,
                id: task._id || task.id,
              }}
              onToggle={toggleTaskStatus}
              onDelete={deleteTask}
              onEdit={handleEditTask}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-[#111923] rounded-2xl border border-cyan-900/20 text-slate-500">
            No tasks found.
          </div>
        )}
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        onUpdateTask={updateTask}
      />
    </div>
  );
}