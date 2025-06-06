"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate phone number: must be 11 digits and numeric
    if (!/^\d{11}$/.test(phone)) {
      setError("Phone number must be exactly 11 digits.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://web-production-d7d37.up.railway.app/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, phone_number: phone }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || "Failed to register user");
        setIsLoading(false);
        return;
      }

      router.push("/auth/login");
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-indigo-300 to-pink-400">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl px-10 py-12 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-indigo-800 mb-8">
          Sign Up
        </h1>
        <form onSubmit={handleRegister} className="w-full space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-indigo-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-3 text-base border-b border-indigo-200 focus:border-pink-400 focus:outline-none bg-transparent placeholder-indigo-300 transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-indigo-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 text-base border-b border-indigo-200 focus:border-pink-400 focus:outline-none bg-transparent placeholder-indigo-300 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a password"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-indigo-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              className="w-full px-4 py-3 text-base border-b border-indigo-200 focus:border-pink-400 focus:outline-none bg-transparent placeholder-indigo-300 transition"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/, ""))}
              required
              placeholder="11-digit phone number"
              maxLength={11}
              pattern="\d{11}"
              inputMode="numeric"
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-2 rounded-full font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <div className="mt-8 text-indigo-400 text-sm text-center w-full">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-pink-500 font-bold hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
