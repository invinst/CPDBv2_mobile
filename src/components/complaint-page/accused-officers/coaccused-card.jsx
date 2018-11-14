import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import { officerUrl } from 'utils/url-util';
import RadarChart from 'components/common/radar-chart';
import style from './coaccused-card.sass';

const CoaccusedCard = ({ officer }) => {
  const findingOutcomeClassName = cx(
    'text',
    {
      'disciplined': officer.finalFinding === 'Sustained' && officer.disciplined,
      'sustained': officer.finalFinding === 'Sustained' && !officer.disciplined,
      'not-sustained': officer.finalFinding !== 'Sustained'
    }
  );
  const { percentile } = officer;

  return (
    <Link className={ style.coaccusedCard } to={ officerUrl(officer.id, officer.fullName) }>
      <div className='radar-chart'>
        <RadarChart
          radius={ 150 }
          backgroundColor={ percentile && percentile.visualTokenBackground }
          data={ percentile && percentile.items }
        />
      </div>
      <div className='officer-info'>
        <div className='officer-rank'>{ officer.rank }</div>
        <div className='officer-name'>{ officer.fullName }</div>
      </div>
      <div className='accused-info'>
        <div className='category'>{ officer.category }</div>
        <div className='finding-outcome'>
          <span className={ findingOutcomeClassName }>{ officer.findingOutcome }</span>
        </div>
      </div>
    </Link>
  );
};

CoaccusedCard.propTypes = {
  officer: PropTypes.object
};

CoaccusedCard.defaultProps = {
  officer: {
    percentile: {}
  }
};

export default CoaccusedCard;
