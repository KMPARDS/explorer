const { es } = require('eraswap-sdk/dist');
const { ValidatorManagerFactory } = require('eraswap-sdk/dist/typechain/ESN');
const { ethers, Contract } = require('ethers');
const { validatorsStakesAddress } = require('../config/config');
const {providerESN } = require('./Provider');

const _abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'blockRewardContract',
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
    inputs: [],
    name: 'deployer',
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
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_base',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_premiumFactor',
        type: 'uint256',
      },
    ],
    name: 'getAdjustedAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_month',
        type: 'uint256',
      },
    ],
    name: 'getBlockRewardsMonthlyNRT',
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
        name: '_month',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_validator',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_stakingContract',
        type: 'address',
      },
    ],
    name: 'getDelegatorByAddress',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'stakingContract',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'withdrawn',
            type: 'bool',
          },
        ],
        internalType: 'struct ValidatorManager.Delegator',
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
        name: '_month',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_validatorIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_delegatorIndex',
        type: 'uint256',
      },
    ],
    name: 'getDelegatorByIndex',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'stakingContract',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'withdrawn',
            type: 'bool',
          },
        ],
        internalType: 'struct ValidatorManager.Delegator',
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
        name: '_month',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_validatorIndex',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_stakingContract',
        type: 'address',
      },
    ],
    name: 'getDelegatorIndex',
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
    inputs: [],
    name: 'getLuckyValidatorAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_month',
        type: 'uint256',
      },
    ],
    name: 'getTotalAdjustedStakings',
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
        name: '_month',
        type: 'uint256',
      },
    ],
    name: 'getTotalBlocksSealed',
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
        name: '_month',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_validator',
        type: 'address',
      },
    ],
    name: 'getValidatorByAddress',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'wallet',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'adjustedAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'perThousandCommission',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'blocksSealed',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'withdrawn',
            type: 'bool',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'stakingContract',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bool',
                name: 'withdrawn',
                type: 'bool',
              },
            ],
            internalType: 'struct ValidatorManager.Delegator[]',
            name: 'delegators',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct ValidatorManager.Validator',
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
        name: '_month',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_validatorIndex',
        type: 'uint256',
      },
    ],
    name: 'getValidatorByIndex',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'wallet',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'adjustedAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'perThousandCommission',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'blocksSealed',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'withdrawn',
            type: 'bool',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'stakingContract',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bool',
                name: 'withdrawn',
                type: 'bool',
              },
            ],
            internalType: 'struct ValidatorManager.Delegator[]',
            name: 'delegators',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct ValidatorManager.Validator',
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
        name: '_month',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_validator',
        type: 'address',
      },
    ],
    name: 'getValidatorEarning',
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
        name: '_month',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_validator',
        type: 'address',
      },
    ],
    name: 'getValidatorIndex',
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
        name: '_month',
        type: 'uint256',
      },
    ],
    name: 'getValidators',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'wallet',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'adjustedAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'perThousandCommission',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'blocksSealed',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'withdrawn',
            type: 'bool',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'stakingContract',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bool',
                name: 'withdrawn',
                type: 'bool',
              },
            ],
            internalType: 'struct ValidatorManager.Delegator[]',
            name: 'delegators',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct ValidatorManager.Validator[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nrtManager',
    outputs: [
      {
        internalType: 'contract NRTManager',
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
        internalType: 'uint256',
        name: '_month',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_seed',
        type: 'uint256',
      },
    ],
    name: 'pickValidator',
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
    inputs: [],
    name: 'randomnessManager',
    outputs: [
      {
        internalType: 'contract RandomnessManager',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'receiveNrt',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_sealer',
        type: 'address',
      },
    ],
    name: 'registerBlock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_month',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_extraData',
        type: 'bytes',
      },
    ],
    name: 'registerDelegation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_month',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_perThousandCommission',
        type: 'uint256',
      },
    ],
    name: 'setCommission',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_validatorSet',
        type: 'address',
      },
      {
        internalType: 'address payable',
        name: '_nrtManager',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_timeally',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_randomnessManager',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_blockRewardContract',
        type: 'address',
      },
    ],
    name: 'setInitialValues',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'timeally',
    outputs: [
      {
        internalType: 'contract TimeAllyManager',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'validatorSet',
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
        internalType: 'uint256',
        name: '_month',
        type: 'uint256',
      },
    ],
    name: 'withdrawCommission',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_month',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_validator',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_stakingContract',
        type: 'address',
      },
    ],
    name: 'withdrawDelegationShare',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

// const validatorsManager = new Contract(
//   validatorsStakesAddress,
//   _abi,
//   new ethers.providers.JsonRpcProvider(
//     /*nodeUrl || */ 'https://node2.testnet.eraswap.network'
//   )
// );

module.exports = {
  validatorsManager: ValidatorManagerFactory.connect(
    es.addresses.production.ESN.validatorManager,
    providerESN
  ),
};
