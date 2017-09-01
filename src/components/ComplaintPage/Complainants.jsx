import React, { PropTypes } from 'react';

import style from 'styles/ComplaintPage/Complainants.sass';
import SectionTitle from 'components/ComplaintPage/SectionTitle';

const Complainants = ({ complainants }) => {
  if (!complainants) {
    return null;
  }

  const rows = complainants.map(
    ({ race, age, gender }, index) => (
      <div className='row' key={ index }>
        { race || 'Unknown' } { gender ? gender.toLowerCase() : 'Unknown' }{ age ? `, age ${age}` : '' }
      </div>
    )
  );

  return (
    <div className={ style.complainants }>
      <SectionTitle title='Complainant' />
      { rows }
    </div>
  );
};

Complainants.propTypes = {
  complainants: PropTypes.array
};

export default Complainants;
