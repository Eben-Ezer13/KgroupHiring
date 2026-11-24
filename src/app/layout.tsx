import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { copy } from "@/config/content";
import { ThemeProvider } from "@/components/theme-provider";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-serif", display: "swap" });
export const metadata: Metadata = { title: copy.title, description: copy.description, manifest: "/manifest.webmanifest", openGraph: { title: copy.title, description: copy.description, type: "website", images: ["/images/logo.jpeg"] }, icons: { icon: "/favicon.jpeg", apple: "/icons/apple-touch-icon.png" }, appleWebApp: { capable: true, title: "KGroup Parfumery", statusBarStyle: "black-translucent" } };
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0F2E1C" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="fr"><body className={`${inter.variable} ${cormorant.variable}`}><ThemeProvider>{children}</ThemeProvider></body></html>; }
