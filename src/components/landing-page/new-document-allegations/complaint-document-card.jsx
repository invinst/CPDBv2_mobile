import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { get } from 'lodash';

import { PINBOARD_PAGE } from 'constants';
import { COMPLAINT_PATH } from 'constants/paths';
import style from './complaint-document-card.sass';
import ItemPinButton from 'components/common/item-pin-button';
import pinButtonStyles from 'components/common/item-pin-button.sass';
import * as tracking from 'utils/tracking';


class ComplaintDocumentCard extends React.Component {
  handleClick = () => {
    const { allegation, pathname, onTrackingAttachment } = this.props;
    const document = get(allegation, 'document', {});
    const url = `${COMPLAINT_PATH}${allegation.crid}/`;
    tracking.trackAttachmentClick(pathname, url);
    onTrackingAttachment({ attachmentId: document['id'], sourcePage: 'Landing Page', app: 'Mobile' });
  };

  render() {
    const { allegation, addOrRemoveItemInPinboard } = this.props;
    const document = get(allegation, 'document', {});
    const { incidentDate, category } = allegation;
    return (
      <Link
        to={ `${COMPLAINT_PATH}${allegation.crid}/` }
        className={ style.complaintDocumentCard }
        onClick={ this.handleClick }
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
        <div className='document-preview'>
          <img className='preview-image' src={ document.previewImageUrl } />
        </div>
        <div className='complaint-info'>
          <div className='complaint-info-incident-date'>{ incidentDate }</div>
          <div className='complaint-info-category'>{ category }</div>
        </div>
      </Link>
    );
  }
}

ComplaintDocumentCard.propTypes = {
  allegation: PropTypes.object,
  pathname: PropTypes.string,
  onTrackingAttachment: PropTypes.func,
  addOrRemoveItemInPinboard: PropTypes.func,
};

ComplaintDocumentCard.defaultProps = {
  onTrackingAttachment: () => {},
};

export default ComplaintDocumentCard;
