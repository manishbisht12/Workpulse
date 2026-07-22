"use client";

import React from "react";
import {
  CheckSquare,
  Repeat,
  Camera,
  Target,
  AlertCircle,
} from "lucide-react";
import TimelineHeader from "@/components/timeline/TimelineHeader";
import TimelineItem from "@/components/timeline/TimelineItem";

const TIMELINE_DATA = [
  {
    id: 1,
    title: "Completed: Redesign marketing landing page",
    subtitle: "3 subtasks finished",
    time: "2h ago",
    icon: CheckSquare,
    type: "task",
  },
  {
    id: 2,
    title: "Morning Meditation — Day 14 streak!",
    subtitle: "10 min guided session",
    time: "3h ago",
    icon: Repeat,
    type: "habit",
  },
  {
    id: 3,
    title: "Progress photo uploaded",
    subtitle: "Week 8 check-in",
    time: "5h ago",
    icon: Camera,
    type: "photo",
  },
  {
    id: 4,
    title: "React Course reached 70% completion",
    subtitle: "14 of 20 lessons done",
    time: "Yesterday",
    icon: Target,
    type: "goal",
  },
  {
    id: 5,
    title: "Completed: Sprint planning & retrospective",
    subtitle: "Action items recorded",
    time: "Yesterday",
    icon: CheckSquare,
    type: "task",
  },
  {
    id: 6,
    title: "Exercise — 5 days in a row!",
    subtitle: "45 min run · 5.2 km",
    time: "2d ago",
    icon: Repeat,
    type: "amber",
  },
  {
    id: 7,
    title: "Started: Fix session expiry bug",
    subtitle: "Priority: High",
    time: "2d ago",
    icon: AlertCircle,
    type: "priority",
  },
  {
    id: 8,
    title: "Savings milestone: $7,500 reached",
    subtitle: "75% of $10,000 goal",
    time: "3d ago",
    icon: Target,
    type: "goal",
  },
];

export default function TimelinePage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <TimelineHeader />

      {/* Container Box */}
      <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-6 md:p-8">
        <div className="space-y-2">
          {TIMELINE_DATA.map((item, index) => (
            <TimelineItem
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              time={item.time}
              icon={item.icon}
              type={item.type}
              isLast={index === TIMELINE_DATA.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}