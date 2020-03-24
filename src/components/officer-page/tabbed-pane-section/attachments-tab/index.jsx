import React from 'react';
import PropTypes from 'prop-types';

import Complaint from './complaint/index';
import style from './attachments-tab.sass';


export default function AttachmentsTab(props) {
  const { complaints, onTrackingAttachment, location: { pathname } } = props;
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
    </div>
  );
}

AttachmentsTab.defaultProps = {
  complaints: [],
};

AttachmentsTab.propTypes = {
  complaints: PropTypes.array,
  officerId: PropTypes.number,
  onTrackingAttachment: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};
