import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import BaseOfficerCard from 'components/common/base-officer-card';
import style from './officer-card.sass';
import pluralize from 'pluralize';


export class OfficerCard extends Component {
  render() {
    const {
      officerId, fullName, rank, percentile, coaccusalCount, customStyle,
      isPinned, addOrRemoveItemInPinboard,
    } = this.props;
    return (
      <BaseOfficerCard
        officerId={ officerId }
        fullName={ fullName }
        rank={ rank }
        percentile={ percentile }
        customStyle={ customStyle }
        isPinned={ isPinned }
        pinnable={ true }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
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
  addOrRemoveItemInPinboard: PropTypes.func,
  isPinned: PropTypes.bool,
};

export default OfficerCard;
