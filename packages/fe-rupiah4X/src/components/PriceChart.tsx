'use client';

import { useEffect, useState } from 'react';
import { ChartComponent } from './ChartComponent';

import { useSearchParams } from 'react-router-dom';
import { useFetchPrice } from '@/app/context/FetchPriceContext';
import { processPriceFeed } from '@/lib/crossChainSwap/utils';

// import { useCurrentPrice } from '@/app/context/CurrentPriceContext';

// Mock data generator for the chart
// const generateChartData = (
//   timeframe: string,
//   tradingPair: { base: string; quote: string }
// ) => {
//   const data = [];
//   let basePrice =
//     tradingPair.base === 'ETH'
//       ? 1800
//       : tradingPair.base === 'BTC'
//       ? 42500
//       : 138;
//   let volatility = 0;
//   let dataPoints = 0;
//   let timeInterval = 0;

//   // Set volatility, number of data points, and time interval based on timeframe
//   switch (timeframe) {
//     case '1H':
//       volatility = 5;
//       dataPoints = 60;
//       timeInterval = 60 * 1000; // 1 minute in milliseconds
//       break;
//     case '1D':
//       volatility = 20;
//       dataPoints = 24;
//       timeInterval = 60 * 60 * 1000; // 1 hour in milliseconds
//       break;
//     case '1W':
//       volatility = 50;
//       dataPoints = 7;
//       timeInterval = 24 * 60 * 60 * 1000; // 1 day in milliseconds
//       break;
//     case '1M':
//       volatility = 100;
//       dataPoints = 30;
//       timeInterval = 24 * 60 * 60 * 1000; // 1 day in milliseconds
//       break;
//     default:
//       volatility = 20;
//       dataPoints = 24;
//       timeInterval = 60 * 60 * 1000; // 1 hour in milliseconds
//   }

//   // Start from a base date and increment by the time interval
//   const startDate = new Date();
//   startDate.setHours(0, 0, 0, 0); // Start at midnight

//   // For 1H, start from current time minus 1 hour
//   if (timeframe === '1H') {
//     startDate.setTime(Date.now() - 60 * 60 * 1000);
//   } else if (timeframe === '1D') {
//     startDate.setTime(Date.now() - 24 * 60 * 60 * 1000);
//   } else if (timeframe === '1W') {
//     startDate.setTime(Date.now() - 7 * 24 * 60 * 60 * 1000);
//   } else if (timeframe === '1M') {
//     startDate.setTime(Date.now() - 30 * 24 * 60 * 60 * 1000);
//   }

//   // Generate data points with unique timestamps
//   for (let i = 0; i < dataPoints; i++) {
//     const change = (Math.random() - 0.5) * volatility;
//     basePrice += change;

//     // Create a new date for each point by adding the time interval
//     const pointDate = new Date(startDate.getTime() + i * timeInterval);

//     // Format date as yyyy-mm-dd for daily data
//     let timeValue;
//     if (timeframe === '1W' || timeframe === '1M') {
//       timeValue = pointDate.toISOString().split('T')[0];
//     } else {
//       // For hourly data, use a Unix timestamp (seconds)
//       timeValue = Math.floor(pointDate.getTime() / 1000);
//     }

//     data.push({
//       time: timeValue,
//       value: Number.parseFloat(basePrice.toFixed(2)),
//     });
//   }

//   return data;
// };

interface PriceChartProps {
  timeframe: string;
  tradingPair: { base: string; quote: string };
}

