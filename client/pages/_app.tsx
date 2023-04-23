
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import '@rainbow-me/rainbowkit/styles.css';
import Layout from "@/components/Layout";
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet,polygonMumbai} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { useHuddle01 } from "@huddle01/react";

const { chains, provider } = configureChains(
  [mainnet, polygonMumbai],
  [
    alchemyProvider({ apiKey: "s6Dbs5VQM5YfT02mh1emBMNqaGl0unZo"}),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'videojam',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})
export default function App({ Component, pageProps }: AppProps) {
  const { initialize } = useHuddle01();
  useEffect(() => {
    initialize("KL1r3E1yHfcrRbXsT4mcE-3mK60Yc3YR");
  }, []);

  return (
    <>
     <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
      <Layout>
      <Component {...pageProps} />
      </Layout>
      </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

