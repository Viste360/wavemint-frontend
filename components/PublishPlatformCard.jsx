"use client";

export default function PublishPlatformCard({ platform, status, onPublish }) {
  const colors = {
    tiktok: "#fe2c55",
    instagram: "#e1306c",
    youtube: "#ff0000",
    facebook: "#1877f2",
    x: "#ffffff",
  };

  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-white flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: colors[platform] }}
          ></span>
          {platform.toUpperCase()}
        </h3>

        <p className="text-neutral-400 text-sm mt-1">
          Status:{" "}
          <span className="text-white">
            {status ? status : "Not published"}
          </span>
        </p>
      </div>

      <button
        onClick={onPublish}
        className="px-4 py-2 bg-white text-black rounded font-semibold hover:opacity-80 transition"
      >
        Publish
      </button>
    </div>
  );
}
