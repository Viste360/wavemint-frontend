import './globals.css';

export const metadata = {
  title: "Wavemint",
  description: "AI-powered clip generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
