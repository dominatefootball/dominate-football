import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnalyticsScript from "./components/AnalyticsScript"; // Your existing component
import { GoogleAnalytics } from '@next/third-parties/google'; // Add this import

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dominate Football - Latest Football News & Transfers",
  description: "Stay updated with the latest football news, transfers, and match analysis from around the world.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnalyticsScript />
        {children}
        {/* Add Google Analytics */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
