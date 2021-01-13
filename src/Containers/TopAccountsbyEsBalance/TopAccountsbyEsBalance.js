import React, { Component } from 'react';
import './TopAccountsbyEsBalance.css';
import { Link } from 'react-router-dom';
import Images from '../Images/Images';
import { Col, Button, Container, Row } from 'react-bootstrap';
import Header from '../../Components/Header/Header';
import Navbar from '../../Components/Navbar/Navbar';
import Apis from '../../lib/apis';
import { formatEther } from '../../lib/parsers';
import AddressLink from '../../Components/AddressLink/AddressLink';
import { CustomDatatable } from '../../Components/CustomDatatable/CustomDatatable';

const COUNT_PER_PAGE = 10;

class TopAccountsbyEsBalance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: {
        data: [],
        isLoading: true,
      },
    };
  }

  componentDidMount() {
    this.fetchTopAccounts();
  }

  async fetchTopAccounts() {
    let res;
    try {
      res = await Apis.fetchTopAccounts();
    } catch (error) {
      console.log(error);
    } finally {
      console.log('res', res);
      this.setState({
        accounts: {
          data: res && Array.isArray(res) ? res : [],
          isLoading: false,
        },
      });
    }
  }

  render() {
    return (
      <div className="node-status">
        <div className="booking-hero-bgd booking-hero-bgd-inner">
          <Navbar />
          <h2 className="es-main-head es-main-head-inner">
            Top Accounts by ES Balance
          </h2>
        </div>
        <Container>
          {/* <p className="trans-head">TimeAlly Explorer</p> */}

          <Row className="mt40 eraswapcal-tab">
            <Col lg={12}>
              <CustomDatatable
                title="Top Accounts by ES Balance"
                apiCallback={Apis.fetchTopAccounts}
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
                    // {
                    //   name: 'Stake',
                    //   cell: row => row.stakes ? formatEther(row.stakes) : 0
                    // },
                    {
                      name: 'Balance',
                      cell: row => formatEther(row.balance || '0x0')
                    },
                    {
                      name: 'Txn Count',
                      selector: 'txnsCount'
                    }
                  ]
                }
               />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default TopAccountsbyEsBalance;
