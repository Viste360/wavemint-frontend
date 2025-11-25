"use client";

export default function ArtworkCard({ artwork }) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4">
      <img
        src={artwork.url}
        alt="Artwork"
        className="w-full rounded-lg border border-neutral-700"
      />
      <p className="text-neutral-400 text-sm mt-2">
        Generated at: {artwork.createdAt}
      </p>
    </div>
  );
}
