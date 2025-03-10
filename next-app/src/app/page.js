"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { megaethTestnet  } from "viem/chains";




export default function Home() {
  const chainId = useChainId()
  const {address} = useAccount()
  const { chains, switchChain } = useSwitchChain();



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#e5e5e5] text-black">
      <Navbar />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-black/10 bg-[#e5e5e5] pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-white/50 lg:p-4 text-base font-medium tracking-wide">
          Start building on MegaETH with Nextjs and Foundry!
        </p>
      </div>

      <div className="relative flex place-items-center mt-10 pl-5">
        <Image
          className="relative drop-shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:drop-shadow-[0_0_25px_rgba(0,0,0,0.2)] transition-all duration-500"
          src="/megaeth-text-logo.png" 
          alt="MegaETH Logo"
          width={600}
          height={50}
          priority
        />
      </div>
      
      <div className="w-[80%] text-lg text-center mt-4 mb-1">
        Watch this page update as you edit <code className="bg-black/5 px-2 py-1 rounded font-mono">src/page.js</code>.<br />{" "}
        {!address && 
          <div className="mt-4 text-black/60">
            Connect your wallet to unlock a page where you can <br/> 
            start interacting with smart contracts right away :&#41;
          </div>
        }{" "}
        {address && chainId == megaethTestnet.id && 
          <div className="mt-4 font-bold text-emerald-600">Page unlocked!</div>        }
      </div>

      {address ? 
        (chainId == megaethTestnet.id ? (
          <Link href="/gmega">
            <button className="-mt-3 mb-2 cursor-pointer bg-black text-white px-6 py-2 rounded-md hover:bg-black/80 transition-all duration-300 font-medium">
              gmega counter
            </button>
          </Link>
        ) : 
        <div className="text-black/60">
          Almost there! <span className="text-black font-medium underline hover:cursor-pointer hover:text-black/80 transition-colors" 
          onClick={() => {switchChain({chainId: megaethTestnet.id})}}>
            Switch to MegaETH Testnet
          </span> to unlock the page!
        </div>
      ) : ""}

      <div className="grid text-center lg:max-w-5xl lg:w-full lg:grid-cols-4 lg:text-left -mb-7 gap-6">
        <Link href="https://docs.megaeth.io/" 
          className="group rounded-lg border border-black/10 bg-white/50 px-6 py-5 transition-all duration-300 hover:bg-white hover:border-black/20 shadow-sm hover:shadow-md">
          <h2 className="mb-3 text-2xl font-bold uppercase tracking-wide">
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-black/60">
            Learn how to build on MegaETH
          </p>
        </Link>

        <Link href="/faucet" 
          className="group rounded-lg border border-black/10 bg-white/50 px-6 py-5 transition-all duration-300 hover:bg-white hover:border-black/20 shadow-sm hover:shadow-md">
          <h2 className="mb-3 text-2xl font-bold uppercase tracking-wide">
            Faucet{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-black/60">
            Get testnet ETH on MegaETH Testnet with the help of this faucet
          </p>
        </Link>

        <Link href="https://bridge.megaeth.io/" 
          className="group rounded-lg border border-black/10 bg-white/50 px-6 py-5 transition-all duration-300 hover:bg-white hover:border-black/20 shadow-sm hover:shadow-md">
          <h2 className="mb-3 text-2xl font-bold uppercase tracking-wide">
            Bridge{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-black/60">
            Bridge from Ethereum Sepolia to MegaETH Testnet
          </p>
        </Link>

        <Link href="https://megaeth.com/" 
          className="group rounded-lg border border-black/10 bg-white/50 px-6 py-5 transition-all duration-300 hover:bg-white hover:border-black/20 shadow-sm hover:shadow-md">
          <h2 className="mb-3 text-2xl font-bold uppercase tracking-wide">
            Explore{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-black/60">
            Learn more about the MegaETH ecosystem
          </p>
        </Link>
      </div>
    </main>
  );
}