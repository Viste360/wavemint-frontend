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
    <div className="fixed left-0 top-0 h-full w-60 
                    bg-neutral-950 border-r border-neutral-800 p-6 
                    flex flex-col shadow-xl">

      {/* Neon Brand */}
      <div className="flex items-center gap-2 mb-10">
        <img src="/logo.svg" className="w-32 opacity-90" />
      </div>

      <nav className="flex flex-col gap-2">
        {links.map(({ href, label }) => {
          const active = pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 rounded-md font-medium transition
                ${active 
                  ? "bg-neutral-800 text-white border-l-4 border-[#00FFF0]" 
                  : "text-neutral-400 hover:text-white"}
              `}
            >
              {label}
            </Link>
          );
        })}

        {role === "admin" && (
          <div className="mt-4 pt-4 border-t border-neutral-800">
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

      {/* Artist Info */}
      <div className="mt-auto pt-6 border-t border-neutral-800">
        <p className="text-neutral-400 text-xs mb-2">Active Artist</p>

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
