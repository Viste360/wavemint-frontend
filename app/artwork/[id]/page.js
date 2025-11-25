"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import ProtectedPage from "@/components/ProtectedPage";
import { useArtist } from "@/context/ArtistContext";
import ArtworkCard from "@/components/ArtworkCard";
import { generateArtwork } from "@/utils/api";

export default function ArtworkPage() {
  const { id } = useParams();
  const { currentArtist } = useArtist();

  const [clip, setClip] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadClip();
    loadArtwork();
  }, []);

  const loadClip = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/clips/${id}`);
    const data = await res.json();
    setClip(data);
  };

  const loadArtwork = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/artwork/${id}`);
      const data = await res.json();
      setArtworks(data.artworks || []);
    } catch (err) {
      console.log("No artwork yet");
    }
    setLoading(false);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    const data = await generateArtwork(id, currentArtist.slug);
    setArtworks((prev) => [...prev, data]);
    setGenerating(false);
  };

  if (loading)
    return (
      <ProtectedPage>
        <div className="p-8 text-white">Loading artwork...</div>
      </ProtectedPage>
    );

  return (
    <ProtectedPage>
      <Sidebar />
      <Topbar />

      <main className="ml-60 mt-16 p-8 text-white">
        <h1
          className="text-4xl font-bold mb-6"
          style={{ color: currentArtist.color }}
        >
          Artwork Generator
        </h1>

        {clip && (
          <video
            src={clip.url}
            controls
            className="w-full rounded-xl mb-8 border border-neutral-700"
          />
        )}

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="px-6 py-3 rounded bg-white text-black font-semibold hover:opacity-80 transition"
        >
          {generating ? "Generating..." : "Generate New Artwork"}
        </button>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {artworks.length > 0 ? (
            artworks.map((a, index) => <ArtworkCard key={index} artwork={a} />)
          ) : (
            <p className="opacity-70">No artwork generated yet.</p>
          )}
        </div>
      </main>
    </ProtectedPage>
  );
}
