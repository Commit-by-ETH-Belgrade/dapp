"use client";

import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import {
  createConfig,
  WagmiProvider,
} from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { mainnet } from 'viem/chains';

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { FlowWalletConnectors } from "@dynamic-labs/flow";

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function Providers({children}) {
  return (
    <DynamicContextProvider
      settings={{
        // Find your environment id at https://app.dynamic.xyz/dashboard/developer
        environmentId: "83994a2f-18f0-4759-a7ec-f3f7d85ea123",

        walletConnectors: [
          EthereumWalletConnectors,
          FlowWalletConnectors
        ],
      }}
      theme={"dark"}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            {/*<DynamicWidget />*/}
            {children}
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
};