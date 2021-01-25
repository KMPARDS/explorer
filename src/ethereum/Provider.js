const { ethers } = require('ethers');
const { nodeUrl } = require('../config/config');
const { es } = require('eraswap-sdk');

// export const providerESN = new es.CustomProvider('mainnet');
export const providerESN = new es.CustomJsonRpcProvider('https://rpc-mumbai.mainnet.eraswap.network');
// export const providerESN = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.mainnet.eraswap.network');

export const providerEth = ethers.getDefaultProvider('homestead', {
  infura: 'b915fe11a8ab4e73a3edba4c59d656b2',
});

export const surveyInstance = es.typechain.ESN.BuildSurveyFactory.connect(es.addresses.production.ESN.buildSurvey,providerESN);

export const prepaidInstance = es.typechain.ESN.PrepaidEsFactory.connect(es.addresses.production.ESN.prepaidEs,providerESN);
// module.exports = {
//   providerEth,
//   providerESN,
//   surveyInstance,
// };
window.providerESN = providerESN;
window.providerEth = providerEth;
window.surveyInstance = surveyInstance;
window.prepaidInstance = prepaidInstance;