import React, { Component } from 'react';
import './EraswapCalculator.css';
import Images from '../Images/Images';
import { Col, Container, Row, Form } from 'react-bootstrap';
import Navbar from '../../Components/Navbar/Navbar';
import Card from 'react-bootstrap/Card';
import Apis from '../../lib/apis';
const MONTHSCOUNT = 12;
class EraswapCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalStakingInput: '1070260541.41',
      nrtReleasedInput: '25264221.28',
      myStakingsInput: '170000',
      selfUptimeInput: '90',
      networkUptimeInput: '90',
      esPriceUSDT: '0.0902',
      serverCostInput: '100',
      globalStakingPercentInput: '50',
    };
  }

  componentDidMount() {
    this.fetchNrtRelease();
    this.fetchESPrice();
    this.fetchTotalESStakes();
  }

  async fetchTotalESStakes() {
    const res = await Apis.getPlatformDetailsAllTime();
    if (res?.data?.totalStaking) {
      this.setState({
        globalStakingInput: Number(res.data.totalStaking).toFixed(2),
      });
      // this.globalStaking = res.data.totalStaking;
    }
  }

  async fetchESPrice() {
    const res = await Apis.getESPrice();
    if (res?.data?.success && res?.data?.probitResponse?.data) {
      this.setState({
        esPriceUSDT: res?.data?.probitResponse?.data[0].last,
      });
    }
  }

  async fetchNrtRelease() {
    const res = await Apis.nrtFractions();
    console.log('nrt fraction', res);
    if (res?.data) {
      this.setState({
        nrtReleasedInput: Number(res.data.actualNRTDistributed).toFixed(2),
      });
    }
  }

  handleChange = (e) => {
    switch (e.target.name) {
      case 'myStakings':
        if (isFinite(e.target.value))
          this.setState({ myStakingsInput: e.target.value });
        break;
      default:
        break;
    }
  };

  tax(income, taxin) {
    var slab = 0;
    if (income % 170000 === 0) {
      slab = income / 170000 - 1;
    } else {
      slab = Math.floor(income / 170000);
    }
    if (slab <= 0) {
      return 0 + taxin;
    } else {
      return this.tax(
        slab * 170000,
        taxin + (income - slab * 170000) * 0.001 * slab
      );
    }
  }

  reward(NES, deposit) {
    console.log('this.tax(deposit, 0);', this.tax(deposit, 0));
    deposit -= this.tax(deposit, 0);
    console.log('deposit', deposit);
    return (
      (deposit * ((this.state.nrtReleasedInput * 0.12) )) / NES
    );
  }

  render() {
    let monthlyReward =
      (this.state.myStakingsInput / this.state.globalStakingInput) *
      this.state.nrtReleasedInput;
    monthlyReward =
      (monthlyReward * this.state.selfUptimeInput) /
      this.state.networkUptimeInput;

    // monthlyReward = (monthlyReward * this.state.globalStakingPercentInput) / 100;
    // monthlyReward /= 12;

    let monthlyRewardSevenFive = (monthlyReward * 7.5) / 100;
    let powerTokenReward = (monthlyReward * 10) / 100;

    let esnMinersReward = 0;
    esnMinersReward = this.reward(
      (this.state.globalStakingPercentInput * this.state.globalStakingInput) /
        100,
      this.state.myStakingsInput
    );

    let monthlyProfit =
      monthlyReward * this.state.esPriceUSDT - this.state.serverCostInput;

    if (!isFinite(monthlyReward)) monthlyReward = 0;

    return (
      <div className="compage">
        <div className="booking-hero-bgd booking-hero-bgd-inner">
          <Navbar />
          <h2 className="es-main-head es-main-head-inner">
            ES Mining Calculator
          </h2>
        </div>
        <Container>
          {/* <p className="trans-head">TimeAlly Explorer</p> */}

          <Row className="mt40 eraswapcal">
            <Col sm={12} lg={12}>
              <Card className="">
                <Card.Body>
                  <Col lg={12}>
                    <div class="form-row">
                      {/* <div class="col-sm-6 col-md-4 col-lg-3 form-group">
                        <label for="">Number of Validators</label>
                        <input
                          type="text"
                          class="form-control"
                          id=""
                          placeholder=""
                        />
                        <span>
                          <i class="fa fa-user user" aria-hidden="true"></i>
                        </span>
                      </div> */}
                      <div class="col-md-6 col-lg-4 form-group">
                        <label for="">My ES Stakings</label>
                        <Form.Control
                          onChange={(event) =>
                            this.setState({
                              myStakingsInput: event.target.value,
                            })
                          }
                          value={this.state.myStakingsInput}
                          type="text"
                          placeholder="Enter my stakings"
                          autoComplete="off"
                          isInvalid={isNaN(Number(this.state.myStakingsInput))}
                        />
                        <span>
                          <img
                            className="eslogo"
                            src={Images.path.eslogo}
                            alt=""
                          />
                        </span>
                      </div>
                      <div class="col-md-6 col-lg-4 form-group">
                        <label for="">Global ES stakings</label>
                        {/* <input
                          type="text"
                          class="form-control"
                          id=""
                          placeholder=""
                        /> */}
                        <Form.Control
                          onChange={(event) =>
                            this.setState({
                              globalStakingInput: event.target.value,
                            })
                          }
                          value={this.state.globalStakingInput}
                          type="text"
                          placeholder="Enter global stakings"
                          autoComplete="off"
                          isInvalid={isNaN(
                            Number(this.state.globalStakingInput)
                          )}
                        />
                        <span>
                          <img
                            className="eslogo"
                            src={Images.path.eslogo}
                            alt=""
                          />
                        </span>
                      </div>
                      <div class="col-md-6 col-lg-4  form-group">
                        <label for="">% of Global ES stakings in ESN PoS</label>
                        <Form.Control
                          onChange={(event) =>
                            this.setState({
                              globalStakingPercentInput: event.target.value,
                            })
                          }
                          value={this.state.globalStakingPercentInput}
                          type="text"
                          placeholder="Enter global stakings"
                          autoComplete="off"
                          isInvalid={isNaN(
                            Number(this.state.globalStakingPercentInput)
                          )}
                        />
                      </div>
                      <div class="col-md-6 col-lg-4 form-group">
                        <label for="">NRT Release (Monthly)</label>
                        <Form.Control
                          onChange={(event) =>
                            this.setState({
                              nrtReleasedInput: event.target.value,
                            })
                          }
                          value={this.state.nrtReleasedInput}
                          type="text"
                          placeholder="Enter nrt released"
                          autoComplete="off"
                          isInvalid={isNaN(Number(this.state.nrtReleasedInput))}
                        />
                      </div>
                      <div class="col-md-6 col-lg-4 form-group">
                        <label for="">ES Price ($)</label>
                        <Form.Control
                          onChange={(event) =>
                            this.setState({
                              esPriceUSDT: event.target.value,
                            })
                          }
                          value={this.state.esPriceUSDT}
                          type="text"
                          placeholder="Enter global stakings"
                          autoComplete="off"
                          isInvalid={isNaN(Number(this.state.esPriceUSDT))}
                        />
                        <span>
                          <img
                            className="eslogo"
                            src={Images.path.eslogo}
                            alt=""
                          />
                        </span>
                      </div>
                      <div class="col-md-6 col-lg-4 form-group">
                        <label for="">Server cost (USD/monthly)</label>
                        <Form.Control
                          onChange={(event) =>
                            this.setState({
                              serverCostInput: event.target.value,
                            })
                          }
                          value={this.state.serverCostInput}
                          type="text"
                          placeholder="Enter self uptime"
                          autoComplete="off"
                          isInvalid={isNaN(Number(this.state.serverCostInput))}
                        />
                      </div>
                      <div class="col-md-6 col-lg-4 form-group">
                        <label for="">Estimated validator's uptime</label>
                        <Form.Control
                          onChange={(event) =>
                            this.setState({
                              selfUptimeInput: event.target.value,
                            })
                          }
                          value={this.state.selfUptimeInput}
                          type="text"
                          placeholder="Enter global stakings"
                          autoComplete="off"
                          isInvalid={isNaN(Number(this.state.selfUptimeInput))}
                        />
                      </div>
                      <div class="col-md-6 col-lg-4 form-group">
                        <label for="">Network uptime</label>
                        <Form.Control
                          onChange={(event) =>
                            this.setState({
                              networkUptimeInput: event.target.value,
                            })
                          }
                          value={this.state.networkUptimeInput}
                          type="text"
                          placeholder="Enter self uptime"
                          autoComplete="off"
                          isInvalid={isNaN(
                            Number(this.state.networkUptimeInput)
                          )}
                        />
                      </div>

                      {/* <div class="col-sm-6 col-md-4 col-lg-3 form-group">
                        <button class="btn">Calculate</button>
                      </div> */}
                    </div>
                  </Col>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container className="mt30 eraswapcal-tab">
          <Row>
            <Col lg={6}>
              <Card className="">
                <div className="border-era">Monthly Result</div>
                <table className="es-transaction striped bordered hover">
                  <thead>
                    <tr>
                      <th>Monthly Rewards</th>
                      <th>ES Earned</th>
                    </tr>
                    <tr>
                      <td>TimeAlly Staked Rewards received 7.5% NRT</td>
                      <td>{monthlyRewardSevenFive}</td>
                    </tr>
                    <tr>
                      <td>TimeAlly Liquid Rewards received 7.5% NRT</td>
                      <td>{monthlyRewardSevenFive}</td>
                    </tr>
                    <tr>
                      <td>ESN Miners Rewards in Wrapped ES (NRT-12%)</td>
                      <td>{esnMinersReward}</td>
                    </tr>
                    <tr>
                      <td>Power Tokens Rewards received 10% NRT</td>
                      <td>{powerTokenReward}</td>
                    </tr>
                    <tr>
                      <td>Profit</td>
                      <td>
                        <span class="text-success">${monthlyProfit}</span>
                      </td>
                    </tr>
                  </thead>
                </table>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="">
                <div className="border-era">Yearly Result</div>
                <table className="es-transaction striped bordered hover">
                  <thead>
                    <tr>
                      <th>Yearly Rewards</th>
                      <th>ES Earned</th>
                    </tr>
                    <tr>
                      <td>TimeAlly Staked Rewards received 7.5% NRT</td>
                      <td>{monthlyRewardSevenFive * 12}</td>
                    </tr>
                    <tr>
                      <td>TimeAlly Liquid Rewards received 7.5% NRT</td>
                      <td>{monthlyRewardSevenFive * 12}</td>
                    </tr>
                    <tr>
                      <td>ESN Miners Rewards in Wrapped ES (NRT-12%)</td>
                      <td>{esnMinersReward * 12}</td>
                    </tr>
                    <tr>
                      <td>Power Tokens Rewards received 10% NRT</td>
                      <td>{powerTokenReward * 12}</td>
                    </tr>
                    <tr>
                      <td>Profit</td>
                      <td>
                        <span class="text-success">${monthlyProfit * 12}</span>
                      </td>
                    </tr>
                  </thead>
                </table>
              </Card>
            </Col>
            {/* <Col lg={6}>
              <Card className="">
                <div className="border-era">STAKED AMOUNT GROWTH</div>
              </Card>
            </Col> */}
          </Row>
        </Container>
      </div>
    );
  }
}

export default EraswapCalculator;
