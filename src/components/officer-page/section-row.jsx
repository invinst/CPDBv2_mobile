import React from 'react';
import PropTypes from 'prop-types';

import style from './section-row.sass';

function SectionRow(props) {
  const { label, value, children } = props;
  return (
    <div className={ style.sectionRow }>
      <div className='label'>{ label }</div>
      <div className='value'>
        { value }
        { children }
      </div>
    </div>
  );
}

SectionRow.propTypes = {
  label: PropTypes.string,
  value: PropTypes.node,
  children: PropTypes.node,
};

export default SectionRow;
