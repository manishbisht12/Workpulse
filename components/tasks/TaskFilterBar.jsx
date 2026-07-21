import React from "react";
import { Search } from "lucide-react";

export default function TaskFilterBar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) {
  const statuses = ["All", "Pending", "In Progress", "Completed"];
  const priorities = ["All", "High", "Medium", "Low"];

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 bg-[#111923] p-3 rounded-2xl border border-cyan-900/30">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
        />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#080d14] border border-cyan-900/40 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
        />
      </div>

      {/* Status Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 lg:pb-0">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              statusFilter === status
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "bg-[#080d14] text-slate-400 hover:text-slate-200 border border-transparent"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="hidden lg:block w-[1px] h-6 bg-slate-800" />

      {/* Priority Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {priorities.map((priority) => (
          <button
            key={priority}
            onClick={() => setPriorityFilter(priority)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              priorityFilter === priority
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "bg-[#080d14] text-slate-400 hover:text-slate-200 border border-transparent"
            }`}
          >
            {priority}
          </button>
        ))}
      </div>
    </div>
  );
}