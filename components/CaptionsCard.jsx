"use client";

export default function CaptionsCard({ caption }) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 p-4 rounded-xl">
      <h3 className="text-white font-semibold">{caption.text}</h3>
      <p className="text-neutral-400 text-sm mt-1">
        {caption.start} → {caption.end}
      </p>
    </div>
  );
}
