import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ethers } from 'ethers';
import { nrtManager } from '../../../ethereum/NrtManager';
import { providerESN } from '../../../ethereum/Provider';

export const NrtReleaseModal = () => {
  const [modal, setModal] = useState(false);
  const [privateKey, setPrivateKey] = useState('');
  const [wallet, setWallet] = useState(null);
  const [busy, setBusy] = useState(false);
  const [displayMessage, setDisplayMessage] = useState('');

  const toggle = () => setModal(!modal);

  const loadWallet = () => {
    if(!privateKey?.length)
      return alert('Please enter private key to load wallet');
    const wallet = new ethers.Wallet(privateKey);
    setWallet(wallet);
  }

  const releaseNRT = async () => {
    if(!wallet)
      return alert('Please Load Wallet to Release NRT');

    setDisplayMessage('');
    setBusy(true);
    try {
      const tx = await nrtManager
        .connect(wallet.connect(providerESN))
        .releaseMonthlyNRT();
      setDisplayMessage(`NRT Released. Tx hash: ${tx.hash}`);
      setBusy(false);
      await tx.wait();
      await this.updateNrtMonth();
    } catch (error) {
      setDisplayMessage(error?.error?.reason || error?.message);
      setBusy(false);
    }
  };

  return (
    <div>
      <Button color="primary" className="btn btn-sm" onClick={toggle}>RELEASE MONTLY NRT</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>RELEASE MONTLY NRT</ModalHeader>
        <ModalBody>
          {wallet === null
          ?
          <form>
            <label>Enter private key to load wallet</label>
            <input type="password" className="form-control" onChange={e => setPrivateKey(e.target.value)} />
            <button type="button" className="btn btn-primary" onClick={loadWallet}>Load Wallet</button>
          </form>
          :
          <div className="text-center">
            <button 
              type='button' 
              className="btn btn-success" 
              onClick={releaseNRT}
              disabled={busy}
            >{busy ? <i className="fa fa-spinner fa-spin"></i> : <>Release NRT</>}</button>
            {displayMessage?.length 
            ? <div className="alert alert-info">{displayMessage}</div> 
            : ''}
          </div>
          }
        </ModalBody>
      </Modal>
    </div>
  );
}