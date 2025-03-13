import type { Metadata } from "next";
import { Header } from "@/modules/common/components/Header";
import { WalletProvider } from "@/modules/wagmi/components/WalletProvider";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";
import { Footer } from "@/modules/common/components/Footer";

export const metadata: Metadata = {
  title: "Meetup Web3 Workship",
  description:
    "This site is a minting platform designed for Web3 workshops.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          <Header />
          {children}
          <Footer />
        </WalletProvider>
      </body>
    </html>
  );
}
