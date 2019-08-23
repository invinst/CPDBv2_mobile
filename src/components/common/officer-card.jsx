import React, { PropTypes } from 'react';
import pluralize from 'pluralize';
import cx from 'classnames';

import BaseOfficerCard from 'components/common/base-officer-card';
import style from './officer-card.sass';


const OfficerCard = ({ officer, openCardInNewPage }) => {
  return (
    <BaseOfficerCard
      officerId={ officer.id }
      fullName={ officer.full_name }
      rank={ officer.rank }
      percentile={ officer.percentile }
      openCardInNewPage={ openCardInNewPage }
      bottomContent={
        <div className={ cx(style.officerCardComplaintCount, 'complaint-count') }>
          { `${officer.complaint_count} ${pluralize('complaint', officer.complaint_count)}` }
        </div>
      }
    />
  );
};

OfficerCard.propTypes = {
  officer: PropTypes.object,
  openCardInNewPage: PropTypes.bool,
};

export default OfficerCard;
