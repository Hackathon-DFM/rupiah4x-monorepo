import type React from 'react';

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import { Web3Provider } from './App';

import { NetworkProvider } from './context/NetworkContext';
import { ApprovalProvider } from './context/ApprovalContext';
import { Metadata } from 'next';
import { FetchPriceProvider } from './context/FetchPriceContext';
// import { CurrentPriceProvider } from './context/CurrentPriceContext';

export const metadata: Metadata = {
  title: 'Token Swap Interface',
  description: 'A modern token swap interface',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          'bg-gradient-to-b from-[#0f172a] to-[#020617] text-white min-h-screen'
        }
      >
        {/* <body className={`${inter.className} bg-white text-slate-800`}> */}
        <div className={inter.className}>
          <NetworkProvider>
            <FetchPriceProvider>
              <ApprovalProvider>
                <Web3Provider>
                  <Navbar />
                  {children}
                </Web3Provider>
              </ApprovalProvider>
            </FetchPriceProvider>
          </NetworkProvider>
        </div>
      </body>
    </html>
  );
}
