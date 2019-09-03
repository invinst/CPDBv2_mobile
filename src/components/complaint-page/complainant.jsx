import React, { PropTypes } from 'react';

import style from './complainant.sass';


const Complainant = ({ complainants=[] }) => {
  if (complainants.length === 0) {
    return null;
  }

  return (
    <div className={ style.complainant }>
      <div className='label'>Complainant</div>
      <div className='complainant-list'>
        {
          complainants.map((complainant, ind) => (
            <div key={ ind } className='complainant-item'>
              <span className='text'>{ complainant }</span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

Complainant.propTypes = {
  complainants: PropTypes.array,
};

export default Complainant;
