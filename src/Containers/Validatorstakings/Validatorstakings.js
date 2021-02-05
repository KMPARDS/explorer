import React, { Component } from 'react';
import './validatorstakings.css';
import { Link } from 'react-router-dom';
import Images from '../Images/Images';
import { Col, Button, Container, Row } from 'react-bootstrap';
import Header from '../../Components/Header/Header';
import Navbar from '../../Components/Navbar/Navbar';
import Apis from '../../lib/apis';
import { validatorsManager } from '../../ethereum/ValidatorStakingsManager';
import { nrtManager } from '../../ethereum/NrtManager';
import { ethers } from 'ethers';

class Validatorstakings extends Component {
  month = 0;

  constructor(props) {
    super(props);
    this.state = {
      validators: {
        data: [],
        isLoading: true,
      },
      month: null,
      totalBlocksSealedThisMonth: 0,
    };

    this.decreaseMonth = this.decreaseMonth.bind(this);
    this.increaseMonth = this.increaseMonth.bind(this);
    this.defaultMonth = this.defaultMonth.bind(this);
  }

  componentDidMount() {
    this.fetchMonth();
  }

  async fetchMonth() {
    const month = await nrtManager.currentNrtMonth();
    this.month = Number(month);
    this.setState({ month: this.month }, this.fetchData);
  }

  fetchData() {
    console.log('this.state.month', this.state.month);
    this.fetchValidators();
    this.fetchTotalBlocksSealed();
  }

  async fetchTotalBlocksSealed() {
    try {
      if (this.state.month !== null) {
        const totalBlocks = await validatorsManager.getTotalBlocksSealed(
          this.state.month
        );
        this.setState({
          totalBlocksSealedThisMonth: totalBlocks.toNumber(),
        });
      }
    } catch (e) {
      console.log('fetchTotalBlocksSealed',e);
    }
  }

  async fetchValidators() {
    try {
      if (this.state.month !== null) {
        const res = await Apis.fetchValidatorsByMonth(this.state.month);
        console.log('res', res);
        if (res)
          this.setState({
            validators: {
              data: res || Array.isArray(res) || [],
              isLoading: false,
            },
          });
      }
    } catch (e) {
      console.log('fetchValidators', e);
      this.setState({
        validators: {
          data: [],
          isLoading: false,
        },
      });
    }
  }

  decreaseMonth() {
    if (this.state.month !== null)
      this.setState(
        {
          month: this.month - 1,
          validators: {
            ...this.state.validators,
            isLoading: true,
          },
        },
        this.fetchData
      );
  }

  increaseMonth() {
    if (this.state.month !== null)
      this.setState(
        {
          month: this.month + 1,
          validators: {
            ...this.state.validators,
            isLoading: true,
          },
        },
        this.fetchData
      );
  }

  defaultMonth() {
    if (this.state.month !== null)
      this.setState(
        {
          month: this.month,
          validators: {
            ...this.state.validators,
            isLoading: true,
          },
        },
        this.fetchData
      );
  }

  render() {
    return (
      <div className="compage">
        <div className="booking-hero-bgd booking-hero-bgd-inner">
          <Navbar />
          <h2 className="es-main-head es-main-head-inner">
            Validator Stakings
          </h2>
        </div>
        <Container>
          {/* <p className="trans-head">TimeAlly Explorer</p> */}

          <Row className="mt40">
            <Col lg={12}>
              <div className="card">
                <div id="tabs" className="project-tab mt20">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <nav>
                          <div
                            className="nav nav-tabs nav-fill"
                            id="nav-tab"
                            role="tablist"
                          >
                            <a
                              className="nav-item nav-link"
                              id="nav-home-tab"
                              data-toggle="tab"
                              href="#nav-home"
                              role="tab"
                              aria-controls="nav-home"
                              aria-selected="true"
                              onClick={this.decreaseMonth}
                            >
                              PREVIOUS MONTHS
                            </a>
                            <a
                              className="nav-item nav-link active"
                              id="nav-profile-tab"
                              data-toggle="tab"
                              href="#nav-profile"
                              role="tab"
                              aria-controls="nav-profile"
                              aria-selected="false"
                              onClick={this.defaultMonth}
                            >
                              PRESENT
                            </a>
                            <a
                              className="nav-item nav-link"
                              id="nav-contact-tab"
                              data-toggle="tab"
                              href="#nav-contact"
                              role="tab"
                              aria-controls="nav-contact"
                              aria-selected="false"
                              onClick={this.increaseMonth}
                            >
                              FUTURE MONTHS
                            </a>
                          </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                          <div
                            className="tab-pane fade show active"
                            id="nav-home"
                            role="tabpanel"
                            aria-labelledby="nav-home-tab"
                          >
                            <div className="col-md-12 text-center mt30">
                              <p className="explr-purple-text">
                                {/*Validator Stakings for August 2020 month */}
                              </p>
                            </div>
                            <div className="table-responsive mb30">
                              <table className="es-transaction striped bordered hover">
                                <tr>
                                  <th>Validator</th>
                                  <th>Amount</th>
                                  <th>Adjusted Amount</th>
                                  <th>Blocks Sealed</th>
                                  <th>Delegator Stakings</th>
                                </tr>
                                {this.state.validators.isLoading ? (
                                  <tr>
                                    <td colSpan="5">Loading...</td>
                                  </tr>
                                ) : this.state.validators.data.length ? (
                                  this.state.validators.data.map(
                                    (validator, i) => (
                                      <tr>
                                        <td>{validator.validator.address}</td>
                                        <td>
                                          {
                                            validator.amount
                                          }{' '}
                                        </td>
                                        <td>
                                          {
                                            validator.adjusted_amount
                                          }
                                        </td>
                                        <td>
                                          {validator.blocks_mined}{' '}
                                          {this.state
                                            .totalBlocksSealedThisMonth ? (
                                            <>
                                              (
                                              {(validator.blocks_mined /
                                                this.state
                                                  .totalBlocksSealedThisMonth) *
                                                100}
                                              %)
                                            </>
                                          ) : null}
                                        </td>
                                        <td>
                                          {validator.delegatorstakings?.map(
                                            (stakes, j) => (
                                              <span>
                                                ({stakes.address.address} =&gt;{' '}
                                                {ethers.utils.formatEther(
                                                  stakes.amount
                                                )}
                                                )
                                              </span>
                                            )
                                          )}
                                        </td>
                                      </tr>
                                    )
                                  )
                                ) : (
                                  <tr>
                                    <td colSpan="5">No Validators</td>
                                  </tr>
                                )}
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Validatorstakings;
