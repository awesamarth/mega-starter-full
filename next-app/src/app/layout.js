import Navbar from '@/components/Navbar';
import './globals.css';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers'
import ContextProvider from '@/context'
import { GMEGA_CONTRACT_ABI, MEGA_GMEGA_CONTRACT_ADDRESS, LOCAL_GMEGA_CONTRACT_ADDRESS } from "@/constants";

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}) {
  const headersList = await headers()
  const cookies = headersList.get('cookie')

  return (
    <html lang="en">
      <ContextProvider cookies={cookies}>
      <body className={inter.className}>
        {children}
      </body>
      </ContextProvider>
    </html>
  );
}