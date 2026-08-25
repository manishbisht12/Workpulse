"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, Star, Sparkles } from "lucide-react";
import { apiFetch } from "@/lib/api";
import EditProfileModal from "./EditProfileModal";

export default function ProfileCard() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "Loading...",
    email: "loading...",
    initials: ""
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiFetch("/api/auth/me");
        if (res?.user) {
          const user = res.user;
          const nameParts = user.name.trim().split(" ");
          const initials = nameParts.length > 1 
            ? nameParts[0][0] + nameParts[nameParts.length - 1][0]
            : user.name.substring(0, 2);
          
          setProfileData({
            name: user.name,
            email: user.email,
            initials: initials.toUpperCase()
          });
        }
      } catch (error) {
        console.error("Failed to fetch user profile", error);
        // Fallback or handle error
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSaveProfile = (data) => {
    // Generate initials from new name
    const nameParts = data.name.trim().split(" ");
    const initials = nameParts.length > 1 
      ? nameParts[0][0] + nameParts[nameParts.length - 1][0]
      : data.name.substring(0, 2);
      
    setProfileData({ ...data, initials: initials.toUpperCase() });
  };

  return (
    <div className="bg-[#0d131a] border border-cyan-900/30 rounded-2xl p-6 flex flex-col items-center text-center space-y-6">
      {/* Avatar Container */}
      <div className="relative">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-cyan-600 to-teal-400 flex items-center justify-center text-slate-900 font-extrabold text-2xl shadow-lg shadow-cyan-500/10">
          {loading ? (
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900" />
          ) : profileData.initials}
        </div>
        <div className="absolute -bottom-1 -right-1 bg-[#0d131a] p-1 rounded-full">
          <CheckCircle className="w-5 h-5 text-teal-400 fill-teal-400/20" />
        </div>
      </div>

      {/* User Info */}
      <div className="space-y-1">
        {loading ? (
          <>
            <div className="h-6 w-32 bg-slate-800 rounded mx-auto mb-1 animate-pulse" />
            <div className="h-4 w-40 bg-slate-800 rounded mx-auto animate-pulse" />
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-slate-100">{profileData.name}</h2>
            <p className="text-xs text-slate-400">{profileData.email}</p>
          </>
        )}
        <p className="text-[11px] text-slate-500 font-medium">
          Pro Plan · Member since Jan 2026
        </p>

        {/* Rating Stars */}
        <div className="flex items-center justify-center gap-1 pt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
          ))}
          <span className="text-xs font-bold text-slate-300 ml-1">4.9</span>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-2 w-full pt-4 border-t border-cyan-900/20">
        <div>
          <h3 className="text-lg font-bold text-slate-100">347</h3>
          <p className="text-[10px] text-slate-400 font-medium">Tasks</p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-100">79%</h3>
          <p className="text-[10px] text-slate-400 font-medium">Habits</p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-100">14d</h3>
          <p className="text-[10px] text-slate-400 font-medium">Streak</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-2.5 pt-2">
        <button 
          onClick={() => setIsEditModalOpen(true)}
          className="w-full py-2.5 px-4 rounded-xl bg-[#111923] hover:bg-cyan-950/40 border border-cyan-900/40 text-slate-200 text-xs font-semibold transition-all"
        >
          Edit Profile
        </button>

        <button className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600/20 to-teal-600/20 hover:from-cyan-600/30 hover:to-teal-600/30 border border-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center justify-center gap-2 transition-all">
          <Sparkles size={14} className="text-cyan-400" />
          <span>Pro Plan Active</span>
        </button>
      </div>

      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        onSave={handleSaveProfile}
        initialData={profileData}
      />
    </div>
  );
}