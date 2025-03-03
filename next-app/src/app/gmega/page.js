"use client";
import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';

const TabButton = ({ active, onClick, children }) => (
    <button
        className={`px-6 cursor-pointer py-2 rounded-md font-medium transition-all duration-300 ${active ? 'bg-black text-white' : 'bg-black/5 text-black/60 hover:bg-black/10'
            }`}
        onClick={onClick}
    >
        {children}
    </button>
);

export default function Counter() {
    const [activeTab, setActiveTab] = useState('local');
    const [count, setCount] = useState(0);



    return (
        <main className="flex flex-col items-center h-screen pt-36 bg-[#e5e5e5]">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center -mt-20">
                <div className="flex gap-4 mb-9">
                    <TabButton
                        active={activeTab === 'local'}
                        onClick={() => setActiveTab('local')}
                    >
                        Local
                    </TabButton>
                    <TabButton
                        active={activeTab === 'mega'}
                        onClick={() => setActiveTab('mega')}
                    >
                        Mega
                    </TabButton>
                </div>

                <div className="flex flex-col items-center transition-opacity duration-300">
                    <h1 className="text-4xl font-bold mb-4 text-black">
                        {activeTab === 'local' ? 'Local' : 'Global'} gmega counter
                    </h1>

                    {activeTab === 'mega' && (
                        <p className="text-black/60 text-center mb-8 max-w-[600px]">
                            This page is reading and writing data inside a contract that is
                            pre-deployed on MegaETH testnet.
                        </p>
                    )}
                    <div className="bg-white/50 rounded-2xl p-12 shadow-sm mb-8 min-w-[400px] min-h-[250px] flex justify-center items-center">
                        <span className="text-8xl text-black font-bold">{count}</span>
                    </div>

                    <button
                        className="bg-black  cursor-pointer text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-black/80 transition-all duration-300"
                        onClick={() => setCount(prev => prev + 1)}
                    >
                        say gmega!
                    </button>
                </div>
            </div>
        </main>
    );
}