import React from "react";
import { CheckCircle2, Circle, Clock, Edit2, Trash2 } from "lucide-react";

export default function TaskCard({ task, onToggle, onDelete, onEdit }) {
  const isCompleted = task.status === "Completed";
  const isInProgress = task.status === "In Progress";

  const priorityStyles = {
    High: "bg-rose-950/40 text-rose-300 border-rose-800/40",
    Medium: "bg-amber-950/40 text-amber-300 border-amber-800/40",
    Low: "bg-emerald-950/40 text-emerald-300 border-emerald-800/40",
  };

  const statusStyles = {
    Completed: "bg-emerald-950/40 text-emerald-300 border-emerald-800/40",
    "In Progress": "bg-cyan-950/40 text-cyan-300 border-cyan-800/40",
    Pending: "bg-slate-800/40 text-slate-400 border-slate-700/40",
  };

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-[#111923] border border-cyan-900/20 hover:border-cyan-500/30 transition-all gap-4">
      <div className="flex items-start sm:items-center gap-3.5 min-w-0">
        <button
          onClick={() => onToggle(task.id)}
          className="mt-0.5 sm:mt-0 focus:outline-none flex-shrink-0"
        >
          {isCompleted ? (
            <CheckCircle2 size={22} className="text-emerald-400" fill="#064e3b" />
          ) : isInProgress ? (
            <Clock size={22} className="text-cyan-400" />
          ) : (
            <Circle size={22} className="text-slate-600 hover:text-slate-400" />
          )}
        </button>

        <div className="min-w-0">
          <h3
            className={`font-semibold text-sm transition-all truncate ${
              isCompleted ? "line-through text-slate-500" : "text-slate-100"
            }`}
          >
            {task.title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {task.category} · Due {task.dueDate}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2.5 sm:gap-3 flex-shrink-0">
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityStyles[task.priority]}`}>
          {task.priority}
        </span>

        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[task.status]}`}>
          {task.status}
        </span>

        <div className="flex items-center gap-1 text-slate-500 border-l border-slate-800 pl-2">
            <button
              onClick={() => onEdit(task)}
              className="p-1.5 hover:text-slate-200 rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              <Edit2 size={16} />
            </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 hover:text-rose-400 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}