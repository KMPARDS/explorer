import React, { Component } from 'react';
import './Dashboard.css';
import { ethers } from 'ethers';
import Images from '../Images/Images';
import Navbar from '../../Components/Navbar/Navbar';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Apis from '../../lib/apis';
import { moreDecimals, lessDecimals, formatEther } from '../../lib/parsers';
import { PieChart, Pie, Cell } from 'recharts';

import { timeAllyManager } from '../../ethereum/TimeallyManager';
import { nrtManager } from '../../ethereum/NrtManager';
import { nrtAddress } from '../../config/config';
import { providerESN } from '../../ethereum/Provider';
import { DayswappersWithMigrationFactory, KycDappFactory } from 'eraswap-sdk/dist/typechain/ESN';
import { es } from 'eraswap-sdk/dist';
import { surveyInstance } from '../../ethereum/Provider';

const COLORS = ['#959595', '#747FEB'];
const MAX_SUPPLY = 9100000000;
const ZERO_MONTH_SUPPLY = 910000000;

const KYCDAPP_ADDRESS = '0x07b84F93143b516A47403B528142b0c1Aae1A16F';
const CROWN_FUND_ADDRESS = '0xD00C9C5EdCfCF6F00401168E602Cd3b6faeF8c0E';
const ESNPOC_ADDRESS = '0xF6484fbC6F96DDc2B43B59a2e0252fC7f735d4c9';
const POWERTOKEN_ADDRESS = '0xbc24BfAC401860ce536aeF9dE10EF0104b09f657';
const AIRDROP_ADDRESS = '0x382525b6D3F8e42f0BB4C8D4a705763D00F9fF73';
const TIMEALLY_CLUB_ADDRESS = '0x0859201dF3Bf7777f556279D7a66730141046C15';
const DAYSWAPPERS_ADDRESS = '0x1382AD4e3Ca34DCdaC3D6CEeD282913A49394234';
const TIMEALLY_ADDRESS = '0xF3EFEeA0E535FB8640D1E64877DBE128b5baEdD3';
const BURN_POOL_ADDRESS = '0xF8dd9146465A112be3bEf3f7dDcAB9b0b42CbaB5';
const UNUSED_POWERTOKENS_ADDRESS = '0x7Ed40C491c79a717d5C64d34471eAeedC870c2a4';

const kycdappInst = KycDappFactory.connect(es.addresses[process.env.REACT_APP_NODE_ENV].ESN.kycdapp,providerESN);
// const nrtManager = nrtManager;

class Dashboard extends Component {
  esPrice = null;
  esCurrentSupply = null;
  currentNrtMonth = '-1';

  constructor(props) {
    super(props);
    this.state = {
      esUSDT: 'Loading...',
      esBTC: 'Loading...',
      esTotalSupply: 'Loading...',
      totolESUsers: 'Loading...',
      totalESStaked: 'Loading...',
      btcUsd: 'Loading...',
      ethUsd: 'Loading...',
      circulatingOutsideTA: 'Loading...',
      currentNrtES: 'Loading...',
      numberOfDayswappers: 'Loading...',
      ecosystemTransactions: 'Loading...',
      ecosystemVolume: 'Loading...',
      unUsedPowertokens: 'Loading...',
      luckPoolNrt: 'Loading...',
      burnPool: 'Loading...',
      totalESBurned: 'Loading...',
      marketCap: 'Loading...',
      crownfundPrice: 'Loading...',
      allTimeHigh: '1.42 USDT',
      allTimeLow: '0.005 USDT',
      probitVolume: 'Loading...',
      allTxnsCount: 'Loading...',
      esOwners: 'Loading',
      kycApprovedCount: 'Loading...',
      kycDappBal: 'Loading...',
      ESNPOSCPRewards: 'Loading...',
      powertokenRewards:'Loading...',
      airdropRewards:'Loading...',
      timeallyClubRewards:'Loading...',
      dayswappersRewards:'Loading...',
      timeallyRewards: 'Loading...',
      crowdFundAddress: 'Loading...',
      crowdFundBal: 'Loading...',
      totalParticipants: 'Loading...',
      totalSurveys: 'Loading...',
      volumeOfES: 'Loading...',
      totalTransactions: 'Loading...',
      availableSupply: 'Loading...',
      platformWiseTFC: {
        data: {
          timeswappers: 'Loading...',
          buzcafe: 'Loading...',
          betdeex: 'Loading...',
          computeex: 'Loading...',
          timeallyClub: 'Loading...',
          timeallyPartners: 'Loading...',
          eraswapAcademy: 'Loading...',
        },
        isLoading: true,
      },
      charity: {
        data: {
          collect: 'Loading...',
          given: 'Loading...',
        },
        isLoading: true,
      },
      roi: 'Loading...',
      lastMonthUtilisation: {
        data: {
          timeswappers: {
            percent: 'Loading...',
            volume: 'Loading...',
            value: 'Loading...',
          },
          dayswappers: {
            percent: 'Loading...',
            volume: 'Loading...',
            value: 'Loading...',
          },
          buzcafe: {
            percent: 'Loading...',
            volume: 'Loading...',
            value: 'Loading...',
          },
          curators: {
            percent: 'Loading...',
            volume: 'Loading...',
            value: 'Loading...',
          },
        },
        isLoading: true,
      },
      nextNrtCounter: {
        data: {
          days: '-',
          hours: '-',
          minutes: '-',
          seconds: '-',
        },
        isLoading: true,
      },
      timeswappers: {
        data: {
          users: 'Loading...',
          freelancers: 'Loading...',
          tfc: 'Loading...',
          verified: 'Loading...',
          certified: 'Loading...',
          deposits: 'Loading...',
          withdrawals: 'Loading...',
          viewsOnPortfolioPages: 'Loading...',
          jobsPosted: 'Loading...',
          jobsDone: 'Loading...',
        },
        isLoading: true,
      },
      dayswappers: {
        data: {
          users: 'Loading...',
          totalLiquidRewards: 'Loading...',
          totalTimeAllyRewards: 'Loading...',
          activeUsers: 'Loading...',
          kycUsers: 'Loading...',
          whiteBelt: 'Loading...',
          yellowBelt: 'Loading...',
          orangeBelt: 'Loading...',
          greenBelt: 'Loading...',
          blueBelt: 'Loading...',
          brownBelt: 'Loading...',
          redBelt: 'Loading...',
          blackBelt: 'Loading...',
          totalRewards: 'Loading...'
        },
        isLoading: true,
      },
      swapperswall: {
        data: {
          powertokens: 'Loading...',
          clubs: 'Loading...',
          circles: 'Loading...',
          pages: 'Loading...',
          swappers: 'Loading...',
          activeUsers: 'Loading...',
          uploads: 'Loading...',
        },
        isLoading: true,
      },
      eraswapAcademy: {
        data: {
          users: 'Loading...',
          courses: 'Loading...',
          deposits: 'Loading...',
          usersStuding: 'Loading...',
        },
        isLoading: true,
      },
      buzcafe: {
        data: {
          users: 'Loading...',
          shops: 'Loading...',
          deposits: 'Loading...',
          withdrawals: 'Loading...',
          internalTransactions: 'Loading...',
        },
        isLoading: true,
      },
      betdeex: {
        data: {
          events: 'Loading...',
          predictors: 'Loading...',
          esVolumePredicted: 'Loading...',
          highestPrediction: 'Loading...',
          averagePrediction: 'Loading...',
        },
        isLoading: true,
      },
      timeallyStakers: {
        data: {
          volumeOfOneYearStakings: 'Loading...',
          volumeOfTwoYearStakings: 'Loading...',
          totalStakings: 'Loading...',
          nrtReleasedForTimeAlly: 'Loading...',
          chartData: [],
        },
        isLoading: true,
      },
      computeex: {
        data: {
          totalTransactions: 0,
          totalVolume: 0,
        },
        isLoading: true,
      },
      kycDapp: {
        data: {
          levelOneCount: 0,
          levelTwoCount: 0,
          levelThreeCount: 0,
          // allPlatformKycs: 0,
        },
        isLoading: false,
      },
    };
  }

  componentDidMount() {
    this.loadData();
    
  }

  async loadData() {
    try{ this.currentNrtMonth = await nrtManager.currentNrtMonth(); }catch(e){ console.log(e); }
    await this.fetchAvailableSupply().catch(e => console.log('fetchAvailableSupply error',e));
    this.etherPriceUsd().catch(e => console.log('etherPriceUsd error',e));
    this.bitcoinCrowdFundPrice().catch(e => console.log('bitcoinCrowdFundPrice error',e));
    this.ltcPriceUsd().catch(e => console.log('ltcPriceUsd error',e));
    this.getESPrice().catch(e => console.log('getESPrice error',e));
    this.esTotalSupply().catch(e => console.log('esTotalSupply error',e));
    this.holdersOfEraSwap().catch(e => console.log('holdersOfEraSwap error',e));
    this.nrtFractions().catch(e => console.log('nrtFractions error',e));
    this.getNumberOfStakings().catch(e => console.log('getNumberOfStakings error',e));
    this.getStakingPlanStatistics().catch(e => console.log('getStakingPlanStatistics error',e));
    this.getNumberOfBets().catch(e => console.log('getNumberOfBets error',e));
    this.getBettingDetails().catch(e => console.log('getBettingDetails error',e));
    this.powerTokenDetails().catch(e => console.log('powerTokenDetails error',e));
    this.totalNoOfUser().catch(e => console.log('totalNoOfUser error',e));
    this.totalNoOfFreelancerOrSeller().catch(e => console.log('totalNoOfFreelancerOrSeller error',e));
    this.totalViewsOnProfile().catch(e => console.log('totalViewsOnProfile error',e));
    this.totalNoOfVerifiedUser().catch(e => console.log('totalNoOfVerifiedUser error',e));
    this.totalNoOfCertifiedUser().catch(e => console.log('totalNoOfCertifiedUser error',e));
    this.totalNoOfDeposit().catch(e => console.log('totalNoOfDeposit error',e));
    this.totalNoOfWithdraw().catch(e => console.log('totalNoOfWithdraw error',e));
    this.totalJobsPosted().catch(e => console.log('totalJobsPosted error',e));
    this.totalJobsDone().catch(e => console.log('totalJobsDone error',e));
    this.TfcGenerated().catch(e => console.log('TfcGenerated error',e));
    this.swapperswalletTotalFeeds().catch(e => console.log('swapperswalletTotalFeeds error',e));
    this.swapperswallTopTenreceivers().catch(e => console.log('swapperswallTopTenreceivers error',e));
    this.userscount().catch(e => console.log('userscount error',e));
    this.courses().catch(e => console.log('courses error',e));
    this.deposits().catch(e => console.log('deposits error',e));
    this.userstudying().catch(e => console.log('userstudying error',e));
    this.buzcafeUserscount().catch(e => console.log('buzcafeUserscount error',e));
    this.buzcafeDepositscount().catch(e => console.log('buzcafeDepositscount error',e));
    this.buzcafeShopscount().catch(e => console.log('buzcafeShopscount error',e));
    this.buzcafeWithdrawalscount().catch(e => console.log('buzcafeWithdrawalscount error',e));
    this.buzcafeTransactionscount().catch(e => console.log('buzcafeTransactionscount error',e));
    this.fetchTotalStakedES().catch(e => console.log('fetchTotalStakedES error',e));
    this.fetchTotalSupply().catch(e => console.log('fetchTotalSupply error',e));
    this.fetchESFromNRT().catch(e => console.log('fetchESFromNRT error',e));
    this.fetchTotalESBurned().catch(e => console.log('fetchTotalESBurned error',e));
    this.fetchBurnPool().catch(e => console.log('fetchBurnPool error',e));
    this.fetchLuckPool().catch(e => console.log('fetchLuckPool error',e));
    this.fetchAllTxnsCount().catch(e => console.log('fetchAllTxnsCount error',e));
    this.fetchESOwnersCount().catch(e => console.log('fetchESOwnersCount error',e));
    this.fetchDayswappersData().catch(e => console.log('fetchDayswappersData error',e));
    this.getKycData().catch(e => console.log('getKycData error',e));
    this.fetchSurveyDappDetails().catch(e => console.log('fetchSurveyDappDetails error',e));
    this.fetchRewardsFromNRT().catch(e => console.log('fetchRewardsFromNRT error',e));
    this.fetchAirDropRewards().catch(e => console.log('fetchAirDropRewards error',e));
    
    this.nrtTicker();
  }

