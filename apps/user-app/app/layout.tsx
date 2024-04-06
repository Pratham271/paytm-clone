import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../providers/providers";
import AppbarClient from "../components/AppbarClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Settle",
  description: "Settle: The smarter way to pay.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        
      <body className={inter.className}>
        <AppbarClient/>
        {children}
      </body>
      </Providers>
    </html>
  );
}
