"use client";

export default function ClipCard({ clip }) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4">
      <video
        src={clip.url}
        className="w-full rounded mb-3"
        controls
      />

      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-white">{clip.title}</h3>
          <p className="text-neutral-400 text-sm">{clip.duration}s</p>
        </div>

        <a
          href={`/clips/${clip.id}`}
          className="px-4 py-2 bg-white text-black rounded font-semibold hover:opacity-80 transition"
        >
          Open
        </a>
      </div>
    </div>
  );
}
