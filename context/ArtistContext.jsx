"use client";

import { createContext, useContext, useState, useEffect } from "react";
import artists from "@/data/artists";

const ArtistContext = createContext();

export const ArtistProvider = ({ children }) => {
  const [currentArtist, setCurrentArtist] = useState(artists[0]);

  useEffect(() => {
    // Save selected artist persistently
    const stored = localStorage.getItem("wavemint_artist");
    if (stored) {
      const found = artists.find((a) => a.slug === stored);
      if (found) setCurrentArtist(found);
    }
  }, []);

  const switchArtist = (slug) => {
    const found = artists.find((a) => a.slug === slug);
    if (found) {
      setCurrentArtist(found);
      localStorage.setItem("wavemint_artist", found.slug);

      // update global CSS var for neon theme
      document.documentElement.style.setProperty(
        "--artist-color",
        found.color
      );
    }
  };

  return (
    <ArtistContext.Provider value={{ currentArtist, switchArtist }}>
      {children}
    </ArtistContext.Provider>
  );
};

export const useArtist = () => useContext(ArtistContext);
