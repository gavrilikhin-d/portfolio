import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  metadataBase: new URL("https://gavrilikhin.dev"),
  title: {
    default: "Daniil Gavrilikhin | Full-Stack Engineer",
    template: "%s | Daniil Gavrilikhin",
  },
  description:
    "Full-Stack Engineer building scalable web and mobile applications with React, React Native, Next.js, Node.js, and modern cloud tooling.",
  applicationName: "Daniil Gavrilikhin Portfolio",
  authors: [{ name: "Daniil Gavrilikhin", url: "https://gavrilikhin.dev" }],
  creator: "Daniil Gavrilikhin",
  publisher: "Daniil Gavrilikhin",
  keywords: [
    "Daniil Gavrilikhin",
    "Full-Stack Engineer",
    "Full Stack Developer",
    "React",
    "React Native",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gavrilikhin.dev",
    siteName: "Daniil Gavrilikhin Portfolio",
    title: "Daniil Gavrilikhin | Full-Stack Engineer",
    description:
      "Portfolio of Daniil Gavrilikhin, a Full-Stack Engineer building scalable web and mobile applications.",
    images: [
      {
        url: "/background.webp",
        width: 1024,
        height: 576,
        alt: "Dark developer-themed background with code and technology icons",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniil Gavrilikhin | Full-Stack Engineer",
    description:
      "Portfolio of Daniil Gavrilikhin, a Full-Stack Engineer building scalable web and mobile applications.",
    images: ["/background.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
