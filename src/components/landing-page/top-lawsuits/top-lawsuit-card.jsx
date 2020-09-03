import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { LAWSUIT_PATH } from 'constants/paths';
import style from './top-lawsuit-card.sass';


const TopLawsuitCard = ({ lawsuit }) => {
  return (
    <Link
      to={ `${LAWSUIT_PATH}${lawsuit.caseNo}/` }
      className={ style.topLawsuitCard }
    >
      <div className='incident-date'>{ lawsuit.incidentDate }</div>
      <div className='lawsuit-summary'>
        { lawsuit.summary }
        <div className='gradient'/>
      </div>
    </Link>
  );
};

TopLawsuitCard.propTypes = {
  lawsuit: PropTypes.object,
};

export default TopLawsuitCard;
