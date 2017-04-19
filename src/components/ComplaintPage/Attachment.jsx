import React, { PropTypes } from 'react';

import SectionTitle from 'components/ComplaintPage/SectionTitle';
import style from 'styles/ComplaintPage/Attachment.sass';

const Attachment = ({ title, notAvailableMessage }) => {
  return (
    <div className={ style.attachment }>
      <SectionTitle title={ title } />
      <div className='attachment-content'>
        <p className='not-available-message'>{ notAvailableMessage }</p>
        <a href='#' className='attachment-request-link'>Request</a>
      </div>
    </div>
  );
};

Attachment.propTypes = {
  title: PropTypes.string,
  notAvailableMessage: PropTypes.string
};

export default Attachment;
