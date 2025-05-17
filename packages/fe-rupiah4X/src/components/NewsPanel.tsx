// 'use client';

// import { useState, useEffect } from 'react';
// import { ExternalLink } from 'lucide-react';
// import { Button } from '@/components/crossChainSwap/ui/button';

// // Mock data for news
// const allNews = [
//   {
//     id: 1,
//     title: 'Ethereum Layer 2 Solutions See Record Growth in Transaction Volume',
//     source: 'CryptoNews',
//     time: '2 hours ago',
//     url: '#',
//     relatedTo: ['ETH'],
//   },
//   {
//     id: 2,
//     title: 'Major DeFi Protocol Announces Integration with Arbitrum',
//     source: 'DeFi Daily',
//     time: '5 hours ago',
//     url: '#',
//     relatedTo: ['ARB', 'ETH'],
//   },
//   {
//     id: 3,
//     title: 'New Regulatory Framework for Crypto Exchanges Proposed',
//     source: 'Blockchain Times',
//     time: '8 hours ago',
//     url: '#',
//     relatedTo: ['BTC', 'ETH', 'SOL'],
//   },
//   {
//     id: 4,
//     title: 'ETH Price Analysis: Bulls Target $2K Resistance Level',
//     source: 'CryptoAnalyst',
//     time: '12 hours ago',
//     url: '#',
//     relatedTo: ['ETH'],
//   },
//   {
//     id: 5,
//     title: 'Bitcoin Hashrate Reaches All-Time High Despite Market Volatility',
//     source: 'CryptoInsider',
//     time: '1 day ago',
//     url: '#',
//     relatedTo: ['BTC'],
//   },
//   {
//     id: 6,
//     title: 'Solana DeFi Ecosystem Continues to Expand with New Projects',
//     source: 'DeFi Pulse',
//     time: '2 days ago',
//     url: '#',
//     relatedTo: ['SOL'],
//   },
//   {
//     id: 7,
//     title: 'Polygon Announces New Zero-Knowledge Scaling Solution',
//     source: 'Layer2News',
//     time: '3 days ago',
//     url: '#',
//     relatedTo: ['MATIC'],
//   },
// ];

// interface NewsPanelProps {
//   selectedPair: { base: string; quote: string };
// }

// export default function NewsPanel({ selectedPair }: NewsPanelProps) {
//   const [news, setNews] = useState(allNews.slice(0, 4));

//   useEffect(() => {
//     // Filter news based on selected trading pair
//     const filteredNews = allNews
//       .filter((item) => item.relatedTo.includes(selectedPair.base))
//       .slice(0, 4);

//     // If we don't have enough news for this token, add some general news
//     if (filteredNews.length < 4) {
//       const generalNews = allNews
//         .filter((item) => !filteredNews.some((n) => n.id === item.id))
//         .slice(0, 4 - filteredNews.length);

//       setNews([...filteredNews, ...generalNews]);
//     } else {
//       setNews(filteredNews);
//     }
//   }, [selectedPair]);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//       {news.map((item) => (
//         <div
//           key={item.id}
//           className="bg-slate-800 rounded-lg p-4 hover:bg-slate-750 transition-colors"
//         >
//           <h3 className="font-medium mb-2 line-clamp-2">{item.title}</h3>
//           <div className="flex justify-between items-center text-xs text-slate-400">
//             <span>{item.source}</span>
//             <span>{item.time}</span>
//           </div>
//           <Button
//             variant="ghost"
//             size="sm"
//             className="w-full mt-3 text-blue-400 hover:text-blue-300 hover:bg-slate-700"
//             asChild
//           >
//             <a href={item.url} target="_blank" rel="noopener noreferrer">
//               Read More <ExternalLink size={12} className="ml-1" />
//             </a>
//           </Button>
//         </div>
//       ))}
//     </div>
//   );
// }

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

// 'use client';

// import { useState, useEffect } from 'react';
// import { ExternalLink } from 'lucide-react';
// import { Button } from '@/components/crossChainSwap/ui/button';

