"use client";

import React from "react";
import ProfileCard from "@/components/profile/ProfileCard";
import ProductivityOverview from "@/components/profile/ProductivityOverview";
import AchievementBadges from "@/components/profile/AchievementBadges";
import WeeklyGlance from "@/components/profile/WeeklyGlance";

export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100">
          Profile
        </h1>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Profile User Details */}
        <div className="lg:col-span-4">
          <ProfileCard />
        </div>

        {/* Right Side: Overview, Badges & Weekly Chart */}
        <div className="lg:col-span-8 space-y-6">
          <ProductivityOverview />
          <AchievementBadges />
          <WeeklyGlance />
        </div>
      </div>
    </div>
  );
}