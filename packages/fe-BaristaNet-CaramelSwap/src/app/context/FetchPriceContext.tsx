'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

// type PriceData = {
//   priceFeed: number[][] | null;
// };

const FetchPriceContext = createContext<
  | {
      // priceData: number[][] | undefined;
      // setPriceData: (value: number[][]) => void;
      usdcPriceData: number[][] | undefined;
      setUsdcPriceData: (value: number[][]) => void;
      eurcPriceData: number[][] | undefined;
      setEurcPriceData: (value: number[][]) => void;
      xautPriceData: number[][] | undefined;
      setXautPriceData: (value: number[][]) => void;
      fetchPrice: (token: string) => Promise<void>;
    }
  | undefined
>(undefined);

export function FetchPriceProvider({ children }: { children: ReactNode }) {
  // const [priceData, setPriceData] = useState<number[][] | undefined>();

  const [usdcPriceData, setUsdcPriceData] = useState<number[][] | undefined>();
  const [eurcPriceData, setEurcPriceData] = useState<number[][] | undefined>();
  const [xautPriceData, setXautPriceData] = useState<number[][] | undefined>();

  const fetchPrice = async (token: string) => {
    if (token === 'USDC') {
      const usdIdrRes = await fetch(
        'https://api.coingecko.com/api/v3/coins/usd-coin/market_chart?vs_currency=idr&days=30'
      );
      const usdIdr = await usdIdrRes.json();
      // console.log(usdIdr.prices);
      // setPriceData(usdIdr.prices);
      setUsdcPriceData(usdIdr.prices);
    }
    if (token === 'EURC') {
      const eurIdrRes = await fetch(
        'https://api.coingecko.com/api/v3/coins/euro-coin/market_chart?vs_currency=idr&days=30'
      );
      const eurIdr = await eurIdrRes.json();
      // console.log(eurIdr.prices);
      // setPriceData(eurIdr.prices);
      setEurcPriceData(eurIdr.prices);
    }
    if (token === 'XAUT') {
      const xautIdrRes = await fetch(
        'https://api.coingecko.com/api/v3/coins/tether-gold/market_chart?vs_currency=idr&days=30'
      );
      const xautIdr = await xautIdrRes.json();
      // console.log(eurIdr.prices);
      // setPriceData(xautIdr.prices);
      setXautPriceData(xautIdr.prices);
    }
  };

  return (
    <FetchPriceContext.Provider
      value={{
        usdcPriceData,
        setUsdcPriceData,
        eurcPriceData,
        setEurcPriceData,
        xautPriceData,
        setXautPriceData,
        fetchPrice,
      }}
    >
      {children}
    </FetchPriceContext.Provider>
  );
}

export const useFetchPrice = () => {
  const context = useContext(FetchPriceContext);
  if (!context)
    throw new Error('useUSDCIDRPrice must be used within USDCIDRPriceProvider');
  return context;
};
