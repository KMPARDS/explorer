import React, { Component } from 'react';
import './cancelledTransactions.css';
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

class CancelledTransactions extends Component {
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

    this.fetchFailedTxns = this.fetchFailedTxns.bind(this);
  }

  componentDidMount() {
    this.fetchFailedTxns();
  }

  async fetchFailedTxns(start, length = 10) {
    try {
      const res = await Apis.fetchFailedTxns(start, length);
      console.log('res', res);
      this.setState({
        transactions: {
          data: res.data,
          currentPage: res.currentPage,
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
          <h2 className="es-main-head es-main-head-inner">Cancelled Transactions</h2>
        </div>
        <Container>
          <Row className="mt40">
            <Col lg={12}>
              <div className="card">
                <div className="table-responsive">
                  <table className="es-transaction table">
                    <thead>
                      <tr>
                        <th>Txn Hash </th>
                        <th>Age</th>
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
                                  // shrink={true}
                                />
                              </td>
                              <td>
                                {toLocaleTimestamp(
                                  transaction.timestamp
                                ).fromNow()}
                              </td>
                              <td>
                                {transaction.value} ES{' '}
                              </td>
                              <td>
                                {(transaction.gas_price !== null 
                                  && transaction.gas_used !== null)
                                  ?
                                    transaction.gas_price * transaction.gas_used
                                  : 'N/A'}{' '}
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
                    handleClick={this.fetchFailedTxns}
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

export default CancelledTransactions;
