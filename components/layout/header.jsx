"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

// Map routes → { group, label }
const BREADCRUMB_MAP = {
  "/dashboard":     { group: "Workspace",   label: "Dashboard" },
  "/tasks":         { group: "Productivity", label: "Tasks" },
  "/habits":        { group: "Productivity", label: "Habits" },
  "/goals":         { group: "Productivity", label: "Goals" },
  "/time-tracking": { group: "Productivity", label: "Time Tracking" },
  "/analytics":     { group: "Insights",    label: "Analytics" },
  "/calendar":      { group: "Insights",    label: "Calendar" },
  "/timeline":      { group: "Insights",    label: "Timeline" },
  "/photos":        { group: "Personal",    label: "Photos" },
  "/profile":       { group: "Personal",    label: "Profile" },
  "/settings":      { group: "Personal",    label: "Settings" },
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState({ name: "User", email: "", initials: "U" });

  const crumb = BREADCRUMB_MAP[pathname] ?? { group: "Workspace", label: "Dashboard" };

  // 1. Fetch Logged-in User Data from LocalStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const fullName = parsedUser.name || parsedUser.username || "User";

        // Generate Initials (e.g. Manish Bisht -> MB)
        const initials = fullName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2) || "U";

        setUser({
          name: fullName,
          email: parsedUser.email || "Pro Plan",
          initials,
        });
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
  }, []);

  // 2. Close dropdown on clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3. Handle Logout Action
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  return (
    <header className="h-16 border-b border-cyan-900/20 px-4 sm:px-6 md:px-8 flex items-center justify-between bg-[#0d131a]/80 backdrop-blur-md w-full sticky top-0 z-30">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold tracking-wider text-slate-500 uppercase min-w-0">
        <span className="hidden sm:inline hover:text-slate-300 transition-colors cursor-pointer">{crumb.group}</span>
        <span className="text-slate-700 hidden sm:inline">/</span>
        <span className="text-cyan-400 truncate">{crumb.label}</span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
        {/* Notifications Button */}
        <button className="relative p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 transition-all duration-200">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full ring-2 ring-[#0d131a] shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
        </button>

        {/* User Profile & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-cyan-900/30 hover:opacity-90 transition-opacity text-left group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-xs font-bold text-slate-950 shadow-md shadow-cyan-500/20 flex-shrink-0">
              {user.initials}
            </div>

            <div className="hidden md:block">
              <p className="text-xs font-semibold text-slate-200 group-hover:text-slate-100 transition-colors truncate max-w-[120px]">
                {user.name}
              </p>
              <p className="text-[10px] text-cyan-500/80 font-medium truncate max-w-[120px]">
                {user.email}
              </p>
            </div>

            <ChevronDown
              size={14}
              className={`text-slate-500 group-hover:text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                isDropdownOpen ? "rotate-180 text-cyan-400" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 rounded-xl bg-[#111923] border border-cyan-900/30 shadow-2xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150 z-50">
              {/* Profile Option */}
              <Link
                href="/profile"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
              >
                <User size={15} className="text-cyan-400" />
                View Profile
              </Link>

              <hr className="border-slate-800 my-1" />

              {/* Logout Option */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors text-left"
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}