import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';
import cx from 'classnames';

import BaseOfficerCard from 'components/common/base-officer-card';
import style from './officer-card.sass';
import { getCurrentAge } from 'utils/date';


export default class OfficerCard extends Component {
  render() {
    const { officer, openCardInNewPage, addOrRemoveItemInPinboard, pinnable } = this.props;
    const age = officer['birth_year'] ? getCurrentAge(officer['birth_year']) : 'N/A';
    return (
      <BaseOfficerCard
        officerId={ officer.id }
        fullName={ officer.full_name }
        complaintCount={ officer.complaint_count }
        sustainedCount={ officer.sustained_count }
        age={ age }
        race={ officer.race }
        gender={ officer.gender }
        rank={ officer.rank }
        percentile={ officer.percentile }
        openCardInNewPage={ openCardInNewPage }
        bottomContent={
          <div className={ cx(style.officerCardComplaintCount, 'complaint-count') }>
            { `${officer.complaint_count} ${pluralize('complaint', officer.complaint_count)}` }
          </div>
        }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
        pinnable={ pinnable }
        isPinned={ officer.isPinned }
      />
    );
  }
}

OfficerCard.propTypes = {
  officer: PropTypes.object,
  openCardInNewPage: PropTypes.bool,
  addOrRemoveItemInPinboard: PropTypes.func,
  pinnable: PropTypes.bool,
};
