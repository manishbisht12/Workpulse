"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

const ACCOUNT_ITEMS = [
  { id: "password", title: "Change Password", desc: "Update your login credentials", isDanger: false },
  { id: "2fa", title: "Two-Factor Authentication", desc: "Add an extra layer of security", isDanger: false },
  { id: "export", title: "Export My Data", desc: "Download all your productivity data", isDanger: false },
  { id: "integrations", title: "Manage Integrations", desc: "Google Calendar, Slack, Notion", isDanger: false },
  { id: "delete", title: "Delete Account", desc: "Permanently remove all data", isDanger: true },
];

export default function AccountSection() {
  return (
    <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-6 space-y-5">
      <h3 className="text-base font-bold text-slate-100">Account</h3>

      <div className="space-y-3">
        {ACCOUNT_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left group ${
              item.isDanger
                ? "bg-rose-950/20 border-rose-500/30 hover:border-rose-500/50 hover:bg-rose-950/30"
                : "bg-[#111923] border-cyan-900/20 hover:border-cyan-500/30 hover:bg-cyan-950/20"
            }`}
          >
            <div>
              <p
                className={`text-sm font-bold ${
                  item.isDanger ? "text-rose-400" : "text-slate-200 group-hover:text-cyan-300"
                }`}
              >
                {item.title}
              </p>
              <p
                className={`text-xs mt-0.5 ${
                  item.isDanger ? "text-rose-400/70" : "text-slate-400"
                }`}
              >
                {item.desc}
              </p>
            </div>

            <ChevronRight
              size={18}
              className={`transition-transform group-hover:translate-x-1 ${
                item.isDanger ? "text-rose-400" : "text-slate-500 group-hover:text-cyan-400"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}