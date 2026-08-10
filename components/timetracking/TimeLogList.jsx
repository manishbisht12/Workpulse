"use client";

import React from "react";
import { Trash2, Tag } from "lucide-react";

export default function TimeLogList({ logs = [], onDeleteLog, formatTime }) {
  const safeLogs = Array.isArray(logs) ? logs : [];

  return (
    <div className="bg-[#0f172a]/50 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-slate-800/80">
        <h2 className="text-lg font-semibold text-white">Recent Time Logs</h2>
      </div>

      <div className="divide-y divide-slate-800/60">
        {safeLogs.length === 0 ? (
          <div className="p-10 text-center text-slate-500 text-sm">
            No time logs recorded yet. Start the timer above!
          </div>
        ) : (
          safeLogs.map((log) => (
            <div
              key={log._id || log.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/20 transition-colors"
            >
              <div className="space-y-1.5">
                <h3 className="font-semibold text-white text-base">
                  {log.taskName || "Untitled Task"}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-md text-cyan-400 border border-slate-700/50">
                    <Tag size={12} />
                    {log.category || "General"}
                  </span>
                  <span>
                    {log.createdAt
                      ? new Date(log.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : log.date || "Just now"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6">
                <span className="font-mono font-bold text-white text-lg">
                  {formatTime ? formatTime(log.duration || 0) : log.duration}
                </span>
                <button
                  onClick={() => onDeleteLog && onDeleteLog(log._id || log.id)}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Delete Log"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}