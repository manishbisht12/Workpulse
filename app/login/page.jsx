"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogIn, Mail, Lock, Zap } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Signing in...");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Account not verified — redirect to OTP page
      if (!response.ok && data.isVerified === false) {
        toast.error("Please verify your email first.", { id: loadingToast });
        router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and user info in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(`Welcome back, ${data.user.name}!`, { id: loadingToast });
      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message || "Failed to sign in", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    toast.error("Google Authentication is coming soon!");
  };

  return (
    <div className="min-h-screen bg-[#080d14] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0d131a] border border-cyan-900/40 rounded-2xl p-8 shadow-2xl shadow-cyan-950/30">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-3">
            <Zap size={24} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Enter your credentials to access <span className="text-cyan-400 font-semibold">WorkPulse</span>
          </p>
        </div>

        {/* Google Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-[#111923] hover:bg-[#182330] border border-cyan-900/40 text-slate-200 font-medium py-2.5 rounded-xl text-sm transition-all mb-6"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-cyan-900/30 w-full"></div>
          <span className="bg-[#0d131a] px-3 text-[10px] text-slate-500 uppercase tracking-wider font-semibold absolute">
            Or
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 text-slate-500" size={16} />
              <input
                type="email"
                required
                placeholder="alex@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#111923] border border-cyan-900/30 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-slate-400">
                Password
              </label>
              <a href="#" className="text-xs text-cyan-400 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 text-slate-500" size={16} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-[#111923] border border-cyan-900/30 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2.5 rounded-xl text-sm transition-all shadow-md shadow-cyan-500/20 mt-2 disabled:opacity-50"
          >
            <LogIn size={16} />
            Sign In
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-cyan-400 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}