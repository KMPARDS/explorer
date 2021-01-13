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
import { CustomDatatable } from '../../Components/CustomDatatable/CustomDatatable';

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
      },
      isLoading: true,
    };

    const {
      match: { params },
    } = this.props;
    if (params?.blockNumber) this.blockNumber = params.blockNumber;

    console.log('this.blockNumber', this.blockNumber);
    this.fetchTransactions = this.fetchTransactions.bind(this);
  }

  componentDidMount() {
    // this.fetchTransactions();
  }

  async fetchTransactions({length,page}) {
    try {
      await this.setState({ isLoading: true });
      const res = await Apis.fetchTransactions((page-1)*length, length, this.blockNumber);
      console.log('res', res);
      await this.setState({ isLoading: false });
      return res;
      await this.setState({
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
      await this.setState({
        transactions: {
          ...this.state.transactions,
          data: [],
          isLoading: false,
        },
      });
    }
    console.log('this.state.transactions.data',this.state.transactions.data);
    return this.state.transactions.data;
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
              <CustomDatatable
                title="Transactions"
                apiCallback={this.fetchTransactions}
                countPerPage = {10}
                columns={
                  [
                    {
                      name: 'Txn Hash',
                      // selector: 'index'
                      cell: row => <AddressLink
                        value={row.txn_hash}
                        type="txn"
                        shrink={true}
                      />
                    },
                    {
                      name: 'Block Number',
                      cell: row => <AddressLink
                        value={row.block.block_number}
                        type="block"
                      />
                    },
                    {
                      name: 'Age',
                      cell: row => toLocaleTimestamp(
                        row.block.timestamp
                      ).fromNow()
                    },
                    {
                      name: 'Type of Transaction',
                      cell: row => '-'
                    },
                    {
                      name: 'From',
                      cell: row => <>
                      {row.fromAddress.label && (
                        <Link
                          to={'/' + row.fromAddress.address}
                        >
                          {row.fromAddress.label}
                        </Link>
                      )}
                      <span className="tr-color-txt">
                        <AddressLink
                          value={row.fromAddress.address}
                          type="address"
                          shrink={
                            true
                          }
                        />
                      </span>
                    </>
                    },
                    {
                      name: 'To',
                      cell: row => <>
                        {row.toAddress.label                                                                                                                                                                                                                                                                                                                                                                                                             && (
                          <Link
                            to={'/' + row.toAddress.address}
                          >
                            {row.toAddress.label}
                          </Link>
                        )}
                        <span className="tr-color-txt">
                          {row?.toAddress
                            && <AddressLink
                              value={row.toAddress.address}
                              type="address"
                              shrink={
                                true
                              }
                            />}
                        </span>
                      </>
                    },
                    {
                      name: 'Value',
                      cell: row => <>{row.value && ethers.utils.formatEther(row.value)} ES</>
                    },
                    {
                      name: '(Txn Fee)',
                      cell: row =><>
                      {(row.gas_price !== null 
                        && row.gas_used !== null)
                        ? ethers.utils.formatEther(
                        ethers.BigNumber.from(
                          row.gas_price
                        ).mul(row.gas_used)
                      ) : 'N/A'}{' '}
                      ES</>
                    },
                  ]
                }
                  progressPending={this.state.isLoading}
                  progressComponent={<h5><i className="fa fa-spinner fa-spin"></i></h5>}
                />
                {/* <div className="table-responsive">
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
                </Col> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Transaction;
