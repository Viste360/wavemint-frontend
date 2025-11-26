"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import ProtectedPage from "@/components/ProtectedPage";
import UploadDropzone from "@/components/UploadDropzone";
import { useArtist } from "@/context/ArtistContext";
import { uploadVideo } from "@/utils/api";

export default function UploadPage() {
  const { currentArtist } = useArtist() || {};
  const [files, setFiles] = useState({ video: null, audio: null });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const submit = async () => {
    if (!files.video) {
      alert("Please upload a video.");
      return;
    }

    if (!currentArtist?.slug) {
      alert("Artist not ready.");
      return;
    }

    setLoading(true);
    setStatus("Uploading...");

    try {
      // 🔥 Build FormData correctly
      const formData = new FormData();
      formData.append("video", files.video);
      if (files.audio) formData.append("audio", files.audio);
      formData.append("artist", currentArtist.slug);

      const res = await uploadVideo(formData);

      setStatus("Processing...");
      console.log("Upload success:", res);

      // Later: router.push(`/clips/${res.jobId}`);

    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }

    setLoading(false);
  };

  return (
    <ProtectedPage>
      <Sidebar />
      <Topbar />

      <main className="ml-60 mt-16 p-8 text-white">
        <h1
          className="text-4xl font-bold mb-6"
          style={{ color: currentArtist?.color || "white" }}
        >
          Upload Video
        </h1>

        <UploadDropzone onFilesSelected={setFiles} />

        <button
          onClick={submit}
          disabled={loading}
          className="mt-8 px-6 py-3 rounded bg-white text-black font-semibold hover:opacity-80 transition"
        >
          {loading ? status : "Upload"}
        </button>
      </main>
    </ProtectedPage>
  );
}
