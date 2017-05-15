import React, { PropTypes } from 'react';

import style from 'styles/ComplaintPage/SectionTitle.sass';

const SectionTitle = ({ title }) => {
  return (
    <div className={ style.sectionTitle }>
      { title }
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string
};

export default SectionTitle;
