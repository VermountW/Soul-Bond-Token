import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { mantaSepoliaTestnet} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@rainbow-me/rainbowkit/styles.css';
import { Layout } from './components/Layout';
import Home from "./pages/Home";
import './index.css';

const config = getDefaultConfig({
  appName: 'Soul-Bond-Token',
  projectId: 'd0d3c96d2dfa5b1b158683dd2b20206c', // Get one from https://cloud.walletconnect.com
  chains: [mantaSepoliaTestnet],
  ssr: true,
  },
);

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <RouterProvider router={router} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);