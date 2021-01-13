import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//Pages
import Homepage from './Containers/HomePage/Homepage';
import Footer from './Components/Footer/Footer';
import Bunches from './Containers/Bunches/Bunches';
import Blocks from './Containers/Blocks/Blocks';
import BlockPage from './Containers/BlockPage/BlockPage';
import Transactions from './Containers/Transactions/Transactions';
import TimeallyExplorer from './Containers/TimeallyExplorer/TimeallyExplorer';
import Dashboard from './Containers/Dashboard/Dashboard';
import EraswapCalculator from './Containers/EraswapCalculator/EraswapCalculator';
import Transaction from './Containers/Transaction/Transaction';
import Bunch from './Containers/Bunch/Bunch';
import Address from './Containers/Address/Address';
import Nrtmanager from './Containers/Nrtmanager/Nrtmanager';
import Nodestatus from './Containers/Nodestatus/Nodestatus';
import Layerbridge from './Containers/Layerbridge/Layerbridge';
import Validatorstakings from './Containers/Validatorstakings/Validatorstakings';
import Nodestatustransaction from './Containers/Nodestatustransaction/Nodestatustransaction';
/*Calculators */
import KycIncentiveCalculator from './Containers/KycIncentiveCalculator/KycIncentiveCalculator';
import TransactionsIncentiveCalculator from './Containers/TransactionsIncentiveCalculator/TransactionsIncentiveCalculator';
import TimeAllySuperGoalCalculator from './Containers/TimeAllySuperGoalCalculator/TimeAllySuperGoalCalculator';
import PersonalEraSwapTellerCalculator from './Containers/PersonalEraSwapTellerCalculator/PersonalEraSwapTellerCalculator';
import TimeallyClubIncentiveCalculator from './Containers/TimeallyClubIncentiveCalculator/TimeallyClubIncentiveCalculator';
import TopStatistics from './Containers/TopStatistics/TopStatistics';
import InternalTransactions from './Containers/InternalTransactions/InternalTransactions';
import ContractInternalTransactions from './Containers/ContractInternalTransactions/ContractInternalTransactions';
import TopAccountsbyEsBalance from './Containers/TopAccountsbyEsBalance/TopAccountsbyEsBalance';
import ContractsWithVerifiedSourceCodes from './Containers/ContractsWithVerifiedSourceCodes/ContractsWithVerifiedSourceCodes';
import Nodes from './Containers/Nodes/Nodes';
import ECharts from './Containers/ECharts/ECharts';
import ESPriceChart from './Containers/ESPriceChart/ESPriceChart';
import ViewPendingTransaction from './Containers/ViewPendingTransactions/ViewPendingTransactions';
import WESTransactions from './Containers/WESTransactions/WESTransactions';
import CancelledTransactions from './Containers/CancelledTransactions/CancelledTransactions';
import TopupTransactions from './Containers/TopupTransactions/TopupTransactions';

function App() {
  useEffect(() => {
    window.$('[data-toggle="tooltip"]').tooltip();
    window.$('td').tooltip();
    return () => {};
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/address/:address" component={Address} />
          <Route exact path="/bunches" component={Bunches} />
          <Route exact path="/bunch/:bunchIndex" component={Bunch} />
          <Route exact path="/blocks" component={Blocks} />
          <Route exact path="/block/:blockNumber" component={BlockPage} />
          <Route exact path="/txns/pending" component={ViewPendingTransaction} />
          <Route exact path="/txns/wes" component={WESTransactions} />
          <Route exact path="/txns/wes/:address" component={WESTransactions} />
          <Route exact path="/txns/failed" component={CancelledTransactions} />
          <Route exact path="/txns/topup" component={TopupTransactions} />
          <Route exact path="/txns" component={Transactions} />
          <Route exact path="/txns/:blockNumber" component={Transactions} />
          <Route
            exact
            path="/txnsInternal/:parentHash"
            component={InternalTransactions}
          />
          <Route exact path="/txn/:hash" component={Transaction} />
          <Route exact path="/explore" component={TimeallyExplorer} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route
            exact
            path="/esminingcalculator"
            component={EraswapCalculator}
          />
          <Route exact path="/nrtmanager" component={Nrtmanager} />
          <Route exact path="/nodestatus" component={Nodestatus} />
          <Route exact path="/layerbridge" component={Layerbridge} />
          <Route exact path="/kyc-calci" component={KycIncentiveCalculator} />
          <Route
            exact
            path="/txns-calci"
            component={TransactionsIncentiveCalculator}
          />
          <Route
            exact
            path="/timeally-goals"
            component={TimeAllySuperGoalCalculator}
          />
          <Route
            exact
            path="/es-calci"
            component={PersonalEraSwapTellerCalculator}
          />
          <Route
            exact
            path="/timeally-Incentive"
            component={TimeallyClubIncentiveCalculator}
          />
          <Route
            exact
            path="/ci-txns/:blockNumber"
            component={ContractInternalTransactions}
          />
          <Route
            exact
            path="/cv-txns"
            component={ContractsWithVerifiedSourceCodes}
          />
          <Route exact path="/top-statistics" component={TopStatistics} />
          <Route
            exact
            path="/top-accounts"
            component={TopAccountsbyEsBalance}
          />
          <Route exact path="/nodes" component={Nodes} />
          <Route
            exact
            path="/validatorstakings"
            component={Validatorstakings}
          />
          <Route
            exact
            path="/nodestatustransaction"
            component={Nodestatustransaction}
          />
          <Route exact path="/charts" component={ECharts} />
          <Route exact path="/chart/esprice" component={ESPriceChart} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
