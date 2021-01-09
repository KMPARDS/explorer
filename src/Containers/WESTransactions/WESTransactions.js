import React, { Component } from 'react';
import './wESTransactions.css';
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
import { formatEther, toLocaleTimestamp } from '../../lib/parsers';
import { prepaidInstance, providerESN } from '../../ethereum/Provider';
import { routine } from 'eraswap-sdk/dist/utils';
import DataTable from 'react-data-table-component';

class WESTransactions extends Component {
  snackbarRef = React.createRef();

  intervalIds = [];
  constructor(props) {
    super(props);
    this.state = {
      wesTransactions: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.fetchWESTransactions();
  }

  fetchWESTransactions = async () => {
    try {
      await this.setState({
        isLoading: true
      });
      const wesTransactions = (await prepaidInstance.queryFilter(prepaidInstance.filters.Transfer(null,null,null)))
        .map(log =>({
          ...prepaidInstance.interface.parseLog(log),
          blockNumber: log.blockNumber
        }))
        .map(log => ({
          from: log.args['from'],
          to: log.args['to'],
          tokens: log.args['tokens'],
          blockNumber: log.blockNumber,
        }))
        .sort((a,b) => a.blockNumber > b.blockNumber ? -1 : 1);

        this.setState({ 
          wesTransactions,
          isLoading: false
        });
    } catch (e) {
      console.log(e);
      this.openSnackBar(e.message);
      this.setState({
        wesTransactions: [],
        isLoading: false
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
          <h5 className="es-main-head es-main-head-inner">WES Transactions</h5>
        </div>
        <Container>
          <Row className="mt40">
            <Col lg={12}>
              <div className="card">
                {/* <h3>WES Transactions: {this.state.wesTransactions.length}</h3> */}
                <DataTable
                  title={`WES Transactions: ${this.state.wesTransactions.length}`}
                  columns={[
                    {
                      name: 'From',
                      selector: 'from',
                      cell: row => <AddressLink value={row.from} type='address'/>
                    },
                    {
                      name: 'To',
                      selector: 'to',
                      cell: row => <AddressLink value={row.to} type='address'/>
                    },
                    {
                      name: 'Tokens (ES)',
                      cell: row => formatEther(row.tokens)
                    },
                  ]}
                  data={this.state.wesTransactions}
                  highlightOnHover
                  pagination
                  paginationTotalRows={Math.ceil(this.state.wesTransactions/10)}
                  paginationPerPage={10}
                  paginationComponentOptions={{
                    noRowsPerPage: true
                  }}
                  progressPending={this.state.isLoading}  
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

export default WESTransactions;
