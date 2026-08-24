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

const iconMap = {
  CheckSquare: CheckSquare,
  Repeat: Repeat,
  Camera: Camera,
  Target: Target,
  AlertCircle: AlertCircle,
};

export default function TimelinePage() {
  const [timelineData, setTimelineData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchTimeline = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/timeline");
        if (!response.ok) {
          throw new Error("Failed to fetch timeline data");
        }
        const data = await response.json();
        setTimelineData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <TimelineHeader />

      {/* Container Box */}
      <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-6 md:p-8">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-400"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-12 text-red-500">
            Error: {error}
          </div>
        ) : timelineData.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No recent activity found.
          </div>
        ) : (
          <div className="space-y-2">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={item.id}
                title={item.title}
                subtitle={item.subtitle}
                time={item.time}
                icon={iconMap[item.iconName] || CheckSquare}
                type={item.type}
                isLast={index === timelineData.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}