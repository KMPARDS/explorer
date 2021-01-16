const { baseUrl } = require('../config/config');

const ajax = async (url) => {
  return await fetch(url,{},1000)
    .then((res) => res.json())
    .catch((err) => err);
};

export default class Apis {
  static fetchAddress = (address) => ajax(`${baseUrl}/address/${address}`);
  static fetchTopAccounts = ({length = 10,page = 1}) =>
    ajax(`${baseUrl}/address/top-new?length=${length}&page=${page}`);
  static fetchESOwners = () => ajax(`${baseUrl}/address/es-owners`);

  static fetchFailedTxns = (  start = 0,length = 10) =>
    ajax(`${baseUrl}/transaction/failed?length=${length}&start=${start}`);
  static fetchTopupTxns = ({length = 10,page = 1}) =>
    ajax(`${baseUrl}/timeally-topup?length=${length}&page=${page}`);
  static fetchStatistics = ({ limit = 1 }) =>ajax(`${baseUrl}/address/txn-statistics?limit=${limit}`);
  static fetchTopSenders = ({ length = 10, page = 1 }) =>
    ajax(`${baseUrl}/address/top-sender?length=${length}&page=${page}`);
  static fetchTopReceivers = ({ length = 10, page = 1 }) =>
    ajax(`${baseUrl}/address/top-receiver?length=${length}&page=${page}`);
  static fetchTopTxnSent = ({ length = 10, page = 1 }) =>
    ajax(`${baseUrl}/address/top-txn-sent?length=${length}&page=${page}`);
  static fetchTopTxnReceived = ({ length = 10, page = 1 }) =>
    ajax(`${baseUrl}/address/top-txn-received?length=${length}&page=${page}`);
  static fetchTopAccTxnCount = ({ length = 10, page = 1 }) =>
    ajax(`${baseUrl}/address/top-acc-txn-count?length=${length}&page=${page}`);
  static fetchBlocks = ({page = 1, length = 10}) =>
    ajax(`${baseUrl}/block/?page=${page}&length=${length}`);
  static fetchBlock = (blockNumber) => ajax(`${baseUrl}/block/${blockNumber}`);
  static fetchAverageBlock = () => ajax(`${baseUrl}/block/average`);
  static fetchTransactions = (start = 0, length = 10, blockNumber = null) => {
    console.log('blockNumber1', blockNumber);
    return ajax(
      `${baseUrl}/transaction/?start=${start}&length=${length}&blockNumber=${
        blockNumber || ''
      }`
    );
  };
  static fetchTransaction = (hash) => ajax(`${baseUrl}/transaction/${hash}`);
  static fetchTransactionsByAddress = ({address, length = 25,page = 1}) =>
    ajax(`${baseUrl}/transaction/address/${address}?length=${length}&page=${page}`);
  static fetchTransactionsInterval = () =>
    ajax(`${baseUrl}/transaction/range/interval`);
  static fetchTransactionsCount = () => ajax(`${baseUrl}/transaction/count`);
  static fetchAllTxnsCount = () => ajax(`${baseUrl}/transaction/count/all`);
  static fetchInternalTransactionsByHash = (hash) =>
    ajax(`${baseUrl}/internal-transaction/hash/${hash}`);
  static fetchInternalTransactionsByBlock = (block) =>
    ajax(`${baseUrl}/internal-transaction/block/${block}`);

  static fetchBunches = (start = 0, length = 10) =>
    ajax(`${baseUrl}/bunch/?start=${start}&length=${length}`);
  static fetchBunch = (hash) => ajax(`${baseUrl}/bunch/${hash}`);

  static fetchNrtPlatforms = () => ajax(`${baseUrl}/nrt-platform/`);

  static fetchLayer2ToESNBlock = (limit) =>
    ajax(`${baseUrl}/layer2/?limit=${limit}`);

  static fetchValidatorsByMonth = (month) =>
    ajax(`${baseUrl}/validator/month/${month}`);
  static fetchValidatorsWithLastBlock = (month) =>
    ajax(`${baseUrl}/validator/lastblock/${16 || month}`);

  static fetchNodes = () => ajax(`${baseUrl}/nodestatus/`);
  static fetchTopNodes = ({ length = 10,page = 1 }) =>
    ajax(`${baseUrl}/nodestatus/top?length=${length}&page=${page}`);

  static fetchTopStakers = ({ length = 10, page = 1 }) =>
    ajax(`${baseUrl}/timeally-stakes/top?length=${length}&page=${page}`);
  static fetchStakedAmount = (ownerAddress) =>
    ajax(`${baseUrl}/timeally-stakes/${ownerAddress}`);

  static fetchESPrices = () => ajax(`${baseUrl}/es-price/top`);

  static fetchKycDappStatistics = () => ajax(`https://apis.timeswappers.com/api/kyc-level-one/statistics`);

