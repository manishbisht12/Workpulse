"use client";

import React, { useState } from "react";
import { CheckCircle2, Circle, Clock, Edit2, Trash2, AlertTriangle } from "lucide-react";

export default function TaskCard({ task, onToggle, onDelete, onEdit }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isCompleted = task.status === "Completed";
  const isInProgress = task.status === "In Progress";
  const taskId = task._id || task.id;

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

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(false);
    onDelete(taskId);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-[#111923] border border-cyan-900/20 hover:border-cyan-500/30 transition-all gap-4">
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          <button
            onClick={() => onToggle(taskId)}
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
              {task.category || "General"} · Due {task.dueDate || "No Date"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 sm:gap-3 flex-shrink-0">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityStyles[task.priority] || priorityStyles.Medium}`}>
            {task.priority || "Medium"}
          </span>

          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[task.status] || statusStyles.Pending}`}>
            {task.status || "Pending"}
          </span>

          <div className="flex items-center gap-1 text-slate-500 border-l border-slate-800 pl-2">
            <button
              onClick={() => onEdit(task)}
              className="p-1.5 hover:text-slate-200 rounded-lg hover:bg-slate-800/50 transition-colors"
              title="Edit Task"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={handleDeleteClick}
              className="p-1.5 hover:text-rose-400 rounded-lg hover:bg-slate-800/50 transition-colors"
              title="Delete Task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0d131a] border border-slate-800 w-full max-w-sm rounded-2xl p-6 shadow-2xl space-y-4 text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-100">Delete Task?</h4>
              <p className="text-xs text-slate-400">
                Are you sure you want to delete <strong className="text-slate-200">{task.title}</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={cancelDelete}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700/50"
              >
                No, Keep
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white transition-colors shadow-lg shadow-rose-600/20"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}