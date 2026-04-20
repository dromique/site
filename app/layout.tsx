import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Lora } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { withBasePath } from "./lib/with-base-path";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Dominique van Waardhuizen",
  description: "Portfolio van Dominique van Waardhuizen",
  icons: {
    icon: [
      { url: withBasePath("/favicon_io/favicon.ico") },
      { url: withBasePath("/favicon_io/favicon-16x16.png"), sizes: "16x16", type: "image/png" },
      { url: withBasePath("/favicon_io/favicon-32x32.png"), sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: withBasePath("/favicon_io/apple-touch-icon.png"), sizes: "180x180", type: "image/png" }],
    other: [{ rel: "manifest", url: withBasePath("/favicon_io/site.webmanifest") }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
