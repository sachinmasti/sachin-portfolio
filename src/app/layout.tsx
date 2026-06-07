import type { Metadata } from "next";
import "@/styles/globals.css";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { CustomCursor } from "@/components/ui/CustomCursor";

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
        <ParticleBackground />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
