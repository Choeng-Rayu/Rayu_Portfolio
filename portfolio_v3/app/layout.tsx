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
  title: "Choeng Rayu — Software Engineer",
  description: "Full Stack Developer & Software Engineering student at CADT. Building DasTern Healthcare, DerLg, and RayuOS. Based in Phnom Penh, Cambodia.",
  keywords: [
    "software engineer",
    "flutter",
    "next.js",
    "cambodia",
    "cadt",
    "full stack",
    "developer",
    "portfolio"
  ],
  authors: [{ name: "Choeng Rayu", url: "https://rayu-choeng.tech" }],
  openGraph: {
    title: "Choeng Rayu — Software Engineer",
    description: "Building real products: prescription reminders, AI trip planners, and a custom OS.",
    url: "https://rayu-choeng.tech",
    siteName: "Choeng Rayu",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Choeng Rayu — Software Engineer",
    creator: "@President_Alien",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23009DFF'/><text x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-size='50' font-weight='bold' fill='white'>CR</text></svg>"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-white antialiased">
        {children}
      </body>
    </html>
  );
}
