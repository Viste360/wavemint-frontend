export const uploadVideo = async (video, audio = null, artist) => {
  const form = new FormData();
  form.append("video", video);
  if (audio) form.append("audio", audio);
  form.append("artist", artist);

  const res = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/upload`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) throw new Error("Upload failed.");
  return await res.json();
};
