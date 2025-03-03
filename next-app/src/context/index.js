'use client'

import { wagmiAdapter, projectId } from '@/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { mainnet, arbitrum, scrollSepolia, foundry, sepolia } from '@reown/appkit/networks'
import React from 'react'
import { cookieToInitialState, WagmiProvider} from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
  name: 'gambit',
  description: 'AppKit Example',
  url: 'https://appkitexampleapp.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [foundry, sepolia],
  defaultNetwork: sepolia,
  metadata: metadata,
  features: {
    email:false,
    socials:['google'],
  },
  themeVariables:{
    '--w3m-accent': '#121212',
    '--w3m-border-radius-master' : '0.5px'
  },
  themeMode:'light'
})

function ContextProvider({ children, cookies }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig , cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig } initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider