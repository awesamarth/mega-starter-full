export const LOCAL_GMEGA_CONTRACT_ADDRESS="0x5FbDB2315678afecb367f032d93F642f64180aa3"
export const MEGA_GMEGA_CONTRACT_ADDRESS="0x0dFA442871d80A77B669248f6e7437580D4EbDfd"
export const GMEGA_CONTRACT_ABI= [
    {
        "type": "function",
        "name": "gmegaCount",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "increment",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    }
]