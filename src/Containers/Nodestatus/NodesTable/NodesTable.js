import React from 'react';
import { ethers } from 'ethers';
import Apis from '../../../lib/apis';
import { toLocaleTimestamp, formatEther } from '../../../lib/parsers';
import AddressLink from '../../../Components/AddressLink/AddressLink';

export class NodesTable extends React.Component{
  provider;
  intervalIds = [];

  constructor(props) {
    super(props);
    this.state = {
      nodes: {
        data: [],
        isLoading: true,
      },
    };
  }

  componentDidMount() {
    this.fetchNodes();
  }

  async fetchNodes() {
    let res = [];
    try {
      res = await Apis.fetchNodes();
      console.log('res', res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        nodes: {
          data: Array.isArray(res) ? res : [],
          isLoading: false,
        },
      });
    }
  }

  extractIp(url) {
    try {
      url = new URL(url);
      return /*url.protocol + '//' +*/ url.hostname;
    } catch (e) {
      console.error(e);
      return '';
    }
  }

  extractPort(url) {
    try {
      url = new URL(url);
      return url.port;
    } catch (e) {
      console.error(e);
      return '';
    }
  }

  render(){
    return <div className="table-responsive">
    <table className="es-transaction striped bordered hover table">
      <tr>
        {/* <th>Wallet Address</th> */}
        <th>Host</th>
        <th>Last Seen</th>
        <th>Port</th>
        <th>OS</th>
        <th>Active</th>
        <th>Stakes</th>
      </tr>
      {this.state.nodes.isLoading ? (
        <tr>
          <td colSpan="6">Loading...</td>
        </tr>
      ) : this.state.nodes.data?.length ? (
        this.state.nodes.data.map((node) => (
          <tr>
            {/* <th>
              {node?.address?.address 
                && <AddressLink
                    value={node.address.address}
                    type="address"
                  /> || '-'}
            </th> */}
            <th>{this.extractIp(node.nodeIp)}</th>
            <th>
              {toLocaleTimestamp(node.lastTimeStamp).format(
                'hh:mm DD/MM/YYYY'
              )}
            </th>
            <th>{this.extractPort(node.nodeIp)}</th>
            <th>{node.os || 'Linux'}</th>
            <th>{node.isOn ? 'Yes' : 'No'}</th>
            <th>
              {node?.stakes?.amount
                ? formatEther(node.stakes?.amount) + ' ES'
                : '-'}
            </th>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6">No Nodes</td>
        </tr>
      )}
    </table>
  </div>
  }
}