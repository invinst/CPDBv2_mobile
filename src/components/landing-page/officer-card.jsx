import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import pluralize from 'pluralize';

import RadarChart from 'components/common/radar-chart';
import constants from 'constants';
import style from './officer-card.sass';


const OfficerCard = ({ officer }) => {
  return (
    <Link
      to={ `${constants.OFFICER_PATH}${officer.id}/` }
      className={ style.officerCard }>
      <div className='radar-chart'>
        <RadarChart
          radius={ 170 }
          backgroundColor={ officer.percentile.visualTokenBackground }
          data={ officer.percentile.items }
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
  officer: PropTypes.object
};

export default OfficerCard;
