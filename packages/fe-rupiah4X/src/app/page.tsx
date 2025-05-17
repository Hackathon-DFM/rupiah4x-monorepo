//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// 'use client';

// import { useState } from 'react';
// import { RefreshCw } from 'lucide-react';
// import { Button } from '@/components/crossChainSwap/ui/button';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from '@/components/crossChainSwap/ui/card';
// import PriceChart from '../components/PriceChart';
// import NewsPanel from '../components/NewsPanel';
// import Watchlist from '../components/WatchlistPanel';
// import TokenSwapInterface from '../components/crossChainSwap/token-swap-interface';

// export default function SwapPage() {
//   const [timeframe, setTimeframe] = useState('1D');
//   const [selectedPair, setSelectedPair] = useState({
//     base: 'ETH',
//     quote: 'USD',
//   });

//   return (
//     <div className="container mx-auto max-w-screen-2xl px-4 py-4">
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* News panel - moved to left side */}
//         <div className="w-full lg:w-1/4">
//           <Card className="bg-slate-900 border-slate-800">
//             <CardHeader>
//               <CardTitle className="text-lg">Latest News</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <NewsPanel selectedPair={selectedPair} />
//             </CardContent>
//           </Card>
//         </div>

//         {/* Price chart section - keeping in middle */}
//         <div className="w-full lg:w-2/5 flex-1">
//           <Card className="bg-slate-900 border-slate-800 flex-1">
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-lg">Price Chart</CardTitle>
//               <div className="flex gap-1">
//                 {['1H', '1D', '1W', '1M'].map((period) => (
//                   <Button
//                     key={period}
//                     variant={timeframe === period ? 'default' : 'outline'}
//                     size="sm"
//                     onClick={() => setTimeframe(period)}
//                     className={
//                       timeframe === period
//                         ? 'bg-blue-600'
//                         : 'bg-slate-800 border-slate-700'
//                     }
//                   >
//                     {period}
//                   </Button>
//                 ))}
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="bg-slate-800 border-slate-700"
//                 >
//                   <RefreshCw size={14} />
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <PriceChart timeframe={timeframe} tradingPair={selectedPair} />
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right column for Swap (primary feature) and Watchlist */}
//         <div className="w-full lg:w-1/3 flex flex-col gap-6">
//           {/* Swap interface - main feature moved to right */}
//           {/* <div className="flex-1"> */}
//           <Card className="bg-slate-900 border-slate-800 flex-1 p-0">
//             <TokenSwapInterface />
//           </Card>
//           {/* </div> */}

//           {/* Watchlist below swap */}
//           <div className="flex-1">
//             <Card className="bg-slate-900 border-slate-800 gap-1">
//               <CardHeader>
//                 <CardTitle className="text-lg">Watchlist</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Watchlist onSelectPair={setSelectedPair} />
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       <footer className="mt-8 text-center text-sm text-slate-500">
//         <p>© 2025 Rupiah4X</p>
//       </footer>
//     </div>
//   );
// }

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
'use client';

import { useState, useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/crossChainSwap/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/crossChainSwap/ui/card';
import PriceChart from '../components/PriceChart';
import NewsPanel from '../components/NewsPanel';
import Watchlist from '../components/WatchlistPanel';
import TokenSwapInterface from '../components/crossChainSwap/token-swap-interface';
import ClientRouterWrapper from './ClientRouterWrapper';

export default function Home() {
  return (
    <ClientRouterWrapper>
      <SwapPage />
    </ClientRouterWrapper>
  );
}

function SwapPage() {
  const [timeframe, setTimeframe] = useState('1D');
  const [selectedPair, setSelectedPair] = useState({
    base: 'USDC',
    quote: 'IDR',
  });
  const [containerHeight, setContainerHeight] = useState('auto');
  const watchlistRef = useRef<HTMLDivElement>(null);

  // Adjust container height based on watchlist position
  useEffect(() => {
    const handleResize = () => {
      // We're using flex-grow instead of explicit height calculations now
      // This approach lets the flex system handle the distribution
      // But we can still ensure the container has a minimum height if needed
      if (watchlistRef.current) {
        const watchlistRect = watchlistRef.current.getBoundingClientRect();
        const containerElement = document.querySelector('.main-container');
        const containerTop = containerElement?.getBoundingClientRect().top || 0;
        // Add some extra space to ensure we have room at the bottom
        const minHeight = watchlistRect.bottom - containerTop + 20;
        setContainerHeight(`${minHeight}px`);
      }
    };

    // Initial measurement - delay slightly to ensure DOM is ready
    const initialTimer = setTimeout(handleResize, 200);

    // Update on resize and after potential swap operations
    window.addEventListener('resize', handleResize);

    // Use MutationObserver to detect DOM changes (like when swap component expands)
    const observer = new MutationObserver(() => {
      // Delay the resize calculation slightly to let the DOM update fully
      setTimeout(handleResize, 50);
    });

    const targetNode = document.querySelector('.container');
    if (targetNode) {
      observer.observe(targetNode, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }

    return () => {
      clearTimeout(initialTimer);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="container mx-auto max-w-screen-2xl px-4 py-4">
      <div
        className="flex flex-col lg:flex-row gap-6 main-container"
        style={{ minHeight: containerHeight }}
      >
        {/* News panel - left side */}
        <div className="w-full lg:w-1/4 flex flex-col">
          <Card className="bg-slate-900 border-slate-800 h-full flex flex-col">
            <CardHeader className="border-b border-slate-800">
              <CardTitle className="text-lg">Latest News</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <NewsPanel selectedPair={selectedPair} />
            </CardContent>
          </Card>
        </div>

        {/* Price chart section - middle */}
        <div className="w-full lg:w-2/5 flex-1 flex flex-col">
          <Card className="bg-slate-900 border-slate-800 flex-grow flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-800">
              <CardTitle className="text-lg">Price Chart</CardTitle>
              {/* <div className="flex gap-1">
                {['1H', '1D', '1W', '1M'].map((period) => (
                  <Button
                    key={period}
                    variant={timeframe === period ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimeframe(period)}
                    className={
                      timeframe === period
                        ? 'bg-blue-600'
                        : 'bg-slate-800 border-slate-700'
                    }
                  >
                    {period}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-slate-800 border-slate-700"
                >
                  <RefreshCw size={14} />
                </Button>
              </div> */}
            </CardHeader>
            <CardContent className="flex-1">
              <PriceChart timeframe={timeframe} tradingPair={selectedPair} />
            </CardContent>
          </Card>
        </div>

        {/* Right column for Swap (primary feature) and Watchlist */}
        <div className="w-full lg:w-1/3 flex flex-col h-full">
          {/* Top section with Swap interface */}
          <Card className="bg-slate-900 border-slate-800 mb-6">
            <CardHeader className="border-b border-slate-800">
              <CardTitle className="text-lg">Swap Tokens</CardTitle>
              <CardDescription>
                {' '}
                *Price quote locked to 1:1 due to limited faucet*{' '}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <TokenSwapInterface />
            </CardContent>
          </Card>

          {/* Watchlist at bottom - aligned with news panel */}
          <Card
            ref={watchlistRef}
            className="bg-slate-900 border-slate-800 flex flex-col flex-grow"
          >
            <CardHeader className="border-b border-slate-800">
              <CardTitle className="text-lg">Watchlist</CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto">
              <Watchlist onSelectPair={setSelectedPair} />
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="mt-4 text-center text-sm text-slate-500">
        <p>© 2025 Rupiah4X</p>
      </footer>
    </div>
  );
}
