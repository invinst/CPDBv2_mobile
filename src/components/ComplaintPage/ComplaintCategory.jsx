import React, { PropTypes } from 'react';

import style from 'styles/ComplaintPage/ComplaintCategory.sass';

const ComplaintCategory = ({ category, subcategory }) => {
  return (
    <div className={ style.complaintCategory }>
      <p className='category'>{ category || 'Unknown' }</p>
      <p className='subcategory'>{ subcategory || 'Unknown' }</p>
    </div>
  );
};

ComplaintCategory.propTypes = {
  category: PropTypes.string,
  subcategory: PropTypes.string
};

export default ComplaintCategory;
