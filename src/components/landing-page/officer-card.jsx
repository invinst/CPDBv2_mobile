import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import pluralize from 'pluralize';

import RadarChart from 'components/common/radar-chart';
import constants from 'constants';
import style from './officer-card.sass';


const OfficerCard = ({ officer, openCardInNewPage }) => {
  const { percentile } = officer;
  return (
    <Link
      to={ `${constants.OFFICER_PATH}${officer.id}/` }
      target={ openCardInNewPage ? '_blank' : null }
      className={ style.officerCard }>
      <div className='radar-chart'>
        <RadarChart
          radius={ 170 }
          backgroundColor={ percentile && percentile.visualTokenBackground }
          data={ percentile && percentile.items }
        />
      </div>
      <div className='officer-info'>
        <div className='officer-rank'>Officer</div>
        <div className='officer-name'>{ officer.full_name }</div>
      </div>
      <div className='complaint-count'>
        { `${officer.complaint_count} ${pluralize('complaint', officer.complaint_count)}` }
      </div>
    </Link>
  );
};

OfficerCard.propTypes = {
  officer: PropTypes.object,
  openCardInNewPage: PropTypes.bool
};

export default OfficerCard;
