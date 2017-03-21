import React, { PropTypes } from 'react';
import style from 'styles/OfficerPage/SectionHeader.sass';


const SectionHeader = ({ text }) => (
  <div className={ style.sectionHeader }>
    { text }
  </div>
);

SectionHeader.propTypes = {
  text: PropTypes.string
};

export default SectionHeader;
