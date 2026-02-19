import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ScrollProvider } from "@/context/ScrollContext";
import { ContentProvider } from "@/context/ContentContext";
import { ThemeProvider } from "@/context/ThemeContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VinuLab | Sviluppo Web, Software & AI",
  description: "We craft digital experiences. We engineer the success of your vision through technology and innovation. Web development, software, and AI solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased bg-[var(--page-bg)] text-[var(--page-text)] transition-colors duration-300">
        <ScrollProvider>
          <ContentProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </ContentProvider>
        </ScrollProvider>
      </body>
    </html>
  );
}
