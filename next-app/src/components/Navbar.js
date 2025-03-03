"use client";
import Image from 'next/image';
import Link from 'next/link';

// Navbar.js
export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-4 px-6 bg-[#e5e5e5]  border-b-2 border-black/10 backdrop-blur-xl">
      <Link href="/" className="flex items-center">
        <Image 
          src="/logo-smol-transparent.png"
          alt="MegaETH"
          width={50}
          height={50}
          className="drop-shadow-sm hover:drop-shadow-md transition-all duration-300"
        />
      </Link>

      <w3m-button />

    </nav>
  );
}