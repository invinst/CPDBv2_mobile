import React, { PropTypes } from 'react';

import style from './summary.sass';

const Summary = ({ summary }) => {
  if (!summary || summary === '') {
    return null;
  }
  return (
    <div className={ style.summary }>
      <div className='label'>Summary</div>
      <div className='content'>{ summary }</div>
    </div>
  );
};

Summary.propTypes = {
  summary: PropTypes.string
};

export default Summary;
