"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ArtistProvider } from "@/context/ArtistContext";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ArtistProvider>
        {children}
      </ArtistProvider>
    </AuthProvider>
  );
}
