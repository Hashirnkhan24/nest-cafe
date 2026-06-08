import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import FloatingActions from "@/components/shared/FloatingActions";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Nest | Cozy Café & Comfort Food in Bandra",
  description: "A cozy café tucked away in Bandra West, Mumbai. Serving specialty coffee, comforting Continental & Italian dishes, and slow, peaceful moments.",
  keywords: ["Nest Cafe Bandra", "Cafe in Bandra", "Specialty Coffee Mumbai", "Continental Cafe Bandra", "Best Coffee Bandra"],
  openGraph: {
    title: "The Nest | Cozy Café & Comfort Food in Bandra",
    description: "A cozy café tucked away in Bandra West, Mumbai. Serving specialty coffee and comforting food.",
    url: "https://thenest.cafe",
    siteName: "The Nest Café",
    type: "website",
  },
};

// Structured Local Business data (JSON-LD)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  "name": "The Nest",
  "description": "A cozy café in Bandra serving comfort food, specialty coffee and slow moments.",
  "url": "https://thenest.cafe",
  "telephone": "+91-22-12345678",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Hill Road",
    "addressLocality": "Bandra West",
    "addressRegion": "Maharashtra",
    "postalCode": "400050",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "19.0544",
    "longitude": "72.8402"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "23:00"
    }
  ],
  "priceRange": "₹₹",
  "servesCuisine": ["Continental", "Italian", "Cafe"],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "328"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream-100 text-text-primary selection:bg-sage-200">
        <LenisProvider>
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
          <FloatingActions />
        </LenisProvider>
      </body>
    </html>
  );
}
