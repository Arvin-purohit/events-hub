import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LightRays from "@/components/LightRays";
import Navbar from "@/components/Navbar";
import { PostHogProvider } from "./providers";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const schibstedgrotesl = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianmono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Events-hub",
  description: "events hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("min-h-screen", "antialiased", schibstedgrotesl.variable, martianmono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <PostHogProvider>
   <div className="fixed inset-0 -z-10">

    <LightRays
      raysOrigin="top-center"
      raysColor="#d91818"
      raysSpeed={0.5}
      lightSpread={0.5}
      rayLength={0.7}
      followMouse={true}
      mouseInfluence={0.1}
      noiseAmount={0}
      distortion={0}
      pulsating={false}
      fadeDistance={0.5}
      saturation={1}
    />
  </div>
    <Navbar />

        {children}
        </PostHogProvider></body>
    </html>
  );
}
