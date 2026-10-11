import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Noto_Naskh_Arabic, Noto_Sans_Gujarati } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const notoArabic = Noto_Naskh_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoGujarati = Noto_Sans_Gujarati({
  variable: "--font-gujarati",
  subsets: ["gujarati"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tabalat Housing | Dawoodi Bohra Community Accommodation",
  description: "A trusted accommodation and housing portal for the Dawoodi Bohra community. Find and list PG rooms, shared flats, and verified stays near Markaz and Masajid.",
  keywords: ["Tabalat Housing", "Dawoodi Bohra", "Bohra Accommodation", "Jamaat Khana Stay", "PG Mumbai", "Halal Housing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable} ${notoArabic.variable} ${notoGujarati.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-surface text-ink font-sans selection:bg-accent-surface selection:text-primary"
      >
        {children}
      </body>
    </html>
  );
}
