"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Flame, CheckSquare, Repeat, Clock, Plus, Target, Image as ImageIcon,
} from "lucide-react";
import { apiFetch } from "@/lib/api";

// ── Greeting helper ──────────────────────────────────────────────────────────
const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

const getEmoji = () => {
  const h = new Date().getHours();
  if (h < 12) return "☀️";
  if (h < 17) return "🌤️";
  return "🌙";
};

const formatDate = () =>
  new Date().toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

// ── Priority colours ─────────────────────────────────────────────────────────
const priorityColor = {
  High:   "text-rose-400 bg-rose-500/10 border-rose-500/20",
  Medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Low:    "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

// ── SVG Weekly Bar Chart ─────────────────────────────────────────────────────
function WeeklyChart({ data }) {
  if (!data || data.length === 0) return null;

  const maxScore = Math.max(...data.map((d) => d.score), 1);
  const W = 100; // viewBox width
  const H = 80;  // viewBox height (chart area)
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - (d.score / maxScore) * H;
    return `${x},${y}`;
  });

  const polyline = pts.join(" ");
  // Filled area: close path down and back
  const firstPt = pts[0];
  const lastPt  = pts[pts.length - 1];
  const areaPath = `M ${firstPt} L ${pts.slice(1).join(" L ")} L ${lastPt.split(",")[0]},${H} L ${firstPt.split(",")[0]},${H} Z`;

  return (
    <svg className="w-full h-36 mt-auto overflow-visible" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(6,182,212,0.35)" />
          <stop offset="100%" stopColor="rgba(6,182,212,0)" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#chartGrad)" />
      <polyline points={polyline} fill="none" stroke="rgba(6,182,212,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => {
        const [x, y] = pts[i].split(",").map(Number);
        return d.score > 0 ? (
          <circle key={i} cx={x} cy={y} r="2.5" fill="#06b6d4" />
        ) : null;
      })}
    </svg>
  );
}

// ── Skeleton loader ─────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-[#0d131a] border border-cyan-900/20 p-5 rounded-2xl animate-pulse">
      <div className="w-10 h-10 bg-slate-800 rounded-xl mb-4" />
      <div className="h-8 w-16 bg-slate-800 rounded mb-2" />
      <div className="h-3 w-24 bg-slate-800 rounded" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
