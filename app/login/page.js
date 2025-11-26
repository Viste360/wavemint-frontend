"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      alert("Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center">
      
      {/* Logo */}
      <h1 className="text-5xl font-extrabold mb-10 tracking-tight">
        <span className="text-white/80">Wave</span>
        <span className="text-cyan-400">mint</span>
      </h1>

      <form
        onSubmit={submit}
        className="w-80 bg-neutral-900 p-8 rounded-xl shadow-xl border border-neutral-800"
      >
        <h2 className="text-xl font-semibold mb-6 text-white text-center">
          Sign In
        </h2>

        <label className="text-white/60 text-sm">Email</label>
        <input
          type="email"
          className="w-full mb-4 px-3 py-2 rounded bg-neutral-800 text-white border border-neutral-700"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-white/60 text-sm">Password</label>
        <input
          type="password"
          className="w-full mb-6 px-3 py-2 rounded bg-neutral-800 text-white border border-neutral-700"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
