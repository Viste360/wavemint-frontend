"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔍 TEMPORARY DEBUG LINE → shows if env var is loaded correctly
  console.log("GW:", process.env.NEXT_PUBLIC_GATEWAY_URL);

  const submit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="h-screen w-full bg-black relative flex items-center justify-center">

      {/* Cinematic gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0fffee15,transparent_60%)]"></div>

      {/* Glow wave behind */}
      <div className="absolute top-20 w-full flex justify-center opacity-30">
        <img src="/logo.svg" className="w-[220px] blur-xl" />
      </div>

      {/* Login box */}
      <div className="relative p-10 rounded-2xl bg-neutral-900/70 backdrop-blur-xl
                      shadow-2xl border border-neutral-800 w-[380px] animate-fadeIn">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.svg" className="w-40" />

          <h2 className="text-white text-xl font-semibold mt-4 tracking-widest">
            Sign In
          </h2>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">

          <input
            className="p-3 rounded bg-neutral-800 text-white 
                       outline-none border border-neutral-700 
                       focus:border-[#00FFF0]"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="p-3 rounded bg-neutral-800 text-white 
                       outline-none border border-neutral-700
                       focus:border-[#00FFF0]"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="p-3 mt-4 rounded bg-[#00FFF0] text-black font-bold 
                       hover:opacity-90 transition"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}
