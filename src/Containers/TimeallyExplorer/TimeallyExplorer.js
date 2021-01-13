import React, { Component } from 'react';
import './TimeallyExplorer.css';
import { Col, Container, Row } from 'react-bootstrap';
import Navbar from '../../Components/Navbar/Navbar';
import { timeAllyManager } from '../../ethereum/TimeallyManager';

class TimeallyExplorer extends Component {
  stakingsData = [];

  constructor(props) {
    super(props);
    this.state = {
      stakings: [],
    };
  }

  componentDidMount = async () => {
    const parsedLogs = (
      await timeAllyManager.queryFilter(
        timeAllyManager.filters.StakingTransfer(null, null, null)
      )
    ).map((log) => timeAllyManager.interface.parseLog(log));

    this.stakingsData = parsedLogs.map((parsedLog) => ({
      // staker: parsedLog.args.from,
      staking: parsedLog.args.staking,
    }));
    console.log('this.stakingsData', this.stakingsData);
    this.setState({
      stakings: this.stakingsData,
    });
    // this.setState({
    //   // TODO: the form can be used as staker but not urgetn
    //   stakings: parsedLogs.map((parsedLog) => ({
    //     // staker: parsedLog.args.from,
    //     staking: parsedLog.args.staking,
    //   })),
    // });
  };

  handleChange = (e) => {
    if (e.target.value.length) {
      const stakes = [];
      this.stakingsData.forEach((stake) => {
        if (stake.staking.toLowerCase().includes(e.target.value.toLowerCase()))
          stakes.push(stake);
      });
      this.setState({ stakings: stakes });
    } else {
      this.setState({
        stakings: this.stakingsData,
      });
    }
  };

  render() {
    return (
      <div className="blocks-table compage">
        <div className="booking-hero-bgd booking-hero-bgd-inner">
          <Navbar />
          <h2 className="es-main-head es-main-head-inner">TimeAlly Explorer</h2>
        </div>
        <Container className="mt20 text-center">
          {/* <p className="trans-head">TimeAlly Explorer</p> */}
          <h4>Staking Contracts</h4>
          <p>Note: More features will be added here</p>
          <Row className="mt40 justify-center">
            <Col lg={12}>
              <input
                type="text"
                placeholder="Search Contract Address"
                class="form-control"
                onChange={this.handleChange}
                disabled={!this.stakingsData.length}
              />
            </Col>
            <Col lg={12}>
              {/* <div className="col-md-12 pull-right">
              <a className="time-dwnld pull-right down-data">
                Download This Data
              </a>
            </div> */}
              {/* <ul className="list-group"> */}
              <div className="card mt20">
                <div className="table-responsive">
                  <table className="es-transaction striped bordered hover table">
                    <thead>
                      <tr>
                        <th data-toggle="tooltip" data-placement="top" title="">
                          Staking Contract
                        </th>
                        <th data-toggle="tooltip" data-placement="top" title="">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    {this.state.stakings.map((stakingAddress, i) => (
                      <tr>
                        <td>
                          <span className="hex-data">
                            {stakingAddress.staking}
                          </span>
                        </td>
                        <td>
                          <a
                            className="btn btn-primary"
                            href={`https://timeally.io/stakings/${stakingAddress.staking}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Staking
                          </a>
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
              {/* </ul> */}
              {/* {this.state.stakings.map((staking, i) => (
              // <StakingItem key={i} stakingContractAddress={staking.staking} />
            ))} */}
              {/* <table className="es-transaction striped bordered hover">
              <tr>
                <th>Address</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Staking Type</th>
                <th>Timestamp</th>
              </tr>
              <tr>
                <td>0x3c93616a08b29b978c5a18becfe82f3460303135</td>
                <td>1 Year</td>
                <td>7804.97</td>
                <td>Reward Staking</td>
                <td>6/16/2020, 4:59:13 PM </td>
              </tr>
              <tr>
                <td>0x3c93616a08b29b978c5a18becfe82f3460303135</td>
                <td>1 Year</td>
                <td>7804.97</td>
                <td>Reward Staking</td>
                <td>6/16/2020, 4:59:13 PM </td>
              </tr>
              <tr>
                <td>0x3c93616a08b29b978c5a18becfe82f3460303135</td>
                <td>1 Year</td>
                <td>7804.97</td>
                <td>Reward Staking</td>
                <td>6/16/2020, 4:59:13 PM </td>
              </tr>
              <tr>
                <td>0x3c93616a08b29b978c5a18becfe82f3460303135</td>
                <td>1 Year</td>
                <td>7804.97</td>
                <td>Reward Staking</td>
                <td>6/16/2020, 4:59:13 PM </td>
              </tr>
              <tr>
                <td>0x3c93616a08b29b978c5a18becfe82f3460303135</td>
                <td>1 Year</td>
                <td>7804.97</td>
                <td>Reward Staking</td>
                <td>6/16/2020, 4:59:13 PM </td>
              </tr>
            </table> */}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default TimeallyExplorer;
