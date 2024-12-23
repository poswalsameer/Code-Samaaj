import UserDetailContextProvider from "./context/UserDetailContextProvider";
import { Toaster } from "@/components/ui/toaster"
import localFont from "next/font/local";
import { Inter } from 'next/font/google';
import "./globals.css";
import type { Metadata } from "next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserDetailContextProvider>
      <html lang="en">
        <body
          className={inter.className}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </UserDetailContextProvider>
  );
}
