import React, { Component } from 'react';
import './Footer.css';
import Images from '../../Containers/Images/Images';
import { Col, Button, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Footer-container">
        <Container>
          <Row>
            <Col sm={4}>
              <div className="flex-footer-logo">
                <img
                  className="eslogo11-Img"
                  src={Images.path.esgreylogo}
                  alt="logo"
                />
              </div>
              <p className="sub-footer-white mt10 pdb20">
                ES Explorer offers complete Dashboards to participants to
                explore live Analytics and Stats on Latest Blocks, Bunch, Nodes
                & Transactions of Era Swap Network
              </p>
              
              <p className="sub-footer-white"></p>
            </Col>
            <Col sm={4}>
              <div className="subscribe-detail">Others Links</div>
              <ul className="text-white othertlinks mt10">
                <li>
                  <i class="fa fa-angle-double-right"></i>{' '}
                  <a
                    href="http://eraswaptoken.io/pdf/eraswap_whitepaper.pdf"
                    target="_blank"
                  >
                    <i class="zmdi zmdi-apple"></i>
                    <span>ES White Paper</span>
                  </a>
                </li>
                <li>
                  <i class="fa fa-angle-double-right"></i>{' '}
                  <a
                    href="https://eraswaptoken.io/pdf/Era_Swap_Decentralized_Autonomous_Organization.pdf"
                    target="_blank"
                  >
                    <i class="zmdi zmdi-apple"></i>
                    <span>Era Swap DAO</span>
                  </a>
                </li>
                <li>
                  <i class="fa fa-angle-double-right"></i>{' '}
                  <a
                    href="http://eraswaptoken.io/pdf/era-swap-howey-test-letter-august7-2018.pdf"
                    target="_blank"
                  >
                    <i class="zmdi zmdi-apple"></i>
                    <span>Howey Test</span>
                  </a>
                </li>
                <li>
                  <i class="fa fa-angle-double-right"></i>{' '}
                  <a
                    href="http://eraswaptoken.io/pdf/es-statuary-warning.pdf"
                    target="_blank"
                  >
                    <i class="zmdi zmdi-apple"></i>
                    <span>Statuary Warning</span>
                  </a>
                </li>
                <li>
                  <i class="fa fa-angle-double-right"></i>{' '}
                  <a
                    href="https://eraswaptoken.io/pdf/eraswap-terms-conditions.pdf"
                    target="_blank"
                  >
                    <i class="zmdi zmdi-apple"></i>
                    <span>Era Swap Terms &amp; Condition</span>
                  </a>
                </li>
                {/* <li><i class="fa fa-angle-double-right"></i>  <a href="/pdf/eraswap-wallet-terms-conditions.pdf" target="_blank"><i class="zmdi zmdi-apple"></i><span>Terms &amp; Condition</span></a></li> 
                    <li><i class="fa fa-angle-double-right"></i>  <a href="/pdf/Eraswap_Wallet_Privacy_Policy.pdf" target="_blank"><i class="zmdi zmdi-apple"></i><span>Privacy Policy</span></a></li>*/}
              </ul>
            </Col>
            <Col sm={4}>
              <div className="subscribe-container">
                <div className="subscribe-detail">Social Media Links</div>
                {/* <div className="flex-box-subs">
                  <form>
                    <input
                      placeholder="Your email address"
                      className="subscribe-field"
                      onChange={this.handleInputChange}
                    />
                  </form>
                </div> */}
                <div className="mt30">
                  <ul class="social-menu">
                    <li>
                      <a
                        href="https://www.facebook.com/eraswap"
                        target="_blank"
                      >
                        <i class="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/company/eraswap/"
                        target="_blank"
                      >
                        <i class="fa fa-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/eraswap/?hl=en"
                        target="_blank"
                      >
                        <i class="fa fa-instagram"></i>
                      </a>{' '}
                    </li>
                    <li>
                      <a href="https://twitter.com/EraSwapTech" target="_blank">
                        <i class="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://medium.com/@eraswap" target="_blank">
                        <i class="fa fa-medium"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://eraswap.tumblr.com/" target="_blank">
                        <i class="fa fa-tumblr"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://t.me/eraswap" target="_blank">
                        <i class="fa fa-telegram"></i>
                      </a>
                    </li>
                    <li>
                      {' '}
                      <a href="https://github.com/KMPARDS" target="_blank">
                        <i class="fa fa-github"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.reddit.com/user/EraSwap"
                        target="_blank"
                      >
                        <i class="fa fa-reddit"></i>
                      </a>{' '}
                    </li>
                    <li>
                      <a
                        href="https://www.youtube.com/channel/UCGCP4f5DF1W6sbCjS6y3T1g?view_as=subscriber"
                        target="_blank"
                      >
                        <i class="fa fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col sm={12}>
                <hr/>
          <div className="footer-txt-white">©  Copyright 2020. Era Swap</div>
          </Col>
          </Row>

        </Container>
      </div>
    );
  }
}

export default Footer;
