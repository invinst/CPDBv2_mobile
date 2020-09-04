import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import style from './top-lawsuit-card.sass';
import { lawsuitPath } from 'utils/paths';


const TopLawsuitCard = ({ lawsuit }) => {
  return (
    <Link
      to={ lawsuitPath(lawsuit.caseNo) }
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
