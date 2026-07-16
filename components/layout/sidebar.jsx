"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  CheckSquare,
  Repeat,
  Target,
  Clock,
  BarChart2,
  Calendar,
  Activity,
  Image,
  User,
  Settings,
  Moon,
  ChevronLeft,
  Zap
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

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
        { name: "Photos", href: "/photos", icon: Image },
        { name: "Profile", href: "/profile", icon: User },
        { name: "Settings", href: "/settings", icon: Settings },
      ],
    },
  ];

  return (
    // STEP 1: Main aside se 'overflow-y-auto' remove kiya taaki main container khud scroll na ho.
    <aside className="w-64 h-screen bg-[#09090e] border-r border-gray-800/40 text-gray-400 flex flex-col justify-between select-none">
      
      {/* STEP 2: Upper Section me 'flex-1 overflow-y-auto' add kiya. 
          Ab sirf ye navigation links wala section hi upar-niche scroll hoga! */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800">
        {/* Logo / Brand Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800/30 sticky top-0 bg-[#09090e] z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]">
              <Zap size={16} fill="white" />
            </div>
            <span className="font-bold text-lg text-white tracking-wide">WorkPulse</span>
          </div>
          <button className="text-gray-500 hover:text-white transition-colors">
            <ChevronLeft size={18} />
          </button>
        </div>
        
        {/* Navigation Groups */}
        <div className="px-4 py-6 space-y-6">
          {menuGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1.5">
              <h3 className="px-3 text-[10px] font-bold tracking-wider text-gray-600 uppercase">
                {group.title}
              </h3>
              
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                          isActive
                            ? "bg-violet-950/40 border border-violet-800/30 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                            : "hover:bg-gray-800/20 hover:text-gray-200"
                        }`}
                      >
                        <Icon
                          size={18}
                          className={`${
                            isActive ? "text-violet-400" : "text-gray-500 group-hover:text-gray-300"
                          } transition-colors`}
                        />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 3: Dark Mode toggle ab layout ke bottom me static fixed rahega.
          Ye scroll area se bahar hai, isliye iska position freeze ho chuka hai. */}
      <div className="p-4 border-t border-gray-800/30 bg-[#09090e]">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800/20 hover:text-gray-200 transition-colors">
          <Moon size={18} className="text-gray-500" />
          <span>Dark Mode</span>
        </button>
      </div>
    </aside>
  );
}