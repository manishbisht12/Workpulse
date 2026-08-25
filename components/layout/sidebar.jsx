"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  CheckSquare,
  Repeat,
  Target,
  Clock,
  BarChart2,
  Calendar,
  Activity,
  Image as ImageIcon,
  User,
  Settings,
  Moon,
  Zap
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Auth Check
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuGroups = [
    {
      title: "WORKSPACE",
      items: [
        { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
      ],
    },
    {
      title: "PRODUCTIVITY",
      items: [
        { name: "Tasks", href: "/tasks", icon: CheckSquare },
        { name: "Habits", href: "/habits", icon: Repeat },
        { name: "Goals", href: "/goals", icon: Target },
        { name: "Time Tracking", href: "/time-tracking", icon: Clock },
      ],
    },
    {
      title: "INSIGHTS",
      items: [
        { name: "Analytics", href: "/analytics", icon: BarChart2 },
        { name: "Calendar", href: "/calendar", icon: Calendar },
        { name: "Timeline", href: "/timeline", icon: Activity },
      ],
    },
    {
      title: "PERSONAL",
      items: [
        { name: "Photos", href: "/photos", icon: ImageIcon },
        { name: "Profile", href: "/profile", icon: User },
        { name: "Settings", href: "/settings", icon: Settings },
      ],
    },
  ];

  return (
    <aside 
      className={`sticky top-0 left-0 h-screen bg-[#0d131a] border-r border-cyan-900/30 text-slate-400 flex flex-col justify-between transition-all duration-300 ease-in-out select-none z-50 flex-shrink-0
        ${isCollapsed ? "w-16 sm:w-20" : "w-64"}`}
    >
      <div className="flex flex-col h-full justify-between relative">
        <div className="flex-1 overflow-y-auto scrollbar-none">
          <div className={`flex items-center px-3 py-5 border-b border-cyan-900/20 sticky top-0 bg-[#0d131a] z-10 ${isCollapsed ? "justify-center px-2" : "px-6"}`}>
  <button 
    onClick={() => setIsCollapsed(!isCollapsed)}
    className="flex items-center gap-3.5 min-w-0 hover:opacity-90 transition-opacity text-left focus:outline-none group"
  >
    {/* Premium Abstract Gradient Logo */}
    <div className="relative w-9 h-9 flex items-center justify-center flex-shrink-0">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 blur-sm opacity-40 group-hover:opacity-70 transition-opacity" />
      <div className="relative w-full h-full rounded-xl bg-[#080d14] border border-cyan-500/40 flex items-center justify-center shadow-lg">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M13 2L3 14H12L11 22L21 10H12L13 2Z" 
            fill="url(#cyan-gradient)" 
            stroke="#22d3ee" 
            strokeWidth="1" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <defs>
            <linearGradient id="cyan-gradient" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06b6d4" />
              <stop offset="1" stopColor="#2563eb" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>

    {!isCollapsed && (
      <span className="font-bold text-lg text-slate-100 tracking-wide truncate">
        WorkPulse
      </span>
    )}
  </button>
</div>

          <div className="px-2 sm:px-3 py-6 space-y-6">
            {menuGroups.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1.5">
                {!isCollapsed ? (
                  <h3 className="px-3 text-[10px] font-bold tracking-wider text-cyan-500/70 uppercase truncate">
                    {group.title}
                  </h3>
                ) : (
                  <div className="border-t border-cyan-900/20 my-2 mx-1" />
                )}
                
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                            isCollapsed ? "justify-center" : ""
                          } ${
                            isActive
                              ? "bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                              : "hover:bg-slate-800/40 hover:text-slate-200 text-slate-400"
                          }`}
                          title={isCollapsed ? item.name : undefined}
                        >
                          <Icon
                            size={18}
                            className={`${
                              isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"
                            } transition-colors flex-shrink-0`}
                          />
                          {!isCollapsed && <span className="truncate">{item.name}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 sm:p-4 border-t border-cyan-900/20 bg-[#0d131a]">
          <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800/40 hover:text-slate-200 transition-colors ${isCollapsed ? "justify-center" : ""}`}>
            <Moon size={18} className="text-slate-500 flex-shrink-0" />
            {!isCollapsed && <span className="truncate">Dark Mode</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}