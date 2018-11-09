import React, { Component, PropTypes } from 'react';

import Complaint from './complaint/index';
import style from './attachments-tab.sass';


export default class AttachmentsTab extends Component {

  render() {
    const { complaints } = this.props;
    return (
      <div className={ style.officerAttachmentsTab }>
        {
          complaints.map((complaint, index) => {
            return (
              <Complaint
                complaint={ complaint }
                key={ index }
              />
            );
          })
        }
      </div>
    );
  }
}

AttachmentsTab.defaultProps = {
  complaints: () => {},
};

AttachmentsTab.propTypes = {
  complaints: PropTypes.array,
  officerId: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};
