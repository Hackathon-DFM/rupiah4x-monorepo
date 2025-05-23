import type { Token, Network } from './types';
import { arbitrumSepolia, liskSepolia } from 'wagmi/chains';

export const networks: Network[] = [
  {
    chainId: liskSepolia.id,
    name: 'Lisk Sepolia',
    logoURI: '/liskSepolia.png',
    // nativeCurrency: {
    //   name: 'ETH',
    //   symbol: 'ETH',
    //   decimals: 18,
    // },
  },
  {
    chainId: arbitrumSepolia.id,
    name: 'Arbitrum Sepolia',
    logoURI: '/arbitrumSepolia.png',
    // nativeCurrency: {
    //   name: 'ETH',
    //   symbol: 'ETH',
    //   decimals: 18,
    // },
  },
  // {
  //   chainId: baseSepolia.id,
  //   name: 'Base Sepolia',
  //   logoURI: '/baseSepolia.png',
  //   // nativeCurrency: {
  //   //   name: 'ETH',
  //   //   symbol: 'ETH',
  //   //   decimals: 18,
  //   // },
  // },
  // {
  //   chainId: arbitrumSepolia.id,
  //   name: 'ARB Sepolia',
  //   logoURI: '/arbitrumSepolia.png',
  //   // nativeCurrency: {
  //   //   name: 'ETH',
  //   //   symbol: 'ETH',
  //   //   decimals: 18,
  //   // },
  // },

  // {
  //   chainId: sepolia.id,
  //   name: 'Sepolia',
  //   logoURI: '/sepoliaEth.png',
  //   // nativeCurrency: {
  //   //   name: 'Ether',
  //   //   symbol: 'ETH',
  //   //   decimals: 18,
  //   // },
  // },
  // {
  //   chainId: eduChainTestnet.id,
  //   name: 'Edu Chain Testnet',
  //   logoURI: '/educhainLogo.png',
  //   // nativeCurrency: {
  //   //   name: 'EDU',
  //   //   symbol: 'EDU',
  //   //   decimals: 18,
  //   // },
  // },

  // {
  //   id: 'arbitrum',
  //   name: 'Arbitrum',
  //   chainId: 42161,
  //   logoURI: '/placeholder.svg?height=32&width=32&text=ARB',
  //   nativeCurrency: {
  //     name: 'Ether',
  //     symbol: 'ETH',
  //     decimals: 18,
  //   },
  // },
];

export const tokens: Token[] = [
  // Ethereum tokens
  {
    chainId: 4202,
    address: '0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661',
    name: 'IDRX',
    symbol: 'IDRX',
    decimals: 2,
    logoURI: '/idrx.png',
    // balance: '0',
    usdPrice: 1,
    network: networks[0].name,
  },
  {
    chainId: 4202,
    address: '0x277fd836ff04a6085284f70a6acdcc585f8d1ffb',
    name: 'USDC',
    symbol: 'USDC',
    decimals: 18,
    logoURI: '/usdc.png',
    // balance: '0',
    usdPrice: 1,
    network: networks[0].name,
  },
  {
    chainId: 4202,
    address: '0x4a5901392665ec05c6977a3e8b7fe8c13402d315',
    name: 'EURC',
    symbol: 'EURC',
    decimals: 18,
    logoURI: '/eurc.png',
    // balance: '0',
    usdPrice: 1,
    network: networks[0].name,
  },
  {
    chainId: 4202,
    address: '0x6755309cc9bd08c235459c94d3811a4e57a023e7',
    name: 'XAUT',
    symbol: 'XAUT',
    decimals: 18,
    logoURI: '/xaut.png',
    // balance: '0',
    usdPrice: 1,
    network: networks[0].name,
  },
  {
    chainId: 421614,
    address: '0xcb46d923b502e87598e4fcb37211cd217c61002e',
    name: 'IDRX',
    symbol: 'IDRX',
    decimals: 18,
    logoURI: '/idrx.png',
    // balance: '0',
    usdPrice: 1,
    network: networks[1].name,
  },
  {
    chainId: 421614,
    address: '0x309def7a04855608416d2ddf79163edcbed93b4f',
    name: 'USDC',
    symbol: 'USDC',
    decimals: 18,
    logoURI: '/usdc.png',
    // balance: '0',
    usdPrice: 1,
    network: networks[1].name,
  },
  {
    chainId: 421614,
    address: '0x830ef72b548491b4cc15769ab0d994618b653a24',
    name: 'EURC',
    symbol: 'EURC',
    decimals: 18,
    logoURI: '/eurc.png',
    // balance: '0',
    usdPrice: 1,
    network: networks[1].name,
  },
  {
    chainId: 421614,
    address: '0x952567da1bfd59254729d911098d0554bc13d641',
    name: 'XAUT',
    symbol: 'XAUT',
    decimals: 18,
    logoURI: '/xaut.png',
    // balance: '0',
    usdPrice: 1,
    network: networks[1].name,
  },
];
