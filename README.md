# Coding Dojo

## Optional Requirements
- We provide you with a JWT-Token to make requests to the web3 storage. (Valid on this day)
- If you want your own, you can create one for free.
- Navigate to https://web3.storage/ and register for free
- create a new api key on the web3.storage -> Account -> API-Token
- Insert the token in this project -> const=web3StorageToken -> File: `./svelte/src/lib/web3.storage.ts`

# Setup
### 1 Install Hardhat Test Blockchain
- `cd ./hardhat`
- `npm install`
- `npm run compile` compile your contracts from ./contracts folder

### 2 Start Hardhat
- `cd ./hardhat`
- `npm run node` start the local blockchain in one terminal
- `npm run deploy`

### 3 Install Svelte Frontend
- (new Terminal window)
- `cd ./svelte`
- `npm install`

### 4 Start Svelte Frontend
- `cd ./svelte`
- `npm run dev`

## Metamask Setup
- Install Metamask Browser Plugin from https://metamask.io/

### You have already a mnemonic connected to your metamask?
If you already have a working and private mnemonic and you don't want to use it for this development
Just Import the first test account that is created with Hardhat

- Add local network to metamask (right upper circle -> import account)
- Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

You still need to import the network from the next step.

### You don't have a mnemonic connected to your metamask?
- Use ```No, I already have a Secret Recovery Phrase -  Import your wallet```
- Use this mnemonic: ```test test test test test test test test test test test junk```
- Set a password (only to encrypt on your local pc)
- Add local network to metamask (right upper circle -> settings -> networks -> add a network -> add a network manually)
```
localnetwork config:
network name: localhost:8545
rpc-url: http://127.0.0.1:8545/
chain-id:  0x11111 (or: 69905)
symbol: ETH (might be buggy - not that important)
```
# Develop your Contract

### Hardhat
Develop your Contract in the CodingDojo.sol File `./hardhat/contracts/CodingDojo.sol`
- `cd ./hardhat`
- `npm run deploy` compile and deploy your contract from ./contracts folder
- `npm run test` run the tests from your ./test folder

## Other Resources
ERC721 Specification: https://eips.ethereum.org/EIPS/eip-721 \
Solidity by Example: https://solidity-by-example.org/ \
Svelte Basics: https://svelte.dev/tutorial/basics \
SvelteKit Basics: https://kit.svelte.dev/docs/introduction
