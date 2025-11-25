"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import ProtectedPage from "@/components/ProtectedPage";
import { useArtist } from "@/context/ArtistContext";
import SettingsPlatformInput from "@/components/SettingsPlatformInput";
import { saveArtistSettings } from "@/utils/api";
import artists from "@/data/artists";

export default function SettingsPage() {
  const { currentArtist, switchArtist } = useArtist();

  const [tokens, setTokens] = useState({
    tiktok: "",
    instagram: "",
    youtube: "",
    facebook: "",
    x: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // load existing settings
    const load = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_GATEWAY_URL}/artists/settings/${currentArtist.slug}`
      );
      const data = await res.json();
      if (data && data.tokens) {
        setTokens(data.tokens);
      }
    };
    load();
  }, [currentArtist.slug]);

  const save = async () => {
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
          style={{ color: currentArtist.color }}
        >
          Artist Settings
        </h1>

        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 mb-10">
          <h2 className="text-xl font-semibold mb-4">Change Artist</h2>
          <select
            className="p-3 bg-neutral-800 border border-neutral-700 rounded text-white"
            value={currentArtist.slug}
            onChange={(e) => switchArtist(e.target.value)}
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
            placeholder="Paste TikTok token"
            value={tokens.tiktok}
            onChange={(v) => setTokens({ ...tokens, tiktok: v })}
          />

          <SettingsPlatformInput
            label="Instagram Access Token"
            placeholder="Paste Instagram token"
            value={tokens.instagram}
            onChange={(v) => setTokens({ ...tokens, instagram: v })}
          />

          <SettingsPlatformInput
            label="YouTube API Key"
            placeholder="Paste YouTube API key"
            value={tokens.youtube}
            onChange={(v) => setTokens({ ...tokens, youtube: v })}
          />

          <SettingsPlatformInput
            label="Facebook Page Token"
            placeholder="Paste Facebook token"
            value={tokens.facebook}
            onChange={(v) => setTokens({ ...tokens, facebook: v })}
          />

          <SettingsPlatformInput
            label="X (Twitter) Token"
            placeholder="Paste X API token"
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
