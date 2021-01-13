import React, { Component } from 'react';
import './TransactionsIncentiveCalculator.css';
import Images from '../Images/Images';
import Header from '../../Components/Header/Header';
import Navbar from '../../Components/Navbar/Navbar';
import { Col, Button, Container, Row, Tabs, Tab, Form } from 'react-bootstrap';
import Apis from '../../lib/apis';
import { toLocaleTimestamp } from '../../lib/parsers';
import { Snackbar } from '../../Components/Snackbar/Snackbar';
import AddressLink from '../../Components/AddressLink/AddressLink';

class TransactionsIncentiveCalculator extends Component {
  snackbarRef = React.createRef();

  constructor(props) {
    super(props);

    const {
      match: { params },
    } = this.props;

    this.state = {
      platforms: {
        data: {},
        isLoading: true,
      },
      dayswapperstreeInput: '',
      transdirect: '',
      transindirect: '',
      volume: '',
      additionalIncentive: '',
      displayValues: '',
    };

    this.openSnackBar = this.openSnackBar.bind(this);
  }

  componentDidMount() {}

  calculateValues = () => {
    function txnincentive(
      dayswapperstree,
      transdirect,
      transindirect,
      volume,
      additionalIncentive
    ) {
      var timeAllyClub =
        transdirect * volume * (additionalIncentive / 100 + 0.01) * 0.2;
      var dayswapperTreeReward =
        ((transdirect + transindirect) *
          volume *
          (additionalIncentive / 100 + 0.01) *
          0.2 *
          dayswapperstree) /
        2;
      var burning = timeAllyClub / 2;
      var charity = timeAllyClub / 2;
      return {
        burning,
        charity,
        dayswapperTreeReward,
        timeAllyClub,
      };
    }
    const displayValues = txnincentive(
      Number(this.state.dayswapperstreeInput) / 100,
      Number(this.state.transdirect),
      Number(this.state.transindirect),
      Number(this.state.volume),
      Number(this.state.additionalIncentive)
    );
    this.setState({
      displayValues,
    });
  };

  openSnackBar(message) {
    // this.snackbarRef.current.openSnackBar(message);
  }

  render() {
    return (
      <div className="nrt-manager compage">
        <div className="booking-hero-bgd booking-hero-bgd-inner">
          <Navbar />
          <h2 className="es-main-head es-main-head-inner">
            Fuel Charges Incentive Calculator
          </h2>
        </div>
        <div className="">
          <div className="BlockPage-detail">
            <Container>
              <Row className="mt40 eraswapcal cal-com-page eraswapcal-tab">
                <Col lg={12}>
                  <div class="card">
                    <div class="card-body">
                      <div className="row">
                        <div className="col-lg-12">
                          <div class="form-row">
                            <div class="col-md-12 col-lg-12 form-group">
                              <label for="">
                                Expected Avg % Earning from Indirect Team
                                Members as per Day Swappers Tree
                              </label>
                              <Form.Control
                                onChange={(event) =>
                                  this.setState({
                                    dayswapperstreeInput: event.target.value,
                                  })
                                }
                                value={this.state.dayswapperstreeInput}
                                type="text"
                                placeholder=""
                                autoComplete="off"
                                isInvalid={isNaN(
                                  Number(this.state.dayswapperstreeInput)
                                )}
                              />
                            </div>
                            <div class="col-md-4 col-lg-4 form-group">
                              <label for="">
                                No. of Transactions by Directs{' '}
                              </label>
                              <Form.Control
                                onChange={(event) =>
                                  this.setState({
                                    transdirect: event.target.value,
                                  })
                                }
                                value={this.state.transdirect}
                                type="text"
                                placeholder=""
                                autoComplete="off"
                                isInvalid={isNaN(
                                  Number(this.state.transdirect)
                                )}
                              />
                            </div>
                            <div class="col-md-4 col-lg-4 form-group">
                              <label for="">
                                No. of Transactions by Indirects{' '}
                              </label>
                              <Form.Control
                                onChange={(event) =>
                                  this.setState({
                                    transindirect: event.target.value,
                                  })
                                }
                                value={this.state.transindirect}
                                type="text"
                                placeholder=""
                                autoComplete="off"
                                isInvalid={isNaN(
                                  Number(this.state.transindirect)
                                )}
                              />
                            </div>
                            <div class="col-md-4 col-lg-4 form-group">
                              <label for="">Volume of Transactions</label>
                              <Form.Control
                                onChange={(event) =>
                                  this.setState({
                                    volume: event.target.value,
                                  })
                                }
                                value={this.state.volume}
                                type="text"
                                placeholder=""
                                autoComplete="off"
                                isInvalid={isNaN(Number(this.state.volume))}
                              />
                            </div>
                            <div class="col-md-4 col-lg-4 form-group">
                              <label for="">
                                Promotional Incentive by seller
                              </label>
                              <Form.Control
                                onChange={(event) =>
                                  this.setState({
                                    additionalIncentive: event.target.value,
                                  })
                                }
                                value={this.state.additionalIncentive}
                                type="text"
                                placeholder=""
                                autoComplete="off"
                                isInvalid={isNaN(
                                  Number(this.state.additionalIncentive)
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6 text-right">
                          <a
                            href=""
                            className="btn btn-sm"
                            data-toggle="modal"
                            data-target="#nrtunsucessful"
                            onClick={this.calculateValues}
                          >
                            Calculate
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <div className="mt30 eraswapcal-tab row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="border-era">RESULTS</div>
                    <div className="table-responsive">
                    <table className="es-transaction striped bordered hover">
                      <thead>
                        <tr>
                          <th>TRANSACTIONS</th>
                          <th>STAKE REWARDS ES</th>
                          <th>LIQUID REWARDS ES</th>
                        </tr>
                        <tr>
                          <td>TimeAlly Incentive</td>
                          <td></td>
                          <td>{this.state.displayValues.timeAllyClub}</td>
                        </tr>
                        <tr>
                          <td>Day Swappers Tree Incentive</td>
                          <td>
                            {this.state.displayValues.dayswapperTreeReward}
                          </td>
                          <td>
                            {this.state.displayValues.dayswapperTreeReward}
                          </td>
                        </tr>
                        <tr>
                          <td>Burning</td>
                          <td></td>
                          <td>{this.state.displayValues.burning}</td>
                        </tr>
                        <tr>
                          <td>Charity</td>
                          <td></td>
                          <td>{this.state.displayValues.charity}</td>
                        </tr>
                      </thead>
                    </table>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionsIncentiveCalculator;
