"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    await login(email, password);
  }

  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="
        w-[380px] p-10 rounded-2xl
        bg-neutral-900/70
        backdrop-blur-xl
        shadow-[0_0_30px_#0ffff033]
        border border-neutral-800
      ">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.svg" className="w-44 opacity-90" />
          <h2 className="text-white text-xl font-semibold mt-4 tracking-wider">
            Sign In
          </h2>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-5">

          <input
            className="p-3 rounded bg-neutral-800 text-white border border-neutral-700 focus:border-[#0FFFF0] outline-none"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="p-3 rounded bg-neutral-800 text-white border border-neutral-700 focus:border-[#0FFFF0] outline-none"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button
            className="p-3 mt-2 rounded bg-[#0FFFF0] text-black font-bold hover:opacity-90 transition"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