// // Mock data for news
// const allNews = [
//   {
//     id: 1,
//     title: 'Circle Files for IPO Amid Surging USDC Demand',
//     source: 'Financial Times',
//     time: '1 month ago',
//     url: 'https://www.ft.com/content/7aaaf1f3-27ce-4142-92c4-c363cf2760ab',
//     relatedTo: ['USDC'],
//   },
//   {
//     id: 2,
//     title: 'GSK Acquires IDRx for $1.15 Billion to Enhance Oncology Portfolio',
//     source: 'The Guardian',
//     time: '3 months ago',
//     url: 'https://www.theguardian.com/business/2025/jan/13/gsk-to-buy-us-cancer-drug-firm-idrx',
//     relatedTo: ['IDRX'],
//   },
//   {
//     id: 3,
//     title: 'Tether Gold (XAUT) Backed by 7.7 Tons of Physical Gold',
//     source: 'Tether',
//     time: '2 weeks ago',
//     url: 'https://tether.io/news/tether-reports-xaut-grows-amid-shifting-monetary-landscape-releases-its-first-attestation-for-q1-2025-more-than-7-7-tons-of-physical-gold-backing-the-token-in-circulation/',
//     relatedTo: ['XAUT'],
//   },
//   {
//     id: 4,
//     title: "Circle's EURC Stablecoin Supply Hits Record $246 Million",
//     source: 'CoinDesk',
//     time: '4 weeks ago',
//     url: 'https://www.coindesk.com/markets/2025/04/14/circle-s-eurc-stablecoin-surges-43-to-record-supply-as-dollar-troubles-fuel-demand/',
//     relatedTo: ['EURC'],
//   },
//   {
//     id: 5,
//     title: 'USDC Approved for Use in Japan, Launches on SBI VC Trade',
//     source: 'Cointelegraph',
//     time: '1.5 months ago',
//     url: 'https://cointelegraph.com/tags/usd-coin',
//     relatedTo: ['USDC'],
//   },
//   {
//     id: 6,
//     title: "IDRx's Lead Molecule Complements GSK's GI Cancer Pipeline",
//     source: 'Contract Pharma',
//     time: '2 months ago',
//     url: 'https://www.contractpharma.com/breaking-news/gsk-acquires-idrx/',
//     relatedTo: ['IDRX'],
//   },
//   {
//     id: 7,
//     title: 'Tether Gold Maintains Position as Leading Tokenized Gold Product',
//     source: 'Tether',
//     time: '2 weeks ago',
//     url: 'https://tether.io/news/tether-reports-xaut-grows-amid-shifting-monetary-landscape-releases-its-first-attestation-for-q1-2025-more-than-7-7-tons-of-physical-gold-backing-the-token-in-circulation/',
//     relatedTo: ['XAUT'],
//   },
//   {
//     id: 8,
//     title:
//       "Circle's EURC Growth Driven by Demand for Euro-Denominated Digital Assets",
//     source: 'Cointelegraph',
//     time: '4 weeks ago',
//     url: 'https://cointelegraph.com/news/circle-s-eurc-grows-as-trade-war-pushes-euro-higher-analyst',
//     relatedTo: ['EURC'],
//   },
//   {
//     id: 9,
//     title: "Circle's USDC Stablecoin Receives Approval for Use in Japan",
//     source: 'Cointelegraph',
//     time: '1.5 months ago',
//     url: 'https://cointelegraph.com/tags/usd-coin',
//     relatedTo: ['USDC'],
//   },
//   {
//     id: 10,
//     title: 'GSK Completes Acquisition of IDRx, Expanding Oncology Pipeline',
//     source: 'BioSpace',
//     time: '3 months ago',
//     url: 'https://www.biospace.com/business/gsk-targets-rare-cancer-with-1b-acquisition-of-idrx',
//     relatedTo: ['IDRX'],
//   },
// ];

// interface NewsPanelProps {
//   selectedPair: { base: string; quote: string };
// }

// export default function NewsPanel({ selectedPair }: NewsPanelProps) {
//   const [news, setNews] = useState(allNews.slice(0, 4));

//   useEffect(() => {
//     // Filter news based on selected trading pair
//     const filteredNews = allNews
//       .filter((item) => item.relatedTo.includes(selectedPair.base))
//       .slice(0, 4);

