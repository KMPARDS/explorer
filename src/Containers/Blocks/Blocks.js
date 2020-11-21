import React, { Component } from 'react';
import './Blocks.css';
import { Link } from 'react-router-dom';
import Images from '../Images/Images';
import { Col, Button, Container, Row } from 'react-bootstrap';
import Navbar from '../../Components/Navbar/Navbar';
import Apis from '../../lib/apis';
import AddressLink from '../../Components/AddressLink/AddressLink';
import CustomPagination from '../../Components/CustomPagination/CustomPagination';
import { Snackbar } from '../../Components/Snackbar/Snackbar';
import { toLocaleTimestamp } from '../../lib/parsers';
import { ethers } from 'ethers';

class Blocks extends Component {
  snackbarRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      blocks: {
        data: [],
        currentPage: 0,
        totalPages: 0,
        isLoading: false,
      },
    };

    this.fetchBlocks = this.fetchBlocks.bind(this);
  }

  componentDidMount() {
    this.fetchBlocks(0);
    this.nrtTicker();
  }

  async fetchBlocks(start, length = 10) {
    try {
      const res = await Apis.fetchBlocks(start, length);
      if (res)
        this.setState({
          blocks: {
            data: res.data,
            currentPage: Number(res.currentPage),
            totalPages: res.totalPages,
            isLoading: false,
          },
        });
    } catch (e) {
      console.log(e);
      // this.openSnackBar(e.message);
      this.setState({
        blocks: {
          data: [],
          isLoading: false,
        },
      });
    }
  }

  openSnackBar(message) {
    this.snackbarRef.current.openSnackBar(message);
  }


  nrtTicker() {
    /// @dev countdown timer for nrt release
    const deployTimestamp = 1564336091 * 1000;
    const monthDuration = 2629744 * 1000;

    let seeFutureNrt = false;
    let currentNrtMonthNumber = 0;
    // let nextNrtTimestamp = deployTimestamp + monthDuration * (currentNrtMonthNumber + 1);

    setInterval(async () => {
      try {
        const res = await Apis.getCurrentNRTMonth();
        if (!currentNrtMonthNumber) {
          currentNrtMonthNumber = res.data.nrtMonth;
        } else if (
          res.data.nrtMonth !== currentNrtMonthNumber &&
          !seeFutureNrt
        ) {
          window.location.reload();
        }
      } catch (e) {
        console.log(e);
      }
    }, 3500);

    setInterval(() => {
      const nextNrtTimestamp =
        deployTimestamp + monthDuration * (currentNrtMonthNumber + 1);
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
    return (
      <div className="blocks-table compage">
        <div className="booking-hero-bgd booking-hero-bgd-inner">
          <Navbar />
          <h2 className="es-main-head es-main-head-inner">Blocks</h2>
        </div>
        <Container>
          <Row className="mt40">
            <Col lg={12}>
              <div className="card">
                <div className="table-responsive">
                  <table className="es-transaction table">
                    <tr>
                      <th
                        data-toggle="tooltip"
                        data-placement="top"
                        title="The Block in which this Transaction was included"
                      >
                        Block
                      </th>
                      <th
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Age is the Age of this Block when it was mined"
                      >
                        Age
                      </th>
                      <th
                        data-toggle="tooltip"
                        data-placement="top"
                        title="These are the transactions that are included in this Block"
                      >
                        Transaction
                      </th>
                      <th
                        data-toggle="tooltip"
                        data-placement="top"
                        title="The validator who authors a Block on Era Swap Network"
                      >
                        Sealer
                      </th>
                      <th
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Gas used is the amount of Computation Power utilized in the Block"
                      >
                        Gas Used
                      </th>
                      <th
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Gas Limit is the maximum amount of computation that can happen in this Block"
                      >
                        Gas Limit
                      </th>
                      <th
                        data-toggle="tooltip"
                        data-placement="top"
                        title="The average gas price is typically on the order of about 20 ESMETER (or 0.00000002 ES), but can increase during times of high network traffic as there are more transactions competing to be included in the next block"
                      >
                        Average Gas Price
                      </th>
                      <th
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Rewards are the rewards pending for final computation at the beginning of the next NRT month"
                      >
                        Reward
                      </th>
                    </tr>
                    {this.state.blocks.isLoading ? (
                      <tr>
                        <td colspan="9">Loading</td>
                      </tr>
                    ) : this.state.blocks.data.length ? (
                      this.state.blocks.data.map((block, i) => {
                        return (
                          <tr key={i + 1}>
                            <td className="tr-color-txt">
                              <AddressLink
                                value={block.block_number}
                                type="block"
                              />
                            </td>
                            <td>
                              {toLocaleTimestamp(block.timestamp).fromNow()}
                            </td>
                            <td className="tr-color-txt">
                              <Link
                                to={{
                                  pathname: 'txns' + '/' + block.block_number,
                                  state: { value: block.block_number },
                                }}
                              >
                                {block.raw_transactions_count}
                              </Link>
                            </td>
                            <td className="tr-color-txt">
                              <AddressLink
                                value={block.miner.address}
                                type="address"
                              />
                            </td>
                            <td className="underline">
                              {
                                (block?.total_gas_used !== undefined 
                                  && 
                                block?.total_gas_limit)
                                ?
                                <>
                                {block?.total_gas_used} (
                                {(
                                  (block?.total_gas_used /
                                    block?.total_gas_limit) *
                                  100
                                ).toFixed(2)}
                                %)
                                </>
                                :
                                '-'
                              }
                              
                            </td>
                            <td>{block.total_gas_limit} </td>
                            <td>
                              {' '}
                              {block?.average_gas_price &&
                                ethers.utils.formatEther(
                                  block.average_gas_price
                                )}{' '}
                              ES
                            </td>
                            <td>
                              {block.provisional_reward !== null ? (
                                block.provisional_reward + 'ES'
                              ) : (
                                <i>Time Remaining for  Next NRT released...
                                {this.state.nextNrtCounter.data.days}Days:
                                {this.state.nextNrtCounter.data.hours}:
                                {this.state.nextNrtCounter.data.minutes}:
                                {this.state.nextNrtCounter.data.seconds}
                                </i>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colspan="9">Loading</td>
                      </tr>
                    )}
                  </table>
                </div>
                <Col lg={12} className="mb30">
                  <CustomPagination
                    handleClick={this.fetchBlocks}
                    currentPage={this.state.blocks.currentPage}
                    prevPage={this.state.blocks.currentPage - 1}
                    nextPage={this.state.blocks.currentPage + 1}
                    totalPages={this.state.blocks.totalPages}
                  />
                  <Snackbar ref={this.snackbarRef} />
                </Col>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Blocks;