  /********* dashboard apis *********/
  //third party
  static etherPriceUsd = () =>
    ajax(
      'https://api.etherscan.io/api?module=stats&action=ethprice&apikey=YourApiKeyToken'
    );
  static bitcoinCrowdFundPrice = () => ajax('https://blockchain.info/ticker');
  static ltcPriceUsd = () =>
    ajax('https://api.cryptonator.com/api/ticker/ltc-usd');

  //eraswap.technology
  static getESPrice = () =>
    ajax(`${baseUrl}/third-party/es-price`);
  static esTotalSupply = () =>
    ajax('https://eraswap.technology/eraswap/esTotalSupply');
  static holdersOfEraSwap = () =>
    ajax('https://eraswap.technology/eraswap/holdersOfEraSwap');
  static luckPoolBal = () => ajax('https://eraswap.technology/nrt/luckPoolBal');
  static burnTokenBal = () =>
    ajax('https://eraswap.technology/nrt/burnTokenBal');
  static totalTokensBurned = () =>
    ajax('https://eraswap.technology/nrt/totalTokensBurned');
  static nrtFractions = () =>
    ajax('https://eraswap.technology/nrt/nrtFractions');
  static getNumberOfStakings = () =>
    ajax('https://eraswap.technology/timeally/getNumberOfStakings');
  static getStakingPlanStatistics = () =>
    ajax('https://eraswap.technology/timeally/getStakingPlanStatistics');
  static getPlatformDetailsAllTime = () =>
    ajax('https://eraswap.technology/timeally/getPlatformDetailsAllTime');
  static getNumberOfBets = () =>
    ajax('https://eraswap.technology/betdeex/getNumberOfBets');
  static getBettingDetails = () =>
    ajax('https://eraswap.technology/betdeex/getBettingDetails');
  static powerTokenDetails = () =>
    ajax('https://eraswap.technology/swapperswall/powerTokenDetails');
  static getTotalReward = () =>
    ajax('https://eraswap.technology/dayswappers/getTotalReward');
  static getCurrentNRTMonth = () =>
    ajax('https://eraswap.technology/nrt/getCurrentNRTMonth');


  //timeswappers
  static totalNoOfUser = () =>
    ajax('https://apis.timeswappers.com/api/userDashboard/totalNoOfUser');
  static totalNoOfFreelancerOrSeller = () =>
    ajax(
      'https://apis.timeswappers.com/api/userDashboard/totalNoOfFreelancerOrSeller'
    );
  static totalViewsOnProfile = () =>
    ajax('https://apis.timeswappers.com/api/userDashboard/totalViewsOnProfile');
  static totalNoOfVerifiedUser = () =>
    ajax(
      'https://apis.timeswappers.com/api/userDashboard/totalNoOfVerifiedUser'
    );
  static totalNoOfCertifiedUser = () =>
    ajax(
      'https://apis.timeswappers.com/api/userDashboard/totalNoOfCertifiedUser'
    );
  static totalNoOfDeposit = () =>
    ajax('https://apis.timeswappers.com/api/userDashboard/totalNoOfDeposit');
  static totalNoOfWithdraw = () =>
    ajax('https://apis.timeswappers.com/api/userDashboard/totalNoOfWithdraw');
  static totalJobsPosted = () =>
    ajax('https://apis.timeswappers.com/api/userDashboard/totalJobsPosted');
  static totalJobsDone = () =>
    ajax('https://apis.timeswappers.com/api/userDashboard/totalJobsDone');
  static TfcGenerated = () =>
    ajax('https://apis.timeswappers.com/api/userDashboard/TfcGenerated');

  //swapperswall
  static swapperswalletTotalFeeds = () =>
    ajax('https://apis.timeswappers.com/api/feedData/all-total');
  static swapperswallTopTenreceivers = () =>
    ajax('https://apis.timeswappers.com/api/tokensData/top-ten-receivers');

  //eraswap.academy
  static userscount = () => ajax('https://apis.eraswap.academy/api/userscount');
  static courses = () => ajax('https://apis.eraswap.academy/api/courses');
  static deposits = () => ajax('https://apis.eraswap.academy/api/deposits');
  static userstudying = () =>
    ajax('https://apis.eraswap.academy/api/userstudying');

  // buzcafe
  static buzcafeUserscount = () =>
    ajax('https://apis.buzcafe.com/api/fetch/users-count');
  static buzcafeShopscount = () =>
    ajax('https://apis.buzcafe.com/api/fetch/shops-count');
  static buzcafeDepositscount = () =>
    ajax('https://apis.buzcafe.com/api/fetch/deposits-count');
  static buzcafeWithdrawalscount = () =>
    ajax('https://apis.buzcafe.com/api/fetch/withdrawals-count');
  static buzcafeTransactionscount = () =>
    ajax('https://apis.buzcafe.com/api/fetch/transactions-count');
}
