import { http, createConfig } from '@wagmi/core';
import { arbitrumSepolia, liskSepolia } from '@wagmi/core/chains';

export const config = createConfig({
  chains: [arbitrumSepolia, liskSepolia],
  transports: {
    [arbitrumSepolia.id]: http(
      'https://arb-sepolia.g.alchemy.com/v2/b62NyAWstIB-5d6NCEZkAHYVTeZ5IPtJ'
    ),
    [liskSepolia.id]: http(process.env.NEXT_PUBLIC_LISK_SEPOLIA_RPC_URL),
  },
});
