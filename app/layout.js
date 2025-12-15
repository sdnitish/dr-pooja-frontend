import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { getSiteInfo } from "@/lib/api/siteInfo.api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const siteInfo = await getSiteInfo();

export const metadata = {
  title: "Dr Pooja Mittal",
  description: "Dr Pooja Mittal",
  favicon: siteInfo?.favicon || "/favicon.ico",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <Toaster position="top-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
