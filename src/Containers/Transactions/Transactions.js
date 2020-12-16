import React, { Component } from 'react';
import './Transaction.css';
import { Link } from 'react-router-dom';
import Images from '../Images/Images';
import { Col, Button, Container, Row } from 'react-bootstrap';
import Header from '../../Components/Header/Header';
import Navbar from '../../Components/Navbar/Navbar';
import Apis from '../../lib/apis';
import AddressLink from '../../Components/AddressLink/AddressLink';
import * as moment from 'moment';
import CustomPagination from '../../Components/CustomPagination/CustomPagination';
import { Snackbar } from '../../Components/Snackbar/Snackbar';
import { ethers } from 'ethers';
import { toLocaleTimestamp } from '../../lib/parsers';

class Transaction extends Component {
  snackbarRef = React.createRef();

  blockNumber;

  constructor(props) {
    super(props);
    this.state = {
      transactions: {
        data: [],
        currentPage: 1,
        totalPages: 0,
        isLoading: true,
      },
    };

    const {
      match: { params },
    } = this.props;
    if (params?.blockNumber) this.blockNumber = params.blockNumber;

    console.log('this.blockNumber', this.blockNumber);
    this.fetchTransactions = this.fetchTransactions.bind(this);
  }

  componentDidMount() {
    this.fetchTransactions();
  }

  async fetchTransactions(start, length = 10) {
    try {
      const res = await Apis.fetchTransactions(start, length, this.blockNumber);
      console.log('res', res);
      this.setState({
        transactions: {
          data: res.data,
          currentPage: Number(res.currentPage),
          totalPages: res.totalPages,
          isLoading: false,
        },
      });
    } catch (e) {
      console.log(e);
      this.openSnackBar(e.message);
      this.setState({
        transactions: {
          ...this.state.transactions,
          data: [],
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
      <div className="blocks-table compage">
        <div className="booking-hero-bgd booking-hero-bgd-inner ">
          <Navbar />
          <h2 className="es-main-head es-main-head-inner">Transactions</h2>
        </div>
        <Container>
          {this.blockNumber && (
            <span>
              <br></br>
              Showing transactions of Block #{' '}
              <AddressLink
                value={this.blockNumber}
                type="block"
                style={{ fontSize: '20px' }}
              />
            </span>
          )}
          <Row className="mt40">
            <Col lg={12}>
              <div className="card">
                <div className="table-responsive">
                  <table className="es-transaction table">
                    <thead>
                      <tr>
                        <th>Txn Hash </th>
                        <th>Block</th>
                        <th>Age</th>
                        <th>Type of Transaction</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Value</th>
                        <th>(Txn Fee)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.transactions.isLoading ? (
                        <tr>
                          <td colSpan="8">Loading...</td>
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
                                {toLocaleTimestamp(
                                  transaction.block.timestamp
                                ).fromNow()}
                              </td>
                              <td>
                                -
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
                                      transaction.fromAddress?.label?.length
                                    }
                                  />
                                </span>
                              </td>
                              <td>
                              {transaction.toAddress.label                                                                                                                                                                                                                                                                                                                                                                                                             && (
                                  <Link
                                    to={'/' + transaction.toAddress.address}
                                  >
                                    {transaction.toAddress.label}
                                  </Link>
                                )}
                                <span className="tr-color-txt">
                                  {transaction?.toAddress
                                    && <AddressLink
                                      value={transaction.toAddress.address}
                                      type="address"
                                      shrink={
                                        transaction.toAddress?.label?.length
                                      }
                                    />}
                                </span>
                              </td>
                              <td>
                                {transaction.value && ethers.utils.formatEther(transaction.value)} ES{' '}
                              </td>
                              <td>
                                {(transaction.gas_price !== null 
                                  && transaction.gas_used !== null)
                                  ? ethers.utils.formatEther(
                                  ethers.BigNumber.from(
                                    transaction.gas_price
                                  ).mul(transaction.gas_used)
                                ) : 'N/A'}{' '}
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
                </div>
                <Col lg={12} className="mb30">
                  <CustomPagination
                    handleClick={this.fetchTransactions}
                    currentPage={this.state.transactions.currentPage}
                    prevPage={this.state.transactions.currentPage - 1}
                    nextPage={this.state.transactions.currentPage + 1}
                    totalPages={this.state.transactions.totalPages}
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

export default Transaction;
