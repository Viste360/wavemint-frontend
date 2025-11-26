import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Wavemint",
  description: "AI-powered clip generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
