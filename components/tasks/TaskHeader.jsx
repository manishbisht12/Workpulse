import React from "react";
import { Plus } from "lucide-react";

export default function TaskHeader({ stats, onNewTask }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">
          Task Management
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          <span className="text-cyan-400 font-semibold">{stats.done}</span> done ·{" "}
          <span className="text-cyan-400 font-semibold">{stats.inProgress}</span> in progress ·{" "}
          <span>{stats.total}</span> total
        </p>
      </div>

      <button
        onClick={onNewTask}
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
      >
        <Plus size={18} strokeWidth={2.5} />
        <span>New Task</span>
      </button>
    </div>
  );
}