  async fetchAvailableSupply(){
    try{
      const availableSupply = await nrtManager.availableSupply();
      this.setState({
        availableSupply: Number(ethers.utils.formatEther(availableSupply)).toFixed(2)
      })
    }catch(e){
      console.log(e);
    }
  }

  async fetchAirDropRewards(){
    try{
      const PREV_AIRDROP = 53524096;
      const airDropUsername = ethers.utils.formatBytes32String('AirDrop&Bounty_0.0');
      const airdropData = await Apis.fetchAddress(await kycdappInst.resolveAddress(airDropUsername))
      if(airdropData?.totalESSent){
        this.setState({
          airdropRewards: +PREV_AIRDROP + formatEther(airdropData.totalESSent)
        });
      } else {
        this.setState({
          airdropRewards: PREV_AIRDROP
        });
      }
    }catch(e){
      console.log('fetchAirDropRewards error',e);
    }
  }

  async fetchSurveyDappDetails(){
    try{
      let totalParticipants,totalSurveys;
      const participantFilter = surveyInstance.filters.SentSurvey(null, null);
      const participantLogs = await surveyInstance.queryFilter(participantFilter);
      const participantParseLogs = participantLogs.map((log) => surveyInstance.interface.parseLog(log));
      totalParticipants = participantParseLogs.length;

      const surverFilter = surveyInstance.filters.NewSurvey(null, null);
      const logs = await surveyInstance.queryFilter(surverFilter);
      const parseLogs = logs.map((log) => surveyInstance.interface.parseLog(log));
      totalSurveys = parseLogs.length;

      const volumeOfES = (11*totalSurveys)+totalParticipants;
      const totalTransactions = totalSurveys+totalParticipants;
      this.setState({ 
        totalParticipants,
        totalSurveys,
        volumeOfES,
        totalTransactions
      })
    }catch(e){
      console.log(e);
    }
  }

  async fetchRewardsFromNRT(){
    try{
      const POWERTOKEN_USERNAME = ethers.utils.formatBytes32String('PowerToken_0.0');
      
      const platforms = {
        // timeallyManager: {
        //   address: es.addresses[process.env.REACT_APP_NODE_ENV].ESN.timeallyManager,
        //   username: await kycdappInst.resolveUsername(es.addresses[process.env.REACT_APP_NODE_ENV].ESN.timeallyManager),
        // },
        validatorManager: {
          address: es.addresses[process.env.REACT_APP_NODE_ENV].ESN.validatorManager,
          username: await kycdappInst.resolveUsername(es.addresses[process.env.REACT_APP_NODE_ENV].ESN.validatorManager),
        },
        powertoken: {
          address: await kycdappInst.resolveAddress(POWERTOKEN_USERNAME),
          username: POWERTOKEN_USERNAME
        },
        dayswappers: {
          address: es.addresses[process.env.REACT_APP_NODE_ENV].ESN.dayswappers,
          username: await kycdappInst.resolveUsername(es.addresses[process.env.REACT_APP_NODE_ENV].ESN.dayswappers),
        },
        timeallyclub: {
          address: es.addresses[process.env.REACT_APP_NODE_ENV].ESN.timeallyclub,
          username: await kycdappInst.resolveUsername(es.addresses[process.env.REACT_APP_NODE_ENV].ESN.timeallyclub),
        },
      };

        let ESNPOSCPRewards=0
        , powertokenRewards=0
        , airdropRewards=0
        , timeallyClubRewards=0
        , dayswappersRewards=0
        , timeallyRewards=0;

        (await nrtManager.queryFilter(nrtManager.filters.NRTSend(null,null,null,null)))
          .map(log => nrtManager.interface.parseLog(log))
          .map(log => {
            switch(log.args['platformIdentifier']){
              // case platforms.timeallyManager.username: timeallyRewards += Number(ethers.utils.formatEther(log.args['value']));
              //   break;
              case platforms.validatorManager.username: ESNPOSCPRewards += Number(ethers.utils.formatEther(log.args['value']));
                break;
              case platforms.powertoken.username: powertokenRewards += Number(ethers.utils.formatEther(log.args['value']));
                break;
              case platforms.dayswappers.username: dayswappersRewards += Number(ethers.utils.formatEther(log.args['value']));
                break;
              case platforms.timeallyclub.username: timeallyClubRewards += Number(ethers.utils.formatEther(log.args['value']));
                break;
            }
          });

        (await nrtManager.queryFilter(nrtManager.filters.BurnPoolAccrue(null,null,null)))
          .map(log => nrtManager.interface.parseLog(log))
          .map(log => {
            switch(log.args['sender']){
              // case platforms.timeallyManager.address: timeallyRewards -= Number(ethers.utils.formatEther(log.args['value']));
              //   break;
              case platforms.validatorManager.address: ESNPOSCPRewards -= Number(ethers.utils.formatEther(log.args['value']));
                break;
              case platforms.powertoken.address: powertokenRewards -= Number(ethers.utils.formatEther(log.args['value']));
                break;
              case platforms.dayswappers.address: dayswappersRewards -= Number(ethers.utils.formatEther(log.args['value']));
                break;
              case platforms.timeallyclub.address: timeallyClubRewards -= Number(ethers.utils.formatEther(log.args['value']));
                break;
            }
          });

        const crowdFundBal                    = await providerESN.getBalance(CROWN_FUND_ADDRESS);
        const totalTimeallyRewards            = MAX_SUPPLY - this.state.availableSupply;
        const POWERTOKEN_TILL_12_MONTH        = 81966338;
        const PREV_TIMEALLY_CLUB_REWARDS      = 45500000;
        const PREV_DAYSWAPPERS_TOTAL_REWARDS  = 97688885;

        this.setState({
          crowdFundBal        : formatEther(crowdFundBal),
          ESNPOSCPRewards     : ESNPOSCPRewards.toFixed(2),
          powertokenRewards   : (+POWERTOKEN_TILL_12_MONTH + powertokenRewards).toFixed(2),
          timeallyClubRewards : (+PREV_TIMEALLY_CLUB_REWARDS + timeallyClubRewards).toFixed(2),
          dayswappersRewards  : (+PREV_DAYSWAPPERS_TOTAL_REWARDS + dayswappersRewards).toFixed(2),
          // timeallyRewards  : timeallyRewards.toFixed(2)
          timeallyRewards     : totalTimeallyRewards
        })
    }catch(e){
      console.log(e);
    }
  }

  async fetchDayswappersData(){
    try{
      const dayswappersInst = DayswappersWithMigrationFactory.connect(es.addresses[process.env.REACT_APP_NODE_ENV].ESN.dayswappers,providerESN);
      const totalDayswappers = (await dayswappersInst.queryFilter(dayswappersInst.filters.SeatTransfer(null,null,null))).length;
      const activeUsers = (await dayswappersInst.queryFilter(dayswappersInst.filters.Active(null,this.currentNrtMonth))).length;
      const ecosystemVolume = (await dayswappersInst.queryFilter(dayswappersInst.filters.Volume(null,null,null,null))).length;
      const whiteBelt = (await dayswappersInst.queryFilter(dayswappersInst.filters.Promotion(null,0))).length;
      const yellowBelt = (await dayswappersInst.queryFilter(dayswappersInst.filters.Promotion(null,1))).length;
      const orangeBelt = (await dayswappersInst.queryFilter(dayswappersInst.filters.Promotion(null,2))).length;
      const greenBelt = (await dayswappersInst.queryFilter(dayswappersInst.filters.Promotion(null,3))).length;
      const blueBelt = (await dayswappersInst.queryFilter(dayswappersInst.filters.Promotion(null,4))).length;
      const brownBelt = (await dayswappersInst.queryFilter(dayswappersInst.filters.Promotion(null,5))).length;
      const redBelt = (await dayswappersInst.queryFilter(dayswappersInst.filters.Promotion(null,6))).length;
      const blackBelt = (await dayswappersInst.queryFilter(dayswappersInst.filters.Promotion(null,7))).length;

      

      const kycResolvedUsers = (await kycdappInst.queryFilter(kycdappInst.filters.KycApplied(null,null,null,null))).length

      let totalRewards = 0,liquidRatio = 0,prepaidRatio = 0,stakesRatio = 0;
      (await dayswappersInst.queryFilter(dayswappersInst.filters.Reward(null,null,this.currentNrtMonth,null,null,null,null)))
        .map(log => dayswappersInst.interface.parseLog(log))
        .map(log => ({
          reward: log.args['reward'],
          rewardRatio: log.args['rewardRatio'],
        }))
        .map(log => {
          totalRewards += Number(ethers.utils.formatEther(log.reward));
          liquidRatio += Number(ethers.utils.formatEther(log.rewardRatio[0]));
          prepaidRatio += Number(ethers.utils.formatEther(log.rewardRatio[1]));
          stakesRatio += Number(ethers.utils.formatEther(log.rewardRatio[2]));
        });
        let totalLiquidRewards = 0;
        let totalTimeAllyRewards = 0;
        if((liquidRatio + prepaidRatio + stakesRatio) !== 0){
          totalLiquidRewards = (totalRewards/(liquidRatio+prepaidRatio+stakesRatio))*liquidRatio;
          totalTimeAllyRewards = (totalRewards/(liquidRatio+prepaidRatio+stakesRatio))*stakesRatio;
        }
      this.setState({
        dayswappers: {
          data: {
            users: totalDayswappers,
            totalLiquidRewards,
            totalTimeAllyRewards,
            activeUsers: activeUsers,
            kycUsers: kycResolvedUsers,
            whiteBelt,
            yellowBelt,
            orangeBelt,
            greenBelt,
            blueBelt,
            brownBelt,
            redBelt,
            blackBelt,
            totalRewards
          },
          isLoading: false,
        },
        ecosystemVolume
      })
    }catch(e){
      console.log(e);
    }
  }


