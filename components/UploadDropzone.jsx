"use client";

import { useState } from "react";

export default function UploadDropzone({ onFilesSelected }) {
  const [videoPreview, setVideoPreview] = useState(null);
  const [audioName, setAudioName] = useState(null);

  const handleVideo = (file) => {
    setVideoPreview(URL.createObjectURL(file));
    onFilesSelected((prev) => ({ ...prev, video: file }));
  };

  const handleAudio = (file) => {
    setAudioName(file.name);
    onFilesSelected((prev) => ({ ...prev, audio: file }));
  };

  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 text-white">
      <h2 className="text-2xl mb-4 font-semibold">Upload Video</h2>

      <label className="block p-6 border border-neutral-600 rounded-xl cursor-pointer hover:bg-neutral-800 transition">
        <input
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => handleVideo(e.target.files[0])}
        />
        <p className="opacity-80">Click to upload a video or drag & drop</p>
      </label>

      {videoPreview && (
        <video
          src={videoPreview}
          controls
          className="w-full rounded-lg mt-4 border border-neutral-700"
        />
      )}

      <h3 className="text-xl font-semibold mt-8 mb-2">Optional Audio Overlay</h3>

      <label className="block p-4 border border-neutral-600 rounded-xl cursor-pointer hover:bg-neutral-800 transition">
        <input
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={(e) => handleAudio(e.target.files[0])}
        />
        <p className="opacity-80">
          {audioName ? `Selected: ${audioName}` : "Upload extra audio (optional)"}
        </p>
      </label>
    </div>
  );
}
