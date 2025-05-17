// import '@rainbow-me/rainbowkit/styles.css';
// import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
// import { http, WagmiProvider } from 'wagmi';

// import { arbitrumSepolia, baseSepolia, optimismSepolia } from 'wagmi/chains';
// import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// import { ReactNode } from 'react';

// const swapConfig = getDefaultConfig({
//   appName: 'LearnDoSwap',
//   projectId: 'YOUR_PROJECT_ID',
//   chains: [arbitrumSepolia, baseSepolia],
//   ssr: true, // If your dApp uses server side rendering (SSR)
//   transports: {
//     [arbitrumSepolia.id]: http(process.env.NEXT_PUBLIC_ARB_SEPOLIA_RPC_URL),
//     [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL),
//   },
// });

// const queryClient = new QueryClient();

// const App = ({ children }: { children: ReactNode }) => {
//   // Getting current path

//   return (
//     <WagmiProvider config={swapConfig}>
//       <QueryClientProvider client={queryClient}>
//         <RainbowKitProvider>{children}</RainbowKitProvider>
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// };

// export default App;

'use client';

import { Config, http, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { XellarKitProvider, defaultConfig, darkTheme } from '@xellar/kit';
import { arbitrumSepolia, liskSepolia } from 'viem/chains';

export const config = defaultConfig({
  appName: 'Rupiah4X',
  // Required for WalletConnect
  walletConnectProjectId: 'YOUR_WALLET_CONNECT_PROJECT_ID',
  chains: [liskSepolia, arbitrumSepolia],
  transports: {
    [liskSepolia.id]: http(),
    [arbitrumSepolia.id]: http(
      'https://arb-sepolia.g.alchemy.com/v2/b62NyAWstIB-5d6NCEZkAHYVTeZ5IPtJ'
    ),
  },
  // Required for Xellar Passport
  xellarAppId: '0c46345e-1adf-49f2-8352-882b49fcb00d',
  xellarEnv: 'sandbox',
  ssr: true, // Use this if you're using Next.js App Router
}) as Config;

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider theme={darkTheme}>{children}</XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
