import React, { Component } from 'react';
import './Navbar.css';
import { Link, withRouter } from 'react-router-dom';
import Images from '../../Containers/Images/Images';
import { Badge } from 'react-bootstrap';
import {
  Container,
  Row,
  Col,
  FormControl,
  Form,
  Button,
} from 'react-bootstrap';

class Navbar extends Component {
  search = '';

  constructor(props) {
    super(props);
    this.state = {
      color: 'transparent',
    };
  }
  componentDidMount() {
    window.addEventListener('scroll', this.listenScrollEvent);
  }
  listenScrollEvent = (e) => {
    if (window.scrollY > 40) {
      this.setState({ color: '#747FEB' });
    } else {
      this.setState({ color: 'transparent' });
    }
  };

  handleClick = (e) => {
    e.preventDefault();
    if (this.search.length) {
      if (this.search.length === 42)
        this.props.history.push('/address/' + this.search);
      else if (this.search.length === 66)
        this.props.history.push('/txn/' + this.search);
      else this.props.history.push('/block/' + this.search);
    }
  };

  render() {
    return (
      <div className="header-bgd-color">
        <nav
          className="mb-1 navbar navbar-expand-lg text-white fixed-top"
          style={{ backgroundColor: this.state.color }}
        >
          <Link className="navbar-brand" to="/">
            {' '}
            <img
              className="eslogo-Img"
              alt="Logo"
              src={Images.path.esgreylogo}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent-4"
            aria-controls="navbarSupportedContent-4"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i className="fa fa-bars" aria-hidden="true"></i>
            </span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent-4"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  HOME
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/dashboard">
                  DASHBOARD
                  <span className="sr-only">(current)</span>
                </Link>
              </li>

              <li className="nav-item ">
                <Link className="nav-link" to="/explore">
                  TIMEALLY EXPLORER
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item ">
                <a
                  className="nav-link"
                  href="https://merkleswap.com"
                  target="_blank"
                >
                  MERKLE SWAP{' '}
                  <sup>
                    <Badge pill variant="danger">
                      New
                    </Badge>{' '}
                  </sup>
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink-4"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  MORE
                  <span className="sr-only">(current)</span>
                </Link>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdown"
                >
                  <Link className="dropdown-item" to="/esminingcalculator">
                    ES Calculator
                  </Link>
                  <Link className="dropdown-item" to="/kyc-calci">
                    KYC Charge Incentive Calculator
                  </Link>
                  <Link className="dropdown-item" to="/txns-calci">
                    Transactions Charge Incentive Calculator
                  </Link>
                  <Link className="dropdown-item" to="/es-calci">
                    Personal Era Swap Teller Calculator
                  </Link>
                  <Link className="dropdown-item" to="/timeally-goals">
                    TimeAlly Super Goal Calculator
                  </Link>
                  {/* 
                  <Link className="dropdown-item" to="/es-calci">
                  TimeallyClub Incentive Calculator
                  </Link> */}
                  <Link className="dropdown-item" to="/nrtmanager">
                    NRT Manager
                  </Link>
                  <Link className="dropdown-item" to="/validatorstakings">
                    Validator Stakings
                  </Link>
                  <Link className="dropdown-item" to="/layerbridge">
                    Layer2 Bridge
                  </Link>
                  <Link className="dropdown-item" to="/nodestatus">
                    Nodes
                  </Link>
                  {/* <Link className="dropdown-item" to="/cv-txns">
                  Contract Verified Source Code
                  </Link> */}
                  <Link className="dropdown-item" to="/top-statistics">
                    Top Statistics
                  </Link>
                  <Link className="dropdown-item" to="/top-accounts">
                    Top Accounts
                  </Link>


                  <Link className="dropdown-item" to="/txns/pending">
                    View Pending Transactions
                  </Link>
                  <Link className="dropdown-item" to="/txns/failed">
                    View Cancelled Transactions
                  </Link>
                  {/* <Link className="dropdown-item" to="/">
                    TimeSwappers Transactions
                  </Link> */}
                  <Link className="dropdown-item" to="/txns/wes">
                    WES Transactions
                  </Link>
                  <Link className="dropdown-item" to="/txns/topup">
                    Top Up Transactions
                  </Link>
                  {/* <Link className="dropdown-item" to="/charts" >
                    Charts
                  </Link> */}
                </div>
              </li>
            </ul>

            <div class="d-flex justify-content-center">
              <form onSubmit={this.handleClick}>
                <div class="searchbar">
                  <input
                    class="search_input"
                    type="text"
                    name="search"
                    placeholder="Block, hash, transaction etc.."
                    onChange={(e) => (this.search = e.target.value)}
                  />
                  <a href="#" class="search_icon" onClick={this.handleClick}>
                    <i class="fa fa-search"></i>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default withRouter(Navbar);
