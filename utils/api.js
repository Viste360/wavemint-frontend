export const generateCaptions = async (clipId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GATEWAY_URL}/captions/generate`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clipId }),
    }
  );

  if (!res.ok) throw new Error("Caption generation failed.");
  return await res.json();
};

export const getCaptions = async (clipId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GATEWAY_URL}/captions/${clipId}`
  );
  if (!res.ok) return null;
  return await res.json();
};
export const generateArtwork = async (clipId, artist) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GATEWAY_URL}/artwork/generate`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clipId, artist }),
    }
  );

  if (!res.ok) throw new Error("Artwork generation failed.");
  return await res.json();
};
export const publishToPlatform = async (clipId, platform, artist) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GATEWAY_URL}/publish/${platform}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clipId, artist }),
    }
  );

  if (!res.ok) throw new Error("Publishing failed.");
  return await res.json();
};
export const saveArtistSettings = async (artist, settings) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GATEWAY_URL}/artists/settings`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artist, ...settings }),
    }
  );

  if (!res.ok) throw new Error("Unable to save artist settings.");
  return await res.json();
};

