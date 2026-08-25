// Centralised API helper — all fetch calls go through this
// Usage: import { apiFetch } from "@/lib/api"

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

/** Returns auth headers with Bearer token from localStorage */
export const getAuthHeaders = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Thin fetch wrapper that:
 *  - Prepends BASE_URL automatically
 *  - Attaches auth headers by default
 *  - Throws a descriptive error on non-OK responses
 *
 * @param {string} path  - e.g. "/api/dashboard"
 * @param {RequestInit} options - standard fetch options (method, body, etc.)
 */
export const apiFetch = async (path, options = {}) => {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    if (res.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    const msg =
      data?.message || data?.error || `Request failed with status ${res.status}`;
    throw new Error(msg);
  }

  return data;
};

export { BASE_URL };
