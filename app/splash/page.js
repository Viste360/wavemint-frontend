"use client";

import { useEffect, useState } from "react";

export default function Splash() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (done) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex flex-col items-center gap-6">
        <svg width="300" height="80" viewBox="0 0 350 80">
          <path d="M5 40 Q25 10 45 40 T85 40 T125 40 T165 40 T205 40"
                stroke="#0FFFF0" strokeWidth="4" fill="none"
                strokeLinecap="round" strokeLinejoin="round">
            <animate attributeName="stroke-opacity"
                     values="0.1;1;0.1"
                     dur="2s"
                     repeatCount="indefinite" />
          </path>
        </svg>

        <h1 className="text-white text-4xl font-bold tracking-widest"
            style={{ animation: "fadeIn 1.2s ease forwards" }}>
          WAVEMINT
        </h1>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
