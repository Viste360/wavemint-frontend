"use client";

import Link from "next/link";
import { useArtist } from "@/context/ArtistContext";
import artists from "@/data/artists";

export default function Sidebar() {
  const { currentArtist } = useArtist();

  return (
    <div className="fixed left-0 top-0 h-full w-60 bg-neutral-950 border-r border-neutral-800 p-6 flex flex-col">
      <h1 className="text-3xl font-bold mb-8">
        <span style={{ color: currentArtist.color }}>W</span>avemint
      </h1>

      <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className="nav-link">Dashboard</Link>
        <Link href="/upload" className="nav-link">Upload</Link>
        <Link href="/clips" className="nav-link">Clips</Link>
        <Link href="/artwork" className="nav-link">Artwork</Link>
        <Link href="/publish" className="nav-link">Publish</Link>
        <Link href="/settings" className="nav-link">Settings</Link>
      </nav>

      <div className="mt-auto pt-6 border-t border-neutral-800">
        <p className="text-neutral-400 text-xs mb-2">Active Artist</p>
        <div className="flex items-center gap-3">
          <img
            src={currentArtist.image}
            alt={currentArtist.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">{currentArtist.name}</span>
        </div>
      </div>

      <style jsx>{`
        .nav-link {
          padding: 8px 4px;
          color: #fff;
          font-weight: 500;
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }
        .nav-link:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
