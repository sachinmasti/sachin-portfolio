import type { Metadata } from "next";
import "@/styles/globals.css";
import { CosmicJourney } from "@/components/ui/CosmicJourney";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export const metadata: Metadata = {
  title: "Sachin Masti | Data Science Portfolio",
  description:
    "Premium personal brand portfolio for Sachin Masti, aspiring Data Scientist and Machine Learning enthusiast.",
  metadataBase: new URL("https://sachinmasti.dev")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-void font-sans text-bone antialiased">
        <CosmicJourney />
        <div className="fixed inset-0 z-[1] bg-void/20" />
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
