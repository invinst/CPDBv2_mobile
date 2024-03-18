import React from 'react';
import PropTypes from 'prop-types';

import Complaint from './complaint/index';
import Lawsuit from './lawsuit';
import style from './attachments-tab.sass';


export default function AttachmentsTab(props) {
  const { complaints, lawsuits, onTrackingAttachment, location: { pathname } } = props;
  return (
    <div className={ style.officerAttachmentsTab }>
      {
        complaints.map((complaint, index) => {
          return (
            <Complaint
              complaint={ complaint }
              key={ index }
              onTrackingAttachment={ onTrackingAttachment }
              pathname={ pathname }
            />
          );
        })
      }
      {
        lawsuits.map((lawsuit, index) => {
          return (
            <Lawsuit
              lawsuit={ lawsuit }
              key={ index }
              onTrackingAttachment={ onTrackingAttachment }
              pathname={ pathname }
            />
          );
        })
      }
    </div>
  );
}

AttachmentsTab.defaultProps = {
  complaints: [],
  lawsuits: [],
};

AttachmentsTab.propTypes = {
  complaints: PropTypes.array,
  lawsuits: PropTypes.array,
  officerId: PropTypes.number,
  onTrackingAttachment: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};
