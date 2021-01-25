const { plasmaAddress } = require('../config/config');
const { Contract } = require('ethers');
const { providerEth } = require('./Provider');
const { ReversePlasmaFactory } = require('eraswap-sdk/dist/typechain/ESN');
const { es } = require('eraswap-sdk/dist');
const { PlasmaManagerFactory } = require('eraswap-sdk/dist/typechain/ETH');

const _abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_startBlockNumber',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_bunchDepth',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_bunchIndex',
        type: 'uint256',
      },
    ],
    name: 'NewBunchHeader',
    type: 'event',
  },
  {
    inputs: [],
    name: 'getAllValidators',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_bunchIndex',
        type: 'uint256',
      },
    ],
    name: 'getBunchHeader',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'startBlockNumber',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'bunchDepth',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'transactionsMegaRoot',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'receiptsMegaRoot',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'lastBlockHash',
            type: 'bytes32',
          },
        ],
        internalType: 'struct PlasmaManager.BunchHeader',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNextStartBlockNumber',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_validatorIndex',
        type: 'uint256',
      },
    ],
    name: 'getValidator',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_validator',
        type: 'address',
      },
    ],
    name: 'isValidator',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lastBunchIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'address[]',
        name: '_validators',
        type: 'address[]',
      },
    ],
    name: 'setInitialValues',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '_signedHeader',
        type: 'bytes',
      },
    ],
    name: 'submitBunchHeader',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token',
    outputs: [
      {
        internalType: 'contract ERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

// const plasmaManager = new Contract(
//   es.addresses[process.env.REACT_APP_NODE_ENV].ETH.plasmaManager, _abi, providerEth);

module.exports = {
  plasmaManager: PlasmaManagerFactory.connect(es.addresses.production.ETH.plasmaManager,providerEth),
};
