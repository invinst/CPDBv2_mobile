import React, { PropTypes } from 'react';

import style from 'styles/ComplaintPage/ComplaintFinding.sass';

const ComplaintFinding = ({ finding }) => {
  const findingClass = finding ? finding.toLowerCase().replace(' ', '-') : 'unknown';

  return (
    <span className={ `${style.complaintFinding} ${findingClass}` }>
      { finding }
    </span>
  );
};

ComplaintFinding.propTypes = {
  finding: PropTypes.string
};

export default ComplaintFinding;
