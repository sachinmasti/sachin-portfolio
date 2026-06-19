import type { Metadata } from "next";
import "@/styles/globals.css";
import { CosmicJourney } from "@/components/ui/CosmicJourney";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { OfflineGame } from "@/components/ui/OfflineGame";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export const metadata: Metadata = {
  title: "Sachin Masti | Data Science Portfolio",
  description:
    "Premium personal brand portfolio for Sachin Masti, Data Scientist and Machine Learning Engineer.",
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
        <OfflineGame />
        {children}
      </body>
    </html>
  );
}