export default function DashboardPage() {
  const router = useRouter();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // Log-Time modal state
  const [showLogTime, setShowLogTime] = useState(false);
  const [logDuration, setLogDuration] = useState("");
  const [logDesc,     setLogDesc]     = useState("");
  const [logLoading,  setLogLoading]  = useState(false);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiFetch("/api/dashboard");
      setData(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  // ── Log Time Handler ──────────────────────────────────────────────────────
  const handleLogTime = async (e) => {
    e.preventDefault();
    if (!logDuration || isNaN(logDuration) || Number(logDuration) < 1) return;
    try {
      setLogLoading(true);
      await apiFetch("/api/timelogs", {
        method: "POST",
        body: JSON.stringify({ duration: Number(logDuration), description: logDesc }),
      });
      setShowLogTime(false);
      setLogDuration("");
      setLogDesc("");
      fetchDashboard(); // refresh stats
    } catch (err) {
      alert(err.message);
    } finally {
      setLogLoading(false);
    }
  };

  // ── Derived values ────────────────────────────────────────────────────────
  const score    = data?.productivityScore ?? 0;
  const streak   = data?.streak ?? { current: 0, best: 0 };
  const tasks    = data?.tasksToday ?? { completed: 0, total: 0, remaining: 0 };
  const habits   = data?.habitsToday ?? { completed: 0, total: 0, completionPercent: 0 };
  const hours    = data?.hoursWorked ?? { today: 0, target: 8 };
  const weekly   = data?.weeklyProductivity ?? [];
  const recent   = data?.recentTasks ?? [];
  const userName = data?.user?.name ?? "User";

  // ── Error state ───────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4 text-center">
        <p className="text-rose-400 font-semibold">Failed to load dashboard</p>
        <p className="text-slate-500 text-sm">{error}</p>
        <button onClick={fetchDashboard} className="px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl text-sm hover:bg-cyan-500/30 transition">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-cyan-400 font-medium">
            {getGreeting()}, {userName} {getEmoji()}
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100 mt-1">Your Workspace</h1>
          <p className="text-xs text-slate-500 mt-1">{formatDate()}</p>
        </div>

        {/* Productivity Score Ring */}
        <div className="flex items-center gap-4 bg-[#0d131a] border border-cyan-900/30 p-3 rounded-2xl w-full sm:w-auto">
          <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
            <svg className="absolute w-full h-full transform -rotate-90">
              <circle cx="28" cy="28" r="24" className="stroke-slate-800" strokeWidth="4" fill="transparent" />
              <circle cx="28" cy="28" r="24" className="stroke-cyan-400" strokeWidth="4" fill="transparent"
                strokeDasharray={150} strokeDashoffset={loading ? 150 : 150 - (150 * score) / 100} strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.8s ease" }}
              />
            </svg>
            <span className="text-sm font-bold text-slate-100">{loading ? "—" : `${score}%`}</span>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Productivity Score</p>
            <p className="text-xs text-slate-500">Today's Target Status</p>
          </div>
        </div>
      </div>

      {/* ── 4 Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <>{[0,1,2,3].map(i => <SkeletonCard key={i} />)}</>
        ) : (
          <>
            {/* Streak */}
            <div className="bg-gradient-to-br from-[#181310] to-[#0d131a] border border-amber-500/20 p-5 rounded-2xl group hover:border-amber-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
                <Flame size={20} fill="currentColor" />
              </div>
              <span className="text-3xl font-bold text-slate-100">{streak.current}</span>
              <span className="text-sm text-slate-500 ml-1">days</span>
              <p className="text-xs text-slate-400 font-medium mt-1">Current Streak</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Best: {streak.best} days</p>
            </div>

            {/* Tasks Today */}
            <div className="bg-[#0d131a] border border-cyan-900/30 p-5 rounded-2xl hover:border-cyan-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
                <CheckSquare size={20} />
              </div>
              <span className="text-3xl font-bold text-slate-100">{tasks.completed}</span>
              <span className="text-sm text-slate-500 ml-1">/ {tasks.total}</span>
              <p className="text-xs text-slate-400 font-medium mt-1">Tasks Today</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{tasks.remaining} remaining</p>
            </div>

            {/* Habits Today */}
            <div className="bg-[#0d131a] border border-cyan-900/30 p-5 rounded-2xl hover:border-cyan-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-4">
                <Repeat size={20} />
              </div>
              <span className="text-3xl font-bold text-slate-100">{habits.completed}</span>
              <span className="text-sm text-slate-500 ml-1">/ {habits.total}</span>
              <p className="text-xs text-slate-400 font-medium mt-1">Habits Today</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{habits.completionPercent}% completion</p>
            </div>

            {/* Hours Worked */}
            <div className="bg-gradient-to-br from-[#0a1c1a] to-[#0d131a] border border-emerald-500/20 p-5 rounded-2xl hover:border-emerald-500/40 transition cursor-pointer"
              onClick={() => setShowLogTime(true)} title="Click to log time">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                <Clock size={20} />
              </div>
              <span className="text-3xl font-bold text-slate-100">{hours.today}</span>
              <span className="text-sm text-slate-500 ml-1">h</span>
              <p className="text-xs text-slate-400 font-medium mt-1">Hours Worked</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Target: {hours.target}h · Click to log</p>
            </div>
          </>
        )}
      </div>

      {/* ── Quick Actions ── */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        <button onClick={() => router.push("/tasks")}
          className="flex-1 sm:flex-initial justify-center flex items-center gap-2 px-4 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl text-xs font-semibold transition whitespace-nowrap">
          <Plus size={14} /> Add Task
        </button>
        <button onClick={() => router.push("/habits")}
          className="flex-1 sm:flex-initial justify-center flex items-center gap-2 px-4 py-2.5 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/30 rounded-xl text-xs font-semibold transition whitespace-nowrap">
          <Plus size={14} /> Add Habit
        </button>
        <button onClick={() => router.push("/goals")}
          className="flex-1 sm:flex-initial justify-center flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-semibold transition whitespace-nowrap">
          <Target size={14} /> Add Goal
        </button>
        <button onClick={() => setShowLogTime(true)}
          className="flex-1 sm:flex-initial justify-center flex items-center gap-2 px-4 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-semibold transition whitespace-nowrap">
          <Clock size={14} /> Log Time
        </button>
      </div>

      {/* ── Weekly Chart + Recent Tasks ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Chart */}
        <div className="lg:col-span-2 bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-4 md:p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-100">Weekly Productivity</h2>
              <p className="text-xs text-slate-500 mt-0.5">Score, tasks & habits tracking</p>
            </div>
            <span className="text-xs bg-slate-800/60 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700/50 font-medium flex-shrink-0">This Week</span>
          </div>

          <div className="h-56 w-full flex flex-col justify-between relative pt-4">
            {/* Y-axis grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-slate-600 pointer-events-none pb-6">
              {["100", "75", "50", "25", "0"].map((v) => (
                <div key={v} className="border-b border-slate-800/60 w-full pb-1 flex justify-between">
                  <span>{v}</span>
                </div>
              ))}
            </div>

            {/* Actual chart */}
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400" />
              </div>
            ) : (
              <WeeklyChart data={weekly} />
            )}

            {/* X-axis labels */}
            <div className="flex w-full justify-between text-[10px] text-slate-500 z-10 mt-2">
              {(loading ? ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] : weekly.map(d => d.day)).map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-4 md:p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-slate-100">Recent Tasks</h2>
            <button onClick={() => router.push("/tasks")}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex-shrink-0">
              View all →
            </button>
          </div>

          <div className="space-y-3 flex-1">
            {loading ? (
              [0,1,2].map(i => (
                <div key={i} className="flex items-center gap-3 p-2.5 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-slate-700 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="h-3 bg-slate-800 rounded w-3/4 mb-1" />
                    <div className="h-2 bg-slate-800 rounded w-1/2" />
                  </div>
                </div>
              ))
            ) : recent.length === 0 ? (
              <p className="text-slate-500 text-xs text-center py-8">No tasks yet. <button onClick={() => router.push("/tasks")} className="text-cyan-400 underline">Add one!</button></p>
            ) : (
              recent.map((task) => (
                <div key={task._id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/40 transition gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-200 truncate">{task.title}</p>
                      <p className="text-[10px] text-slate-500 truncate">{task.category}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${priorityColor[task.priority] || priorityColor.Medium}`}>
                    {task.priority}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Log Time Modal ── */}
      {showLogTime && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#0d131a] border border-cyan-900/40 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-base font-bold text-slate-100 mb-4">Log Time Worked</h3>
            <form onSubmit={handleLogTime} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Duration (minutes) *</label>
                <input
                  type="number" min="1" required
                  value={logDuration} onChange={e => setLogDuration(e.target.value)}
                  placeholder="e.g. 90"
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Description (optional)</label>
                <input
                  type="text"
                  value={logDesc} onChange={e => setLogDesc(e.target.value)}
                  placeholder="e.g. Worked on dashboard UI"
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition"
                />
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowLogTime(false)}
                  className="flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition">
                  Cancel
                </button>
                <button type="submit" disabled={logLoading}
                  className="flex-1 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black rounded-xl text-sm font-bold transition">
                  {logLoading ? "Saving..." : "Log Time"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}