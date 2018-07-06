import React, { PropTypes } from 'react';

import style from './victim.sass';

const Victim = ({ victims=[] }) => {
  if (victims.length === 0) {
    return null;
  }

  return (
    <div className={ style.victim }>
      <div className='label'>Victim</div>
      <div className='victim-list'>
        {
        victims.map((victim, ind) => (
          <div key={ ind } className='victim-item'>
            <span className='text'>{ victim }</span>
          </div>
        ))
      }
      </div>
    </div>
  );
};

Victim.propTypes = {
  victims: PropTypes.array
};

export default Victim;
