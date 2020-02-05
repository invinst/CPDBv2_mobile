import React from 'react';
import PropTypes from 'prop-types';

import constants from 'constants';
import style from './legal-modal-content.sass';

const LegalModalContent = ({ closeModal, openContact }) => {
  return (
    <div className={ style.legalModalContent }>
      <div className='close-button-wrapper' onClick={ closeModal }>
        <span className='close-button'>&times;</span>
      </div>
      <div className='modal-title'>Legal</div>
      <div className='legal-content'>
        <p>
          The information we provide comes primarily from data provided by the
          City of Chicago in response to litigation and Freedom Of Information Act
          (FOIA) requests. We have incorporated other publicly available data whenever possible.
        </p>
        <p>
          We cannot guarantee the accuracy of this data - instead we commit ourselves to being
          honest about flaws (<a target='_blank' className='legal-link' href={ constants.QA_URL }>Q&amp;A</a>),
          transparent in our publishing process
          (<a target='_blank' className='legal-link' href={ constants.INVINST_GITHUB_URL }>GitHub</a>),
          and welcoming of critiques
          (<span className='contact-link legal-link' onClick={ openContact } >contact</span>).
        </p>
      </div>
      <div className='confirm-button' onClick={ closeModal }>I understand</div>
    </div>
  );
};

LegalModalContent.propTypes = {
  closeModal: PropTypes.func,
  openContact: PropTypes.func,
};

export default LegalModalContent;
