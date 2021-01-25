import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './transaction.css';
import Images from '../Images/Images';
import Header from '../../Components/Header/Header';
import Navbar from '../../Components/Navbar/Navbar';
import { Col, Button, Container, Row, Tabs, Tab } from 'react-bootstrap';
import Apis from '../../lib/apis';
import { toLocaleTimestamp, formatEther,timeout } from '../../lib/parsers';
import { Snackbar } from '../../Components/Snackbar/Snackbar';
import AddressLink from '../../Components/AddressLink/AddressLink';
import { ethers } from 'ethers';
import { providerESN } from '../../ethereum/Provider';

class Transaction extends Component {
  snackbarRef = React.createRef();

  constructor(props) {
    super(props);

    const {
      match: { params },
    } = this.props;

    this.state = {
      hash: params.hash,
      transaction: {
        data: {},
        transfers: [],
        isLoading: true,
      },
    };

    this.openSnackBar = this.openSnackBar.bind(this);
  }

  componentDidMount() {
    this.fetchTransaction();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.hash !== prevProps.match.params.hash) {
      this.setState(
        {
          hash: this.props.match.params.hash,
          transaction: {
            data: {},
            transfers: [],
            isLoading: true,
          },
        },
        this.fetchTransaction
      );
    }
  }

  async fetchTransaction() {
    try {
      console.log('this.state.hash', this.state.hash);
      const resPromise = Apis.fetchTransaction(this.state.hash);
      const res = await timeout(resPromise,2000);
      console.log('res', res);
      if (res.status)
        this.setState({
          transaction: {
            data: res.data,
            transfers: res.transfers,
            isLoading: false,
          },
        });
      else this.openSnackBar(res.error.message);
    } catch (e) {
      console.log('fetchTransaction error',e);
      this.fetchTxnFromBlockchain();
      // this.openSnackBar(e.message);
      // this.setState({
      //   transaction: {
      //     data: {},
      //     isLoading: false,
      //   },
      // });
    }
  }

  async fetchTxnFromBlockchain(){
    try{
      const txn = await providerESN.getTransaction(this.state.hash);
      this.setState({
        transaction: {
          data: {
            status_enum: 'pending',
            block_number: txn.blockNumber,
            timestamp: txn.timestamp,
            fromAddress: txn.from,
            toAddress: txn.to,
            value: txn.value,
            hash: txn.hash,
            gas_price: txn.gasPrice,
            gas_limit: formatEther(txn.gasLimit),
            nonce: 0,
            data: txn.data,
          },
          isLoading: false
        }
      });
      this.fetchTxnReceipt();
    }catch(e){
      console.log(e);
    }
  }

  async fetchTxnReceipt(){
    try{
      const receipt = await providerESN.getTransactionReceipt(this.state.hash);
      console.log({receipt});
      this.setState({
        transaction:{
          data: {
            ...this.state.transaction.data,
            gas_used: ethers.utils.formatEther(receipt.gasUsed),
            status_enum: receipt.status === 1 ? 'success' : 'failed'
          }
        }
      })
    }catch(e){
      console.log(e);
    }
  }

  openSnackBar = (message) => {
    // this.snackbarRef.current.openSnackBar(message);
  };

  render() {
    return (
      <div className="compage">
        <div className="booking-hero-bgd booking-hero-bgd-inner">
          <Navbar />
          <h2 className="es-main-head es-main-head-inner">Transaction </h2>
          <p className="explr-txt">#{this.state.hash}</p>
        </div>
        <div className="wrapper-container">
          <div className="BlockPage-detail">
            <Container>
              <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example">
                <Tab eventKey="overview" title="Overview">
                  <div className="card">
                    <div className="table-responsive">
                      <table className="block-overview table">
                        {
                          this.state.transaction.isLoading ?
                          'Loading...'
                          :
                          Object.keys(this.state.transaction.data).length ? (
                          <thead>
                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title="The Hash of the Transaction"
                              >
                                Transaction Hash:{' '}
                              </td>
                              <td>{this.state.hash}</td>
                            </tr>
                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                              >
                                Status:{' '}
                              </td>
                              <td>
                                {
                                  this.state.transaction.data.status_enum ===
                                  'pending' ? (
                                    <span className="badge badge-warning">
                                      Pending
                                    </span>
                                  ) :
                                this.state.transaction.data.status_enum ===
                                'success' ? (
                                  <span className="badge badge-success">
                                    Success
                                  </span>
                                ) : (
                                  <span className="badge badge-danger">
                                    Failed
                                  </span>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Block is the periodic collection of transactions happening on Era Swap Network"
                              >
                                Block:{' '}
                              </td>
                              <td>
                                <AddressLink
                                  value={
                                    this.state.transaction.data.block_number
                                  }
                                  type="block"
                                />
                              </td>
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
                                  this.state.transaction.data.timestamp
                                ).fromNow()}{' '}
                                (
                                {toLocaleTimestamp(
                                  this.state.transaction.data.timestamp
                                ).format('MMMM-DD-YYYY hh:mm:ss A')}
                                )
                              </td>
                            </tr>
                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                              >
                                From:{' '}
                              </td>
                              <td>
                                <AddressLink
                                  value={
                                    this.state.transaction.data.fromAddress
                                  }
                                  type="address"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                              >
                                To:{' '}
                              </td>
                              <td>
                                {
                                  this.state.transaction?.data?.toAddress
                                  ?
                                  <AddressLink
                                  value={
                                    this.state.transaction.data.toAddress
                                  }
                                  type="address"
                                />
                                :
                                '-'
                                }
                                
                              </td>
                            </tr>
                            <tr>
                              <td>Value:</td>
                              <td>
                                {
                                  this.state.transaction.data.value
                                  }{' '}
                                ES
                              </td>
                            </tr>
                            <tr>
                              <td>Internal Transactions:</td>
                              <td>
                                <Link
                                  to={{
                                    pathname:
                                      '/txnsInternal/' + this.state.hash,
                                    state: { parentHash: this.state.hash },
                                  }}
                                >
                                  <span className="tr-color-txt">
                                    {this.state.transaction.data
                                      .internalTxnsCount || 0}
                                  </span>
                                </Link>{' '}
                                contract internal transactions in this
                                transaction
                              </td>
                            </tr>
                            <tr>
                              <td>Type of Transactions:</td>
                              <td>
                               -
                              </td>
                            </tr>
                            {
                              this.state.transaction.transfers?.length ?
                              <tr>
                              <td>Prepaid Transfers:</td>
                              <td>
                               {this.state.transaction.transfers?.length ?
                                <ul className="list-group">
                                 {this.state.transaction
                                  .transfers
                                 .map(transfer => <li className="list-group-item">
                                   <strong>From </strong><AddressLink value={transfer.from} type='address'/>{' '}-{' '}
                                   <strong>To </strong><AddressLink value={transfer.to} type='address'/>{' '}
                                   <strong>For </strong>{Number(ethers.utils.formatEther(transfer.value)).toFixed(2)} WES
                                   </li>)}
                                 </ul>
                               : '-'}
                              </td>
                            </tr>
                              :
                              null
                            }
                            
                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Fee for this Transaction"
                              >
                                Transaction Fee:
                              </td>
                              <td>
                                {this.state.transaction.data.gas_price 
                                  &&
                                  this.state.transaction.data.gas_used
                                  &&  ethers.utils.formatEther(
                                  ethers.BigNumber.from(
                                    this.state.transaction.data.gas_price
                                  ).mul(ethers.utils.parseEther(this.state.transaction.data.gas_used))
                                ) || '-'}{' '}
                                ES
                              </td>
                            </tr>
                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Gas Limit is the maximum amount of computation that can happen in this Block"
                              >
                                Gas Limit:
                              </td>
                              <td>{this.state.transaction.data.gas_limit}</td>
                            </tr>

                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                              >
                                Gas Used by Transaction:{' '}
                              </td>
                              <td>
                              {this.state.transaction.data.gas_used !== null
                              ?
                                Math.round(this.state.transaction.data.gas_used) === 0
                                ?
                                  <>0 (0%)</>
                                :
                                  <>
                                  {this.state.transaction.data.gas_used} (
                                    {(
                                      (this.state.transaction.data.gas_used /
                                        this.state.transaction.data.gas_limit) *
                                      100
                                    ).toFixed(2)}
                                    %)
                                  </>
                                :
                                <i>pending...</i>
                              }
                                
                              </td>
                            </tr>

                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Amount of Era Swap paid per Unit of Gas"
                              >
                                Gas Price:
                              </td>
                              <td>
                                {formatEther(
                                  this.state.transaction.data.gas_price
                                )}{' '}
                              </td>
                            </tr>

                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                              >
                                Nonce:
                              </td>
                              <td>{this.state.transaction.data.nonce}</td>
                            </tr>

                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                              >
                                Input Data:
                              </td>
                              <td>{this.state.transaction.data.data}</td>
                            </tr>
                          </thead>
                        ) : (
                          <tr>
                            <td colSpan="2">No Transaction</td>
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
              <Snackbar ref={this.snackbarRef} />
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default Transaction;
