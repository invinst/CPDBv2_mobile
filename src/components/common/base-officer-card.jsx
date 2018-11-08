import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import RadarChart from 'components/common/radar-chart';
import style from './base-officer-card.sass';
import cx from 'classnames';
import { officerUrl } from 'utils/url-util';


export class BaseOfficerCard extends Component {
  render() {
    const {
      officerId,
      fullName,
      rank,
      percentile,
      openCardInNewPage,
      bottomContent,
      customStyle
    } = this.props;
    return (
      <Link
        to={ officerUrl(officerId, fullName) }
        target={ openCardInNewPage ? '_blank' : null }
        className={ cx(style.baseOfficerCard, customStyle, 'test--officer-card') }>
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
        { bottomContent }
      </Link>
    );
  }
}

BaseOfficerCard.propTypes = {
  officerId: PropTypes.number,
  fullName: PropTypes.string,
  rank: PropTypes.string,
  percentile: PropTypes.object,
  openCardInNewPage: PropTypes.bool,
  bottomContent: PropTypes.node,
  customStyle: PropTypes.object,
};

export default BaseOfficerCard;
