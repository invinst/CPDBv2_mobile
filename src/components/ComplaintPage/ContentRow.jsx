import React, { PropTypes } from 'react';

import style from 'styles/ComplaintPage/ContentRow.sass';

const ContentRow = ({ name, content }) => {
  return (
    <div className={ style.contentRow }>
      <span className='name'>{ name }</span>
      <span className='content'>{ content }</span>
    </div>
  );
};

ContentRow.propTypes = {
  name: PropTypes.string,
  content: PropTypes.string
};

export default ContentRow;
