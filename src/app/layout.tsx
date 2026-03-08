import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tama El Pablo — Full-Stack Developer",
  description: "Portfolio of Tama El Pablo — Full-Stack Developer, AI Enthusiast, and Problem Solver.",
  openGraph: {
    title: "Tama El Pablo — Full-Stack Developer",
    description: "Portfolio of Tama El Pablo — Full-Stack Developer, AI Enthusiast, and Problem Solver.",
    url: "https://porto.tams.codes",
    siteName: "Tama El Pablo",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0a0a0f] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
