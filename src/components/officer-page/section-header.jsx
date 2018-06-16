import React, { PropTypes } from 'react';

import style from './section-header.sass';


const SectionHeader = ({ text }) => (
  <div className={ style.sectionHeader }>
    { text }
  </div>
);

SectionHeader.propTypes = {
  text: PropTypes.object,
};

export default SectionHeader;
