import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/lib/progress";
import { Shell } from "@/components/Shell";

const outfit = Outfit({ subsets: ["latin"], display: "swap", variable: "--font-outfit" });
const fraunces = Fraunces({ subsets: ["latin"], display: "swap", variable: "--font-fraunces" });

export const metadata: Metadata = {
  title: "English Quest",
  description: "Интерактивная практика английской лексики: Family, Environmental Issues, Choosing a Career.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" translate="no" className={`${outfit.variable} ${fraunces.variable}`}>
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body>
        <ProgressProvider>
          <Shell>{children}</Shell>
        </ProgressProvider>
      </body>
    </html>
  );
}
