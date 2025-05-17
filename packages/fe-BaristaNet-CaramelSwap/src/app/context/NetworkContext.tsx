'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

import { Network } from '@/lib/crossChainSwap/types';
import { networks } from '@/lib/crossChainSwap/data';

// Creating a context for search term
const NetworkContext = createContext<
  | {
      selectedNetwork: Network;
      setSelectedNetwork: (value: Network) => void;
    }
  | undefined
>(undefined);

export function NetworkProvider({ children }: { children: ReactNode }) {
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(networks[0]);

  return (
    <NetworkContext.Provider value={{ selectedNetwork, setSelectedNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
}

// Custom hook to use the search context
export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (!context)
    throw new Error('useNetwork must be used within NetworkProvider');
  return context;
};