  async getKycData(){
    try{
      const kycInst = await KycDappFactory.connect(es.addresses[process.env.REACT_APP_NODE_ENV].ESN.kycdapp,providerESN);
      const approvedKycsCount = (await kycInst.queryFilter(kycInst.filters.KycStatusUpdated(null,null,null,null,null)))
      .map(log => kycInst.interface.parseLog(log))
      .filter(log => log.args['newKycStatus'] === 1).length
      
      const kycDappBal = await providerESN.getBalance(KYCDAPP_ADDRESS);

      this.setState({
        kycApprovedCount: approvedKycsCount,
        kycDappBal: ethers.utils.formatEther(kycDappBal)
      });
    }catch(e){
      console.log('getKycData error',e);
      this.setState({
        kycApprovedCount: 0
      });
    }

    try{
      const res = await Apis.fetchKycDappStatistics();
      console.log('fetchKycDappStatistics res',res);
      if(res?.status){
        this.setState({
          kycDapp: {
            data: {
              levelOneCount: res.data.levelOneCount,
              levelTwoCount: res.data.levelTwoCount,
              levelThreeCount: res.data.levelThreeCount,
              // allPlatformKycs: 0,
            },
            isLoading: false,
          },
        })
      } else {
        this.setState({
          kycDapp: {
            data: {
              levelOneCount: '-',
              levelTwoCount: '-',
              levelThreeCount: '-',
              // allPlatformKycs: 0,
            },
            isLoading: false,
          },
        })
      }
    }catch(e){
      console.log('getKycData error: ',e);
      this.setState({
        kycDapp: {
          data: {
            levelOneCount: '-',
            levelTwoCount: '-',
            levelThreeCount: '-',
            // allPlatformKycs: 0,
          },
          isLoading: false,
        },
      })
    }
  }

  async getTotalSupply(){
    const nrtBalance = await providerESN.getBalance(es.addresses[process.env.REACT_APP_NODE_ENV].ESN.nrtManager);
    const luckPoolBal = await nrtManager.luckPoolBalance();
    const burnPoolBal = await nrtManager.burnPoolBalance();
    const burnAddressBal = await providerESN.getBalance('0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
    const maxSupplyHex = ethers.utils.parseEther(MAX_SUPPLY.toString());
    const totalSupplyHex = maxSupplyHex.sub(nrtBalance.sub(burnAddressBal).sub(luckPoolBal).sub(burnPoolBal));
    return Number(ethers.utils.formatEther(totalSupplyHex));
  }

  async fetchESOwnersCount() {
    let res;
    try {
      res = await Apis.fetchESOwners();
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({

        esOwners: res || '-',

      });
    }
  }

  async fetchAllTxnsCount() {
    let res;
    try {
      res = await Apis.fetchAllTxnsCount();
      console.log('fetchAllTxnsCount res',res);
    } catch (e) {
      console.log('fetchAllTxnsCount',e);
    } finally {
      this.setState({

        allTxnsCount: res?.data ? res.data : '-',

      });
    }
  }

  async fetchLuckPool() {
    const luckBal = await nrtManager.luckPoolBalance();
    this.setState({

      luckPoolNrt: formatEther(luckBal),
    });
  }

  async fetchBurnPool() {
    const burnBal = await nrtManager.burnPoolBalance();
    // const burnBal = await providerESN.getBalance(BURN_POOL_ADDRESS)
    this.setState({

      burnPool: formatEther(burnBal),
    });
  }

  async fetchTotalESBurned() {
    this.setState({

      totalESBurned: formatEther(
        await providerESN.getBalance(
          '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
        )
      ),
    });
  }

  async fetchESFromNRT() {
    console.log({ nrtManager });
    const logs = await nrtManager.queryFilter(
      nrtManager.filters.NRT(null, null, null)
    );
    const nrtReleases = logs
      .map((log) => nrtManager.interface.parseLog(log))
      .map((parsedLog) => {
        const nrtRelease = parsedLog.args[1];
        return nrtRelease;
      });

    const nrtRelease = nrtReleases.slice(-1)[0] || ethers.constants.Zero;

    this.setState({
      currentNrtES: formatEther(nrtRelease),
    });
  }

  async fetchTotalSupply() {
    const totalSupply = await nrtManager.totalSupply();
    this.setState({
      esTotalSupply: Number(ethers.utils.formatEther(totalSupply)).toFixed(2)
    })
  }

  async fetchTotalStakedES() {
    // const nrtReleasePromise
    const nextMonthActiveStakes = await timeAllyManager.getTotalActiveStaking(
      this.currentNrtMonth
    );
    this.setState({
      totalESStaked: formatEther(nextMonthActiveStakes),
    }, () => console.log('totalESStaked', this.state.totalESStaked));
  }

  async etherPriceUsd() {
    let res;
    try {
      res = await Apis.etherPriceUsd();
      console.log('etherPriceUsd - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        ethUsd: res.status === 1 ? '$' + res.result.ethusd : '-',
      });
    }
  }

