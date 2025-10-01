import type { Metadata } from "next";
import { Playfair_Display, Merriweather } from "next/font/google";
import Script from "next/script";
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
  title: "RVA Glow Co - Holiday Light Installation | Richmond, VA - Get Lit",
  description: "Professional holiday light installation service for homes and businesses in Richmond, Virginia and surrounding areas. Get Lit with RVA Glow Co!",
  keywords: "holiday lights, Christmas lights, Richmond VA, light installation, professional lighting, holiday decorating, Henrico, Chesterfield, Short Pump",
  authors: [{ name: "RVA Glow Co" }],
  openGraph: {
    title: "RVA Glow Co - Professional Holiday Light Installation - Get Lit",
    description: "Transform your home with professional holiday lighting. Full-service installation, maintenance, and removal in Richmond, VA. Get Lit with RVA Glow Co!",
    url: "https://rvaglowco.com",
    siteName: "RVA Glow Co",
    images: [
      {
        url: "/images/og-image.png",
        width: 512,
        height: 512,
        alt: "RVA Glow Co - Holiday Lighting Experts",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RVA Glow Co - Professional Holiday Light Installation - Get Lit",
    description: "Transform your home with professional holiday lighting. Full-service in Richmond, VA. Get Lit!",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en">
      <body className={`${merriweather.variable} ${playfairDisplay.variable}`} suppressHydrationWarning={true}>
        {GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}