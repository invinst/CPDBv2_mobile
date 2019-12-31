import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import BaseOfficerCard from 'components/common/base-officer-card';
import style from './officer-card.sass';
import pluralize from 'pluralize';


export class OfficerCard extends Component {
  render() {
    const {
      officerId,
      fullName,
      rank,
      percentile,
      coaccusalCount,
      customStyle,
      isPinned,
      addOrRemoveItemInPinboard,
      complaintCount,
      sustainedCount,
      age,
      race,
      gender,
    } = this.props;
    return (
      <BaseOfficerCard
        officerId={ officerId }
        fullName={ fullName }
        complaintCount={ complaintCount }
        sustainedCount={ sustainedCount }
        age={ age }
        race={ race }
        gender={ gender }
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
  complaintCount: PropTypes.number,
  sustainedCount: PropTypes.number,
  age: PropTypes.string,
  race: PropTypes.string,
  gender: PropTypes.string,
  rank: PropTypes.string,
  percentile: PropTypes.object,
  coaccusalCount: PropTypes.number,
  customStyle: PropTypes.string,
  addOrRemoveItemInPinboard: PropTypes.func,
  isPinned: PropTypes.bool,
};

export default OfficerCard;
