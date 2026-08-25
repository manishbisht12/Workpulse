"use client";

import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import TimerHeader from "@/components/timetracking/TimerHeader";
import TimeStatsCards from "@/components/timetracking/TimeStatsCards";
import TimeLogList from "@/components/timetracking/TimeLogList";
import { apiFetch } from "@/lib/api";

export default function TimeTrackingPage() {
  const [taskName,        setTaskName]        = useState("");
  const [category,       setCategory]        = useState("Development");
  const [isTimerRunning, setIsTimerRunning]   = useState(false);
  const [seconds,        setSeconds]         = useState(0);

  // ── Real data from DB ────────────────────────────────────────────────────
  const [logs,       setLogs]       = useState([]);
  const [logsLoading, setLogsLoading] = useState(true);
  const [saving,     setSaving]     = useState(false);

  // ── Fetch time logs from backend ─────────────────────────────────────────
  const fetchLogs = useCallback(async () => {
    try {
      setLogsLoading(true);
      const data = await apiFetch("/api/timelogs");
      // data = { success, count, totalMinutes, totalHours, data: [...] }
      setLogs(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error("Error fetching logs:", err);
      toast.error("Could not load time logs");
    } finally {
      setLogsLoading(false);
    }
  }, []);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  // ── Live timer ───────────────────────────────────────────────────────────
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // ── Start ────────────────────────────────────────────────────────────────
  const handleStartTimer = () => {
    if (!taskName.trim()) {
      toast.error("Please enter a task name first!");
      return;
    }
    setIsTimerRunning(true);
  };

  // ── Stop → save to backend ───────────────────────────────────────────────
  const handleStopTimer = async () => {
    setIsTimerRunning(false);

    if (seconds < 60) {
      toast("Timer stopped — less than 1 minute logged, not saved.", { icon: "⚠️" });
      setSeconds(0);
      setTaskName("");
      return;
    }

    const durationMinutes = Math.round(seconds / 60);

    try {
      setSaving(true);
      const loadingId = toast.loading("Saving time log...");
      await apiFetch("/api/timelogs", {
        method: "POST",
        body: JSON.stringify({
          duration: durationMinutes,
          description: taskName.trim(),
          category,
        }),
      });
      toast.success(`Logged ${durationMinutes} min — ${taskName}`, { id: loadingId });
      setTaskName("");
      setSeconds(0);
      fetchLogs(); // refresh list
    } catch (err) {
      toast.error(err.message || "Failed to save log");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete log ───────────────────────────────────────────────────────────
  const handleDeleteLog = async (id) => {
    const loadingId = toast.loading("Deleting...");
    try {
      await apiFetch(`/api/timelogs/${id}`, { method: "DELETE" });
      setLogs((prev) => prev.filter((l) => (l._id || l.id) !== id));
      toast.success("Log deleted", { id: loadingId });
    } catch (err) {
      toast.error(err.message || "Failed to delete log", { id: loadingId });
    }
  };

  // ── Format helpers ───────────────────────────────────────────────────────
  const formatTime = (totalSeconds = 0) => {
    const hrs  = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2,"0")}:${mins.toString().padStart(2,"0")}:${secs.toString().padStart(2,"0")}`;
  };

  // Total seconds from DB logs (duration is in minutes)
  const totalTrackedSeconds = logs.reduce((acc, l) => acc + (l.duration || 0) * 60, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-slate-100">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Time Tracking</h1>
        <p className="text-sm text-slate-400 mt-1">Track time spent on tasks and projects</p>
      </div>

      <TimerHeader
        taskName={taskName}
        setTaskName={setTaskName}
        category={category}
        setCategory={setCategory}
        isTimerRunning={isTimerRunning}
        seconds={seconds}
        formatTime={formatTime}
        onStart={handleStartTimer}
        onStop={handleStopTimer}
      />

      <TimeStatsCards
        totalTimeFormatted={formatTime(totalTrackedSeconds)}
        totalSessions={logs.length}
      />

      {logsLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400" />
        </div>
      ) : (
        <TimeLogList
          logs={logs.map(l => ({
            ...l,
            id:       l._id || l.id,
            taskName: l.description || "Untitled",
            // Convert minutes → seconds for the formatTime display in TimeLogList
            duration: (l.duration || 0) * 60,
            date:     l.logDate
              ? new Date(l.logDate).toLocaleDateString("en-IN", { day:"numeric", month:"short" })
              : "Today",
          }))}
          onDeleteLog={handleDeleteLog}
          formatTime={formatTime}
        />
      )}
    </div>
  );
}