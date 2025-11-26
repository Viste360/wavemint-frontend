import "./globals.css";
import { ArtistProvider } from "@/context/ArtistContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Wavemint",
  description: "AI-powered clip generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ArtistProvider>{children}</ArtistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
