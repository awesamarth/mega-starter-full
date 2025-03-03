# Mega Starter

This is a starter Next.js template made for developers building on MegaETH. This app comes pre-configured with Reown (prev. WalletConnect), wagmi, viem and a Foundry project.

By default, this app is set up to interact with a smart contract deployed on MegaETH testnet. You can find the address of this contract in next-app/constants/index.js and its code in foundry-app/src/GmegaCounter.sol. Jump to this section to learn how to deploy your own contract on either MegaETH or a local blockchain.

## Getting Started
Install the Mega CLI if you don't have it already
```shell
npm install -g mega-cli
#or
pnpm add -g mega-cli
#or
yarn global add mega-cli
```

Run the app and also start a local blockchain node using this command:

```shell
mega dev
```
>
> Note: This command will start both the frontend and foundry servers in the same terminal. For cleaner output, you can run them in separate terminals: 
> ```shell
> mega dev --foundry
> # and then in a new terminal
> mega dev --frontend
>```

## Deploying Contracts
### Locally
Make sure you are in the root directory and run the following command: 
```shell
mega deploy foundry-app/src/GmegaCounter.sol:GmegaCounter --broadcast
```
This command will use the first account provided by Anvil to deploy your contract to the local blockchain. If you edited the contract before deploying, copy the address you see in the terminal (deployed to: 0x....) and paste it in next-app/src/constants/index.js as the value of the LOCAL_GMEGA_CONTRACT_ADDRESS variable for changes to be visible on the frontend. You will also have to get the new contract ABI which you'll find in `out/<contract-name>.json`. Now you can interact with the locally deployed smart contract using the Next.js app!

### On MegaETH
If you open next-app/src/constants/index.js, you will see that it uses a pre-deployed contract on the MegaETH testnet. If you want to deploy it yourself, make sure you have Mega testnet ETH in your dev account and follow the steps below.

If you have an account in your keystore (which you can create using `mega account create`), you can use it to deploy contracts on Mega like so:
```shell
mega deploy foundry-app/src/<name-of-contract-file>.sol:<name-of-contract> --account <name-of-account> --broadcast
```
This command will ask you to enter the password for the account you provided and will then deploy your contract to MegaETH Testnet

If you want to use private keys instead, Create a new `.env.local` file in the root directory based on the .env.example file. Add your private key to this file. Ensure this doesn't contain any mainnet funds, just for safety purposes.

Point your terminal to the root directory and run `source .env.local` in the terminal to load up the environment variables in the .env.local file. Once that is done, run this command:

```shell
mega deploy foundry-app/src/<name-of-contract-file>.sol:<name-of-contract> --private-key $DEV_PRIVATE_KEY --broadcast --testnet
```

Congratulations! Your smart contract is now deployed on MegaETH testnet. Copy the address you see in the terminal and paste it in next-app/src/constants/index.js as the value of the MEGA_GMEGA_CONTRACT_ADDRESS variable for changes to reflect on the frontend. Now you can interact with the deployed smart contract on Morph using the Next.js app!
