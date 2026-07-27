"use client";

import React, { useState } from "react";

const INITIAL_INTEGRATIONS = [
  {
    id: "gcal",
    name: "Google Calendar",
    connected: true,
    statusText: "Connected · Syncing 3 calendars",
  },
  {
    id: "slack",
    name: "Slack",
    connected: false,
    statusText: "Not connected",
  },
  {
    id: "notion",
    name: "Notion",
    connected: false,
    statusText: "Not connected",
  },
  {
    id: "github",
    name: "GitHub",
    connected: true,
    statusText: "Connected · @alexmorgan",
  },
];

export default function IntegrationsSection() {
  const [integrations, setIntegrations] = useState(INITIAL_INTEGRATIONS);

  const toggleConnection = (id) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.connected;
          return {
            ...item,
            connected: nextState,
            statusText: nextState ? "Connected" : "Not connected",
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-6 space-y-5">
      <h3 className="text-base font-bold text-slate-100">Integrations</h3>

      <div className="space-y-4">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between pb-3 border-b border-cyan-900/20 last:border-0 last:pb-0"
          >
            <div>
              <p className="text-sm font-semibold text-slate-200">{item.name}</p>
              <p
                className={`text-xs mt-0.5 ${
                  item.connected ? "text-teal-400 font-medium" : "text-slate-500"
                }`}
              >
                {item.statusText}
              </p>
            </div>

            <button
              onClick={() => toggleConnection(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                item.connected
                  ? "border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                  : "border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"
              }`}
            >
              {item.connected ? "Disconnect" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}