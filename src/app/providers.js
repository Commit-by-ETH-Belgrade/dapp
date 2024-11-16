"use client";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import { mainnet, sepolia, } from 'viem/chains';

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { FlowWalletConnectors } from "@dynamic-labs/flow";

const config = createConfig({
  chains: [sepolia],
  multiInjectedProviderDiscovery: false,
  transports: {
    [sepolia.id]: http("https://sepolia.gateway.tenderly.co/4qbXc80wWRNPYLf2MaDD7A"),
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
            <ToastContainer
              theme="dark"
              position="bottom-right"
              hideProgressBar="true"
            />
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
};