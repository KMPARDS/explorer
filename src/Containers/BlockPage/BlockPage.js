import React, { Component } from 'react';
import './BlockPage.css';
import Images from '../Images/Images';
import Header from '../../Components/Header/Header';
import Navbar from '../../Components/Navbar/Navbar';
import { Col, Button, Container, Row, Tabs, Tab } from 'react-bootstrap';
import Apis from '../../lib/apis';
import { timeout, toLocaleTimestamp } from '../../lib/parsers';
import { Snackbar } from '../../Components/Snackbar/Snackbar';
import AddressLink from '../../Components/AddressLink/AddressLink';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { providerESN } from '../../ethereum/Provider';

class BlockPage extends Component {
  snackbarRef = React.createRef();

  constructor(props) {
    super(props);

    const {
      match: { params },
    } = this.props;

    this.state = {
      blockNumber: params.blockNumber,
      block: {
        data: {},
        isLoading: true,
      },
    };

    this.openSnackBar = this.openSnackBar.bind(this);
  }

  componentDidMount() {
    this.fetchBlock();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.blockNumber !== prevProps.match.params.blockNumber
    ) {
      this.setState(
        {
          blockNumber: this.props.match.params.blockNumber,
          block: {
            data: {},
            isLoading: true,
          },
        },
        this.fetchBlock
      );
    }
  }

  async fetchBlock() {
    try {
      const resPromise = Apis.fetchBlock(this.state.blockNumber);
      const res = await timeout(resPromise,2000);
      console.log('res', res);
      if (res.status)
        this.setState({
          block: {
            data: res.data,
            isLoading: false,
          },
        });
      
    } catch (e) {
      console.log(e);
      // this.openSnackBar(e.message);
      this.fetchBlockFromBlockchain();
      // this.setState({
      //   block: {
      //     data: {},
      //     isLoading: false,
      //   },
      // });
    }
  }
  
  async fetchBlockFromBlockchain(){
    try {
      const blockNumberHex = Number(this.state.blockNumber).toString(16);
      const block = await providerESN.send('eth_getBlockByNumber', [
        '0x' + blockNumberHex,
        true,
      ]);

      // const total_txn_fee = ethers.constants.Zero;
      // const gasDetails = block.transactions.map(txn =>{
      //   total_txn_fee = total_txn_fee.add(txn.gasPrice)
      // })
      console.log({block});
      this.setState({
        block: {
          data: {
            hash: block.hash,
            timestamp: block.timestamp*1000,
            raw_transactions_count: block.transactions.length,
            internal_transactions_count: 0,
            miner: {
              address:  block.miner,
              label: '',
            },
            total_txn_fee: '0x0',
            average_gas_price: '0x0',
            sealedField1: block.sealedFields[0],
            sealedField2: block.sealedFields[1],
            size: block.size,
            total_gas_used: Number(block.gasUsed),
            total_gas_limit: Number(block.gasLimit),
            extra_data: block.extraData,
            parent_hash: block.parentHash,
            nonce: 0,
          },
          isLoading: false
        }
      })
    } catch (e) {
      console.log(e);
    }
  }

  openSnackBar(message) {
    // this.snackbarRef.current.openSnackBar(message);
  }

  render() {
    return (
      <div className="compage">
        <div className="booking-hero-bgd booking-hero-bgd-inner">
          <Navbar />
          <h2 className="es-main-head es-main-head-inner">
            Blocks #{this.state.blockNumber}
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
                        {Object.keys(this.state.block.data).length ? (
                          <tbody>
                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Block Height is defined as the number of blocks in Era Swap Network between this block and the genesis block in ESN"
                              >
                                Block Height:{' '}
                              </td>
                              <td>{this.state.blockNumber}</td>
                            </tr>
                            <tr>
                              <td>Block Hash: </td>
                              <td className="hex-data">
                                {this.state.block.data.hash}
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
                                  this.state.block.data.timestamp
                                ).fromNow()}{' '}
                                (
                                {toLocaleTimestamp(
                                  this.state.block.data.timestamp
                                ).format('MMMM-DD-YYYY hh:mm:ss A')}
                                )
                              </td>
                            </tr>
                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title="These are the transactions that are included in this Block"
                              >
                                Transactions:
                              </td>
                              <td>
                                <span className="tr-color-txt">
                                  <Link to={`/txns/${this.state.blockNumber}`}>
                                    <span className="tr-color-txt">
                                      {
                                        this.state.block.data
                                          .raw_transactions_count
                                      }{' '}
                                      transactions&nbsp;
                                    </span>
                                  </Link>
                                  {this.state.block.data
                                    .internal_transactions_count ? (
                                    <span>
                                      and &nbsp;
                                      <Link
                                        to={`/ci-txns/${this.state.blockNumber}`}
                                      >
                                        {
                                          this.state.block.data
                                            .internal_transactions_count
                                        }{' '}
                                        contract internal transactions in this
                                        block
                                      </Link>
                                    </span>
                                  ) : (
                                    ''
                                  )}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title="The Address of the Validator who sealed this Block"
                              >
                                Sealed By:
                              </td>
                              <td>
                                <span className="tr-color-txt">
                                  {' '}
                                  <AddressLink
                                    value={
                                      this.state.block.data.miner?.address || ''
                                    }
                                    type="address"
                                  />{' '}
                                </span>{' '}
                                {this.state.block.data.miner?.label &&
                                  `(${this.state.block.data.miner?.label})`}{' '}
                              </td>
                            </tr>
                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                              >
                                Block Reward:
                              </td>
                              <td>
                                <i>pending for NRT release...</i>
                              </td>
                            </tr>
                            <tr>
                              <td>Transaction Fee</td>
                              <td>
                                {this.state.block.data?.total_txn_fee
                                  ? ethers.utils.formatEther(
                                      this.state.block.data.total_txn_fee
                                    )
                                  : 0.0}{' '}
                                ES
                              </td>
                            </tr>

                            <tr>
                              <td>Average Gas Price: </td>
                              <td>
                                {this.state.block.data?.average_gas_price
                                  ? ethers.utils.formatEther(
                                      this.state.block.data.average_gas_price
                                    )
                                  : 0.0}{' '}
                                ES
                              </td>
                            </tr>

                            <tr>
                              <td>Sealed Field 1:</td>
                              <td className="hex-data">
                                {this.state.block.data?.sealedField1 || '-'}
                              </td>
                            </tr>

                            <tr>
                              <td>Sealed Field 2:</td>
                              <td className="hex-data">
                                {this.state.block.data?.sealedField2 || '-'}
                              </td>
                            </tr>

                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Total space occupied by this Block in every Era Swap Network Node"
                              >
                                Size:
                              </td>
                              <td>{Number(this.state.block.data.size || 0)} bytes</td>
                            </tr>

                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Gas used is the amount of Computation Power utilized in the Block"
                              >
                                Gas Used:
                              </td>
                              <td>
                                {this.state.block.data.total_gas_used} (
                                {isFinite(this.state.block.data.total_gas_used) && 
                                isFinite(this.state.block.data.total_gas_limit) 
                                ?
                                (
                                  (this.state.block.data.total_gas_used /
                                    this.state.block.data.total_gas_limit) *
                                  100
                                ).toFixed(2)
                                :
                                '0.00'}
                                %)
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
                              <td>{this.state.block.data.total_gas_limit}</td>
                            </tr>

                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                              >
                                Extra Data:
                              </td>
                              <td className="hex-data">
                                {this.state.block.data.extra_data}
                              </td>
                            </tr>

                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                              >
                                Parent Hash:
                              </td>
                              <td>
                                <span className="tr-color-txt">
                                  <AddressLink
                                    value={this.state.block.data.parent_hash}
                                    type="txn"
                                  />
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td
                                data-toggle="tooltip"
                                data-placement="top"
                                title="The 'n'th Number of transaction by the sender"
                              >
                                Nonce:
                              </td>
                              <td>{this.state.block.data.nonce}</td>
                            </tr>
                          </tbody>
                        ) : (
                          <tr>
                            <td
                              colSpan="2"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                            >
                              No Block
                            </td>
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

export default BlockPage;
