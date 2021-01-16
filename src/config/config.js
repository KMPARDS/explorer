const { es } = require('eraswap-sdk/dist');
const { providerESN } = require('../ethereum/Provider');

module.exports = {
  baseUrl: process.env.REACT_APP_BASE_URL,
  nodeUrl: process.env.REACT_APP_NODE_URL,
  nrtAddress: es.addresses.production.ESN.nrtManager,
  timeAllyAddress: es.addresses.production.ESN.timeallyManager,
  validatorsStakesAddress: es.addresses.production.ESN.validatorManager,
  reversePlasmaAddress: es.addresses.production.ESN.reversePlasma,
  plasmaAddress: es.addresses.production.ETH.plasmaManager,
};
