import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sonix – Meeting Intelligence",
  description:
    "Sonix automates the journey from meeting recordings to share-ready content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-950 text-slate-100">{children}</div>
      </body>
    </html>
  );
}
