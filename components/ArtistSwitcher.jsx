"use client";

import artists from "@/data/artists";
import { useArtist } from "@/context/ArtistContext";
import { useState } from "react";

export default function ArtistSwitcher() {
  const { currentArtist, switchArtist } = useArtist();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 rounded bg-neutral-800 text-white text-sm hover:bg-neutral-700 transition"
      >
        Switch Artist
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-neutral-900 border border-neutral-700 rounded shadow-xl z-50">
          {artists.map((artist) => (
            <button
              key={artist.slug}
              className="flex items-center gap-3 p-3 w-full hover:bg-neutral-800 transition"
              onClick={() => {
                switchArtist(artist.slug);
                setOpen(false);
              }}
            >
              <img
                src={artist.image}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span>{artist.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
