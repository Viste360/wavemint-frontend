"use client";

export default function SettingsPlatformInput({
  label,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="mb-6">
      <label className="block text-white mb-1">{label}</label>
      <input
        className="w-full p-3 rounded bg-neutral-800 text-white border border-neutral-700"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
