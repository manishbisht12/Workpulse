"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";

export default function EditProfileModal({ isOpen, onClose, onSave, initialData }) {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setEmail(initialData.email || "");
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSubmitting(true);
    
    try {
      const res = await apiFetch("/api/auth/profile", {
        method: "PUT",
        body: JSON.stringify({ name: name.trim(), email: email.trim() })
      });
      
      if (res?.user) {
        toast.success("Profile updated successfully!");
        onSave(res.user);
        onClose();
      }
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0b0f17] border border-[#1e293b]/70 rounded-2xl w-full max-w-md p-6 space-y-6 shadow-2xl relative text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1e293b]/60">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00c8ec] shadow-[0_0_8px_#00c8ec]" />
            <h2 className="text-xl font-bold tracking-tight text-white">Edit Profile</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#111827] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Full Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0d131d] border border-[#1e293b] rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#00c8ec]/80 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Email Address <span className="text-rose-400">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="e.g. john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0d131d] border border-[#1e293b] rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#00c8ec]/80 transition-colors"
            />
          </div>

          <div className="pt-4 border-t border-[#1e293b]/60 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="text-slate-300 hover:text-white font-semibold text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-[#00c8ec] hover:bg-[#00b4d8] text-black font-bold text-sm shadow-[0_0_15px_rgba(0,200,236,0.3)] transition-all disabled:opacity-50"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
