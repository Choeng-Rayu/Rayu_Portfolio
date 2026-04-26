import type { Metadata } from 'next';
import { Geist, Geist_Mono, Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation';
import ChatBot from './components/ChatBot';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Rayu Choeng | Full Stack Developer',
  description: 'Full Stack Developer & Software Engineering Student from Cambodia. Specialized in React, Three.js, and modern web technologies.',
  keywords: ['Rayu Choeng', 'Full Stack Developer', 'Software Engineer', 'React', 'Three.js', 'Cambodia', 'Web Developer'],
  authors: [{ name: 'Rayu Choeng' }],
  openGraph: {
    title: 'Rayu Choeng | Full Stack Developer',
    description: 'Full Stack Developer & Software Engineering Student from Cambodia. Specialized in React, Three.js, and modern web technologies.',
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
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        <Navigation />
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
