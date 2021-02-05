import React, { Component } from 'react';
import './bunch.css';
import Images from '../Images/Images';
import Header from '../../Components/Header/Header';
import Navbar from '../../Components/Navbar/Navbar';
import { Col, Button, Container, Row, Tabs, Tab } from 'react-bootstrap';
import Apis from '../../lib/apis';
import { toLocaleTimestamp } from '../../lib/parsers';
import { Snackbar } from '../../Components/Snackbar/Snackbar';
import AddressLink from '../../Components/AddressLink/AddressLink';
import * as moment from 'moment';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';

class Bunch extends Component {
  snackbarRef = React.createRef();

  constructor(props) {
    super(props);

    const {
      match: { params },
    } = this.props;

    this.state = {
      bunchIndex: params.bunchIndex,
      bunch: {
        data: {},
        isLoading: true,
      },
      transactions: {
        data: [],
        isLoading: false,
      },
    };

    this.openSnackBar = this.openSnackBar.bind(this);
  }

  componentDidMount() {
    this.fetchBunch();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.bunchIndex !== prevProps.match.params.bunchIndex
    ) {
      this.setState(
        {
          bunchIndex: this.props.match.params.bunchIndex,
          bunch: {
            data: {},
            isLoading: true,
          },
          transactions: {
            data: [],
            isLoading: false,
          },
        },
        this.fetchBunch
      );
    }
  }

  async fetchBunch() {
    try {
      const res = await Apis.fetchBunch(this.state.bunchIndex);
      console.log('res', res);
      if (res.status)
        this.setState({
          bunch: {
            data: res.data,
            isLoading: false,
          },
        });
      else this.openSnackBar(res.error.message);
    } catch (e) {
      console.log(e);
      this.openSnackBar(e.message);
      this.setState({
        bunch: {
          data: {},
          isLoading: false,
        },
      });
    }
  }

  openSnackBar(message) {
    // this.snackbarRef.current.openSnackBar(message);
  }

  render() {
    return (
      <div className="bunch compage">
        <div className="booking-hero-bgd booking-hero-bgd-inner">
          <Navbar />
          <h2 className="es-main-head es-main-head-inner">
            Bunch #{this.state.bunchIndex}
          </h2>
        </div>
        <div className="wrapper-container">
          <div className="BlockPage-detail">
            <Container>
              <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example">
                <Tab eventKey="overview" title="Overview">
                  <div className="card">
                    <div className="table-responsive">
                      <table className="block-overview table">
                        {Object.keys(this.state.bunch.data).length ? (
                          <tbody>
                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Bunch Index is the Index of Bunch"
                              >
                                Bunch Index:{' '}
                              </td>
                              <td>{this.state.bunch.data.bunch_index}</td>
                            </tr>
                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Bunch Depth is the Depth of Merkle Tree"
                              >
                                Bunch Depth:{' '}
                              </td>
                              <td>{this.state.bunch.data.bunch_depth}</td>
                            </tr>
                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Transaction Mega Root is the Merkle Root of all the Transaction Roots of Blocks in this Bunch"
                              >
                                Transactions Mega Root:{' '}
                              </td>
                              <td>
                                {this.state.bunch.data.transactions_mega_root}
                              </td>
                            </tr>
                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Receipts Mega Root is the Merkle Root of all the Receipt Roots of Blocks in this Block"
                              >
                                Receipts Mega Root:{' '}
                              </td>
                              <td>{this.state.bunch.data.receipts_mega_root}</td>
                            </tr>
                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Last Block Hash is the hash of last Block in this Bunch"
                              >
                                Last Block Hash:{' '}
                              </td>
                              <td>{this.state.bunch.data.last_block_hash}</td>
                            </tr>
                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Informer pays the gas fee to post the Bunch Roots to Ethereum"
                              >
                                Informer:
                              </td>
                              <td>
                                <AddressLink
                                  value={this.state.bunch.data.informer}
                                  type="address"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Informer Transaction Hash is the Transaction Hash of Bunch Posting Transaction by Informer on Ethereum"
                              >
                                Informer Transaction Hash:{' '}
                              </td>
                              <td>{this.state.bunch.data.informer_tx_hash}</td>
                            </tr>
                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Block Count is the number of Blocks in this Bunch"
                              >
                                Blocks Count:{' '}
                              </td>
                              <td>{this.state.bunch.data.blocks_count}</td>
                            </tr>
                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Block Count is the number of Blocks in this Bunch"
                              >
                                Transactions Count:{' '}
                              </td>
                              <td>{this.state.bunch.data.transactions_count}</td>
                            </tr>
                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Time Stamp show that the blocks are connected in a chronological order which marks the time for each transaction on Era Swap Network"
                              >
                                Timestamp:
                              </td>
                              <td>
                                {toLocaleTimestamp(
                                  this.state.bunch.data.timestamp
                                ).fromNow()}{' '}
                                (
                                {toLocaleTimestamp(
                                  this.state.bunch.data.timestamp
                                ).format('MMMM-DD-YYYY hh:mm:ss A')}
                                )
                              </td>
                            </tr>
                          </tbody>
                        ) : (
                          <tr>
                            <td colSpan="2">No Bunch</td>
                          </tr>
                        )}
                      </table>
                    </div>
                  </div>
                </Tab>
                {/* <Tab eventKey="comments" title="Comments">
                  <Row>
                    <Col sm={2}>
                      <img className='comm-profile-Img' src={Images.path.imgProfile} alt='profile' />
                    </Col>
                    <Col sm={10}>
                      <textarea className='comm-field' type="text" id="text" name="text" placeholder="Comments" />
                      <div className="btn-flex-right">
                        <button className="submit-btn-comm">Submit</button>
                      </div>
                    </Col>
                  </Row>
                  <div className="public-container">
                    <div className="flex-user-comm">
                      <img className='comm-user-Img' src={Images.path.imgProfile} alt='profile' />
                      <div>
                        <h6>Ravindra Jadeja</h6>
                        <p className="user-para">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
                      </div>
                    </div>

                    <div className="flex-user-comm">
                      <img className='comm-user-Img' src={Images.path.imgProfile} alt='profile' />
                      <div>
                        <h6>Ravindra Jadeja</h6>
                        <p className="user-para">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
                      </div>
                    </div>
                  </div>
                </Tab> */}
              </Tabs>
              <div className="card mt40">
                <div className="table-responsive">
                  <table className="es-transaction table">
                    <thead>
                      <tr>
                        <th>Txn Hash </th>
                        <th>Block</th>
                        <th>Age</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Value</th>
                        <th>(Txn Fee)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.transactions.isLoading ? (
                        <tr>
                          <td colSpan="7">Loading...</td>
                        </tr>
                      ) : this.state.transactions.data?.length ? (
                        this.state.transactions.data?.map((transaction, i) => {
                          return (
                            <tr key={i + 1}>
                              <td className="tr-color-txt">
                                <AddressLink
                                  value={transaction.txn_hash}
                                  type="txn"
                                  shrink={true}
                                />
                              </td>
                              <td className="tr-color-txt">
                                <AddressLink
                                  value={transaction.block.block_number}
                                  type="block"
                                />
                              </td>
                              <td>
                                {moment(
                                  moment(transaction.createdOn).toDate()
                                ).fromNow()}
                              </td>
                              <td>
                                {transaction.fromAddress.label && (
                                  <Link
                                    to={'/' + transaction.fromAddress.address}
                                  >
                                    {transaction.fromAddress.label}
                                  </Link>
                                )}
                                <span className="tr-color-txt">
                                  <AddressLink
                                    value={transaction.fromAddress.address}
                                    type="address"
                                    shrink={
                                      transaction.fromAddress.label.length
                                    }
                                  />
                                </span>
                              </td>
                              <td>
                                {transaction.fromAddress.label && (
                                  <Link
                                    to={'/' + transaction.fromAddress.address}
                                  >
                                    {transaction.fromAddress.label}
                                  </Link>
                                )}
                                <span className="tr-color-txt">
                                  <AddressLink
                                    value={transaction.toAddress.address}
                                    type="address"
                                    shrink={
                                      transaction.fromAddress.label.length
                                    }
                                  />
                                </span>
                              </td>
                              <td>
                                {ethers.utils.formatEther(transaction.value)} ES{' '}
                              </td>
                              <td>
                                {ethers.utils.formatEther(
                                  ethers.BigNumber.from(
                                    transaction.gas_price
                                  ).mul(transaction.gas_used)
                                )}{' '}
                                ES
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="7">No Transactions</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  {/* <CustomPagination
            handleClick={this.fetchTransactions}
            currentPage={this.state.transactions.currentPage}
            prevPage={this.state.transactions.currentPage - 1}
            nextPage={this.state.transactions.currentPage + 1}
            totalPages={this.state.transactions.totalPages}
          /> */}
                </div>
              </div>
              <Snackbar ref={this.snackbarRef} />
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default Bunch;
