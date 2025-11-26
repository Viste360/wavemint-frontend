// utils/api.js

// ---------------- CAPTIONS ----------------
export const generateCaptions = async (clipId) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/captions/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clipId }),
  });

  if (!res.ok) throw new Error("Caption generation failed.");
  return await res.json();
};

export const getCaptions = async (clipId) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/captions/${clipId}`);
  if (!res.ok) return null;
  return await res.json();
};


// ---------------- ARTWORK ----------------
export const generateArtwork = async (clipId, artist) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/artwork/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clipId, artist }),
  });

  if (!res.ok) throw new Error("Artwork generation failed.");
  return await res.json();
};


// ---------------- PUBLISHING ----------------
export const publishToPlatform = async (clipId, platform, artist) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/publish/${platform}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clipId, artist }),
  });

  if (!res.ok) throw new Error("Publishing failed.");
  return await res.json();
};


// ---------------- ARTIST SETTINGS ----------------
export const saveArtistSettings = async (artist, settings) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/artists/settings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ artist, ...settings }),
  });

  if (!res.ok) throw new Error("Unable to save artist settings.");
  return await res.json();
};


// ---------------- VIDEO UPLOAD ----------------
export const uploadVideo = async (formData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/upload`, {
    method: "POST",
    body: formData, // IMPORTANT: no headers
  });

  if (!res.ok) throw new Error("Video upload failed.");
  return await res.json();
};
