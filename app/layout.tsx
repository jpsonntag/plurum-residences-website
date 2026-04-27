import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plurum Residences | Möblierte WG-Zimmer für Studierende",
  description: "Plurum Residences ist der Wohn-Hub für möblierte, gut organisierte WG-Zimmer für Studierende.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
