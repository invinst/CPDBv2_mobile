import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Complaint from './complaint/index';
import style from './attachments-tab.sass';


export default class AttachmentsTab extends Component {

  render() {
    const { complaints, onTrackingAttachment } = this.props;
    return (
      <div className={ style.officerAttachmentsTab }>
        {
          complaints.map((complaint, index) => {
            return (
              <Complaint
                complaint={ complaint }
                key={ index }
                onTrackingAttachment={ onTrackingAttachment }
              />
            );
          })
        }
      </div>
    );
  }
}

AttachmentsTab.defaultProps = {
  complaints: [],
};

AttachmentsTab.propTypes = {
  complaints: PropTypes.array,
  officerId: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  onTrackingAttachment: PropTypes.func,
};
