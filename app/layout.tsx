import type { Metadata } from "next";
import { Playfair_Display, Merriweather } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair'
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif'
});

export const metadata: Metadata = {
  title: "RVA Glow Co - Holiday Light Installation | Richmond, VA",
  description: "Professional holiday light installation service for homes and businesses in Richmond, Virginia and surrounding areas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${merriweather.variable} ${playfairDisplay.variable}`} suppressHydrationWarning={true}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}