"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import ProtectedPage from "@/components/ProtectedPage";
import { useArtist } from "@/context/ArtistContext";
import SettingsPlatformInput from "@/components/SettingsPlatformInput";
import { saveArtistSettings } from "@/utils/api";
import artists from "@/data/artists";

export default function SettingsPage() {
  const { currentArtist, switchArtist } = useArtist() || {};

  const [tokens, setTokens] = useState({
    tiktok: "",
    instagram: "",
    youtube: "",
    facebook: "",
    x: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!currentArtist?.slug) return;

    const load = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_GATEWAY_URL}/artists/settings/${currentArtist.slug}`
        );
        const data = await res.json();
        if (data?.tokens) setTokens(data.tokens);
      } catch (err) {
        console.error("Error loading settings", err);
      }
    };

    load();
  }, [currentArtist?.slug]);

  const save = async () => {
    if (!currentArtist?.slug) return;

    setSaving(true);
    await saveArtistSettings(currentArtist.slug, { tokens });
    setSaving(false);
  };

  return (
    <ProtectedPage>
      <Sidebar />
      <Topbar />

      <main className="ml-60 mt-16 p-10 text-white">
        <h1
          className="text-4xl font-bold mb-8"
          style={{ color: currentArtist?.color || "white" }}
        >
          Artist Settings
        </h1>

        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 mb-10">
          <h2 className="text-xl font-semibold mb-4">Change Artist</h2>

          <select
            className="p-3 bg-neutral-800 border border-neutral-700 rounded text-white"
            value={currentArtist?.slug || ""}
            onChange={(e) => switchArtist?.(e.target.value)}
          >
            {artists.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-700">
          <h2 className="text-2xl font-semibold mb-6">Platform Tokens</h2>

          <SettingsPlatformInput
            label="TikTok Access Token"
            value={tokens.tiktok}
            onChange={(v) => setTokens({ ...tokens, tiktok: v })}
          />

          <SettingsPlatformInput
            label="Instagram Access Token"
            value={tokens.instagram}
            onChange={(v) => setTokens({ ...tokens, instagram: v })}
          />

          <SettingsPlatformInput
            label="YouTube API Key"
            value={tokens.youtube}
            onChange={(v) => setTokens({ ...tokens, youtube: v })}
          />

          <SettingsPlatformInput
            label="Facebook Page Token"
            value={tokens.facebook}
            onChange={(v) => setTokens({ ...tokens, facebook: v })}
          />

          <SettingsPlatformInput
            label="X (Twitter) Token"
            value={tokens.x}
            onChange={(v) => setTokens({ ...tokens, x: v })}
          />

          <button
            onClick={save}
            disabled={saving}
            className="px-6 py-3 bg-white text-black rounded font-semibold hover:opacity-80 transition mt-6"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </main>
    </ProtectedPage>
  );
}
