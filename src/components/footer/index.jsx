import React, { Component } from 'react';
import Modal from 'react-modal';

import { INVINST_GITHUB_URL } from 'constants';
import { showIntercomMessages } from 'utils/intercom';
import LegalModalContent from './legal-modal-content';
import style from './footer.sass';
import IOSPeek from 'components/common/ios-peek';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      legalModalIsOpen: false,
    };
  }

  openModal = () => {
    this.setState({ legalModalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ legalModalIsOpen: false });
  };

  openContact = () => {
    showIntercomMessages(true);
  };

  render() {
    Modal.setAppElement('body');

    return (
      <div className={ style.footer }>
        <div className='footer-items'>
          <div className='item legal-item' onClick={ this.openModal }>Legal</div>
          <a className='item' target='_blank' href={ INVINST_GITHUB_URL }>Github</a>
          <div className='item contact-item' onClick={ this.openContact }>Contact</div>
        </div>
        <a
          href='https://invisible.institute/cpdp'
          className='invist-logo-link'
          target='_blank'>
          <img className='invist-logo' src='/img/invist-logo.svg' alt='Invisible Institute' />
        </a>
        <IOSPeek isBottom={ true }/>
        <Modal
          isOpen={ this.state.legalModalIsOpen }
          onRequestClose={ this.closeModal }
          className={ style.legalModal }
          overlayClassName={ style.overlayLegalModal }
        >
          <LegalModalContent closeModal={ this.closeModal } openContact={ this.openContact } />
        </Modal>
      </div>
    );
  }
}

export default Footer;
