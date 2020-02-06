import React from 'react';
import PropTypes from 'prop-types';
import Attachment from './attachment';
import Heading from './heading';
import style from './complaint.sass';


export default function Complaint(props) {
  const { complaint, onTrackingAttachment } = props;
  return (
    <div className={ style.officerAttachmentsTabComplaint }>
      <Heading complaint={ complaint } />
      <div className='attachments'>
        {
          complaint.attachments.map((attachment, index) =>
            <Attachment attachment={ attachment } key={ index } onTrackingAttachment={ onTrackingAttachment }/>
          )
        }
      </div>
    </div>
  );
}

Complaint.propTypes = {
  complaint: PropTypes.object,
  onTrackingAttachment: PropTypes.func,
};
