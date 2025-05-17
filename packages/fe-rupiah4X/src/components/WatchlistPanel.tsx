'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Star } from 'lucide-react';
import { Button } from '@/components/crossChainSwap/ui/button';
import { useFetchPrice } from '@/app/context/FetchPriceContext';

import { useNavigate } from 'react-router-dom';
import { processPriceFeed } from '@/lib/crossChainSwap/utils';

// Mock data for the watchlist
const mockTokens = [
  {
    id: 1,
    symbol: 'USDC',
    name: 'USDC',
    price: 1824.35,
    change: 2.5,
    starred: true,
    quote: 'IDR',
  },
  {
    id: 2,
    symbol: 'EURC',
    name: 'EURC',
    price: 42568.12,
    change: 1.2,
    starred: true,
    quote: 'IDR',
  },
  {
    id: 3,
    symbol: 'XAUT',
    name: 'XAUT',
    price: 42568.12,
    change: 1.2,
    starred: true,
    quote: 'IDR',
  },
  // {
  //   id: 3,
  //   symbol: 'SOL',
  //   name: 'Solana',
  //   price: 138.75,
  //   change: -3.1,
  //   starred: true,
  //   quote: 'USD',
  // },
  // {
  //   id: 4,
  //   symbol: 'ARB',
  //   name: 'Arbitrum',
  //   price: 1.25,
  //   change: 5.7,
  //   starred: false,
  //   quote: 'USD',
  // },
  // {
  //   id: 5,
  //   symbol: 'MATIC',
  //   name: 'Polygon',
  //   price: 0.58,
  //   change: -1.8,
  //   starred: false,
  //   quote: 'USD',
  // },
];

interface WatchlistProps {
  onSelectPair: (pair: { base: string; quote: string }) => void;
}

export default function Watchlist({ onSelectPair }: WatchlistProps) {
  const navigate = useNavigate();

  const [tokens, setTokens] = useState(mockTokens);

  const {
    usdcPriceData,
    setUsdcPriceData,
    eurcPriceData,
    setEurcPriceData,
    xautPriceData,
    setXautPriceData,
    fetchPrice,
  } = useFetchPrice();

  const [usdcPriceFeed, setUsdcPriceFeed] = useState<number[][] | undefined>();
  const [eurcPriceFeed, setEurcPriceFeed] = useState<number[][] | undefined>();
  const [xautPriceFeed, setXautPriceFeed] = useState<number[][] | undefined>();

  // useEffect(() => {
  //   if (fromToken) {
  //     const params = new URLSearchParams();
  //     params.set('from', fromToken.symbol);
  //     if (toToken) {
  //       params.set('to', toToken.symbol);
  //     }
  //     navigate(`?${params.toString()}`);
  //   }
  // }, []);

  useEffect(() => {
    fetchPrice('USDC');
    fetchPrice('EURC');
    fetchPrice('XAUT');
  }, []);

  useEffect(() => {
    setUsdcPriceFeed(usdcPriceData);
    setEurcPriceFeed(eurcPriceData);
    setXautPriceFeed(xautPriceData);
  }, [usdcPriceData, eurcPriceData, xautPriceData]);

  const toggleStar = (id: number) => {
    setTokens(
      tokens.map((token) =>
        token.id === id ? { ...token, starred: !token.starred } : token
      )
    );
  };

  const handleSelectToken = (token: (typeof mockTokens)[0]) => {
    onSelectPair({ base: token.symbol, quote: token.quote });
  };

  const handleSetParams = (token: string) => {
    const params = new URLSearchParams();
    params.set('watchedToken', token);
    navigate(`?${params.toString()}`);
  };

  const formatRupiah = (amount: number): string => {
    return amount.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getLastPrice = (
    priceFeed: { time: number; value: number }[] | undefined
  ) => {
    if (!priceFeed) return 0;
    const lastPrice = priceFeed[priceFeed.length - 1].value;
    return lastPrice;
  };

  const handleTokenPrice = (token: string) => {
    let priceFeed;
    if (token === 'USDC') {
      priceFeed = processPriceFeed(usdcPriceFeed);
      return formatRupiah(getLastPrice(priceFeed));
    } else if (token === 'EURC') {
      priceFeed = processPriceFeed(eurcPriceFeed);
      return formatRupiah(getLastPrice(priceFeed));
    } else if (token === 'XAUT') {
      priceFeed = processPriceFeed(xautPriceFeed);
      return formatRupiah(getLastPrice(priceFeed));
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-400">Token</div>
        <div className="text-sm text-slate-400">Price / 24h</div>
      </div>

      <div className="space-y-0">
        {tokens.map((token) => (
          <div
            key={token.id}
            className="flex justify-between items-center p-2 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            onClick={() => {
              handleSelectToken(token);
              handleSetParams(token.symbol);
            }}
          >
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStar(token.id);
                }}
              >
                <Star
                  size={16}
                  className={
                    token.starred
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-slate-500'
                  }
                />
              </Button>
              <div>
                <div className="font-medium">{token.symbol}</div>
                <div className="text-xs text-slate-400">{token.name}</div>
              </div>
            </div>
            <div className="text-right">
              <div>{handleTokenPrice(token.symbol)}</div>
              {/* <div
                className={`text-xs flex items-center justify-end ${
                  token.change >= 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {token.change >= 0 ? (
                  <ChevronUp size={14} />
                ) : (
                  <ChevronDown size={14} />
                )}
                {Math.abs(token.change)}%
              </div> */}
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full mt-2 bg-slate-800 border-slate-700"
      >
        <Plus size={14} className="mr-1" /> Add Token
      </Button>
    </div>
  );
}
