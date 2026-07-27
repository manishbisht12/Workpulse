"use client";

import React from "react";
import AppearanceSection from "@/components/settings/AppearanceSection";
import NotificationsSection from "@/components/settings/NotificationsSection";
import AccountSection from "@/components/settings/AccountSection";
import IntegrationsSection from "@/components/settings/IntegrationsSection";
import AppInfoFooter from "@/components/settings/AppInfoFooter";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100">
          Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your preferences and account
        </p>
      </div>

      {/* Grid Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppearanceSection />
        <NotificationsSection />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AccountSection />
        <IntegrationsSection />
      </div>

      {/* App Info Footer */}
      <AppInfoFooter />
    </div>
  );
}