  async bitcoinCrowdFundPrice() {
    let res;
    try {
      res = await Apis.bitcoinCrowdFundPrice();
      console.log('bitcoinCrowdFundPrice - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        btcUsd: res.USD && res.USD['15m'] ? '$' + res.USD['15m'] : '-',
        crownfundPrice: '$0.0056',
      });
    }
  }

  async ltcPriceUsd() {
    let res;
    try {
      res = await Apis.ltcPriceUsd();
      console.log('ltcPriceUsd - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        recordName: {
          data: {},
          isLoading: false,
        },
      });
    }
  }

  async getESPrice() {
    let res;
    try {
      res = await Apis.getESPrice();
      console.log('getESPrice - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.esPrice = Number(res.probitResponse.data[0].last);
      this.updateMarketCap();

      let totalVolume = 0;

      for (var x in res?.probitResponse?.data) {
        totalVolume += Number(res?.probitResponse?.data[x].base_volume);
      }
      // $('#volume-of-probit').html(window.lessDecimals(String(window.esPrice * totalVolume)) + ' USDT');
      console.log('this.esPrice,totalVolume', this.esPrice, totalVolume);
      this.setState({
        esUSDT: res.probitResponse.data[0].last || '-',
        esBTC: res.probitResponse.data[1].last || '-',
        probitVolume: lessDecimals(String(this.esPrice * totalVolume)),
      });
    }
  }

  async esTotalSupply() {
    let res;
    try {
      res = await Apis.esTotalSupply();
      console.log('esTotalSupply - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      if (res?.data?.totalSupply) {
        this.esCurrentSupply = Number(lessDecimals(res.data.totalSupply));
        this.updateMarketCap();
      }

      this.setState({

        // esTotalSupply:
        //   (res.data?.totalSupply &&
        //     lessDecimals(res.data.totalSupply) + ' ES') ||
        //   '-',
        circulatingOutsideTA: res?.data?.outsideTimeAllySupply
          ? lessDecimals(res.data.outsideTimeAllySupply)
          : 0,

      }, () => console.log('circulatingOutsideTA', this.state.circulatingOutsideTA));
    }
  }

  async holdersOfEraSwap() {
    let res;
    try {
      res = await Apis.holdersOfEraSwap();
      console.log('holdersOfEraSwap - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        totolESUsers: res.data?.numberOfAddresses
          ? res.data?.numberOfAddresses
          : '-',
      });
    }
  }

  async luckPoolBal() {
    let res;
    try {
      res = await Apis.luckPoolBal();
      console.log('luckPoolBal - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        luckPoolNrt: res?.data?.luckPoolBal
          ? lessDecimals(res.data.luckPoolBal) + ' ES'
          : '-',
      });
    }
  }

  // async burnTokenBal() {
  //   let res;
  //   try {
  //     res = await Apis.burnTokenBal();
  //     console.log('burnTokenBal - res', res);
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     this.setState({
  //       
  //           burnPool: res?.data?.burnTokenBal
  //             ? lessDecimals(res.data.burnTokenBal)
  //             : '-',
  //         },
  //         isLoading: false,
  //       },
  //     });
  //   }
  // }

  async totalTokensBurned() {
    let res;
    try {
      res = await Apis.totalTokensBurned();
      console.log('totalTokensBurned - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        totalESBurned: res?.data?.totalTokensBurned
          ? lessDecimals(res?.data?.totalTokensBurned) + ' ES'
          : '-',
      });
    }
  }

  async nrtFractions() {
    let res;
    try {
      res = await Apis.nrtFractions();
      console.log('nrtFractions - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        // s.state.eraswap?.data,
        //     currentNrtES: res?.data?.actualNRTDistributed
        //       ? lessDecimals(res.data?.actualNRTDistributed) + ' ES'
        //       : '-',
        //   },
        //   isLoading: false,
        // },
        lastMonthUtilisation: {
          data: {
            ...this.state.lastMonthUtilisation?.data,
            timeswappers: {
              percent: '-',
              volume: res.data?.workPoolCalculation?.timetraders
                ? lessDecimals(res.data?.workPoolCalculation?.timetraders) +
                ' ES'
                : '-',
              value: '-',
            },
            // dayswappers: {
            //   percent: '-',
            //   volume: res?.data?.workPoolCalculation?.dayswappers
            //     ? lessDecimals(res?.data?.workPoolCalculation?.dayswappers) +
            //     ' ES'
            //     : '-',
            //   value: '-',
            // },
            buzcafe: {
              percent: '-',
              volume: res?.data?.workPoolCalculation?.buzcafe
                ? lessDecimals(res?.data?.workPoolCalculation?.buzcafe) + ' ES'
                : '-',
              value: '-',
            },
            curators: {
              percent: '-',
              volume: res?.data?.workPoolCalculation?.curators
                ? lessDecimals(res?.data?.workPoolCalculation?.curators) + ' ES'
                : '-',
              value: '-',
            },
          },
          isLoading: false,
        },
        swapperswall: {
          data: {
            powertokens: res?.data?.actualNRTDistribution?.powerTokenNRT
              ? lessDecimals(res?.data?.actualNRTDistribution?.powerTokenNRT)
              : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  async getNumberOfStakings() {
    let res;
    try {
      res = await Apis.getNumberOfStakings();
      console.log('getNumberOfStakings - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        recordName: {
          data: {},
          isLoading: false,
        },
      });
    }
  }

  async getStakingPlanStatistics() {
    let res;
    try {
      res = await Apis.getStakingPlanStatistics();
      console.log('getStakingPlanStatistics - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      const volumeOfOneYearStakings = res?.data?.plan0Amount
        ? lessDecimals(res.data.plan0Amount)
        : 0;
      const volumeOfTwoYearStakings = res?.data?.plan1Amount
        ? lessDecimals(res.data.plan1Amount)
        : 0;
      console.log('volumeOfOneYearStakings', volumeOfOneYearStakings);
      console.log('volumeOfTwoYearStakings', volumeOfTwoYearStakings);
      this.setState({
        timeallyStakers: {
          data: {
            ...this.state.timeallyStakers.data,
            volumeOfOneYearStakings: volumeOfOneYearStakings
              ? volumeOfOneYearStakings + ' ES'
              : 0,
            volumeOfTwoYearStakings: volumeOfTwoYearStakings
              ? volumeOfTwoYearStakings + ' ES'
              : 0,
            chartData: [
              {
                name: 'Volume 1',
                value: Number(volumeOfOneYearStakings),
              },
              {
                name: 'Volume 2',
                value: Number(volumeOfTwoYearStakings),
              },
            ],
          },
          isLoading: false,
        },
      });
    }
  }

  // async getPlatformDetailsAllTime() {
  //   let res;
  //   try {
  //     res = await Apis.getPlatformDetailsAllTime();
  //     console.log('getPlatformDetailsAllTime - res', res);
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     this.setState({
  //       
  //           totalESStaked: res?.data?.totalStaking
  //             ? lessDecimals(res.data.totalStaking)
  //             : '-',
  //         },
  //         isLoading: false,
  //       },
  //       timeallyStakers: {
  //         data: {
  //           ...this.state.timeallyStakers.data,
  //           stakings: res?.data?.totalStaking
  //             ? lessDecimals(res?.data?.totalStaking) + ' ES'
  //             : '-',
  //         },
  //         isLoading: false,
  //       },
  //     });
  //   }
  // }

  async getNumberOfBets() {
    let res;
    try {
      res = await Apis.getNumberOfBets();
      console.log('getNumberOfBets - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        betdeex: {
          data: {
            ...this.state.betdeex.data,
            events: res?.data?.numberOfBets
              ? res.data.numberOfBets + ' events'
              : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  async getBettingDetails() {
    let res;
    try {
      res = await Apis.getBettingDetails();
      console.log('getBettingDetails - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        betdeex: {
          data: {
            ...this.state.betdeex.data,
            predictors: res?.data?.numberOfPredictors
              ? res.data.numberOfPredictors +
              ' predictor' +
              (res.data.numberOfPredictors !== 1 ? 's' : '')
              : '-',
            esVolumePredicted: res?.data?.totalBetAmount
              ? lessDecimals(res.data.totalBetAmount) + ' ES'
              : '-',
            highestPrediction: res?.data?.highestBetAmount
              ? lessDecimals(res.data.highestBetAmount) + ' ES'
              : '-',
            averagePrediction: res?.data?.averagePrediction
              ? lessDecimals(res.data.averagePrediction) + ' ES'
              : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  async powerTokenDetails() {
    // let res;
    // try {
    //   res = await Apis.powerTokenDetails();
    //   console.log('powerTokenDetails - res', res);
    // } catch (e) {
    //   console.log(e);
    // } finally {
    //   this.setState({
    //     unUsedPowertokens: res?.data?.error
    //       ? 'Inactive'
    //       : lessDecimals(res?.data?.unusedPowerToken) + ' ES',
    //   });
    // }
    try{
      const amt = await providerESN.getBalance(UNUSED_POWERTOKENS_ADDRESS);
      this.setState({
        unUsedPowertokens: Number(ethers.utils.formatEther(amt)).toFixed(2)
      });
    }catch(e){
      console.log('powerTokenDetails error',e);
    }
  }

  async getTotalReward() {
    let res;
    try {
      res = await Apis.getTotalReward();
      console.log('getTotalReward - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        // dayswappers: {
        //   data: {
        //     ...this.state.dayswappers.data,
        //     totalLiquidRewards: res?.data?.liquidTotal
        //       ? lessDecimals(res.data.liquidTotal) + ' ES'
        //       : '-',
        //     totalTimeAllyRewards: res?.data?.timeallyTotal
        //       ? lessDecimals(res.data.timeallyTotal) + ' ES'
        //       : '-',
        //   },
        //   isLoading: false,
        // },
      });
    }
  }

  async totalNoOfUser() {
    let res;
    try {
      res = await Apis.totalNoOfUser();
      console.log('totalNoOfUser - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        timeswappers: {
          data: {
            ...this.state.timeswappers.data,
            users: res?.data
              ? res.data + ' user' + (res.data > 1 ? 's' : '')
              : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  async totalNoOfFreelancerOrSeller() {
    let res;
    try {
      res = await Apis.totalNoOfFreelancerOrSeller();
      console.log('totalNoOfFreelancerOrSeller - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        timeswappers: {
          data: {
            ...this.state.timeswappers.data,
            freelancers: res?.data
              ? res.data + ' user' + (res.data > 1 ? 's' : '')
              : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  async totalViewsOnProfile() {
    let res;
    try {
      res = await Apis.totalViewsOnProfile();
      console.log('totalViewsOnProfile - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        timeswappers: {
          data: {
            ...this.state.timeswappers.data,
            viewsOnPortfolioPages: res.data
              ? res.data + ' view' + (res.data > 1 ? 's' : '')
              : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  async totalNoOfVerifiedUser() {
    let res;
    try {
      res = await Apis.totalNoOfVerifiedUser();
      console.log('totalNoOfVerifiedUser - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        timeswappers: {
          data: {
            ...this.state.timeswappers.data,
            verified: res.data
              ? res.data + ' user' + (res.data > 1 ? 's' : '')
              : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  async totalNoOfCertifiedUser() {
    let res;
    try {
      res = await Apis.totalNoOfCertifiedUser();
      console.log('totalNoOfCertifiedUser - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        timeswappers: {
          data: {
            ...this.state.timeswappers.data,
            certified: res.data
              ? res.data + ' user' + (res.data > 1 ? 's' : '')
              : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  async totalNoOfDeposit() {
    let res;
    try {
      res = await Apis.totalNoOfDeposit();
      console.log('totalNoOfDeposit - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        timeswappers: {
          data: {
            ...this.state.timeswappers.data,
            deposits: res?.data ? res.data + ' ES' : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  async totalNoOfWithdraw() {
    let res;
    try {
      res = await Apis.totalNoOfWithdraw();
      console.log('totalNoOfWithdraw - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        timeswappers: {
          data: {
            ...this.state.timeswappers.data,
            withdrawals: res?.data !== undefined ? res.data + ' ES' : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  async totalJobsPosted() {
    let res;
    try {
      res = await Apis.totalJobsPosted();
      console.log('totalJobsPosted - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        timeswappers: {
          data: {
            ...this.state.timeswappers.data,
            jobsPosted:
              res?.data !== undefined
                ? res.data + ' job' + (res.data > 1 ? 's' : '')
                : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  async totalJobsDone() {
    let res;
    try {
      res = await Apis.totalJobsDone();
      console.log('totalJobsDone - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        timeswappers: {
          data: {
            ...this.state.timeswappers.data,
            jobsDone:
              res?.data !== undefined
                ? res.data + ' job' + (res.data > 1 ? 's' : '')
                : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  async TfcGenerated() {
    let res;
    try {
      res = await Apis.TfcGenerated();
      console.log('TfcGenerated - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        timeswappers: {
          data: {
            ...this.state.timeswappers.data,
            tfc: res?.data ? res.data + ' ES' : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  async swapperswalletTotalFeeds() {
    let res;
    try {
      res = await Apis.swapperswalletTotalFeeds();
      console.log('swapperswalletTotalFeeds - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        swapperswall: {
          data: {
            ...this.state.swapperswall.data,
            clubs: res.data.communities + ' clubs',
            circles: res.data.groups + ' groups',
            pages: res.data.pages + ' pages',
            swappers: res.data.friends + ' swappers',
            activeUsers: res.data.activeUsers + ' active users',
            uploads: res.data.mediaUploads + ' media uploads',
          },
          isLoading: false,
        },
      });
    }
  }

  async swapperswallTopTenreceivers() {
    let res;
    try {
      res = await Apis.swapperswallTopTenreceivers();
      console.log('swapperswallTopTenreceivers - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        recordName: {
          data: {},
          isLoading: false,
        },
      });
    }
  }

  async userscount() {
    let res;
    try {
      res = await Apis.userscount();
      console.log('userscount - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        eraswapAcademy: {
          data: {
            ...this.state.eraswapAcademy.data,
            users: res?.data !== undefined ? res.data + ' users' : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  async courses() {
    let res;
    try {
      res = await Apis.courses();
      console.log('courses - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        eraswapAcademy: {
          data: {
            ...this.state.eraswapAcademy.data,
            courses: res?.data !== undefined ? res.data + ' courses' : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  async deposits() {
    let res;
    try {
      res = await Apis.deposits();
      console.log('deposits - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        eraswapAcademy: {
          data: {
            ...this.state.eraswapAcademy.data,
            deposits: res?.data !== undefined ? res.data + ' ES' : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  async userstudying() {
    let res;
    try {
      res = await Apis.userstudying();
      console.log('userstudying - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        eraswapAcademy: {
          data: {
            ...this.state.eraswapAcademy.data,
            usersStuding: res?.data !== undefined ? res.data + ' users' : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  async buzcafeUserscount() {
    let res;
    try {
      res = await Apis.buzcafeUserscount();
      console.log('buzcafeUserscount - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        buzcafe: {
          data: {
            ...this.state.buzcafe.data,
            users: res?.data ? res.data + ' users' : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  async buzcafeShopscount() {
    let res;
    try {
      res = await Apis.buzcafeShopscount();
      console.log('buzcafeShopscount - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        buzcafe: {
          data: {
            ...this.state.buzcafe.data,
            shops: res?.data !== undefined ? res.data + ' shops' : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  async buzcafeDepositscount() {
    let res;
    try {
      res = await Apis.buzcafeDepositscount();
      console.log('buzcafeDepositscount - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        buzcafe: {
          data: {
            ...this.state.buzcafe.data,
            deposits: res?.data ? res.data + ' deposits' : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  async buzcafeWithdrawalscount() {
    let res;
    try {
      res = await Apis.buzcafeWithdrawalscount();
      console.log('buzcafeWithdrawalscount - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        buzcafe: {
          data: {
            ...this.state.buzcafe.data,
            withdrawals:
              res?.data !== undefined ? res.data + ' withdrawals' : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  async buzcafeTransactionscount() {
    let res;
    try {
      res = await Apis.buzcafeTransactionscount();
      console.log('buzcafeTransactionscount - res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        buzcafe: {
          data: {
            ...this.state.buzcafe.data,
            internalTransactions: res?.data ? res.data + ' transactions' : '-',
          },
          isLoading: false,
        },
      });
    }
  }

  updateMarketCap = () => {
    console.log('this.esPrice', this.esPrice);
    console.log('this.esCurrentSupply', this.esCurrentSupply);
    if (this.esPrice && this.esCurrentSupply) {
      let marketCap = String(this.esPrice * this.esCurrentSupply);
      if (marketCap.includes('.')) {
        marketCap = marketCap.split('.')[0];
      }
      console.log('marketCap', marketCap);
      this.setState({
        marketCap,
      });
    }
  };

  async nrtTicker() {
    const monthDuration = 2629744 * 1000;

    const lastNrtReleaseTimestamp = (
      await nrtManager.lastReleaseTimestamp()
    ).toNumber();

    setInterval(() => {
      const nextNrtTimestamp = lastNrtReleaseTimestamp * 1000 + monthDuration;
      const currentTimestamp = Date.now();

      const timeRemaining =
        nextNrtTimestamp > currentTimestamp
          ? nextNrtTimestamp - currentTimestamp
          : 0;

      //     window.isOnProduction || console.log(timeRemaining);

      const daysRemaining = Math.floor(timeRemaining / 1000 / 24 / 60 / 60);
      const hoursRemaining = Math.floor(
        (timeRemaining - daysRemaining * 1000 * 24 * 60 * 60) / 1000 / 60 / 60
      );
      const minutesRemaining = Math.floor(
        (timeRemaining -
          daysRemaining * 1000 * 24 * 60 * 60 -
          hoursRemaining * 1000 * 60 * 60) /
        1000 /
        60
      );
      const secondsRemaining = Math.floor(
        (timeRemaining -
          daysRemaining * 1000 * 24 * 60 * 60 -
          hoursRemaining * 1000 * 60 * 60 -
          minutesRemaining * 1000 * 60) /
        1000
      );

      // window.isOnProduction || console.log(daysRemaining, hoursRemaining, minutesRemaining, secondsRemaining);

      this.setState({
        nextNrtCounter: {
          data: {
            days: daysRemaining,
            hours: hoursRemaining,
            minutes: minutesRemaining,
            seconds: secondsRemaining,
          },
          isLoading: false,
        },
      });
    }, 1000);
  }

  render() {
    const currentSupply = this.state.esTotalSupply - this.state.totalESStaked - this.state.burnPool;
    return (
      <div className="bgd-dash-color dashboard-box">
        <div className="booking-hero-bgd booking-hero-bgd-inner">
          <Navbar />
          <h2 className="es-main-head es-main-head-inner">Dashboard</h2>
        </div>
        <div className="dashboard-main-bgd">
          <div className="row">
            <Col lg={9}>
              <div className="sub-dashboard">
                <Col lg={3}>
                  <h5 className="">Era Swap (ES)</h5>
                  <h5 className="sub-dash-head">
                    {this.state.esUSDT} USDT{' '}
                  </h5>
                </Col>
                <Col lg={3}>
                  <div className="sub-supply-box mb10">
                    <div className="es-box-ds">
                      <p className="supply-txt">MARKET CAP</p>
                      <p className="supply-txt">
                        {isFinite(
                          (this.state.esTotalSupply -
                            this.state.burnPool) *
                          this.state.esUSDT
                        )
                          ? (
                            (this.state.esTotalSupply -
                              this.state.burnPool) *
                            this.state.esUSDT
                          ).toFixed(2)
                          : 'Loading...'}{' '}
                        $
                      </p>
                    </div>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="sub-supply-box mb10">
                    <div className="es-box-ds">
                      <p className="supply-txt">TOTAL ES Holders</p>
                      <p className="supply-txt">
                        {this.state.esOwners} addresses{' '}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="sub-supply-box mb10">
                    <div className="es-box-ds">
                      <p className="supply-txt">Current NRT Month</p>
                      <p className="supply-txt">
                      {this.currentNrtMonth < 0 ? 'Loading...' : this.currentNrtMonth}
                      </p>
                    </div>
                  </div>
                </Col>
              </div>
            </Col>
            <Col lg={3}>
              <h5 className="nrt-head">Time Remaining for Next NRT Released</h5>
              <div className="count-box d-flex justify-content-lg-around  ">
                <ul className="flex-count-box">
                  <li className="count-txt">
                    {this.state.nextNrtCounter.data.days}
                    <p>DAYS</p>
                  </li>
                  <li className="count-txt">
                    {this.state.nextNrtCounter.data.hours}
                    <p>HOURS</p>
                  </li>
                  <li className="count-txt">
                    {this.state.nextNrtCounter.data.minutes}
                    <p>MINUTES</p>
                  </li>
                  <li className="count-txt">
                    {this.state.nextNrtCounter.data.seconds}
                    <p>SECONDS</p>
                  </li>
                </ul>
              </div>
            </Col>
          </div>
        </div>
        <div className="container-fluid bgd-dash-color">
          <div className="dash-section-2">
            <Row>

              {/* <Col sm={6} lg={2}>
                <Card>
                  <Card.Body>
                    <p className="sect-txt-bold"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Total Supply - Officially Burnt"
                    >ES AVAILABLE SUPPLY</p>
                    <p className="value-dash-txt">
                     {this.state.availableSupply > -1 ? this.state.availableSupply : 'Loading...'} ES
                    </p>
                  </Card.Body>
                </Card>
              </Col> */}
              <Col sm={6} lg={2}>
                <Card className="">
                  <Card.Body>
                    <p className="sect-txt-bold">AVAILABLE SUPPLY</p>
                    <p className="value-dash-txt">
                      {isFinite(this.state.availableSupply) ? (this.state.availableSupply) : 'Loading...'}{' '}
                      ES
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} lg={2} p-0>
                <Card>
                  <Card.Body>
                    <p className="sect-txt-bold"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Total numbers of ES  every realized or produced in market including stakings & burnt "
                    >TOTAL SUPPLY</p>
                    <p className="value-dash-txt">
                      {isFinite(this.state.esTotalSupply) ? (this.state.esTotalSupply) : 'Loading...'} ES
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} lg={2}>
                <Card>
                  <Card.Body>
                    <p className="sect-txt-bold"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="The maximum number of Era Swap that will be ever created released i.e. 9,10,00,00,000">
                    MAXIMUM SUPPLY</p>
                    <p className="value-dash-txt">9100000000 ES</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} lg={2} p-0>
                <Card>
                  <Card.Body>
                    <p className="sect-txt-bold">ES FROM NRT THIS MONTH</p>
                    <p className="value-dash-txt">
                      {this.state.currentNrtES}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} lg={2}>
                <Card>
                  <Card.Body>
                    <p className="sect-txt-bold">NUMBER OF DAYSWAPPERS</p>
                    <p className="value-dash-txt">
                      {this.state.dayswappers.data.users}
                      {/* this.state.numberOfDayswappers*/}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} lg={2}>
                <Card className="">
                  <Card.Body>
                    <p className="sect-txt-bold ">TOTAL STAKED ES</p>
                    <p className="value-dash-txt">
                      {this.state.totalESStaked} ES
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {/* <div className="wrapper-sub-section"> */}
            <Row className="">
              <Col sm={6} lg={2}>
                <Card className="">
                  <Card.Body>
                    <p className="sect-txt-bold">ECOSYSTEM VOLUME</p>
                    <p className="value-dash-txt">
                      {/* 'Coming soon' */}
                      {this.state.ecosystemVolume}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} lg={2}>
                <Card className=" ">
                  <Card.Body>
                    <p className="sect-txt-bold">UNUSED POWER TOKENS</p>
                    <p className="value-dash-txt">
                      {this.state.unUsedPowertokens} <small className="text-dark">(Monthly)</small>
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} lg={2}>
                <Card className="">
                  <Card.Body>
                    <p className="sect-txt-bold">LUCK POOL IN NRT</p>
                    <p className="value-dash-txt">
                      {this.state.luckPoolNrt}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} lg={2}>
                <Card className="">
                  <Card.Body>
                    <p className="sect-txt-bold">BURN POOL (IN NEXT NRT)</p>
                    <p className="value-dash-txt">
                      {this.state.burnPool}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} lg={2}>
                <Card className="">
                  <Card.Body>
                    <p className="sect-txt-bold"
                     data-toggle="tooltip"
                     data-placement="top"
                     title=" Number of ES permanently  removed from ES circulation and send to address . 10% ES collected from KYC Dapp, 10% ES of Fuel collected from Ecosystem Platforms, ES stakings destroyed When a borrower choose to default repayment of  Loan and interest and unused rewards ">
                       TOTAL ES BURNED</p>
                    <p className="value-dash-txt">
                      {this.state.totalESBurned}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} lg={2}>
                <Card>
                  <Card.Body>
                    <p className="sect-txt-bold">ECOSYSTEM TRANSACTIONS</p>
                    <p className="value-dash-txt">
                      {this.state.allTxnsCount} transactions
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="">
              {/* <Col sm={6} lg={2} p-0>
                  <Card className="height-80 wd-120 ">
                    <Card.Body>
                      <p className="sect-txt-bold">MARKET CAP</p>
                      <p className="value-dash-txt">
                        {this.state.marketCap}
                      </p>
                    </Card.Body>
                  </Card>
                </Col> */}
              <Col sm={6} lg={2}>
                <Card className="">
                  <Card.Body>
                    <p className="sect-txt-bold">24 HR VOL (PROBIT GLOBAL)</p>
                    <p className="value-dash-txt">
                      {this.state.probitVolume} USDT
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} lg={2}>
                <Card className="">
                  <Card.Body>
                    <p className="sect-txt-bold">KYC APPROVED COUNT</p>
                    <p className="value-dash-txt">
                      {this.state.kycApprovedCount}
                      ES
                    </p>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={6} lg={2}>
                <Card className=" ">
                  <Card.Body>
                    <p className="sect-txt-bold">ALL TIME HIGH</p>
                    <p className="value-dash-txt">1.42 $</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} lg={2}>
                <Card className="">
                  <Card.Body>
                    <p className="sect-txt-bold">ALL TIME LOW</p>
                    <p className="value-dash-txt">0.005 $</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} lg={2}>
                <Card className="">
                  <Card.Body>
                    <p className="sect-txt-bold">ICO START & END DATE</p>
                    <p className="value-dash-txt">01/07/2018 - 31/12/2018</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} lg={2}>
                <Card className="">
                  <Card.Body>
                    <p className="sect-txt-bold">ICO PRICE</p>
                    <p className="value-dash-txt">
                      {this.state.crownfundPrice}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            
        <Row className="">
              {/* <Col sm={6} lg={2} p-0>
                  <Card className="height-80 wd-120 ">
                    <Card.Body>
                      <p className="sect-txt-bold">MARKET CAP</p>
                      <p className="value-dash-txt">
                        {this.state.marketCap}
                      </p>
                    </Card.Body>
                  </Card>
                </Col> */}
              <Col sm={6} lg={3}>
                <Card className="">
                  <Card.Body>
                    <p className="sect-txt-bold">Timeally total NRT Rewards Distributed</p>
                    <p className="value-dash-txt">
                    {this.state.timeallyRewards}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} lg={3}>
                <Card className="">
                  <Card.Body>
                    <p className="sect-txt-bold">ESNPOSCP Rewards Distributed </p>
                    <p className="value-dash-txt">
                     {this.state.ESNPOSCPRewards}
                    </p>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={6} lg={3}>
                <Card className=" ">
                  <Card.Body>
                    <p className="sect-txt-bold">KYC Pending Bucket </p>
              <p className="value-dash-txt">{this.state.kycDappBal}</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} lg={3}>
                <Card className="">
                  <Card.Body>
                    <p className="sect-txt-bold">Reserves for Crowd Fund phase 2 & 3 . </p>
              <p className="value-dash-txt">{this.state.crowdFundBal}</p>
                  </Card.Body>
                </Card>
              </Col>
            
            </Row>


        <Row className="">
              {/* <Col sm={6} lg={2} p-0>
                  <Card className="height-80 wd-120 ">
                    <Card.Body>
                      <p className="sect-txt-bold">MARKET CAP</p>
                      <p className="value-dash-txt">
                        {this.state.marketCap}
                      </p>
                    </Card.Body>
                  </Card>
                </Col> */}
              <Col sm={6} lg={3}>
                <Card className="">
                  <Card.Body>
                    <p className="sect-txt-bold">Total Power Tokens Distributed </p>
                    <p className="value-dash-txt">
                     {this.state.powertokenRewards}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} lg={3}>
                <Card className="">
                  <Card.Body>
                    <p className="sect-txt-bold">Airdrop Total Distributed </p>
                    <p className="value-dash-txt">
                      {this.state.airdropRewards}
                    </p>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={6} lg={3}>
                <Card className=" ">
                  <Card.Body>
                    <p className="sect-txt-bold">TimeAlly Club Total Distributed </p>
                    <p className="value-dash-txt">{this.state.timeallyClubRewards}</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} lg={3}>
                <Card className="">
                  <Card.Body>
                    <p className="sect-txt-bold">DaySwappers Total Rewards</p>
                    <p className="value-dash-txt">{this.state.dayswappersRewards}</p>
                  </Card.Body>
                </Card>
              </Col>
            
            </Row>
      
            {/* </div> */}
          </div>
        </div>






        {/* <div className="dash-section-4">
          <Row>
            <Col lg={6}>
              <div className="section4-border tfc-box">
                <div className="flex-sect4-box">
                  <p className="platfrm-txt">
                    All Platform TFC Generated of this month
                  </p>
                  <div>
                    <BarChart width={730} height={250} data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="pv" fill="#8884d8" />
                      <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <Row>
                <Col lg={6}>
                  <div className="section4-border charity-box">
                    <div className="flex-sect4-box">
                      <p className="platfrm-txt">Charity Pool</p>
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="section4-border roi-box">
                    <div className="flex-sect4-box">
                      <p className="platfrm-txt">ROI</p>
                    </div>
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="section4-border nrt-box">
                    <div className="flex-sect4-box">
                      <p className="platfrm-txt">
                        Last Month Work Pool NRT Utilisation
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div> */}
        <div className="dash-section-4">
          <Row>
            <Col lg={4}>
              <div className="section4-border">
                <div className="flex-sect4-box">
                  <img
                    className="platfrm-logo"
                    src={Images.path.timeally}
                    alt="logo"
                  />
                  <p className="platfrm-txt"> TIMEALLY STAKERS</p>
                </div>
                <Row>
                  <Col sm={7}>
                    <PieChart width={300} height={300}>
                      <Pie
                        data={[{
                          name: 'Available Supply',
                          value: Number(this.state.availableSupply)
                        },{
                          name: 'ES Staked in TimeAlly 1 LT',
                          value: Number(this.state.totalESStaked)
                        },]}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                      >
                        {
                        // this.state.timeallyStakers.data.chartData.map(
                        [this.state.availableSupply,this.state.totalESStaked].map(
                          (entry, index) => (
                            <Cell fill={COLORS[index % COLORS.length]}>
                              {/* <Tooltip /> */}
                            </Cell>
                          )
                        )}
                      </Pie>
                    </PieChart>
                  </Col>
                  <Col sm={5}>
                    {/**
                     * @todo values to be integrated
                     */}
                    <div className="flex-sect4-box">
                      <div className="timeally-mark"></div>
                      <p className="sect4-context">Available Supply {this.state.availableSupply}</p>
                    </div>
                    <div className="flex-sect4-box">
                      <div className="timeally-mark2"></div>
                      <p className="sect4-context">
                        ES Staked in TimeAlly 1 LT  {this.state.totalESStaked}
                      </p>
                    </div>
                  </Col>
                </Row>
                <div className="timelly-flex tm-border">
                  <p className="sect4-context">Total Volume of Stakings</p>
                  <p className="sect4-value-bold">
                    {this.state.timeallyStakers.data.totalStakings}
                  </p>
                </div>
                <div className="timelly-border-flex">
                  <p className="sect4-context">NRT Released For TimeAlly</p>
                  <p className="sect4-value-bold">
                    {this.state.timeallyStakers.data.nrtReleasedForTimeAlly}
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="section4-border">
                <a href="https://www.timeswappers.com/" target="_blank">
                  <div className="flex-sect4-box">
                    <img
                      className="platfrm-logo2"
                      src={Images.path.timeswapper}
                      alt="logo"
                    />
                    <p className="platfrm-txt">TIMESWAPPERS</p>
                  </div>
                </a>
                <div className="ts-flex tm-border">
                  <div>
                    <p className="sect4-context">Total Number of Users</p>
                    <p className="sect4-value">
                      {this.state.timeswappers.data.users}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">
                      Total Number of Freelancers/Services
                    </p>
                    <p className="sect4-value">
                      {this.state.timeswappers.data.freelancers}
                    </p>
                  </div>
                </div>
                <div className="ts-flex tm-border">
                  <div>
                    <p className="sect4-context">TFC generated</p>
                    <p className="sect4-value">
                      {this.state.timeswappers.data.tfc}
                    </p>
                  </div>
                  {/* <div>
                    <p className="sect4-context">Level 2 KYC</p>
                    <p className="sect4-value">
                      0
                    </p>
                  </div> */}
                  {/* <div>
                    <p className="sect4-context">Level 3 KYC</p>
                    <p className="sect4-value">
                      0
                    </p>
                  </div> */}
                  <div>
                    <p className="sect4-context">Total Deposit Done</p>
                    <p className="sect4-value">
                      {this.state.timeswappers.data.deposits}
                    </p>
                  </div>
                </div>
                <div className="ts-flex tm-border">
                  <div>
                    <p className="sect4-context">Number of Views on </p>
                    <p className="sect4-context">Freelancer Portfolio pages</p>
                    <p className="sect4-value">
                      {this.state.timeswappers.data.viewsOnPortfolioPages}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Total Withdraw done</p>
                    <p className="sect4-value">
                      {this.state.timeswappers.data.withdrawals}
                    </p>
                  </div>
                </div>
                <div className="timelly-border-flex">
                  <div>
                    <p className="sect4-context">Total Jobs Posted</p>
                    <p className="sect4-value">
                      {this.state.timeswappers.data.jobsPosted}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Total Jobs Done</p>
                    <p className="sect4-value">
                      {this.state.timeswappers.data.jobsDone}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Volume of ES</p>
                    <p className="sect4-value">
                     -
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="section4-border">
                <a href="https://dayswappers.com/" target="_blank">
                  <div className="flex-sect4-box">
                    <img
                      className="platfrm-logo"
                      src={Images.path.dayswapper}
                      alt="logo"
                    />
                    <p className="platfrm-txt">DAYSWAPPERS</p>
                  </div>
                </a>
                <div className="ds-flex tm-border">
                  <div>
                    <p className="sect4-context">Total DaySwappers</p>
                    <p className="sect4-value">
                      {this.state.dayswappers.data.users}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Total Liquid Reward</p>
                    <p className="sect4-value">
                      {this.state.dayswappers.data.totalLiquidRewards}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Total TimeAlly Rewards</p>
                    <p className="sect4-value">
                      {this.state.dayswappers.data.totalTimeAllyRewards}
                    </p>
                  </div>
                </div>
                <div className="ds-flex tm-border">
                  <div>
                    <p className="sect4-context">Active Users </p>
                    <p className="sect4-value">
                      {this.state.dayswappers.data.activeUsers}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">KYC users</p>
                    <p className="sect4-value">
                      {this.state.dayswappers.data.kycUsers}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">White Belt</p>
                    <p className="sect4-value">
                      {this.state.dayswappers.data.whiteBelt}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Yellow Belt </p>
                    <p className="sect4-value">
                      {this.state.dayswappers.data.yellowBelt}
                    </p>
                  </div>
                </div>
                <div className="ds-flex tm-border">
                  <div>
                    <p className="sect4-context">Orange Belt </p>
                    <p className="sect4-value">
                      {this.state.dayswappers.data.orangeBelt}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Green Belt</p>
                    <p className="sect4-value">
                      {this.state.dayswappers.data.greenBelt}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Blue Belt</p>
                    <p className="sect4-value">
                      {this.state.dayswappers.data.blueBelt}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Brown Belt</p>
                    <p className="sect4-value">
                      {this.state.dayswappers.data.brownBelt}
                    </p>
                  </div>
                </div>
                <div className="dayswappr-border-flex">
                  <div className="dayswapper-box">
                    <p className="sect4-context">Red Belt</p>
                    <p className="sect4-value">
                      {this.state.dayswappers.data.redBelt}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Black Belt</p>
                    <p className="sect4-value">
                      {this.state.dayswappers.data.blackBelt}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {/* Second row platforms */}
          <Row>
            <Col lg={4}>
              <div className="section4-border">
                <a href="https://swapperswall.com/" target="_blank">
                  <div className="flex-sect4-box">
                    <img
                      className="platfrm-logo4"
                      src={Images.path.swaal}
                      alt="logo"
                    />
                    <p className="platfrm-txt"> SWAPPERS WALL </p>
                  </div>
                </a>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Power Tokens this month</p>
                    <p className="sect4-value-swal">
                      {this.state.swapperswall.data.powertokens}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Clubs</p>
                    <p className="sect4-value-swal">
                      {this.state.swapperswall.data.clubs}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Circles</p>
                    <p className="sect4-value-swal">
                      {this.state.swapperswall.data.circles}
                    </p>
                  </div>
                </div>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Pages</p>
                    <p className="sect4-value-swal">
                      {this.state.swapperswall.data.pages}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Swappers</p>
                    <p className="sect4-value-swal">
                      {this.state.swapperswall.data.swappers}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Active Users</p>
                    <p className="sect4-value-swal">
                      {this.state.swapperswall.data.activeUsers}
                    </p>
                  </div>
                </div>
                <div className="swapper-center">
                  <div>
                    <p className="sect4-context">Media Uploads</p>
                    <p className="sect4-value">
                      {this.state.swapperswall.data.uploads}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="section4-border">
                <a href="https://eraswap.academy/" target="_blank">
                  <div className="flex-sect4-box">
                    <img
                      className="platfrm-logo"
                      src={Images.path.blocklogy}
                      alt="logo"
                    />
                    <p className="platfrm-txt">ERASWAP ACADEMY </p>
                  </div>
                </a>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">User Counts</p>
                    <p className="sect4-value-swal">
                      {this.state.eraswapAcademy.data.users}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Courses</p>
                    <p className="sect4-value-swal">
                      {this.state.eraswapAcademy.data.courses}
                    </p>
                  </div>
                </div>
                <div className="swwall-border-flex">
                  <div>
                    <p className="sect4-context">Total ES Deposited</p>
                    <p className="sect4-value">
                      {this.state.eraswapAcademy.data.deposits}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Users Studying Count</p>
                    <p className="sect4-value">
                      {this.state.eraswapAcademy.data.usersStuding}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="section4-border">
                <a href="https://buzcafe.com/" target="_blank">
                  <div className="flex-sect4-box">
                    <img
                      className="platfrm-logo4"
                      src={Images.path.buzcafe}
                      alt="logo"
                    />
                    <p className="platfrm-txt">BUZCAFE</p>
                  </div>
                </a>
                <div className="buz-flex-border">
                  <div>
                    <p className="sect4-context">Total Users</p>
                    <p className="sect4-value-swal">
                      {this.state.buzcafe.data.users}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Total Shops</p>
                    <p className="sect4-value-swal">
                      {this.state.buzcafe.data.shops}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Total Deposits</p>
                    <p className="sect4-value-swal">
                      {this.state.buzcafe.data.deposits}
                    </p>
                  </div>
                </div>
                <div className="swwall-border-flex">
                  <div>
                    <p className="sect4-context">Total Withdrawal</p>
                    <p className="sect4-value">
                      {this.state.buzcafe.data.withdrawals}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Total Internal Transactions</p>
                    <p className="sect4-value">
                      {this.state.buzcafe.data.internalTransactions}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {/* Third row platforms */}
          <Row>
            <Col sm={6}></Col>
            <Col sm={3}></Col>
            <Col sm={3}></Col>
          </Row>
          {/* Fourth row platforms */}
          <Row>
            <Col lg={4}>
              <div className="section4-border">
                <a href="https://www.betdeex.com/" target="_blank">
                  <div className="flex-sect4-box">
                    <img
                      className="platfrm-logo4"
                      src={Images.path.betdeex}
                      alt="logo"
                    />
                    <p className="platfrm-txt">BETDEEX </p>
                  </div>
                </a>
                <div className="bet-flex-border">
                  <div>
                    <p className="sect4-context">Total Number of Events</p>
                    <p className="sect4-value-swal">
                      {this.state.betdeex.data.events}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Total Number of Predictors</p>
                    <p className="sect4-value-swal">
                      {this.state.betdeex.data.predictors}
                    </p>
                  </div>
                  <div>
                  <p className="sect4-context">Volume of ES</p>
                    <p className="sect4-value">-</p>
                  </div>
                </div>

                <div className="bet-flex-border">
                  <div>
                    <p className="sect4-context">Total ES volume predicted </p>
                    <p className="sect4-context">on BetDeEx</p>
                    <p className="sect4-value">
                      {this.state.betdeex.data.esVolumePredicted}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Highest Prediction </p>
                    <p className="sect4-context">on BetDeEx</p>
                    <p className="sect4-value">
                      {this.state.betdeex.data.highestPrediction}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Average Prediction </p>
                    <p className="sect4-context">on BetDeEx</p>
                    <p className="sect4-value">
                      {this.state.betdeex.data.averagePrediction}
                    </p>
                  </div>
                </div>

                <div className="swwall-border-flex">
                  <div>
                    <p className="sect4-context">Volume of ES</p>
                    <p className="sect4-value">
                     -
                    </p>
                  </div>
                </div>

              </div>
            </Col>
            <Col lg={4}>
              <div className="section4-border">
                <a href="https://www.computeex.net/" target="_blank">
                  <div className="flex-sect4-box">
                    <img
                      className="platfrm-logo-5"
                      src={Images.path.computeex}
                      alt="logo"
                    />
                    <p className="platfrm-txt">  Multi Exchange</p>
                  </div>
                </a>
                <div className="compute-flex-border">
                  <div>
                    <p className="sect4-context">
                      Total Number of Transactions
                    </p>
                    <p className="sect4-value-swal">
                      {this.state.computeex.data.totalTransactions}
                    </p>
                  </div>
                </div>
                <div className="swapper-center">
                  <div>
                    <p className="sect4-context">Total Volume</p>
                    <p className="sect4-value">
                      {this.state.computeex.data.totalVolume}
                    </p>

                    <p className="sect4-context">Volume of ES</p>
                    <p className="sect4-value">-</p>
                  </div>
                 
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="section4-border">
                <a href="https://charitydapp.com/" target="_blank">
                  <div className="flex-sect4-box">
                    <img
                      className="platfrm-logo"
                      src={Images.path.charitylogo}
                      alt="logo"
                    />
                    <p className="platfrm-txt">CHARITYDAPP  (YET TO GO LIVE)</p>
                  </div>
                </a>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Number of Users</p>
                    <p className="sect4-value-swal">0</p>
                  </div>
                  <div>
                    <p className="sect4-context">Number of organisations </p>
                    <p className="sect4-value-swal">0 applied</p>
                  </div>
                </div>
                <div className="swwall-border-flex">
                  <div>
                    <p className="sect4-context">Total Charity</p>
                    <p className="sect4-value">0</p>
                  </div>
                  <div>
                    <p className="sect4-context">Org rewarded</p>
                    <p className="sect4-value">0</p>
                  </div>
                  <div>
                    <p className="sect4-context">TFC Generated</p>
                    <p className="sect4-value">0 </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="section4-border">
                <a href="https://kycdapp.com/" target="_blank">
                  <div className="flex-sect4-box">
                    <img
                      className="platfrm-logo"
                      src={Images.path.kycdapplogo}
                      alt="logo"
                    />
                    <p className="platfrm-txt">KYCDAPP </p>
                  </div>
                </a>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Number of Level 1 KYC</p>
                    <p className="sect4-value-swal">
                      {this.state.kycDapp.data.levelOneCount}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Number of Level 2 KYC</p>
                    <p className="sect4-value-swal">
                      {this.state.kycDapp.data.levelTwoCount}
                    </p>
                  </div>
                </div>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Number of Level 3 KYC</p>
                    <p className="sect4-value">
                      {this.state.kycDapp.data.levelThreeCount}
                    </p>
                  </div>
                  <div>
                    <p className="sect4-context">Number of Level 4 KYC</p>
                    <p className="sect4-value">
                      -
                    </p>
                  </div>
                  {/* <div>
                    <p className="sect4-context">All Platform KYCs</p>
                    <p className="sect4-value">
                      {this.state.kycDapp.data.allPlatformKycs}
                    </p>
                  </div> */}
                </div>
                <div className="swwall-border-flex">
                  <div>
                    <p className="sect4-context">Number of Level 5 KYC</p>
                    <p className="sect4-value">
                     -
                    </p>
                  </div>
                  
                  {/* <div>
                    <p className="sect4-context">All Platform KYCs</p>
                    <p className="sect4-value">
                      {this.state.kycDapp.data.allPlatformKycs}
                    </p>
                  </div> */}
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="section4-border">
                <a href="https://coupondapp.com/" target="_blank">
                  <div className="flex-sect4-box">
                    <img
                      className="platfrm-logo6"
                      src={Images.path.Coupondapp}
                      alt="logo"
                    />
                    <p className="platfrm-txt">COUPONDAPP </p>
                  </div>
                </a>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Claimed ES</p>
                    <p className="sect4-value-swal">Coming soon</p>
                  </div>
                  <div>
                    <p className="sect4-context">Withdrawn ES</p>
                    <p className="sect4-value-swal">Coming soon</p>
                  </div>
                </div>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Number Of Coupon</p>
                    <p className="sect4-value-swal">Coming soon</p>
                  </div>
                  <div>
                    <p className="sect4-context">Amount OF ES</p>
                    <p className="sect4-value-swal">Coming soon</p>
                  </div>
                </div>
                <div className="swwall-border-flex">
                  <div>
                    <p className="sect4-context">Number of Users</p>
                    <p className="sect4-value">Coming soon</p>
                  </div>
                  <div>
                    <p className="sect4-context">TFC Generated</p>
                    <p className="sect4-value">Coming soon</p>
                  </div>
                  <div>
                    <p className="sect4-context">Volume of ES</p>
                    <p className="sect4-value">Coming soon</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="section4-border">
                <a href="https://www.computeex.net/" target="_blank">
                  <div className="flex-sect4-box" >
                    <img
                      className="platfrm-logo-5"
                      src={Images.path.computeex}
                      alt="logo"
                    />
                    <p className="platfrm-txt"> Buy ES With  Cards (YET TO GO LIVE) </p>
                  </div>
                </a>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">  Total number of Transactions</p>
                    <p className="sect4-value-swal">0 events</p>
                  </div>
                  <div>
                    <p className="sect4-context">Total Volume </p>
                    <p className="sect4-value-swal">0 ES</p>
                  </div>
                   <div>
                    <p className="sect4-context">Volume of ES</p>
                    <p className="sect4-value">0</p>
                  </div>
                </div>
                <div className="swwall-border-flex">
                  <div>
                    <p className="sect4-context">Buy ERA Swap Now </p>
                    <p className="sect4-value">0</p>
                  </div>
                  <div>
                    <p className="sect4-context">Buy ES With Credit Cards Any Fiat</p>
                    <p className="sect4-value">0</p>
                  </div>
                  
                </div>
              </div>
            </Col>
          </Row>
          {/* fifth row platforms */}
          <Row>
            <Col lg={4}>
              <div className="section4-border">
                <a href="https://www.rentingdapp.com/" target="_blank">
                  <div className="flex-sect4-box">
                    <img
                      className="platfrm-logo2"
                      src={Images.path.renting}
                      alt="logo"
                    />
                    <p className="platfrm-txt">RENTINGDAPP</p>
                  </div>
                </a>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Number of Users</p>
                    <p className="sect4-value-swal">0 Users</p>
                  </div>
                  <div>
                    <p className="sect4-context">Number of Lenders </p>
                    <p className="sect4-value-swal">0</p>
                  </div>
                </div>
                <div className="swwall-border-flex">
                  <div>
                    <p className="sect4-context">Transactions</p>
                    <p className="sect4-value">0</p>
                  </div>
                  <div>
                    <p className="sect4-context">Objects Rented</p>
                    <p className="sect4-value">0</p>
                  </div>
                  <div>
                    <p className="sect4-context">TFC Generated</p>
                    <p className="sect4-value">0 </p>
                  
                  </div>
                  <div>
                  <p className="sect4-context">Volume of ES</p>
                    <p className="sect4-value">0</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="section4-border">
                <a href="https://bookingdapp.com/" target="_blank">
                  <div className="flex-sect4-box">
                    <img
                      className="platfrm-logo2"
                      src={Images.path.booklogo}
                      alt="logo"
                    />
                    <p className="platfrm-txt">BOOKINGDAPP </p>
                  </div>
                </a>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Number of Events</p>
                    <p className="sect4-value-swal">6 events</p>
                  </div>
                  <div>
                    <p className="sect4-context">Number of Tickets</p>
                    <p className="sect4-value-swal">0</p>
                  </div>
                  <div>
                    <p className="sect4-context">TFC Generated</p>
                    <p className="sect4-value-swal">0</p>
                  </div>
                </div>
                <div className="swwall-border-flex">
                  <div>
                    <p className="sect4-context">Number Of Organizers</p>
                    <p className="sect4-value">0 </p>
                  </div>
                  <div>
                    <p className="sect4-context">Number of Users</p>
                    <p className="sect4-value">0</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="section4-border">
                <a href="http://poolindapp.com/" target="_blank">
                  <div className="flex-sect4-box">
                    <img
                      className="platfrm-logo6"
                      src={Images.path.poolingdapplogo}
                      alt="logo"
                    />
                    <p className="platfrm-txt">POOLINGDAPP </p>
                  </div>
                </a>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Transactions</p>
                    <p className="sect4-value-swal">0 ES</p>
                  </div>
                  <div>
                    <p className="sect4-context">Number of Tickets</p>
                    <p className="sect4-value-swal">0 ES</p>
                  </div>
                  <div>
                    <p className="sect4-context">Vehicle Owners</p>
                    <p className="sect4-value">0 Users</p>
                  </div>
                </div>
                <div className="swwall-border-flex">
                  <div>
                    <p className="sect4-context">Number Of Rides</p>
                    <p className="sect4-value">0 </p>
                  </div>
                  <div>
                    <p className="sect4-context">TFC Generated</p>
                    <p className="sect4-value">0 </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="section4-border">
                <a href="https://www.curedapp.com/" target="_blank">
                  <div className="flex-sect4-box">
                    <img
                      className="platfrm-logo4"
                      src={Images.path.curedapplogo}
                      alt="logo"
                    />
                    <p className="platfrm-txt">CUREDAPP </p>
                  </div>
                </a>
                <div className="bet-flex-border">
                  <div>
                    <p className="sect4-context">Equipments</p>
                    <p className="sect4-value-swal">0 </p>
                  </div>
                  <div>
                    <p className="sect4-context">Number of Doctors</p>
                    <p className="sect4-value-swal">0</p>
                  </div>
                  <div>
                    <p className="sect4-context">Cases Solved</p>
                    <p className="sect4-value-swal">0 </p>
                  </div>
                </div>
                <div className="swwall-border-flex">
                  <div>
                    <p className="sect4-context">Number Of Users</p>
                    <p className="sect4-value">0 </p>
                  </div>
                  <div>
                    <p className="sect4-context">Number of Cetificates</p>
                    <p className="sect4-value">0 </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="section4-border">
                <a href="https://faithminus.com/" target="_blank">
                  <div className="flex-sect4-box">
                    <img
                      className="platfrm-logo2"
                      src={Images.path.faithminus}
                      alt="logo"
                    />
                    <p className="platfrm-txt">FAITH MINUS</p>
                  </div>
                </a>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Cases Solved</p>
                    <p className="sect4-value-swal">0 events</p>
                  </div>
                  <div>
                    <p className="sect4-context">Cases Pending</p>
                    <p className="sect4-value-swal">0</p>
                  </div>
                  <div>
                    <p className="sect4-context">Number of Curators</p>
                    <p className="sect4-value-swal">0</p>
                  </div>
                </div>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Transactions</p>
                    <p className="sect4-value-swal">0</p>
                  </div>
                  <div>
                    <p className="sect4-context">Organizations rewarded</p>
                    <p className="sect4-value-swal">0</p>
                  </div>
                </div>
                <div className="swwall-border-flex">
                  <div>
                    <p className="sect4-context">TFC Generated</p>
                    <p className="sect4-value">0 </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="section4-border">
                <a href="https://dateswappers.com" target="_blank">
                  <div className="flex-sect4-box">
                    <img
                      className="platfrm-logo2"
                      src={Images.path.dateswappr}
                      alt="logo"
                    />
                    <p className="platfrm-txt">DATE SWAPPERS</p>
                  </div>
                </a>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Number of Meet Ups</p>
                    <p className="sect4-value-swal">0 meetups</p>
                  </div>
                  <div>
                    <p className="sect4-context">Number of Users</p>
                    <p className="sect4-value-swal">0</p>
                  </div>
                </div>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Transactions</p>
                    <p className="sect4-value-swal">0</p>
                  </div>
                  <div>
                    <p className="sect4-context">Number of Trips</p>
                    <p className="sect4-value-swal">0</p>
                  </div>
                </div>
                <div className="swwall-border-flex">
                  <div>
                    <p className="sect4-context">ES Withdrawn</p>
                    <p className="sect4-value">0 </p>
                  </div>
                </div>
              </div>
            </Col>
            {/* <Col lg={4}>
              <div className="section4-border">
                <a href="https://eraswap.network/" target="_blank">
                  <div className="flex-sect4-box">
                    <img
                      className="platfrm-logo6"
                      src={Images.path.networklogo}
                      alt="logo"
                    />
                    <p className="platfrm-txt">ERA SWAP NETWORK </p>
                  </div>
                </a>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">
                      Number of Transaction (24 hrs)
                    </p>
                    <p className="sect4-value-swal">0 txn</p>
                  </div>
                  <div>
                    <p className="sect4-context">Number of Nodes</p>
                    <p className="sect4-value-swal">0 nodes</p>
                  </div>
                  <div>
                    <p className="sect4-context">Current Block Height</p>
                    <p className="sect4-value">0</p>
                  </div>
                </div>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Block Number</p>
                    <p className="sect4-value">0 </p>
                  </div>
                  <div>
                    <p className="sect4-context">Last Block Sealer</p>
                    <p className="sect4-value">0</p>
                  </div>
                  <div>
                    <p className="sect4-context">Age</p>
                    <p className="sect4-value">0 secs ago</p>
                  </div>
                </div>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Gas Used</p>
                    <p className="sect4-value">0% </p>
                  </div>
                  <div>
                    <p className="sect4-context">Last Block Hash</p>
                    <p className="sect4-value">-</p>
                  </div>

                  <div>
                    <p className="sect4-context">Time Stamp</p>
                    <p className="sect4-value">--/--/---- </p>
                  </div>
                </div>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Total Proof of Stake (ESN)</p>
                    <p className="sect4-value">0</p>
                  </div>
                  <div>
                    <p className="sect4-context">Last Transaction Fee</p>
                    <p className="sect4-value">0</p>
                  </div>
                </div>
              </div>
            </Col> */}
            <Col lg={4}>
              <div className="section4-border">
                <a href="" target="_blank">
                  <div className="flex-sect4-box">
                    <img
                      className="platfrm-logo2"
                      src={Images.path.guarantor}
                      alt="logo"
                    />
                    <p className="platfrm-txt">GUARANTOR</p>
                  </div>
                </a>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Guarantees given</p>
                    <p className="sect4-value-swal">0 </p>
                  </div>
                  <div>
                    <p className="sect4-context">Withdrawn ES</p>
                    <p className="sect4-value-swal">0 ES </p>
                  </div>
                </div>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Number of Guaranters</p>
                    <p className="sect4-value-swal">0 Users</p>
                  </div>
                  <div>
                    <p className="sect4-context">Number of Requestors</p>
                    <p className="sect4-value-swal">0 </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="section4-border">
                <a href="https://valueoffarmers.org" target="_blank">
                  <div className="flex-sect4-box">
                    <img
                      className="platfrm-logo6"
                      src={Images.path.vof}
                      alt="logo"
                    />
                    <p className="platfrm-txt">VALUE OF FARMERS  (YET TO GO LIVE)</p>
                  </div>
                </a>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Number of Farmers</p>
                    <p className="sect4-value-swal">-</p>
                  </div>
                  <div>
                    <p className="sect4-context">Number of Krishitagya</p>
                    <p className="sect4-value-swal">-</p>
                  </div>
                  <div>
                    <p className="sect4-context">Number of Agri Expert</p>
                    <p className="sect4-value">-</p>
                  </div>
                </div>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Number of Customers</p>
                    <p className="sect4-value">- </p>
                  </div>
                  <div>
                    <p className="sect4-context">Total Transactions</p>
                    <p className="sect4-value">-</p>
                  </div>
                  <div>
                    <p className="sect4-context">TFC Genrated</p>
                    <p className="sect4-value">-</p>
                  </div>
                </div>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">
                      Number of Farming Equipments Listed
                    </p>
                    <p className="sect4-value">- </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="section4-border">
                <a href="https://certidapp.com/" target="_blank">
                  <div className="flex-sect4-box">
                    <img
                      className="platfrm-logo6"
                      src={Images.path.certidapplogo}
                      alt="logo"
                    />
                    <p className="platfrm-txt">CertiDapp  (YET TO GO LIVE)</p>
                  </div>
                </a>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Number of Colleges</p>
                    <p className="sect4-value-swal">-</p>
                  </div>
                  <div>
                    <p className="sect4-context">Number of Certificates</p>
                    <p className="sect4-value-swal">-</p>
                  </div>
                </div>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Number of Users</p>
                    <p className="sect4-value">- </p>
                  </div>
                  <div>
                    <p className="sect4-context">TFC Generated</p>
                    <p className="sect4-value">-</p>
                  </div>
                </div>
                <div className="swwall-flex-border">
                  <div>
                    <p className="sect4-context">Total no. of Surveys</p>
                    <p className="sect4-value">{this.state.totalSurveys} </p>
                  </div>
                  <div>
                    <p className="sect4-context">Total no. of participants in Surveys</p>
                    <p className="sect4-value">{this.state.totalParticipants}</p>
                  </div>
                </div>
                 <div className="swwall-border-flex">
                  <div>
                    <p className="sect4-context">Volume of ES</p>
                    <p className="sect4-value">{this.state.volumeOfES} </p>
                  </div>
                  <div>
                    <p className="sect4-context">Total Transactions</p>
                    <p className="sect4-value">{this.state.totalTransactions} </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="section4-border">
                <a href="https://recyclingdapp.com/" target="_blank">
                  <div className="flex-sect4-box">
                    <img
                      className="platfrm-logo6"
                      src={Images.path.usecaserecyclingdapp}
                      alt="logo"
                    />
                    <p className="platfrm-txt">RECYCLINGDAPP   (YET TO GO LIVE) </p>
                  </div>
                </a>

              </div>
            </Col>
          </Row>
          {/* sixth row platforms */}
          <Row>
            <Col sm={6}></Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Dashboard;