//     // If we don't have enough news for this token, add some general news
//     if (filteredNews.length < 4) {
//       const generalNews = allNews
//         .filter((item) => !filteredNews.some((n) => n.id === item.id))
//         .slice(0, 4 - filteredNews.length);

//       setNews([...filteredNews, ...generalNews]);
//     } else {
//       setNews(filteredNews);
//     }
//   }, [selectedPair]);

//   return (
//     <div className="flex flex-col space-y-3">
//       {news.map((item) => (
//         <div
//           key={item.id}
//           className="bg-slate-800 rounded-lg p-3 hover:bg-slate-750 transition-colors"
//         >
//           <h3 className="font-medium mb-2">{item.title}</h3>
//           <div className="flex justify-between items-center text-xs text-slate-400">
//             <span>{item.source}</span>
//             <span>{item.time}</span>
//           </div>
//           <Button
//             variant="ghost"
//             size="sm"
//             className="w-full mt-2 text-blue-400 hover:text-blue-300 hover:bg-slate-700"
//             asChild
//           >
//             <a href={item.url} target="_blank" rel="noopener noreferrer">
//               Read More <ExternalLink size={12} className="ml-1" />
//             </a>
//           </Button>
//         </div>
//       ))}
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, ChevronDown } from 'lucide-react';
import { Button } from '@/components/crossChainSwap/ui/button';

// Mock data for news
const allNews = [
  {
    id: 1,
    title: 'Circle Files for IPO Amid Surging USDC Demand',
    source: 'Financial Times',
    time: '1 month ago',
    url: 'https://www.ft.com/content/7aaaf1f3-27ce-4142-92c4-c363cf2760ab',
    relatedTo: ['USDC'],
  },
  {
    id: 2,
    title: 'GSK Acquires IDRx for $1.15 Billion to Enhance Oncology Portfolio',
    source: 'The Guardian',
    time: '3 months ago',
    url: 'https://www.theguardian.com/business/2025/jan/13/gsk-to-buy-us-cancer-drug-firm-idrx',
    relatedTo: ['IDRX'],
  },
  {
    id: 3,
    title: 'Tether Gold (XAUT) Backed by 7.7 Tons of Physical Gold',
    source: 'Tether',
    time: '2 weeks ago',
    url: 'https://tether.io/news/tether-reports-xaut-grows-amid-shifting-monetary-landscape-releases-its-first-attestation-for-q1-2025-more-than-7-7-tons-of-physical-gold-backing-the-token-in-circulation/',
    relatedTo: ['XAUT'],
  },
  {
    id: 4,
    title: "Circle's EURC Stablecoin Supply Hits Record $246 Million",
    source: 'CoinDesk',
    time: '4 weeks ago',
    url: 'https://www.coindesk.com/markets/2025/04/14/circle-s-eurc-stablecoin-surges-43-to-record-supply-as-dollar-troubles-fuel-demand/',
    relatedTo: ['EURC'],
  },
  {
    id: 5,
    title: 'USDC Approved for Use in Japan, Launches on SBI VC Trade',
    source: 'Cointelegraph',
    time: '1.5 months ago',
    url: 'https://cointelegraph.com/tags/usd-coin',
    relatedTo: ['USDC'],
  },
  {
    id: 6,
    title: "IDRx's Lead Molecule Complements GSK's GI Cancer Pipeline",
    source: 'Contract Pharma',
    time: '2 months ago',
    url: 'https://www.contractpharma.com/breaking-news/gsk-acquires-idrx/',
    relatedTo: ['IDRX'],
  },
  {
    id: 7,
    title: 'Tether Gold Maintains Position as Leading Tokenized Gold Product',
    source: 'Tether',
    time: '2 weeks ago',
    url: 'https://tether.io/news/tether-reports-xaut-grows-amid-shifting-monetary-landscape-releases-its-first-attestation-for-q1-2025-more-than-7-7-tons-of-physical-gold-backing-the-token-in-circulation/',
    relatedTo: ['XAUT'],
  },
  {
    id: 8,
    title:
      "Circle's EURC Growth Driven by Demand for Euro-Denominated Digital Assets",
    source: 'Cointelegraph',
    time: '4 weeks ago',
    url: 'https://cointelegraph.com/news/circle-s-eurc-grows-as-trade-war-pushes-euro-higher-analyst',
    relatedTo: ['EURC'],
  },
  {
    id: 9,
    title: "Circle's USDC Stablecoin Receives Approval for Use in Japan",
    source: 'Cointelegraph',
    time: '1.5 months ago',
    url: 'https://cointelegraph.com/tags/usd-coin',
    relatedTo: ['USDC'],
  },
  {
    id: 10,
    title: 'GSK Completes Acquisition of IDRx, Expanding Oncology Pipeline',
    source: 'BioSpace',
    time: '3 months ago',
    url: 'https://www.biospace.com/business/gsk-targets-rare-cancer-with-1b-acquisition-of-idrx',
    relatedTo: ['IDRX'],
  },
];

