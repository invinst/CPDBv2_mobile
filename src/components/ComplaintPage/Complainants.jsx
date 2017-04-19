import React, { PropTypes } from 'react';

import style from 'styles/ComplaintPage/Complainants.sass';

const Complainants = ({ complainants }) => {
  if (!complainants) {
    return null;
  }

  const rows = complainants.map(
    ({ race, age, gender }, index) => (
      <div className='row' key={ index }>
        { race || 'Unknown' }, { gender || 'Unknown' }{ age ? `, Age ${age}` : '' }
      </div>
    )
  );

  return (
    <div className={ style.complainants }>
      <p className='title'>Complainant</p>
      { rows }
    </div>
  );
};

Complainants.propTypes = {
  complainants: PropTypes.array
};

export default Complainants;
