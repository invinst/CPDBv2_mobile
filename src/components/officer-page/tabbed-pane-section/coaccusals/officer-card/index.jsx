import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import RadarChart from 'components/common/radar-chart';
import constants from 'constants';
import style from './officer-card.sass';
import pluralize from 'pluralize';


export class OfficerCard extends Component {
  render() {
    const { officerId, fullName, rank, percentile, coaccusalCount, extraClassName } = this.props;
    return (
      <Link
        to={ `${constants.OFFICER_PATH}${officerId}/` }
        className={ cx(style.officerCard, extraClassName, 'test--officer-card') }>
        <div className='radar-chart'>
          <RadarChart
            radius={ 170 }
            backgroundColor={ percentile && percentile.visualTokenBackground }
            data={ percentile && percentile.items }
          />
        </div>
        <div className='officer-info'>
          <div className='officer-rank'>{rank}</div>
          <div className='officer-name'>{fullName}</div>
        </div>
        <div className='coaccusal-count'>
          {`${coaccusalCount} ${pluralize('Coaccusal', coaccusalCount)}`}
        </div>
      </Link>
    );
  }
}

OfficerCard.defaultProps = {
  displayInline: false,
};

OfficerCard.propTypes = {
  officerId: PropTypes.number,
  fullName: PropTypes.string,
  rank: PropTypes.string,
  percentile: PropTypes.object,
  coaccusalCount: PropTypes.number,
  extraClassName: PropTypes.string,
};

export default OfficerCard;
