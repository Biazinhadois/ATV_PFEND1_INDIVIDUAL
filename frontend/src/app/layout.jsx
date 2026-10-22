import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cabin 3 - Vinyl records",
  description: "Criado para melhor organizaçäo"
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Header/>
        {children}</body>
    </html>
  );
}