// Define a function to convert relative time to days for sorting
const timeToSortValue = (time: string) => {
  if (time.includes('week')) {
    return parseInt(time) * 7;
  } else if (time.includes('month')) {
    return parseInt(time) * 30;
  } else if (time.includes('day')) {
    return parseInt(time);
  } else if (time.includes('hour')) {
    return parseInt(time) / 24;
  } else {
    return 0;
  }
};

// Sort news by time (newest first)
const sortedNews = [...allNews].sort((a, b) => {
  const aValue = timeToSortValue(a.time);
  const bValue = timeToSortValue(b.time);
  return aValue - bValue;
});

// Extract unique tokens from news
const allTokens = Array.from(
  new Set(sortedNews.flatMap((item) => item.relatedTo))
).sort();

interface NewsPanelProps {
  selectedPair: { base: string; quote: string };
}

export default function NewsPanel({ selectedPair }: NewsPanelProps) {
  const [displayedNews, setDisplayedNews] = useState(sortedNews);
  const [selectedToken, setSelectedToken] = useState('ALL');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter news when token selection changes
  useEffect(() => {
    if (selectedToken === 'ALL') {
      setDisplayedNews(sortedNews);
    } else {
      const filtered = sortedNews.filter((item) =>
        item.relatedTo.includes(selectedToken)
      );
      setDisplayedNews(filtered);
    }
  }, [selectedToken]);

  return (
    <div className="flex flex-col space-y-4 h-full">
      <div className="flex justify-between items-center">
        {/* <h2 className="text-lg font-semibold">Latest News</h2> */}
        <div className="relative">
          <Button
            variant="outline"
            className="flex items-center justify-between min-w-32"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedToken === 'ALL' ? 'All Tokens' : selectedToken}
            <ChevronDown size={16} className="ml-2" />
          </Button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-40 bg-slate-700 border border-slate-600 rounded-md shadow-lg z-10">
              <ul>
                <li
                  className="px-4 py-2 hover:bg-slate-600 cursor-pointer text-sm"
                  onClick={() => {
                    setSelectedToken('ALL');
                    setIsDropdownOpen(false);
                  }}
                >
                  All Tokens
                </li>
                {allTokens.map((token) => (
                  <li
                    key={token}
                    className="px-4 py-2 hover:bg-slate-600 cursor-pointer text-sm"
                    onClick={() => {
                      setSelectedToken(token);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {token}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-y-auto max-h-178 pr-2 flex flex-col space-y-3">
        {displayedNews.length > 0 ? (
          displayedNews.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 rounded-lg p-3 hover:bg-slate-750 transition-colors"
            >
              <h3 className="font-medium mb-1">{item.title}</h3>
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>{item.source}</span>
                <span>{item.time}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1 mb-1">
                {item.relatedTo.map((token) => (
                  <span
                    key={token}
                    className="bg-blue-900 text-blue-200 text-xs px-2 py-0.5 rounded"
                  >
                    {token}
                  </span>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-1 text-blue-400 hover:text-blue-300 hover:bg-slate-700"
                asChild
              >
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  Read More <ExternalLink size={12} className="ml-1" />
                </a>
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-400">
            No news available for the selected token.
          </div>
        )}
      </div>
    </div>
  );
}
