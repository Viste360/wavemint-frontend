"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import ProtectedPage from "@/components/ProtectedPage";
import ClipCard from "@/components/ClipCard";
import { useArtist } from "@/context/ArtistContext";

export default function ClipsPage() {
  const { currentArtist } = useArtist();
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(true);

  // Prevent breaking before context loads
  useEffect(() => {
    if (!currentArtist) return;

    const loadClips = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_GATEWAY_URL}/clips?artist=${currentArtist.slug}`
        );
        const data = await res.json();
        setClips(data.clips || []);
      } catch (err) {
        console.error("Failed to load clips:", err);
      }
      setLoading(false);
    };

    loadClips();
  }, [currentArtist?.slug]);

  if (!currentArtist) return null;

  return (
    <ProtectedPage>
      <Sidebar />
      <Topbar />

      <main className="ml-60 mt-16 p-8 text-white">
        <h1
          className="text-4xl font-bold mb-6"
          style={{ color: currentArtist.color }}
        >
          Sliced Clips
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : clips.length === 0 ? (
          <p className="opacity-70">No clips found yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {clips.map((clip) => (
              <ClipCard key={clip.id} clip={clip} />
            ))}
          </div>
        )}
      </main>
    </ProtectedPage>
  );
}
