"use client";

export const dynamic = "force-dynamic";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import ProtectedPage from "@/components/ProtectedPage";
import { useArtist } from "@/context/ArtistContext";
import PublishPlatformCard from "@/components/PublishPlatformCard";
import { publishToPlatform } from "@/utils/api";

export default function PublishPage() {
  const { id } = useParams();
  const { currentArtist } = useArtist() || {};

  const [clip, setClip] = useState(null);
  const [statuses, setStatuses] = useState({});
  const [loading, setLoading] = useState(true);

  const platforms = ["tiktok", "instagram", "youtube", "facebook", "x"];

  useEffect(() => {
    if (!id) return;
    loadClip();
    loadStatuses();
  }, [id]);

  const loadClip = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_GATEWAY_URL}/clips/${id}`
      );
      const data = await res.json();
      setClip(data);
    } catch (err) {
      console.error("Failed to load clip", err);
    }
  };

  const loadStatuses = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_GATEWAY_URL}/publish/status/${id}`
      );
      const data = await res.json();
      setStatuses(data.statuses || {});
    } catch (err) {
      console.log("No status data");
    }
    setLoading(false);
  };

  const handlePublish = async (platform) => {
    if (!currentArtist?.slug) return;

    const result = await publishToPlatform(id, platform, currentArtist.slug);

    setStatuses((prev) => ({
      ...prev,
      [platform]: result.status,
    }));
  };

  const publishAll = async () => {
    for (const platform of platforms) {
      await handlePublish(platform);
    }
  };

  if (loading)
    return (
      <ProtectedPage>
        <div className="text-white p-8">Loading publish panel...</div>
      </ProtectedPage>
    );

  return (
    <ProtectedPage>
      <Sidebar />
      <Topbar />

      <main className="ml-60 mt-16 p-8 text-white">
        <h1
          className="text-4xl font-bold mb-6"
          style={{ color: currentArtist?.color || "white" }}
        >
          Publish Clip
        </h1>

        {clip && (
          <video
            src={clip.url}
            controls
            className="w-full rounded-xl border border-neutral-700 mb-8"
          />
        )}

        <button
          onClick={publishAll}
          className="px-6 py-3 bg-white text-black rounded font-semibold hover:opacity-80 transition mb-8"
        >
          Publish to ALL Platforms
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {platforms.map((p) => (
            <PublishPlatformCard
              key={p}
              platform={p}
              status={statuses[p]}
              onPublish={() => handlePublish(p)}
            />
          ))}
        </div>
      </main>
    </ProtectedPage>
  );
}
