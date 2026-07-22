"use client";

import React from "react";

export default function TimelineItem({
  title,
  subtitle,
  time,
  icon: Icon,
  type = "task", // task | habit | photo | goal | priority
  isLast = false,
}) {
  // Matching Theme Variant Styles for Icons & Subtitles
  const typeStyles = {
    task: {
      iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      subColor: "text-cyan-400",
    },
    habit: {
      iconBg: "bg-teal-500/10 text-teal-400 border-teal-500/30",
      subColor: "text-teal-400",
    },
    photo: {
      iconBg: "bg-sky-500/10 text-sky-400 border-sky-500/30",
      subColor: "text-sky-400",
    },
    goal: {
      iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      subColor: "text-emerald-400",
    },
    priority: {
      iconBg: "bg-rose-500/10 text-rose-400 border-rose-500/30",
      subColor: "text-rose-400",
    },
    amber: {
      iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      subColor: "text-amber-400",
    },
  };

  const current = typeStyles[type] || typeStyles.task;

  return (
    <div className="relative flex gap-4 sm:gap-6 group">
      {/* Vertical Connecting Line */}
      {!isLast && (
        <span className="absolute left-5 sm:left-6 top-12 bottom-0 w-[2px] bg-cyan-900/30 group-hover:bg-cyan-500/30 transition-colors" />
      )}

      {/* Circle Icon Badge */}
      <div
        className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 ${current.iconBg}`}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      {/* Item Details */}
      <div className="pb-8 flex-1">
        <h3 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
          {title}
        </h3>
        {subtitle && (
          <p className={`text-xs font-semibold mt-0.5 ${current.subColor}`}>
            {subtitle}
          </p>
        )}
        <span className="text-[11px] font-medium text-slate-500 block mt-1">
          {time}
        </span>
      </div>
    </div>
  );
}