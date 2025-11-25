"use client";

import ProtectedPage from "@/components/ProtectedPage";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { useArtist } from "@/context/ArtistContext";

export default function Dashboard() {
  const { currentArtist } = useArtist();

  return (
    <ProtectedPage>
      <Sidebar />
      <Topbar />

      <main className="ml-60 mt-16 p-8 text-white">
        <h1
          className="text-4xl font-bold mb-4"
          style={{ color: currentArtist.color }}
        >
          Dashboard
        </h1>

        <p className="opacity-70 text-lg">
          Welcome back! Select an action from the sidebar to begin.
        </p>
      </main>
    </ProtectedPage>
  );
}
