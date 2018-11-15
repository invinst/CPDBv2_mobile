import React, { Component, PropTypes } from 'react';
import Attachment from './attachment';
import Heading from './heading';
import style from './complaint.sass';


export default class Complaint extends Component {
  render() {
    const { complaint } = this.props;
    return (
      <div className={ style.officerAttachmentsTabComplaint }>
        <Heading complaint={ complaint } />
        <div className='attachments'>
          {
            complaint.attachments.map((attachment, index) =>
              <Attachment attachment={ attachment } key={ index } />
            )
          }
        </div>
      </div>
    );
  }
}

Complaint.propTypes = {
  complaint: PropTypes.object,
};
