import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { PINBOARD_PAGE } from 'constants';
import { COMPLAINT_PATH } from 'constants/paths';
import style from './complaint-summary-card.sass';
import ItemPinButton from 'components/common/item-pin-button';
import pinButtonStyles from 'components/common/item-pin-button.sass';


const ComplaintSummaryCard = ({ allegation, addOrRemoveItemInPinboard }) => {
  return (
    <Link
      to={ `${COMPLAINT_PATH}${allegation.crid}/` }
      className={ style.complaintSummaryCard }
    >
      <ItemPinButton
        className={ pinButtonStyles.cardPinnedButton }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
        showHint={ false }
        item={ {
          type: PINBOARD_PAGE.PINNED_ITEM_TYPES.CR,
          id: allegation.crid,
          isPinned: allegation.isPinned,
        } }
      />
      <div className='incident-date'>{ allegation.incidentDate }</div>
      <div className='complaint-summary'>
        { allegation.summary }
        <div className='gradient'/>
      </div>
    </Link>
  );
};

ComplaintSummaryCard.propTypes = {
  allegation: PropTypes.object,
  addOrRemoveItemInPinboard: PropTypes.func,
};

export default ComplaintSummaryCard;
