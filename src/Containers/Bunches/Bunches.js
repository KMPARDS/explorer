import React, { Component } from 'react';
import './Bunch.css';
import { Link } from 'react-router-dom';
import Images from '../Images/Images';
import { Col, Button, Container, Row } from 'react-bootstrap';
import Header from '../../Components/Header/Header';
import Navbar from '../../Components/Navbar/Navbar';
import Apis from '../../lib/apis';
import AddressLink from '../../Components/AddressLink/AddressLink';
import { toLocaleTimestamp } from '../../lib/parsers';
import CustomPagination from '../../Components/CustomPagination/CustomPagination';
import { Snackbar } from '../../Components/Snackbar/Snackbar';

class Bunch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bunches: {
        data: {},
        isLoading: true,
      },
    };
  }

  componentDidMount() {
    this.fetchBunches();
  }

  fetchBunches = async (start, length = 10) => {
    try {
      const res = await Apis.fetchBunches(start, length);
      if (res)
        this.setState({
          bunches: {
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
        bunches: {
          data: [],
          isLoading: false,
        },
      });
    }
  };

  render() {
    return (
      <div className="blocks-table">
        <div className="booking-hero-bgd booking-hero-bgd-inner">
          <Navbar />
          <h2 className="es-main-head es-main-head-inner">Bunch</h2>
        </div>
        <Container>
          <Row className="mt40">
            <Col lg={12}>
              <div className="card">
                <div className="table-responsive">
                  <table className="es-transaction table">
                    <thead>
                      <tr>
                        <th
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Bunch Depth is the Depth of Merkle Tree"
                        >
                          Bunch Index
                        </th>
                        <th
                          data-toggle="tooltip"
                          data-placement="top"
                          title="No. of Blocks is the count of Blocks in the Bunch"
                        >
                          Number of Blocks
                        </th>
                        <th
                          data-toggle="tooltip"
                          data-placement="top"
                          title="No. of Transactions is the count of Transactions in the Bunch"
                        >
                          Number of Transactions
                        </th>
                        <th
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Time Stamp show that the blocks are connected in a chronological order which marks the time for each transaction on Era Swap Network"
                        >
                          Time Stamp
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.bunches.isLoading ? (
                        <tr>
                          <td colSpan="4">Loading...</td>
                        </tr>
                      ) : this.state.bunches.data.length ? (
                        this.state.bunches.data.map((bunch, i) => (
                          <tr>
                            <td className="tr-color-txt" key={i + 1}>
                              <AddressLink
                                value={bunch.bunch_index}
                                type="bunch"
                              />
                            </td>
                            <td className="tr-color-txt">
                              {bunch.blocks_count}
                            </td>
                            <td>{bunch.transactions_count}</td>
                            <td>
                              {toLocaleTimestamp(bunch.timestamp).format(
                                'hh:mm:ss A DD/MM/YYYY'
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">No Bunches</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <Col lg={12} className="mb30">
                  <CustomPagination
                    handleClick={this.fetchBunches}
                    currentPage={this.state.bunches.currentPage}
                    prevPage={this.state.bunches.currentPage - 1}
                    nextPage={this.state.bunches.currentPage + 1}
                    totalPages={this.state.bunches.totalPages}
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

export default Bunch;
