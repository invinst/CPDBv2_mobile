import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import BaseOfficerCard from 'components/common/base-officer-card';
import style from './officer-card.sass';
import pluralize from 'pluralize';


export class OfficerCard extends Component {
  render() {
    const { officerId, fullName, rank, percentile, coaccusalCount, customStyle } = this.props;
    return (
      <BaseOfficerCard
        officerId={ officerId }
        fullName={ fullName }
        rank={ rank }
        percentile={ percentile }
        customStyle={ customStyle }
        bottomContent={
          <div className={ cx(style.officerCardCoaccusalCount, 'coaccusal-count') }>
            {`${coaccusalCount} ${pluralize('Coaccusal', coaccusalCount)}`}
          </div>
        }
      />
    );
  }
}

OfficerCard.propTypes = {
  officerId: PropTypes.number,
  fullName: PropTypes.string,
  rank: PropTypes.string,
  percentile: PropTypes.object,
  coaccusalCount: PropTypes.number,
  customStyle: PropTypes.string,
};

export default OfficerCard;
