"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import ProtectedPage from "@/components/ProtectedPage";
import { useArtist } from "@/context/ArtistContext";

export default function ClipDetails() {
  const { id } = useParams();
  const { currentArtist } = useArtist();

  const [clip, setClip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClip = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_GATEWAY_URL}/clips/${id}`
        );
        const data = await res.json();
        setClip(data);
      } catch (error) {
        console.error("Failed to load clip:", error);
      }
      setLoading(false);
    };

    loadClip();
  }, [id]);

  if (loading) {
    return <div className="text-white p-8">Loading clip...</div>;
  }

  if (!clip) {
    return <div className="text-red-400 p-8">Clip not found.</div>;
  }

  return (
    <ProtectedPage>
      <Sidebar />
      <Topbar />

      <main className="ml-60 mt-16 p-8 text-white">
        <h1
          className="text-4xl font-bold mb-6"
          style={{ color: currentArtist.color }}
        >
          {clip.title}
        </h1>

        <video
          src={clip.url}
          controls
          className="w-full rounded-xl border border-neutral-700 mb-6"
        />

        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
          <h2 className="text-2xl font-semibold mb-4">Clip Info</h2>

          <p className="opacity-70 mb-2">Duration: {clip.duration}s</p>
          <p className="opacity-70 mb-2">Artist: {clip.artist}</p>
          <p className="opacity-70 mb-2">Created: {clip.createdAt}</p>
        </div>

        <div className="flex gap-4 mt-6">
          <a
            href={`/captions/${clip.id}`}
            className="px-6 py-3 bg-white text-black rounded font-semibold hover:opacity-80 transition"
          >
            Generate Captions
          </a>

          <a
            href={`/artwork/${clip.id}`}
            className="px-6 py-3 bg-white text-black rounded font-semibold hover:opacity-80 transition"
          >
            Generate Artwork
          </a>

          <a
            href={`/publish/${clip.id}`}
            className="px-6 py-3 bg-white text-black rounded font-semibold hover:opacity-80 transition"
          >
            Publish Clip
          </a>
        </div>
      </main>
    </ProtectedPage>
  );
}