export default function PriceChart({
  timeframe,
  tradingPair,
}: PriceChartProps) {
  const [data, setData] = useState<
    { time: string | number; value: number }[] | undefined
  >([]);
  const [priceChange, setPriceChange] = useState({
    value: 0,
    percentage: 0,
    isPositive: true,
  });
  const [currentPrice, setCurrentPrice] = useState<string | number>('0.00');
  const {
    usdcPriceData,
    setUsdcPriceData,
    eurcPriceData,
    setEurcPriceData,
    xautPriceData,
    setXautPriceData,
    fetchPrice,
  } = useFetchPrice();

  // const [pairPrice, setPairPrice] = useState<{ time: number; value: number }[]>(
  //   []
  // );

  const [priceFeed, setPriceFeed] = useState<number[][] | undefined>();

  const [searchParams] = useSearchParams();

  // const fromToken = searchParams.get('from');
  // const toToken = searchParams.get('to');
  // const toToken = searchParams.get('to=') || 'USDT';

  const watchedToken = searchParams.get('watchedToken');

  const formatRupiah = (amount: number): string => {
    return amount.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // useEffect(() => {
  //   async function getData() {
  //     if (fromToken === 'IDRX' || toToken === 'USDC' || fromToken === 'USDC') {
  //       const usdIdrRes = await fetch(
  //         'https://api.coingecko.com/api/v3/coins/usd-coin/market_chart?vs_currency=idr&days=30'
  //       );
  //       const usdIdr = await usdIdrRes.json();
  //       setPriceFeed(usdIdr.prices);
  //     }
  //     if (toToken === 'EURC' || fromToken === 'EURC') {
  //       const eurIdrRes = await fetch(
  //         'https://api.coingecko.com/api/v3/coins/euro-coin/market_chart?vs_currency=idr&days=30'
  //       );
  //       const eurIdr = await eurIdrRes.json();
  //       // console.log(eurIdr.prices);
  //       setPriceFeed(eurIdr.prices);
  //     }
  //     if (toToken === 'XAUT' || fromToken === 'XAUT') {
  //       const xautIdrRes = await fetch(
  //         'https://api.coingecko.com/api/v3/coins/tether-gold/market_chart?vs_currency=idr&days=30'
  //       );
  //       const xautIdr = await xautIdrRes.json();
  //       // console.log(eurIdr.prices);
  //       setPriceFeed(xautIdr.prices);
  //     }
  //   }

  //   getData();

  //   // console.log(fromToken);
  //   // console.log(toToken);
  // }, [fromToken, toToken]);

  // useEffect(() => {
  //   fetchPrice('USDC');
  // }, []);

  useEffect(() => {
    setPriceFeed(usdcPriceData);
  }, [usdcPriceData]);

  useEffect(() => {
    if (watchedToken === 'USDC') {
      setPriceFeed(usdcPriceData);
    }
    if (watchedToken === 'EURC') {
      setPriceFeed(eurcPriceData);
    }
    if (watchedToken === 'XAUT') {
      setPriceFeed(xautPriceData);
    }
  }, [watchedToken]);

  useEffect(() => {
    if (!priceFeed) return;

    // console.log(priceFeed);

    // const processedData = priceFeed.map(([timestamp, price]) => ({
    //   time: Math.floor(timestamp / 1000), // Convert timestamp to seconds
    //   value: parseFloat(price.toFixed(2)), // Format price to 2 decimal places
    // }));

    const processedData = processPriceFeed(priceFeed);

    if (!processedData) return;

    setData(processedData);

    // console.log(processedData[processedData.length - 1].value);

    // const chartData = generateChartData(timeframe, tradingPair);
    // setData(chartData);

    // // Calculate price change
    if (processedData.length > 1) {
      const firstPrice = processedData[0].value;
      const lastPrice = processedData[processedData.length - 1].value;
      const change = lastPrice - firstPrice;
      const percentage = (change / firstPrice) * 100;

      setPriceChange({
        value: Math.abs(change),
        percentage: Math.abs(percentage),
        isPositive: change >= 0,
      });

      const formattedRupiah = formatRupiah(
        processedData[processedData.length - 1].value
      );
      setCurrentPrice(formattedRupiah);
      // setCurrentPrice(processedData[processedData.length - 1].value.toFixed(2));
    }
  }, [priceFeed]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-2xl font-bold">{currentPrice}</div>
          <div
            className={`flex items-center ${
              priceChange.isPositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {priceChange.isPositive ? '↑' : '↓'} Rp{' '}
            {priceChange.value.toFixed(2)} ({priceChange.percentage.toFixed(2)}
            %)
          </div>
        </div>
        <div className="text-sm text-slate-400">
          {tradingPair.base}/{tradingPair.quote}
        </div>
      </div>

      <div className="h-[250px] lg:h-[430px] pb-4">
        <ChartComponent
          data={data}
          colors={{
            backgroundColor: '#1e293b', // Slate-800 to match the card background
            lineColor: '#3b82f6', // Blue-500
            textColor: '#94a3b8', // Slate-400
            areaTopColor: '#3b82f6', // Blue-500
            areaBottomColor: 'rgba(59, 130, 246, 0.2)', // Blue-500 with opacity
          }}
        />
      </div>

      {/* Separator */}
      <div className="border-t border-slate-700 -mx-4 mb-2 "></div>

      <div className="relative bg-slate-900 rounded-lg">
        <div className="text-center py-5 px-4">
          <div className="flex justify-center items-center mb-4">
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-400">
              Rupiah4X
            </div>
          </div>
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold text-slate-200 mb-4">
              Borderless Finance, Powered by Intent
            </h3>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Trade IDRX seamlessly with top global tokens like{' '}
              <span className="text-blue-400 font-medium">USDC</span>,{' '}
              <span className="text-emerald-400 font-medium">EURC</span>, and{' '}
              <span className="text-amber-400 font-medium">XAUT</span>. Rupiah4X
              brings the power of forex to the blockchain — fast, secure, and
              without borders.
            </p>
            <div className="mt-4 flex justify-center space-x-2">
              <span className="inline-block bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                Intent-Based Swaps
              </span>
              <span className="inline-block bg-emerald-600/20 text-emerald-400 px-3 py-1 rounded-full text-sm">
                Cross-Chain
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
