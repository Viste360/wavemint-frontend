"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="p-10 rounded-2xl bg-neutral-900/60 backdrop-blur-xl shadow-2xl border border-neutral-800 w-[360px]">
        
        <div className="flex flex-col items-center mb-8">
          <svg width="160" height="45" viewBox="0 0 350 80">
            <path d="M5 40 Q25 10 45 40 T85 40 T125 40 T165 40 T205 40"
                  stroke="#0FFFF0" strokeWidth="4" fill="none"
                  strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="stroke-opacity"
                       values="0.1;1;0.1"
                       dur="2s"
                       repeatCount="indefinite" />
            </path>
          </svg>
          <h2 className="text-white text-xl font-semibold mt-2 tracking-widest">
            Sign In
          </h2>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            className="p-3 rounded bg-neutral-800 text-white outline-none border border-neutral-700 focus:border-[#0FFFF0]"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="p-3 rounded bg-neutral-800 text-white outline-none border border-neutral-700 focus:border-[#0FFFF0]"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button
            className="p-3 mt-4 rounded bg-[#0FFFF0] text-black font-bold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}

