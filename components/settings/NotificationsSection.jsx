"use client";

import React, { useState } from "react";

const INITIAL_NOTIFS = [
  { id: "daily", title: "Daily Reminders", desc: "Morning check-in nudges", active: true },
  { id: "streak", title: "Streak Alerts", desc: "Warn before losing streaks", active: true },
  { id: "goals", title: "Goal Updates", desc: "Weekly goal summaries", active: false },
  { id: "digest", title: "Weekly Digest", desc: "Every Sunday", active: true },
  { id: "email", title: "Email Notifications", desc: "Important account alerts", active: false },
];

export default function NotificationsSection() {
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);

  const toggleNotif = (id) => {
    setNotifs((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  return (
    <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-6 space-y-5">
      <h3 className="text-base font-bold text-slate-100">Notifications</h3>

      <div className="space-y-4">
        {notifs.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-200">{item.title}</p>
              <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
            </div>

            <button
              onClick={() => toggleNotif(item.id)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 p-1 ${
                item.active ? "bg-cyan-500" : "bg-slate-700"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-slate-950 shadow-md transition-transform duration-300 ${
                  item.active ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}