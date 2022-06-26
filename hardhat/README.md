# Whitelist Dapp - Hardhat

> An instance of this contract has been deployed on Ethereum Rinkeby testnet: https://rinkeby.etherscan.io/address/0xAfb07FA35d6845c4E563FAf046Ea2d3bd4811695

## Install dependencies

```bash
$ cd Whitelist-Dapp/hardhat
$ yarn
```

## Deploy on a local blockchain

#### Step 1. Run local node and set development acounts

```bash
$ yarn hardhat node
```

#### Step 2. Choose one of the hardhat node account and import its private key in a wallet, e.g. [Metamask](https://metamask.io/faqs/). You'll also need it in the next step.

#### Step 3. Create `.env` file in `hardhat/` directory and set variables

> You need to create a new app on [Alchemy](https://www.alchemy.com) to get an ALCHEMY_API_KEY. Alternatively you can create an app on [Infura](https://infura.io). ACCOUNT_PRIVATE_KEY is the private key of the previous step

```bash
# hardhat/.env
ALCHEMY_API_KEY_URL=https://eth-rinkeby.alchemyapi.io/v2/<ALCHEMY_API_KEY>
RINKEBY_PRIVATE_KEY=<ACCOUNT_PRIVATE_KEY>
```

#### Step 4. Customize the deployment script

> You can modify the initial limit of 10 whitelist addresses in `scripts/deploy.js`

```javascript
 9|// contract deployment
10| const deployedWhitelistContract = await whitelistContract.deploy(10);
```

#### Step 5. Compile the smart contract and run the deployment script

> You will need the deployed smart contract address

```bash
$ yarn hardhat compile
$ yarn hardhat run scripts/deploy.js --network localhost
```

#### Step 6. Set the contract address, abi, CHAIN_ID and CHAIN_NAME in `app/constants/index.js`

> abi value can be found in `hardhat/artifacts/Whitelist.json`. Contract address is obtained from previous step.

```javascript
export const CHAIN_ID = 1337;
export const CHAIN_NAME = 'local';
export const abi = [
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '_maxWhitelistedAddresses',
        type: 'uint8'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'addAddressToWhiteList',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'maxWhitelistedAddresses',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'numAddressesWhitelisted',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'whitelistedAddresses',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];
export const WHITELIST_CONTRACT_ADDRESS = '<YOUR_DEPLOYED_CONTRACT_ADDRESS>';
```

#### Step 7. Run the [app](https://github.com/josayko/Whitelist-Dapp)

## Deploy on Rinkeby testnet

It is similar to _Deploy on a local blockchain_ procedure with some minor differences on those steps:

#### Step 1.

- Not needed

#### Step 2.

- Instead of importing a hardhat node account, you just need to set an account in Metamask with Rinkeby testnet

#### Step 3.

- You need to export your Metamask account private key from the previous step

#### Step 4.

- Same

#### Step 5.

```bash
$ yarn hardhat compile
$ yarn hardhat run scripts/deploy.js --network rinkeby
```

#### Step 6.

- Don't need to set CHAIN_ID and CHAIN_NAME. Defaults are `CHAIN_ID = 4` and `CHAIN_NAME = 'Rinkeby'`

#### Step 7.

- Same
