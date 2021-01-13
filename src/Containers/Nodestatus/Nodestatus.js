import React, { Component } from 'react';
import './nodestatus.css';
import { Link } from 'react-router-dom';
import Images from '../Images/Images';
import { Col, Button, Container, Row } from 'react-bootstrap';
import Header from '../../Components/Header/Header';
import Navbar from '../../Components/Navbar/Navbar';

import { NodesTable } from './NodesTable/NodesTable';

class Nodestatus extends Component {
  
  

  render() {
    return (
      <div className="node-status compage">
        <div className="booking-hero-bgd booking-hero-bgd-inner">
          <Navbar />
          <h2 className="es-main-head es-main-head-inner">Node Status</h2>
        </div>
        <Container>
          {/* <p className="trans-head">TimeAlly Explorer</p> */}

          <Row className="mt40">
            <Col lg={12}>
              <div className="card">
                <NodesTable />
              </div>
              {/* <div className="cus-pagination row">
                <div className="col-md-12 text-right">
                  <button type="button" className="btn mr10 mt10">
                    Back
                  </button>
                  <button type="button" className="btn mr10 mt10">
                    Next
                  </button>
                </div>
              </div> */}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Nodestatus;
