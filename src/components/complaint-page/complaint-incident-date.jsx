import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import style from './complaint-incident-date.sass';

const ComplaintIncidentDate = ({ incidentDate }) => {
  if (!incidentDate) return null;

  return (
    <div className={ style.complaintIncidentDate }>
      <div className='incident-date-label'>Date</div>
      <div className='incident-date-value'>
        { moment(incidentDate).format('ll') }
      </div>
    </div>
  );
};

ComplaintIncidentDate.propTypes = {
  incidentDate: PropTypes.string,
};

export default ComplaintIncidentDate;
