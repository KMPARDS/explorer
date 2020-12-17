import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Images from '../Images/Images';
import { Col, Button, Container, Row } from 'react-bootstrap';
import Header from '../../Components/Header/Header';
import Navbar from '../../Components/Navbar/Navbar';
import Apis from '../../lib/apis';
import AddressLink from '../../Components/AddressLink/AddressLink';
import * as moment from 'moment';
import { Snackbar } from '../../Components/Snackbar/Snackbar';
import { ethers } from 'ethers';
import { toLocaleTimestamp } from '../../lib/parsers';
import { formatEther } from 'ethers/lib/utils';
import { CustomDatatable } from '../../Components/CustomDatatable/CustomDatatable';

const COUNT_PER_PAGE = 10;

class TopupTransactions extends Component {
  snackbarRef = React.createRef();

  blockNumber;

  constructor(props) {
    super(props);
    this.state = {
      transactions: {
        data: [],
        totalPages: 0,
        isLoading: true,
      },
    };

    this.fetchFailedTxns = this.fetchTopupTxns.bind(this);
  }

  componentDidMount() {
    // this.fetchTopupTxns();
  }

  async fetchTopupTxns(start, length = 10) {
    try {
      const res = await Apis.fetchTopupTxns(start, length);
      console.log('res', res);
      this.setState({
        transactions: {
          data: res.data,
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
          <h2 className="es-main-head es-main-head-inner">Topup Transactions</h2>
        </div>
        <Container>
          <Row className="mt40">
            <Col lg={12}>
              <div className="card">
               <CustomDatatable
               title="Top Ups"
               apiCallback={Apis.fetchTopupTxns}
               countPerPage = {COUNT_PER_PAGE}
               columns={
                 [
                   {
                     name: '#',
                     selector: 'index'
                   },
                   {
                     name: 'Address',
                     cell: row => <AddressLink value={row.benefactor.address} type="address" />
                   },
                   {
                     name: 'Amount (ES)',
                     cell: row => row.amount ? formatEther(row.amount) : 0
                   },
                 ]
               }
                progressPending={this.state.transactions.isLoading}
                progressComponent={<h5><i className="fa fa-spinner fa-spin"></i></h5>}
               />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default TopupTransactions;
