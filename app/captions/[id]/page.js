"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProtectedPage from "@/components/ProtectedPage";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import CaptionsCard from "@/components/CaptionsCard";
import { generateCaptions, getCaptions } from "@/utils/api";
import { useArtist } from "@/context/ArtistContext";

export default function CaptionsPage() {
  const { id } = useParams();
  const { currentArtist } = useArtist();

  const [clip, setClip] = useState(null);
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadClip();
    loadCaptionData();
  }, [id]);

  const loadClip = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_GATEWAY_URL}/clips/${id}`
    );
    const data = await res.json();
    setClip(data);
  };

  const loadCaptionData = async () => {
    try {
      const data = await getCaptions(id);
      if (data && data.captions) setCaptions(data.captions);
    } catch (err) {
      console.log("No captions yet.");
    }
    setLoading(false);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    const result = await generateCaptions(id);
    setCaptions(result.captions);
    setGenerating(false);
  };

  if (loading)
    return (
      <ProtectedPage>
        <div className="text-white p-8">Loading...</div>
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
          Captions for Clip
        </h1>

        <video
          src={clip.url}
          controls
          className="w-full rounded-xl border border-neutral-700 mb-6"
        />

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="px-6 py-3 bg-white text-black rounded font-semibold hover:opacity-80 transition"
        >
          {generating ? "Generating..." : "Generate Captions"}
        </button>

        <div className="mt-8 space-y-4">
          {captions.length > 0 ? (
            captions.map((cap, idx) => (
              <CaptionsCard key={idx} caption={cap} />
            ))
          ) : (
            <p className="opacity-70">No captions yet.</p>
          )}
        </div>
      </main>
    </ProtectedPage>
  );
}
