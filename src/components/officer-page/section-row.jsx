import React, { PropTypes } from 'react';

import style from './section-row.sass';


const SectionRow = ({ label, value, extraInfo }) => (
  <div className={ style.sectionRow }>
    <span className='label'>{ label }</span>
    <span className='value'>{ value || 'N/A' }</span>
    <span className='extra-info'>{ extraInfo || '' }</span>
  </div>
);

SectionRow.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  extraInfo: PropTypes.string
};

export default SectionRow;
