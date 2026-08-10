"use client";

import React, { useState, useEffect } from "react";
import TimerHeader from "@/components/timetracking/TimerHeader";
import TimeStatsCards from "@/components/timetracking/TimeStatsCards";
import TimeLogList from "@/components/timetracking/TimeLogList";

const INITIAL_LOGS = [
  {
    id: "1",
    taskName: "Build Goal Tracker API & Controllers",
    category: "Development",
    duration: 5420,
    date: "Aug 10, 08:30 PM",
  },
  {
    id: "2",
    taskName: "Design WorkPulse Dark Theme Dashboard UI",
    category: "Design",
    duration: 3600,
    date: "Aug 10, 04:15 PM",
  },
];

export default function TimeTrackingPage() {
  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState("Development");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [logs, setLogs] = useState(INITIAL_LOGS);

  // Timer counter
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleStartTimer = () => {
    if (!taskName.trim()) return alert("Please enter a task name!");
    setIsTimerRunning(true);
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);

    const newLog = {
      id: Date.now().toString(),
      taskName,
      category,
      duration: seconds,
      date: "Just now",
    };

    setLogs((prev) => [newLog, ...prev]);
    setTaskName("");
    setSeconds(0);
  };

  const handleDeleteLog = (id) => {
    setLogs((prev) => prev.filter((item) => (item._id || item.id) !== id));
  };

  const formatTime = (totalSeconds = 0) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const totalTrackedSeconds = (Array.isArray(logs) ? logs : []).reduce(
    (acc, curr) => acc + (curr.duration || 0),
    0
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-slate-100">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Time Tracking
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Track time spent on tasks and projects
        </p>
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
        totalSessions={Array.isArray(logs) ? logs.length : 0}
      />

      <TimeLogList
        logs={logs}
        onDeleteLog={handleDeleteLog}
        formatTime={formatTime}
      />
    </div>
  );
}