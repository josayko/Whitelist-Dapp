export const CHAIN_ID = 5;
export const CHAIN_NAME = 'Goerli';
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
export const WHITELIST_CONTRACT_ADDRESS =
  '0xAfb07FA35d6845c4E563FAf046Ea2d3bd4811695';
