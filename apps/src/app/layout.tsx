import type { Metadata } from "next";
import { Header } from "@/modules/common/components/Header";
import { WalletProvider } from "@/modules/wagmi/components/WalletProvider";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";
import { Footer } from "@/modules/common/components/Footer";

export const metadata: Metadata = {
  title: "WAGMI + RainbowKit Demo App",
  description:
    "A Demo app for minting NFTs on Soneium Minato by using WAGMI and Rainbowkit.",
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
