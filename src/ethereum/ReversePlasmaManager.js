const { reversePlasmaAddress } = require('../config/config');
const { Contract, ethers } = require('ethers');
const { providerESN } = require('./Provider');
const { ReversePlasmaFactory } = require('eraswap-sdk/dist/typechain/ESN');
const { es } = require('eraswap-sdk/dist');

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
        name: 'blockNumber',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'proposalId',
        type: 'uint256',
      },
    ],
    name: 'NewBlockHeader',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_ethBlockNumber',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_proposalId',
        type: 'uint256',
      },
    ],
    name: 'finalizeProposal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_ethBlockNumber',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: '_transactionsRoot',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: '_receiptsRoot',
        type: 'bytes32',
      },
    ],
    name: 'findProposal',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
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
        name: '_ethBlockNumber',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_proposalId',
        type: 'uint256',
      },
    ],
    name: 'getEthHeaderProposal',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'transactionsRoot',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'receiptsRoot',
            type: 'bytes32',
          },
          {
            internalType: 'address[]',
            name: 'proposalValidators',
            type: 'address[]',
          },
        ],
        internalType: 'struct ReversePlasma.BlockHeaderProposal',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_ethBlockNumber',
        type: 'uint256',
      },
    ],
    name: 'getEthHeaderProposals',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'transactionsRoot',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'receiptsRoot',
            type: 'bytes32',
          },
          {
            internalType: 'address[]',
            name: 'proposalValidators',
            type: 'address[]',
          },
        ],
        internalType: 'struct ReversePlasma.BlockHeaderProposal[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_blockNumber',
        type: 'uint256',
      },
    ],
    name: 'getFinalizedEthHeader',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'transactionsRoot',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'receiptsRoot',
            type: 'bytes32',
          },
        ],
        internalType: 'struct ReversePlasma.BlockHeaderFinalized',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_ethBlockNumber',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_proposalId',
        type: 'uint256',
      },
    ],
    name: 'getProposalValidators',
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
        name: '_ethBlockNumber',
        type: 'uint256',
      },
    ],
    name: 'getProposalsCount',
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
    name: 'latestBlockNumber',
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
        name: '_ethBlockNumber',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: '_transactionsRoot',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: '_receiptsRoot',
        type: 'bytes32',
      },
    ],
    name: 'proposeBlock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_tokenOnETH',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_startBlockNumber',
        type: 'uint256',
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
    inputs: [],
    name: 'tokenOnETH',
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
];

// const reversePlasmaManager = new Contract(
//   reversePlasmaAddress,
//   _abi,
//   new ethers.providers.JsonRpcProvider('https://node2.testnet.eraswap.network')
// );

module.exports = {
  reversePlasmaManager: ReversePlasmaFactory.connect(
    es.addresses.production.ESN.reversePlasma,
    providerESN
  ),
};
