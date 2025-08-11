import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReHumanizer - AI Text Humanization Service",
  description: "Transform AI-generated text into human-like content while evading detection. Advanced AI detection evasion with multiple pipelines and education levels.",
  keywords: "AI text humanization, AI detection evasion, content writing, text rewriting, AI content",
  authors: [{ name: "ReHumanizer Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800`}
      >
        {children}
      </body>
    </html>
  );
}
