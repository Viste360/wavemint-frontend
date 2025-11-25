"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <form
        onSubmit={submit}
        className="bg-neutral-900 p-8 rounded-xl w-full max-w-md shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-4 text-white text-center">
          Wavemint Login
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <label className="block mb-3 text-white">
          Email
          <input
            type="email"
            className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700 mt-1"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="block mb-3 text-white">
          Password
          <input
            type="password"
            className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700 mt-1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-white text-black font-semibold mt-4 hover:opacity-80 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
