import React, { Component } from 'react';
import './nrtmanager.css';
import Images from '../Images/Images';
import Header from '../../Components/Header/Header';
import Navbar from '../../Components/Navbar/Navbar';
import { Col, Button, Container, Row, Tabs, Tab } from 'react-bootstrap';
import Apis from '../../lib/apis';
import { toLocaleTimestamp } from '../../lib/parsers';
import { Snackbar } from '../../Components/Snackbar/Snackbar';
import AddressLink from '../../Components/AddressLink/AddressLink';
import {ethers } from 'ethers';

import { NrtReleaseModal } from './NrtReleaseModal/NrtReleaseModal';

class Nrtmanager extends Component {
  snackbarRef = React.createRef();

  constructor(props) {
    super(props);

    const {
      match: { params },
    } = this.props;

    this.state = {
      platforms: {
        data: [],
        isLoading: true,
      }
    };

    this.openSnackBar = this.openSnackBar.bind(this);
  }

  componentDidMount() {
    this.fetchNrtPlatforms();
  }

  async fetchNrtPlatforms() {
    try {
      const res = await Apis.fetchNrtPlatforms();
      console.log('res', res);
      if (res?.length)
        this.setState({
          platforms: {
            data: Array.isArray(res) ? res : [],
            isLoading: false,
          },
        });
      else this.openSnackBar(res.error.message);
    } catch (e) {
      console.log(e);
      this.openSnackBar(e.message);
      this.setState({
        platforms: {
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
      <div className="nrt-manager compage">
        <div className="booking-hero-bgd booking-hero-bgd-inner">
          <Navbar />
          <h2 className="es-main-head es-main-head-inner">NRT Manager</h2>
        </div>
        <div className="">
          <div className="BlockPage-detail">
            <Container>
              <Row>
                <Col lg={6}></Col>
                <Col lg={6} className="text-right">
                  {/* <a
                    href=""
                    className="btn btn-sm"
                    data-toggle="modal"
                    data-target="#nrtunsucessful"
                  >
                    RELEASE MONTLY NRT
                  </a> */}
                  <NrtReleaseModal />
                </Col>
              </Row>

              <div
                className="modal fade nrt-modal"
                id="nrtsucessful"
                tabindex="-1"
                role="dialog"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        <img
                          className="img-fluid"
                          alt="Logo"
                          src={Images.path.escolorlogo}
                        />
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="nrt-sucessful text-center">
                        <i
                          className="fa fa-check-circle "
                          aria-hidden="true"
                        ></i>
                        <p className="green">Release Monthly NRT Sucessful</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal fade nrt-modal"
                id="nrtunsucessful"
                tabindex="-1"
                role="dialog"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        <img
                          className="img-fluid"
                          alt="Logo"
                          src={Images.path.escolorlogo}
                        />
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="nrt-unsucessful text-center">
                        <i
                          className="fa fa-check-circle "
                          aria-hidden="true"
                        ></i>
                        <p className="green">Release Monthly NRT Unsucessful</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Row className="mt40">
                <Col lg={12}>
                  <div className="card">
                    <div className="table-responsive">
                      <table className="es-transaction table table-bordered white-table">
                        <tr>
                          <th>Platform</th>
                          <th>NRT Share</th>
                          <th>Wallet Address </th>
                        </tr>
                        {this.state.platforms.isLoading ? (
                          <tr>
                            <td colSpan="3">Loading...</td>
                          </tr>
                        ) : this.state.platforms.data?.length ? (
                          this.state.platforms.data.map((platform, i) => (
                            <tr>
                              <td>{platform.name && ethers.utils.parseBytes32String(platform.name) || '-'}</td>
                              <td>{platform.nrtShare / 10} %</td>
                              <td>{platform.address 
                                  && <AddressLink
                                      value={platform.address.address}
                                      type="address"
                                      
                                    />}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3">No Platforms</td>
                          </tr>
                        )}
                        {/* <tr>
                          <td>TimeAlly</td>
                          <td>15%</td>
                          <td>
                            0x08D85Bd1004E3e674042EAddF81Fb3beb4853a22{' '}
                            <i class="fa fa-file-text-o" aria-hidden="true"></i>{' '}
                          </td>
                        </tr>
                        <tr>
                          <td>ESN</td>
                          <td>12%</td>
                          <td>
                            0x08D85Bd1004E3e674042EAddF81Fb3beb4853a22{' '}
                            <i class="fa fa-file-text-o" aria-hidden="true"></i>{' '}
                          </td>
                        </tr>
                        <tr>
                          <td>Power Tokens</td>
                          <td>10%</td>
                          <td>
                            0x08D85Bd1004E3e674042EAddF81Fb3beb4853a22{' '}
                            <i class="fa fa-file-text-o" aria-hidden="true"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>Day Swappers</td>
                          <td>10%</td>
                          <td>
                            0x08D85Bd1004E3e674042EAddF81Fb3beb4853a22{' '}
                            <i class="fa fa-file-text-o" aria-hidden="true"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>TimeAlly Club </td>
                          <td>10%</td>
                          <td>
                            0x08D85Bd1004E3e674042EAddF81Fb3beb4853a22{' '}
                            <i class="fa fa-file-text-o" aria-hidden="true"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>Airdrop & Bounty for All Platforms</td>
                          <td>5%</td>
                          <td>
                            0x08D85Bd1004E3e674042EAddF81Fb3beb4853a22{' '}
                            <i class="fa fa-file-text-o" aria-hidden="true"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>New Talents & Partnership</td>
                          <td>5%</td>
                          <td>
                            0x08D85Bd1004E3e674042EAddF81Fb3beb4853a22{' '}
                            <i class="fa fa-file-text-o" aria-hidden="true"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>Maintenance Support for all Platforms</td>
                          <td>5%</td>
                          <td>
                            0x08D85Bd1004E3e674042EAddF81Fb3beb4853a22{' '}
                            <i class="fa fa-file-text-o" aria-hidden="true"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>R & D </td>
                          <td>5%</td>
                          <td>
                            0x08D85Bd1004E3e674042EAddF81Fb3beb4853a22{' '}
                            <i class="fa fa-file-text-o" aria-hidden="true"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>PET & TSGAP</td>
                          <td>3%</td>
                          <td>
                            0x08D85Bd1004E3e674042EAddF81Fb3beb4853a22{' '}
                            <i class="fa fa-file-text-o" aria-hidden="true"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>Contigency Funds </td>
                          <td>10%</td>
                          <td>
                            0x08D85Bd1004E3e674042EAddF81Fb3beb4853a22{' '}
                            <i class="fa fa-file-text-o" aria-hidden="true"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>KMPARDS</td>
                          <td>10%</td>
                          <td>
                            0x08D85Bd1004E3e674042EAddF81Fb3beb4853a22{' '}
                            <i class="fa fa-file-text-o" aria-hidden="true"></i>
                          </td>
                        </tr> */}
                      </table>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default Nrtmanager;
