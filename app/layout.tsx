import type { Metadata } from "next";
import "../src/index.css";
import { RootProviders } from "../src/components/RootProviders";

export const metadata: Metadata = {
  title: "Raman Greens KNW — Authentic Nimari Flavours from Khandwa",
  description:
    "Discover fresh, organic and authentic Nimari snacks, organics, sweets, spices and gifting hampers from Khandwa, Madhya Pradesh.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
