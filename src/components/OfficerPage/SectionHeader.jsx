import React, { PropTypes } from 'react';
import style from 'styles/OfficerPage/SectionHeader.sass';


const SectionHeader = ({ text, description }) => (
  <div className={ style.sectionHeader }>
    { text } { description }
  </div>
);

SectionHeader.propTypes = {
  text: PropTypes.string,
  description: PropTypes.object
};

export default SectionHeader;
