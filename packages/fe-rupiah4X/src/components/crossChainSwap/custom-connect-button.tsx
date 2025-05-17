import { config } from '@/app/App';
import { networks } from '@/lib/crossChainSwap/data';
import { Network } from '@/lib/crossChainSwap/types';
import { ConnectButton } from '@xellar/kit';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { arbitrumSepolia, liskSepolia } from 'viem/chains';
import { disconnect } from 'wagmi/actions';
import { DisconnectConfirmModal } from '../DisconnectModal';

interface NetworkSelectorProps {
  selectedNetwork: Network;
  setSelectedNetwork: (network: Network) => void;
}

export const CustomConnectButton = ({
  selectedNetwork,
  setSelectedNetwork,
}: NetworkSelectorProps) => {
  const [connectedChainId, setConnectedChainId] = useState<number | null>(null);
  const latestChainIdRef = useRef<number | null>(null);

  const supportedChains = [liskSepolia, arbitrumSepolia];

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (
      latestChainIdRef.current &&
      latestChainIdRef.current !== connectedChainId
    ) {
      setConnectedChainId(latestChainIdRef.current);
    }
  }, [connectedChainId]);

  useEffect(() => {
    if (connectedChainId != null) {
      const matchingNetwork = networks.find(
        (n) => n.chainId === connectedChainId
      );
      if (
        matchingNetwork &&
        matchingNetwork.chainId !== selectedNetwork.chainId
      ) {
        setSelectedNetwork(matchingNetwork);
      }
    }
  }, [connectedChainId]);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal }) => {
        const connected = account && chain;

        const isUnsupported =
          chain && !supportedChains.find((c) => c.id === chain.id);

        if (connected && chain) {
          latestChainIdRef.current = chain.id;
        }

        return !connected ? (
          <button
            onClick={openConnectModal}
            type="button"
            className="px-4 py-2 bg-white text-black font-semibold rounded-xl border shadow-sm hover:shadow-md transition-transform hover:scale-105 active:scale-95 flex items-center gap-1"
          >
            Connect Wallet <ChevronDown className="w-4 h-4" />
          </button>
        ) : chain && isUnsupported ? (
          <button
            onClick={openChainModal}
            type="button"
            className="px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-xl border border-red-300 shadow-sm hover:shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            Wrong network
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={openChainModal}
              type="button"
              className="flex items-center px-4 py-2 bg-white text-black font-semibold rounded-xl border shadow-sm hover:shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              {chain.name} ({account.address.slice(0, 6)}...
              {account.address.slice(-4)})
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => setModalOpen(true)}
              type="button"
              className="px-3 py-2 bg-gray-100 text-black font-medium rounded-xl border border-gray-300 shadow-sm hover:bg-gray-200 transition-tranform hover:scale-105 transition active:scale-95"
            >
              Disconnect
            </button>

            {connected && (
              <DisconnectConfirmModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={() => disconnect(config)}
              />
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
