// https://www.rainbowkit.com/docs/installation
import '@rainbow-me/rainbowkit/styles.css';
import { ALCHEMY_ID } from '../constants';

import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';

import { chain, createClient, WagmiProvider } from 'wagmi';

const { chains, provider } = configureChains(
  [chain.goerli, chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [apiProvider.alchemy(ALCHEMY_ID), apiProvider.fallback()]
);

const { connectors } = getDefaultWallets({
  appName: 'Whitelist Dapp',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />;
      </RainbowKitProvider>
    </WagmiProvider>
  );
}

export default MyApp;
