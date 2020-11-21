import React, { Component } from 'react';
import './TopStatistics.css';
import { Link } from 'react-router-dom';
import Images from '../Images/Images';
import { Col, Button, Container, Row } from 'react-bootstrap';
import Header from '../../Components/Header/Header';
import Navbar from '../../Components/Navbar/Navbar';
import Apis from '../../lib/apis';
import { validatorsManager } from '../../ethereum/ValidatorStakingsManager';
import { nrtManager } from '../../ethereum/NrtManager';
import { ethers } from 'ethers';
import { formatEther } from '../../lib/parsers';
import AddressLink from '../../Components/AddressLink/AddressLink';
import { PieChart, Pie, Cell } from 'recharts';
import { CustomDatatable } from '../../Components/CustomDatatable/CustomDatatable';

const COUNT_PER_PAGE = 10;

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#A134FE',
  '#FF1102',
  '#54C9C2',
  '#6233FE',
  '#B8D60F',
  '#FF5E8C',
  '#ABCCE1'
];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class TopStatistics extends Component {
  month = 0;

  constructor(props) {
    super(props);
    this.state = {
      topSender: {
        address: null,
        amt: 0,
        isLoading: true,
      },
      topReceiver: {
        address: null,
        amt: 0,
        isLoading: true,
      },
      topSentTxn: {
        address: null,
        count: 0,
        isLoading: true,
      },
      topReceivedTxn: {
        address: null,
        count: 0,
        isLoading: true,
      },
      topTxnAcc: {
        address: null,
        count: 0,
        isLoading: true,
      },
      topBlockee: {
        address: null,
        count: 0,
        isLoading: true,
      },
      topStaker: {
        address: null,
        amt: 0,
        isLoading: true,
      },
      topSendersList: {
        data: [],
        isLoading: false,
      },
      topReceiverList: {
        data: [],
        isLoading: false,
      },
      topSentTxnList: {
        data: [],
        isLoading: false,
      },
      topReceivedTxnList: {
        data: [],
        isLoading: false,
      },
      topTxnAccList: {
        data: [],
        isLoading: false,
      },
      topStakers: {
        data: [],
        isLoading: false,
      },
      topNodes: {
        data: [],
        isLoading: false,
      },
    };
  }

  componentDidMount() {
    this.fetchStatistics();
    this.fetchTopStakers();
    this.fetchTopNodes();
  }

  async fetchStatistics() {
    let res;
    try {
      res = await Apis.fetchStatistics({ limit: 1 });
      console.log(res);
    } catch (e) {
    } finally {
      if (res && res.status) {
        this.setState({
          topSender: {
            address: res.topSender[0].address,
            amt:
              (res?.topSender[0]?.totalESSent &&
                formatEther(res.topSender[0].totalESSent)) ||
              '-',
            isLoading: false,
          },
          topReceiver: {
            address: res.topReceiver[0].address,
            amt:
              (res?.topReceiver[0]?.totalESReceived &&
                formatEther(res.topReceiver[0].totalESReceived)) ||
              '-',
            isLoading: false,
          },
          topSentTxn: {
            address: res.topTxnSent[0].address,
            count: res.topTxnSent[0].txnSentCount,
            isLoading: false,
          },
          topReceivedTxn: {
            address: res.topTxnReceived[0].address,
            count: res.topTxnReceived[0].txnReceivedCount,
            isLoading: false,
          },
          topTxnAcc: {
            address: res.topAccountByTxnCount[0].address,
            count: res.topAccountByTxnCount[0].address_txnsCount,
            isLoading: false,
          },
          topSendersList: {
            data: res.topSender,
            isLoading: false,
          },
          topReceiverList: {
            data: res.topReceiver,
            isLoading: false,
          },
          topSentTxnList: {
            data: res.topTxnSent,
            isLoading: false,
          },
          topReceivedTxnList: {
            data: res.topTxnReceived,
            isLoading: false,
          },
          topTxnAccList: {
            data: res.topAccountByTxnCount,
            isLoading: false,
          },
        });
      }
    }
  }

  async fetchTopStakers() {
    let res;
    try {
      res = await Apis.fetchTopStakers(10);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        topStaker: {
          address: res?.data ? res.data[0]?.address || '-' : '-',
          amt:
            res?.data && res.data[0]?.amount
              ? formatEther(res.data[0]?.amount) || '-'
              : '-',
          isLoading: true,
        },
        topStakers: {
          data: res?.data ? res.data : [],
          isLoading: false,
        },
      });
    }
  }

  async fetchTopNodes() {
    let res;
    try {
      res = await Apis.fetchTopNodes(10);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        topNodes: {
          data: res?.data ? res.data : [],
          isLoading: false,
        },
        topBlockee: {
          address: res?.data ? res.data[0]?.nodeIp : '-',
          count: res?.data ? res.data[0]?.blocks : 0,
          isLoading: true,
        },
      });
    }
  }

  render() {
    return (
      <div className="calculator">
        <div className="booking-hero-bgd booking-hero-bgd-inner">
          <Navbar />
          <h2 className="es-main-head es-main-head-inner">Top Statistics</h2>
        </div>
        <Container>
          <Row className="mt40">
            <div className="col-lg-6"></div>
            <Col lg={12} className="mt20">
              <div className="card tab-card ">
<<<<<<< HEAD
                <div className="card-header tab-card-header overviewtab">
                  <ul
                    className="nav nav-tabs card-header-tabs"
                    id="myTab"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link text-dark active "
                        id="one-tab"
                        data-toggle="tab"
                        href="#one"
                        role="tab"
                        aria-controls="One"
                        aria-selected="true"
                      >
                        Overview
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link text-dark"
                        id="two-tab"
                        data-toggle="tab"
                        href="#two"
                        role="tab"
                        aria-controls="Two"
                        aria-selected="false"
                      >
                        Transactions
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link text-dark"
                        id="three-tab"
                        data-toggle="tab"
                        href="#three"
                        role="tab"
                        aria-controls="Three"
                        aria-selected="false"
                      >
                        Network
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link text-dark"
                        id="four-tab"
                        data-toggle="tab"
                        href="#four"
                        role="tab"
                        aria-controls="Four"
                        aria-selected="false"
                      >
                        Sealers
                      </a>
                    </li>
                  </ul>
                </div>
=======
                  <div className="card-header tab-card-header overviewtab">
                    <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                      <li className="nav-item">
                          <a className="nav-link active " id="one-tab" data-toggle="tab" href="#one" role="tab" aria-controls="One" aria-selected="true">Overview</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" id="two-tab" data-toggle="tab" href="#two" role="tab" aria-controls="Two" aria-selected="false">Transactions</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" id="three-tab" data-toggle="tab" href="#three" role="tab" aria-controls="Three" aria-selected="false">Network</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" id="four-tab" data-toggle="tab" href="#four" role="tab" aria-controls="Four" aria-selected="false">Miners</a>
                      </li>
                    </ul>
                  </div>

                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active p-3" id="one" role="tabpanel" aria-labelledby="one-tab">
                                            <div className="mt30 eraswapcal-tab row">
                                                  <div className="col-lg-6 mt10" >
                                                    <div  className="card">
                                                      <table className="es-transaction striped bordered hover">
                                                        <thead>
                                                          <tr>
                                                            <th>TRANSACTIONS</th>
                                                            <th className="text-right"><a href="" className="value-dash-txt">View Top 10</a></th>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              <p class="sect-txt-bold ">Top ES Sender</p>
                                                              <p class="value-dash-txt">Unknown</p>
                                                            </td>
                                                            <td className="text-right">
                                                              <p class="sect-txt-bold">Total ES</p>
                                                              <p class="value-dash-txt">215151121 ES</p>
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              <p class="sect-txt-bold ">Top ES Receiv</p>
                                                              <p class="value-dash-txt">Unknown</p>
                                                            </td>
                                                            <td className="text-right">
                                                              <p class="sect-txt-bold ">Total ES</p>
                                                              <p class="value-dash-txt">513151121 ES</p>
                                                            </td>
                                                            
                                                          </tr>
                                                        </thead>
                                                      </table>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-6 mt10" >
                                                      <div  className="card">
                                                          <table className="es-transaction striped bordered hover">
                                                            <thead>
                                                              <tr>
                                                                <th></th>
                                                                <th className="text-right"><a href="" className="value-dash-txt">View Top 10</a></th>
                                                              </tr>
                                                              <tr>
                                                                <td>
                                                                  <p class="sect-txt-bold ">Top Txn Count Sent</p>
                                                                  <p class="value-dash-txt">Unknown</p>
                                                                </td>
                                                                <td className="text-right">
                                                                  <p class="sect-txt-bold">Total Txn</p>
                                                                  <p class="value-dash-txt">13,741</p>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td>
                                                                  <p class="sect-txt-bold ">Top Txn Count Received</p>
                                                                  <p class="value-dash-txt">Unknown</p>
                                                                </td>
                                                                <td className="text-right">
                                                                  <p class="sect-txt-bold ">Total ES</p>
                                                                  <p class="value-dash-txt">270,968</p>
                                                                </td>
                                                                
                                                              </tr>
                                                            </thead>
                                                          </table>
                                                        </div>
                                                  </div>
                                                  <div className="col-lg-6 mt20" >
                                                    <div  className="card">
                                                      <table className="es-transaction striped bordered hover">
                                                        <thead>
                                                          <tr>
                                                            <th>Network</th>
                                                            <th className="text-right"><a href="" className="value-dash-txt">View Top 10</a></th>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              <p class="sect-txt-bold ">Top accounts by txn count </p>
                                                              <p class="value-dash-txt">Unknown</p>
                                                            </td>
                                                            <td className="text-right">
                                                              <p class="sect-txt-bold">Txn Count</p>
                                                              <p class="value-dash-txt">215151121 ES</p>
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              <p class="sect-txt-bold "></p>
                                                              <p class="value-dash-txt"></p>
                                                            </td>
                                                            <td className="text-right">
                                                              <p class="sect-txt-bold "></p>
                                                              <p class="value-dash-txt"></p>
                                                            </td>
                                                            
                                                          </tr>
                                                        </thead>
                                                      </table>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-6 mt20" >
                                                      <div  className="card">
                                                          <table className="es-transaction striped bordered hover">
                                                            <thead>
                                                              <tr>
                                                                <th>Miners</th>
                                                                <th className="text-right"><a href="" className="value-dash-txt">View Top 10</a></th>
                                                              </tr>
                                                              <tr>
                                                                <td>
                                                                  <p class="sect-txt-bold ">Top </p>
                                                                  <p class="value-dash-txt">Unknown</p>
                                                                </td>
                                                                <td className="text-right">
                                                                  <p class="sect-txt-bold">Blokcee Mined</p>
                                                                  <p class="value-dash-txt">13,741</p>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td>
                                                                  <p class="sect-txt-bold ">Top Stakers</p>
                                                                  <p class="value-dash-txt">Unknown</p>
                                                                </td>
                                                                <td className="text-right">
                                                                  <p class="sect-txt-bold ">Total ES</p>
                                                                  <p class="value-dash-txt">270,968</p>
                                                                </td>
                                                                
                                                              </tr>
                                                            </thead>
                                                          </table>
                                                        </div>
                                                  </div>

                                            </div>
>>>>>>> 3941d6bdca824e9c03cb359a383e0a4e5d4b71a7

                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active p-3"
                    id="one"
                    role="tabpanel"
                    aria-labelledby="one-tab"
                  >
                    <div className="mt30 eraswapcal-tab row">
                      <div className="col-lg-6 mt10">
                        <div className="card">
                        <div className="table-responsive">
                          <table className="es-transaction striped bordered hover">
                            <thead>
                              <tr>
                                <th>TRANSACTIONS</th>
                                <th className="text-right">
                                  {/* <a href="" className="value-dash-txt">
                                    View Top 10
                                  </a> */}
                                </th>
                              </tr>
                              <tr>
                                <td>
                                  <p class="sect-txt-bold ">Top ES Sender</p>
                                  <p class="value-dash-txt">
                                    {this.state.topSender.isLoading ? (
                                      'Loading...'
                                    ) : this.state.topSender.address ? (
                                      <AddressLink
                                        value={this.state.topSender.address}
                                        type="address"
                                      />
                                    ) : (
                                      '-'
                                    )}
                                  </p>
                                </td>
                                <td className="text-right">
                                  <p class="sect-txt-bold">Total ES</p>
                                  <p class="value-dash-txt">
                                    {this.state.topSender.isLoading
                                      ? 'Loading...'
                                      : this.state.topSender.amt
                                      ? this.state.topSender.amt + ' ES'
                                      : '-'}
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <p class="sect-txt-bold ">Top ES Receiver</p>
                                  <p class="value-dash-txt">
                                    {this.state.topReceiver.isLoading ? (
                                      'Loading...'
                                    ) : this.state.topReceiver.address ? (
                                      <AddressLink
                                        value={this.state.topReceiver.address}
                                        type="address"
                                      />
                                    ) : (
                                      '-'
                                    )}
                                  </p>
                                </td>
                                <td className="text-right">
                                  <p class="sect-txt-bold ">Total ES</p>
                                  <p class="value-dash-txt">
                                    {this.state.topReceiver.isLoading
                                      ? 'Loading...'
                                      : this.state.topReceiver.amt
                                      ? this.state.topReceiver.amt + ' ES'
                                      : '-'}
                                  </p>
                                </td>
                              </tr>
                            </thead>
                          </table>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 mt10">
                        <div className="card">
                        <div className="table-responsive">
                          <table className="es-transaction striped bordered hover">
                            <thead>
                              <tr>
                                <th>TRANSACTIONS</th>
                                <th className="text-right">
                                  {/* <a href="" className="value-dash-txt">
                                    View Top 10
                                  </a> */}
                                </th>
                              </tr>
                              <tr>
                                <td>
                                  <p class="sect-txt-bold ">
                                    Top Txn Count Sent
                                  </p>
                                  <p class="value-dash-txt">
                                    {this.state.topSentTxn.isLoading ? (
                                      'Loading...'
                                    ) : this.state.topSentTxn.address ? (
                                      <AddressLink
                                        value={this.state.topSentTxn.address}
                                        type="address"
                                      />
                                    ) : (
                                      '-'
                                    )}
                                  </p>
                                </td>
                                <td className="text-right">
                                  <p class="sect-txt-bold">Total Txn</p>
                                  <p class="value-dash-txt">
                                    {this.state.topSentTxn.isLoading
                                      ? 'Loading...'
                                      : this.state.topSentTxn.count
                                      ? this.state.topSentTxn.count
                                      : '-'}
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <p class="sect-txt-bold ">
                                    Top Txn Count Received
                                  </p>
                                  <p class="value-dash-txt">
                                    {this.state.topReceivedTxn.isLoading ? (
                                      'Loading...'
                                    ) : this.state.topReceivedTxn.address ? (
                                      <AddressLink
                                        value={
                                          this.state.topReceivedTxn.address
                                        }
                                        type="address"
                                      />
                                    ) : (
                                      '-'
                                    )}
                                  </p>
                                </td>
                                <td className="text-right">
                                  <p class="sect-txt-bold ">Total Txn</p>
                                  <p class="value-dash-txt">
                                    {this.state.topReceivedTxn.isLoading
                                      ? 'Loading...'
                                      : this.state.topReceivedTxn.count
                                      ? this.state.topReceivedTxn.count
                                      : '-'}
                                  </p>
                                </td>
                              </tr>
                            </thead>
                          </table>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 mt20">
                        <div className="card">
                        <div className="table-responsive">
                          <table className="es-transaction striped bordered hover">
                            <thead>
                              <tr>
                                <th>Network</th>
                                <th className="text-right">
                                  {/* <a href="" className="value-dash-txt">
                                    View Top 10
                                  </a> */}
                                </th>
                              </tr>
                              <tr>
                                <td>
                                  <p class="sect-txt-bold ">
                                    Top accounts by txn count{' '}
                                  </p>
                                  <p class="value-dash-txt">
                                    {this.state.topTxnAcc.isLoading ? (
                                      'Loading...'
                                    ) : this.state.topTxnAcc.address ? (
                                      <AddressLink
                                        value={this.state.topTxnAcc.address}
                                        type="address"
                                      />
                                    ) : (
                                      '-'
                                    )}
                                  </p>
                                </td>
                                <td className="text-right">
                                  <p class="sect-txt-bold">Txn Count</p>
                                  <p class="value-dash-txt">
                                    {this.state.topTxnAcc.isLoading
                                      ? 'Loading...'
                                      : this.state.topTxnAcc.count
                                      ? this.state.topTxnAcc.count
                                      : '-'}
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <p class="sect-txt-bold "></p>
                                  <p class="value-dash-txt"></p>
                                </td>
                                <td className="text-right">
                                  <p class="sect-txt-bold "></p>
                                  <p class="value-dash-txt"></p>
                                </td>
                              </tr>
                            </thead>
                          </table>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 mt20">
                        <div className="card">
                        <div className="table-responsive">
                          <table className="es-transaction striped bordered hover">
                            <thead>
                              <tr>
                                <th>Sealers</th>
                                <th className="text-right">
                                  {/* <a href="" className="value-dash-txt">
                                    View Top 10
                                  </a> */}
                                </th>
                              </tr>
                              <tr>
                                <td>
                                  <p class="sect-txt-bold ">Top Blokcee</p>
                                  <p class="value-dash-txt">
                                    {this.state.topBlockee?.address}
                                  </p>
                                </td>
                                <td className="text-right">
                                  <p class="sect-txt-bold">Blokcee Mined</p>
                                  <p class="value-dash-txt">
                                    {this.state.topBlockee?.count}
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <p class="sect-txt-bold ">Top Stakers</p>
                                  <p class="value-dash-txt">
                                    <AddressLink
                                      value={this.state.topStaker?.address}
                                      type="address"
                                    />
                                  </p>
                                </td>
                                <td className="text-right">
                                  <p class="sect-txt-bold ">Total ES</p>
                                  <p class="value-dash-txt">
                                    {this.state.topStaker?.amt} ES
                                  </p>
                                </td>
                              </tr>
                            </thead>
                          </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade p-3"
                    id="two"
                    role="tabpanel"
                    aria-labelledby="two-tab"
                  >
                    <div className="mt30 eraswapcal-tab row">
                      <div className="col-lg-6 mt10">
                        <div className="card">
                          {/* <div class="border-era">Top ES Sender</div> */}
                          {/* <div className="table-responsive">
                          <table className="es-transaction striped bordered hover">
                            <thead>
                              <tr>
                                <th>Rank</th>
                                <th>Address</th>
                                <th>Amount</th>
                                <th>Percentage</th>
                              </tr>
                              {this.state.topSendersList.isLoading ? (
                                <tr>
                                  <td colSpan="4">Loading...</td>
                                </tr>
                              ) : this.state.topSendersList.data?.length ? (
                                this.state.topSendersList.data.map(
                                  (account, i) => (
                                    <tr>
                                      <td>{i + 1}</td>
                                      <td>
                                        <AddressLink
                                          value={account.address}
                                          shrink={true}
                                          type="address"
                                        />
                                      </td>
                                      <td>
                                        {account.totalESSent &&
                                          formatEther(account.totalESSent)}{' '}
                                        ES
                                      </td>
                                      <td>
                                        {account?.percent !== undefined
                                          ? account?.percent
                                          : '-'}
                                        %
                                      </td>
                                    </tr>
                                  )
                                )
                              ) : (
                                <tr>
                                  <td colSpan="4">No Data</td>
                                </tr>
                              )}
                            </thead>
                          </table>
                          </div> */}
                          <CustomDatatable
                            title="Top ES Sender"
                            apiCallback={Apis.fetchTopSenders}
                            countPerPage = {COUNT_PER_PAGE}
                            columns={
                              [
                                {
                                  name: 'Rank',
                                  selector: 'index'
                                },
                                {
                                  name: 'Address',
                                  cell: row => <AddressLink value={row.address} type="address" shrink={true} />
                                },
                                {
                                  name: 'Amount',
                                  cell: row => row.totalESSent ? formatEther(row.totalESSent) : 0
                                },
                                {
                                  name: 'Percentage',
                                  cell: row => `${row.percent || 0} %`
                                }
                              ]
                            }
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 mt10">
                        <div className="card">
                          {/* <div class="border-era">Top ES Receiver</div> */}
                          {/* <div className="table-responsive">
                          <table className="es-transaction striped bordered hover">
                            <thead>
                              <tr>
                                <th>Rank</th>
                                <th>Address</th>
                                <th>Amount</th>
                                <th>Percentage</th>
                              </tr>
                              {this.state.topReceiverList.isLoading ? (
                                <tr>
                                  <td colSpan="4">Loading...</td>
                                </tr>
                              ) : this.state.topReceiverList.data?.length ? (
                                this.state.topReceiverList.data.map(
                                  (account, i) => (
                                    <tr>
                                      <td>{i + 1}</td>
                                      <td>
                                        <AddressLink
                                          value={account.address}
                                          shrink={true}
                                          type="address"
                                        />
                                      </td>
                                      <td>
                                        {account.totalESReceived &&
                                          formatEther(
                                            account.totalESReceived
                                          )}{' '}
                                        ES
                                      </td>
                                      <td>
                                        {account?.percent !== undefined
                                          ? account?.percent
                                          : '-'}
                                        %
                                      </td>
                                    </tr>
                                  )
                                )
                              ) : (
                                <tr>
                                  <td colSpan="4">No Data</td>
                                </tr>
                              )}
                            </thead>
                          </table>
                          </div> */}
                          <CustomDatatable
                            title="Top ES Receiver"
                            apiCallback={Apis.fetchTopReceivers}
                            countPerPage = {COUNT_PER_PAGE}
                            columns={
                              [
                                {
                                  name: 'Rank',
                                  selector: 'index'
                                },
                                {
                                  name: 'Address',
                                  cell: row => <AddressLink value={row.address} type="address" shrink={true} />
                                },
                                {
                                  name: 'Amount',
                                  cell: row => row.totalESReceived ? formatEther(row.totalESReceived) : 0
                                },
                                {
                                  name: 'Percentage',
                                  cell: row => `${row.percent || 0} %`
                                }
                              ]
                            }
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 mt10">
                        <div className="card">
                          {/* <div class="border-era">Top Sent Txn Count</div> */}
                          {/* <div className="table-responsive">
                          <table className="es-transaction striped bordered hover">
                            <thead>
                              <tr>
                                <th>Rank</th>
                                <th>Address</th>
                                <th>Total Txn</th>
                                <th>Percentage</th>
                              </tr>
                              {this.state.topSentTxnList.isLoading ? (
                                <tr>
                                  <td colSpan="4">Loading...</td>
                                </tr>
                              ) : this.state.topSentTxnList.data?.length ? (
                                this.state.topSentTxnList.data.map(
                                  (account, i) => (
                                    <tr>
                                      <td>{i + 1}</td>
                                      <td>
                                        <AddressLink
                                          value={account.address}
                                          shrink={true}
                                          type="address"
                                        />
                                      </td>
                                      <td>{account.txnSentCount} </td>
                                      <td>
                                        {account?.percent !== undefined
                                          ? account?.percent
                                          : '-'}
                                        %
                                      </td>
                                    </tr>
                                  )
                                )
                              ) : (
                                <tr>
                                  <td colSpan="4">No Data</td>
                                </tr>
                              )}
                            </thead>
                          </table>
                          </div> */}
                          <CustomDatatable
                            title="Top Sent Txn Count"
                            apiCallback={Apis.fetchTopTxnSent}
                            countPerPage = {COUNT_PER_PAGE}
                            columns={
                              [
                                {
                                  name: 'Rank',
                                  selector: 'index'
                                },
                                {
                                  name: 'Address',
                                  cell: row => <AddressLink value={row.address} type="address" shrink={true} />
                                },
                                {
                                  name: 'Total Txn',
                                  selector: 'txnSentCount'
                                },
                                {
                                  name: 'Percentage',
                                  cell: row => `${row.percent || 0} %`
                                }
                              ]
                            }
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 mt10">
                        <div className="card">
                          {/* <div class="border-era">Top Received Txn Count</div> */}
                          {/* <div className="table-responsive">
                          <table className="es-transaction striped bordered hover">
                            <thead>
                              <tr>
                                <th>Rank</th>
                                <th>Address</th>
                                <th>Total Txn</th>
                                <th>Percentage</th>
                              </tr>
                              {this.state.topReceivedTxnList.isLoading ? (
                                <tr>
                                  <td colSpan="4">Loading...</td>
                                </tr>
                              ) : this.state.topReceivedTxnList.data?.length ? (
                                this.state.topReceivedTxnList.data.map(
                                  (account, i) => (
                                    <tr>
                                      <td>{i + 1}</td>
                                      <td>
                                        <AddressLink
                                          value={account.address}
                                          shrink={true}
                                          type="address"
                                        />
                                      </td>
                                      <td>{account.txnReceivedCount} </td>
                                      <td>
                                        {account?.percent !== undefined
                                          ? account?.percent
                                          : '-'}
                                        %
                                      </td>
                                    </tr>
                                  )
                                )
                              ) : (
                                <tr>
                                  <td colSpan="4">No Data</td>
                                </tr>
                              )}
                            </thead>
                          </table>
                          </div> */}
                          <CustomDatatable
                            title="Top Received Txn Count"
                            apiCallback={Apis.fetchTopTxnReceived}
                            countPerPage = {COUNT_PER_PAGE}
                            columns={
                              [
                                {
                                  name: 'Rank',
                                  selector: 'index'
                                },
                                {
                                  name: 'Address',
                                  cell: row => <AddressLink value={row.address} type="address" shrink={true} />
                                },
                                {
                                  name: 'Total Txn',
                                  selector: 'txnReceivedCount'
                                },
                                {
                                  name: 'Percentage',
                                  cell: row => `${row.percent || 0} %`
                                }
                              ]
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade p-3"
                    id="three"
                    role="tabpanel"
                    aria-labelledby="three-tab"
                  >
                    <div className="mt30 eraswapcal-tab row">
                      <div className="col-lg-6 mt10">
                        <div className="card">
                          <div class="border-era">Account vs Txn Count</div>
                          <PieChart width={400} height={400}>
                            <Pie
                              data={
                                this.state.topReceiverList?.data.map((acc) => ({
                                  name: acc.address,
                                  value: acc.percent,
                                })) || []
                              }
                              cx={240}
                              cy={200}
                              labelLine={false}
                              // label={renderCustomizedLabel}
                              outerRadius={120}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {this.state.topReceiverList?.data?.map(
                                (entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                  />
                                )
                              )}
                            </Pie>
                          </PieChart>
                        </div>
                      </div>
                      <div className="col-lg-6 mt10">
                        <div className="card">
                          {/* <div class="border-era">Top ES Receiver</div>
                          <div className="table-responsive">
                          <table className="es-transaction striped bordered hover">
                            <thead>
                              <tr>
                                <th>Rank</th>
                                <th>Address</th>
                                <th>Amount</th>
                                <th>Percentage</th>
                              </tr>
                              {this.state.topReceiverList.isLoading ? (
                                <tr>
                                  <td colSpan="4">Loading...</td>
                                </tr>
                              ) : this.state.topReceiverList.data?.length ? (
                                this.state.topReceiverList.data.map(
                                  (account, i) => (
                                    <tr>
                                      <td>
                                        <span
                                          style={{ backgroundColor: COLORS[i] }}
                                        >
                                          &nbsp;
                                        </span>{' '}
                                        {i + 1}{' '}
                                      </td>
                                      <td>
                                        <AddressLink
                                          value={account.address}
                                          shrink={true}
                                          type="address"
                                        />
                                      </td>
                                      <td>
                                        {account.totalESReceived &&
                                          formatEther(
                                            account.totalESReceived
                                          )}{' '}
                                        ES
                                      </td>
                                      <td>
                                        {account?.percent !== undefined
                                          ? account?.percent
                                          : '-'}
                                        %
                                      </td>
                                    </tr>
                                  )
                                )
                              ) : (
                                <tr>
                                  <td colSpan="4">No Data</td>
                                </tr>
                              )}
                            </thead>
                          </table>
                          </div> */}
                          <CustomDatatable
                            title="Top ES Receiver"
                            apiCallback={Apis.fetchTopReceivers}
                            countPerPage = {COUNT_PER_PAGE}
                            columns={
                              [
                                {
                                  name: 'Rank',
                                  cell: row => <><span style={{ backgroundColor: COLORS[row.index] }}>&nbsp;&nbsp;</span>&nbsp;{row.index}</>
                                },
                                {
                                  name: 'Address',
                                  cell: row => <AddressLink value={row.address} type="address" shrink={true} />
                                },
                                {
                                  name: 'Amount',
                                  cell: row => row.totalESReceived ? formatEther(row.totalESReceived) : 0
                                },
                                {
                                  name: 'Percentage',
                                  cell: row => `${row.percent || 0} %`
                                }
                              ]
                            }
                          />
                        </div>
                      </div>
                    </div>
<<<<<<< HEAD
                  </div>
                  <div
                    className="tab-pane fade p-3"
                    id="four"
                    role="tabpanel"
                    aria-labelledby="four-tab"
                  >
                    <div className="mt30 eraswapcal-tab row">
                      <div className="col-lg-12 mt10">
                        <div className="card">
                          {/* <div class="border-era">Top Stakers</div>
                          <div className="table-responsive">
                          <table className="es-transaction striped bordered hover">
                            <thead>
                              <tr>
                                <th>Rank</th>
                                <th>Address</th>
                                <th>Staked Amount</th>
                              </tr>
                              {this.state.topStakers.isLoading ? (
                                <tr>
                                  <td colSpan={3}>Loading...</td>
                                </tr>
                              ) : this.state.topStakers.data?.length ? (
                                this.state.topStakers.data?.map((staker, i) => (
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td>
                                      <AddressLink
                                        value={staker.address}
                                        type="address"
                                      />
                                    </td>
                                    <td>
                                      {staker?.amount &&
                                        formatEther(staker?.amount)}{' '}
                                      ES
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={3}>No Data</td>
                                </tr>
                              )}
                            </thead>
                          </table>
                          </div> */}
                          <CustomDatatable
                            title="Top Stakers"
                            apiCallback={Apis.fetchTopStakers}
                            countPerPage = {COUNT_PER_PAGE}
                            columns={
                              [
                                {
                                  name: 'Rank',
                                  selector: 'index'
                                },
                                {
                                  name: 'Address',
                                  cell: row => <AddressLink value={row.address} type="address" shrink={false} />
                                },
                                {
                                  name: 'Staked Amount',
                                  cell: row => (row.amount ? formatEther(row.amount) : 0) + ' ES'
                                }
                              ]
                            }
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 mt10">
                        <div className="card">
                          {/* <div class="border-era">Top Blokcee</div>
                          <div className="table-responsive">
                          <table className="es-transaction striped bordered hover">
                            <thead>
                              <tr>
                                <th>Rank</th>
                                <th>Address</th>
                                <th>Total Blokcee Mined</th>
                                <th>Total Txn Fees</th>
                              </tr>
                              {this.state.topNodes.isLoading ? (
                                <tr>
                                  <td colSpan={4}>Loading...</td>
                                </tr>
                              ) : this.state.topNodes.data?.length ? (
                                this.state.topNodes.data?.map((node, i) => (
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td>{node.nodeIp}</td>
                                    <td>{node.blocks}</td>
                                    <td>
                                      {node.totalTxnFee &&
                                        formatEther(node.totalTxnFee)}{' '}
                                      ES
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={4}>No Data</td>
                                </tr>
                              )}
                            </thead>
                          </table>
                          </div> */}
                          <CustomDatatable
                            title="Top Stakers"
                            apiCallback={Apis.fetchTopNodes}
                            countPerPage = {COUNT_PER_PAGE}
                            columns={
                              [
                                {
                                  name: 'Rank',
                                  selector: 'index'
                                },
                                {
                                  name: 'Node Ip',
                                  selector: 'nodeIp'
                                },
                                {
                                  name: 'Total Blokcee Mined',
                                  selector: 'blocks'
                                },
                                {
                                  name: 'Total Txn Fees',
                                  cell: row => row.totalTxnFee && formatEther(row.totalTxnFee) || '-'
                                }
                              ]
                            }
                          />
                        </div>
                      </div>
=======
                    <div className="tab-pane fade p-3" id="four" role="tabpanel" aria-labelledby="four-tab">
                                             <div className="mt30 eraswapcal-tab row">
                                                  <div className="col-lg-12 mt10" >
                                                    <div  className="card">
                                                    <div class="border-era"></div>
                                                      <table className="es-transaction striped bordered hover">
                                                        <thead>
                                                          <tr>
                                                              <th>Rank</th>
                                                              <th>Address</th>
                                                              <th>Total Blokcee Mined</th>
                                                              <th>Total Rewards</th>
                                                              <th>Total Txn Fees</th>
                                                              <th>Est. Hash Rate</th>
                                                          </tr>
                                                           <tr>
                                                              <td>1</td>
                                                              <td>0x36560493644fbb79f1c38D12fF096F7ec5D333b7</td>
                                                              <td>153,314.7944</td>
                                                              <td>4,843.27219</td>
                                                              <td>153,314.7944></td>
                                                              <td>48,303.310652</td>
                                                           </tr>
                                                           <tr>
                                                              <td>1</td>
                                                              <td>0x36560493644fbb79f1c38D12fF096F7ec5D333b7</td>
                                                              <td>153,314.7944</td>
                                                              <td>4,843.27219</td>
                                                              <td>153,314.7944></td>
                                                              <td>48,303.310652</td>
                                                           </tr>
                                                           
                                                           <tr>
                                                              <td>1</td>
                                                              <td>0x36560493644fbb79f1c38D12fF096F7ec5D333b7</td>
                                                              <td>153,314.7944</td>
                                                              <td>4,843.27219</td>
                                                              <td>153,314.7944></td>
                                                              <td>48,303.310652</td>
                                                           </tr>
                                                           
                                                           <tr>
                                                              <td>1</td>
                                                              <td>0x36560493644fbb79f1c38D12fF096F7ec5D333b7</td>
                                                              <td>153,314.7944</td>
                                                              <td>4,843.27219</td>
                                                              <td>153,314.7944></td>
                                                              <td>48,303.310652</td>
                                                           </tr>
                                                           
                                                           <tr>
                                                              <td>1</td>
                                                              <td>0x36560493644fbb79f1c38D12fF096F7ec5D333b7</td>
                                                              <td>153,314.7944</td>
                                                              <td>4,843.27219</td>
                                                              <td>153,314.7944></td>
                                                              <td>48,303.310652</td>
                                                           </tr>
                                                           
                                                           <tr>
                                                              <td>1</td>
                                                              <td>0x36560493644fbb79f1c38D12fF096F7ec5D333b7</td>
                                                              <td>153,314.7944</td>
                                                              <td>4,843.27219</td>
                                                              <td>153,314.7944></td>
                                                              <td>48,303.310652</td>
                                                           </tr>
                                                           
                                                           <tr>
                                                              <td>1</td>
                                                              <td>0x36560493644fbb79f1c38D12fF096F7ec5D333b7</td>
                                                              <td>153,314.7944</td>
                                                              <td>4,843.27219</td>
                                                              <td>153,314.7944></td>
                                                              <td>48,303.310652</td>
                                                           </tr>
                                                           
                                                           <tr>
                                                              <td>1</td>
                                                              <td>0x36560493644fbb79f1c38D12fF096F7ec5D333b7</td>
                                                              <td>153,314.7944</td>
                                                              <td>4,843.27219</td>
                                                              <td>153,314.7944></td>
                                                              <td>48,303.310652</td>
                                                           </tr>
                                                           
                                                           <tr>
                                                              <td>1</td>
                                                              <td>0x36560493644fbb79f1c38D12fF096F7ec5D333b7</td>
                                                              <td>153,314.7944</td>
                                                              <td>4,843.27219</td>
                                                              <td>153,314.7944></td>
                                                              <td>48,303.310652</td>
                                                           </tr>
                                                           
                                                           <tr>
                                                              <td>1</td>
                                                              <td>0x36560493644fbb79f1c38D12fF096F7ec5D333b7</td>
                                                              <td>153,314.7944</td>
                                                              <td>4,843.27219</td>
                                                              <td>153,314.7944></td>
                                                              <td>48,303.310652</td>
                                                           </tr>
                                                            
                                                        </thead>
                                                      </table>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-12 mt10" >
                                                    <div  className="card">
                                                    <div class="border-era">Top Blokcee</div>
                                                      <table className="es-transaction striped bordered hover">
                                                        <thead>
                                                          <tr>
                                                              <th>Rank</th>
                                                              <th>Address</th>
                                                              <th>Total Blokcee Mined</th>
                                                              <th>Total Rewards</th>
                                                              <th>Total Txn Fees</th>
                                                              <th>Est. Hash Rate</th>
                                                          </tr>
                                                           <tr>
                                                              <td>1</td>
                                                              <td>0x36560493644fbb79f1c38D12fF096F7ec5D333b7</td>
                                                              <td>153,314.7944</td>
                                                              <td>4,843.27219</td>
                                                              <td>153,314.7944</td>
                                                              <td>48,303.310652</td>
                                                           </tr>
                                                           <tr>
                                                              <td>1</td>
                                                              <td>0x36560493644fbb79f1c38D12fF096F7ec5D333b7</td>
                                                              <td>153,314.7944</td>
                                                              <td>4,843.27219</td>
                                                              <td>153,314.7944></td>
                                                              <td>48,303.310652</td>
                                                           </tr>
                                                           
                                                           <tr>
                                                              <td>1</td>
                                                              <td>0x36560493644fbb79f1c38D12fF096F7ec5D333b7</td>
                                                              <td>153,314.7944</td>
                                                              <td>4,843.27219</td>
                                                              <td>153,314.7944></td>
                                                              <td>48,303.310652</td>
                                                           </tr>
                                                           
                                                           <tr>
                                                              <td>1</td>
                                                              <td>0x36560493644fbb79f1c38D12fF096F7ec5D333b7</td>
                                                              <td>153,314.7944</td>
                                                              <td>4,843.27219</td>
                                                              <td>153,314.7944></td>
                                                              <td>48,303.310652</td>
                                                           </tr>
                                                           
                                                           <tr>
                                                              <td>1</td>
                                                              <td>0x36560493644fbb79f1c38D12fF096F7ec5D333b7</td>
                                                              <td>153,314.7944</td>
                                                              <td>4,843.27219</td>
                                                              <td>153,314.7944></td>
                                                              <td>48,303.310652</td>
                                                           </tr>
                                                           
                                                           <tr>
                                                              <td>1</td>
                                                              <td>0x36560493644fbb79f1c38D12fF096F7ec5D333b7</td>
                                                              <td>153,314.7944</td>
                                                              <td>4,843.27219</td>
                                                              <td>153,314.7944></td>
                                                              <td>48,303.310652</td>
                                                           </tr>
                                                           
                                                           <tr>
                                                              <td>1</td>
                                                              <td>0x36560493644fbb79f1c38D12fF096F7ec5D333b7</td>
                                                              <td>153,314.7944</td>
                                                              <td>4,843.27219</td>
                                                              <td>153,314.7944></td>
                                                              <td>48,303.310652</td>
                                                           </tr>
                                                           
                                                           <tr>
                                                              <td>1</td>
                                                              <td>0x36560493644fbb79f1c38D12fF096F7ec5D333b7</td>
                                                              <td>153,314.7944</td>
                                                              <td>4,843.27219</td>
                                                              <td>153,314.7944></td>
                                                              <td>48,303.310652</td>
                                                           </tr>
                                                           
                                                           <tr>
                                                              <td>1</td>
                                                              <td>0x36560493644fbb79f1c38D12fF096F7ec5D333b7</td>
                                                              <td>153,314.7944</td>
                                                              <td>4,843.27219</td>
                                                              <td>153,314.7944></td>
                                                              <td>48,303.310652</td>
                                                           </tr>
                                                           
                                                           <tr>
                                                              <td>1</td>
                                                              <td>0x36560493644fbb79f1c38D12fF096F7ec5D333b7</td>
                                                              <td>153,314.7944</td>
                                                              <td>4,843.27219</td>
                                                              <td>153,314.7944></td>
                                                              <td>48,303.310652</td>
                                                           </tr>
                                                            
                                                        </thead>
                                                      </table>
                                                    </div>
                                                  </div>
                                       
                                           </div>              
             
>>>>>>> 3941d6bdca824e9c03cb359a383e0a4e5d4b71a7
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

export default TopStatistics;
