import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pablo Almanza | Software Engineer",
    template: "%s | Pablo Almanza",
  },
  description:
    "Portfolio of Pablo Almanza, a Texas A&M computer science student and software engineer building production tools and community-focused platforms.",
  keywords: [
    "Pablo Almanza",
    "software engineer",
    "Texas A&M",
    "computer science",
    "C#",
    "Angular",
    "TypeScript",
    "Next.js",
  ],
  authors: [{ name: "Pablo Almanza" }],
  openGraph: {
    title: "Pablo Almanza | Software Engineer",
    description:
      "Production software, full-stack products, and community platforms built with C#, Angular, TypeScript, Next.js, and SQL.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pablo Almanza | Software Engineer",
    description:
      "Production software, full-stack products, and community platforms built with C#, Angular, TypeScript, Next.js, and SQL.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
