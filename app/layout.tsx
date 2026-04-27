import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Möblierte WG-Zimmer für Studierende | Plurum Residences",
  description:
    "Möblierte WG-Zimmer für Studierende: Plurum Residences bietet klare Informationen, gepflegte Wohnungen und einen einfachen Anfrageprozess bis zum Einzug.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
