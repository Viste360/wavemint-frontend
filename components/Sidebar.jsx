"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useArtist } from "@/context/ArtistContext";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { currentArtist } = useArtist();
  const { role } = useAuth();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/upload", label: "Upload" },
    { href: "/clips", label: "Clips" },
    { href: "/artwork", label: "Artwork" },
    { href: "/publish", label: "Publish" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-60 bg-neutral-950 border-r border-neutral-800 p-6 flex flex-col">

      {/* Brand */}
      <div className="flex items-center gap-3 mb-10">
        <img src="/logo-icon.svg" className="w-10 drop-shadow-[0_0_10px_#0ffff055]" />
        <h1 className="text-2xl font-bold tracking-wider">
          <span style={{ color: currentArtist?.color }}>W</span>avemint
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {links.map(({ href, label }) => {
          const active = pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 rounded-md font-medium transition
                ${active
                  ? "bg-neutral-800 text-white shadow-inner"
                  : "text-neutral-300 hover:text-white"}
              `}
              style={active ? { borderLeft: `3px solid ${currentArtist?.color}` } : {}}
            >
              {label}
            </Link>
          );
        })}

        {/* Admin badge */}
        {role === "admin" && (
          <div className="mt-5 pt-5 border-t border-neutral-800">
            <Link
              href="/admin"
              className={`px-3 py-2 rounded-md font-medium transition
                ${pathname.startsWith("/admin")
                  ? "bg-red-600 text-white"
                  : "text-red-400 hover:text-red-300"}
              `}
            >
              Admin Panel
            </Link>
          </div>
        )}
      </nav>

      {/* Footer: Artist */}
      <div className="mt-auto pt-6 border-t border-neutral-800">
        <p className="text-neutral-500 text-xs mb-2">Active Artist</p>

        <div className="flex items-center gap-3">
          <img
            src={currentArtist.image}
            alt={currentArtist.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">{currentArtist.name}</span>
        </div>
      </div>

    </div>
  );
}
