import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';

import constants from 'constants';
import { showIntercomMessages } from 'utils/intercom';
import invistLogoImage from 'img/invist-logo.svg';
import LegalModalContent from './legal-modal-content';
import style from './footer.sass';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      legalModalIsOpen: false
    };

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.openContact = this.openContact.bind(this);
  }

  openModal() {
    this.setState({ legalModalIsOpen: true });
  }

  closeModal() {
    this.setState({ legalModalIsOpen: false });
  }

  openContact() {
    showIntercomMessages(true);
  }

  render() {
    const { backgroundColorTop } = this.props;
    Modal.setAppElement('body');

    return (
      <div className={ style.footer }>
        <div className='footer-items' style={ { backgroundColor: backgroundColorTop } }>
          <div className='item legal-item' onClick={ this.openModal }>Legal</div>
          <a className='item' target='_blank' href={ constants.INVINST_GITHUB_URL }>Github</a>
          <div className='item contact-item' onClick={ this.openContact }>Contact</div>
        </div>
        <a
          href='https://invisible.institute/cpdp'
          className='invist-logo-link'
          target='_blank'>
          <img className='invist-logo' src={ invistLogoImage } alt='Invisible Institute' />
        </a>
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

Footer.propTypes = {
  backgroundColorTop: PropTypes.string,
};

Footer.defaultProps = {
  backgroundColorTop: 'transparent',
};

export default Footer;
