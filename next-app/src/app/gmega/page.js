"use client";
import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';
import { GMEGA_CONTRACT_ABI, LOCAL_GMEGA_CONTRACT_ADDRESS, MEGA_GMEGA_CONTRACT_ADDRESS } from '@/constants';
import { useReadContract, useWriteContract, useSwitchChain, useWaitForTransactionReceipt } from 'wagmi';
import { foundry, megaethTestnet } from 'viem/chains';

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
    const [activeTab, setActiveTab] = useState('mega');
    const { switchChain } = useSwitchChain();
    const { writeContractAsync } = useWriteContract();
    const [txHash, setTxHash] = useState();
    
    // This will track the transaction and wait for it to be confirmed
    const {isSuccess: isTxConfirmed } = useWaitForTransactionReceipt({
        hash: txHash,
    });
    
    // This reads the contract data
    const { data: countData, refetch: refetchCount } = useReadContract({
        address: activeTab === 'local' ? LOCAL_GMEGA_CONTRACT_ADDRESS : MEGA_GMEGA_CONTRACT_ADDRESS,
        abi: GMEGA_CONTRACT_ABI,
        functionName: 'gmegaCount'
    });
    useEffect(() => {
        if (activeTab === 'local') {
            console.log(activeTab)
            switchChain({ chainId: foundry.id })
        } else {
            switchChain({ chainId: megaethTestnet.id })
        }
    }, [activeTab, switchChain]); 


    
    // Refetch when a transaction is confirmed
    useEffect(() => {
        if (isTxConfirmed) {
            refetchCount();
            setTxHash(undefined); // Clear the hash after we've confirmed it
        }
    }, [isTxConfirmed, refetchCount]);

    const sayGmega = async () => {
        try {
            const result = await writeContractAsync({
                address: activeTab === 'local' ? LOCAL_GMEGA_CONTRACT_ADDRESS : MEGA_GMEGA_CONTRACT_ADDRESS,
                abi: GMEGA_CONTRACT_ABI,
                functionName: 'sayGmega'
            });
            
            console.log("Transaction submitted:", result);
            setTxHash(result); // Store the transaction hash to track it
            
            // For local chains, we can just refetch immediately as well
            if (activeTab === 'local') {
                setTimeout(() => refetchCount(), 1000);
            }
        } catch (error) {
            console.error("Error saying gmega:", error);
        }
    };

    // Check if local contract address is empty
    const isLocalContractMissing = activeTab === 'local' && countData == undefined

    return (
        <main className="flex flex-col items-center h-screen pt-36 bg-[#e5e5e5]">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center -mt-20">
                <div className="flex gap-4 mb-9">

                    <TabButton
                        active={activeTab === 'mega'}
                        onClick={() => setActiveTab('mega')}
                    >
                        Mega
                    </TabButton>
                    <TabButton
                        active={activeTab === 'local'}
                        onClick={() => setActiveTab('local')}
                    >
                        Local
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

                    {isLocalContractMissing ? (
                        <div className=" rounded-2xl p-12  mb-8 min-w-[400px] min-h-[250px] flex justify-center items-center">
                            <p className="text-black text-center text-lg font-medium">
                                Locally deployed contract not found. Refer to the README to learn how you can deploy contracts locally
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="bg-white/50 rounded-2xl p-12 shadow-sm mb-8 min-w-[400px] min-h-[250px] flex justify-center items-center">
                                <span className="text-8xl text-black font-bold">{countData}</span>
                            </div>

                            <button
                                className="bg-black cursor-pointer text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-black/80 transition-all duration-300"
                                onClick={sayGmega}
                                disabled={!!txHash && activeTab === 'mega'} 
                            >
                                {txHash && activeTab === 'mega' ? 'Confirming...' : 'say gmega!'}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}