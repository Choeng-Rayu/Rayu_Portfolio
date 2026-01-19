import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://rayu-choeng.tech"),
  title: {
    default: "Rayu | Full Stack Developer & Software Engineer",
    template: "%s | Rayu Choeng",
  },
  description:
    "Rayu (Choeng Rayu) - Professional full-stack developer and software engineer. Explore innovative web development projects, cutting-edge technologies, and software solutions.",
  keywords: [
    "Rayu",
    "Rayu Choeng",
    "Choeng Rayu",
    "Full Stack Developer",
    "Software Engineer",
    "Web Developer",
    "React",
    "JavaScript",
    "Node.js",
    "Frontend Developer",
    "Backend Developer",
    "Portfolio",
  ],
  authors: [{ name: "Rayu Choeng", url: "https://rayu-choeng.tech" }],
  creator: "Rayu Choeng",
  publisher: "Rayu Choeng",
  alternates: {
    canonical: "/",
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
  verification: {
    google: "KVziPvF2ike4JLSyC1WHc8pZ52s5kjDq264rNfsMsAs",
  },
  openGraph: {
    type: "website",
    url: "https://rayu-choeng.tech",
    title: "Rayu | Full Stack Developer - Rayu Choeng Portfolio",
    description:
      "Rayu (Choeng Rayu) - Professional full-stack developer and software engineer. Explore Rayu's innovative web development projects and software solutions.",
    siteName: "Rayu Choeng Portfolio",
    images: [
      {
        url: "https://rayu-choeng.tech/rayu-profile.jpg",
        width: 1200,
        height: 1200,
        alt: "Rayu Choeng - Full Stack Developer Profile Picture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rayu | Full Stack Developer - Rayu Choeng Portfolio",
    description:
      "Rayu (Choeng Rayu) - Professional full-stack developer and software engineer. Explore Rayu's innovative web development projects and software solutions.",
    images: ["https://rayu-choeng.tech/rayu-profile.jpg"],
  },
  icons: {
    icon: "/hacker-svgrepo-com.svg",
    apple: "/rayu-logo.png",
    shortcut: "/rayu-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
