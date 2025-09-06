import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import { WalletProvider } from './contexts/WalletContext';
import StyledComponentsRegistry from './libs/registry';
import "./globals.css";
import GlobalHeader from './components/GlobalHeader';
import GlobalFooter from './components/GlobalFooter';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SomniaLend - Decentralized Lending Platform",
  description: "Borrow and lend crypto assets with SomniaLend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StyledComponentsRegistry>
          <WalletProvider>
            {children}
            <Toaster position="top-right" />
          </WalletProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
