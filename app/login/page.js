"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-black text-white">
      <form
        onSubmit={submit}
        className="bg-zinc-900 p-10 rounded-2xl w-full max-w-sm shadow-xl"
      >
        <h1 className="text-3xl font-bold mb-6">Sign In</h1>

        <label className="block mb-4">
          <span className="opacity-70">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 p-3 rounded bg-zinc-800 border border-zinc-700"
            required
          />
        </label>

        <label className="block mb-6">
          <span className="opacity-70">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 p-3 rounded bg-zinc-800 border border-zinc-700"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full py-3 rounded bg-white text-black font-semibold hover:opacity-80 transition"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </main>
  );
}

