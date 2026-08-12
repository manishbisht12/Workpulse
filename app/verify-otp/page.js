"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { KeyRound, ArrowRight, Zap } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!emailParam) {
      toast.error("Invalid session. Please signup again.");
      router.push("/signup");
    }
  }, [emailParam, router]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus next input field
    if (element.value !== "" && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");

    if (finalOtp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP code");
      return;
    }

    const loadingToast = toast.loading("Verifying OTP...");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailParam,
          otp: finalOtp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP Verification failed");
      }

      toast.success("Account verified successfully!", { id: loadingToast });
      router.push("/login");
    } catch (err) {
      console.error("Error verifying OTP:", err);
      toast.error(err.message || "Invalid OTP", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080d14] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0d131a] border border-cyan-900/40 rounded-2xl p-8 shadow-2xl shadow-cyan-950/30">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-3">
            <KeyRound size={24} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Verify OTP
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            We sent a verification code to <br />
            <span className="text-cyan-400 font-semibold">{emailParam}</span>
          </p>
        </div>

        {/* OTP Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-center gap-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
                className="w-11 h-12 text-center text-lg font-bold bg-[#111923] border border-cyan-900/30 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2.5 rounded-xl text-sm transition-all shadow-md shadow-cyan-500/20 disabled:opacity-50"
          >
            <span>Verify & Proceed</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="text-cyan-400 text-center py-20">Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}