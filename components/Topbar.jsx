"use client";

import { useArtist } from "@/context/ArtistContext";
import ArtistSwitcher from "./ArtistSwitcher";
import { useAuth } from "@/context/AuthContext";

export default function Topbar() {
  const { currentArtist } = useArtist();
  const { logout } = useAuth();

  return (
    <header className="fixed left-60 right-0 top-0 h-16 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <img
          src={currentArtist.image}
          alt={currentArtist.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <h2 className="text-xl font-bold" style={{ color: currentArtist.color }}>
          {currentArtist.name}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <ArtistSwitcher />
        <button
          onClick={logout}
          className="text-sm text-white opacity-70 hover:opacity-100 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
