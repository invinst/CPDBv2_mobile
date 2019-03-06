import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { get } from 'lodash';
import pluralize from 'pluralize';

import constants from 'constants';
import style from './complaint-document-card.sass';
import * as GATracking from 'utils/google_analytics_tracking';


class ComplaintDocumentCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { allegation, pathname, onTrackingAttachment } = this.props;
    const document = get(allegation, 'document', {});
    const url = `${constants.COMPLAINT_PATH}${allegation.crid}/`;
    GATracking.trackAttachmentClick(pathname, url);
    onTrackingAttachment({ attachmentId: document['id'], sourcePage: 'Landing Page', app: 'Mobile' });
  }

  render() {
    const { allegation } = this.props;
    const document = get(allegation, 'document', {});
    return (
      <Link
        to={ `${constants.COMPLAINT_PATH}${allegation.crid}/` }
        className={ style.complaintDocumentCard }
        onClick={ this.handleClick }
      >
        <div className='document-preview'>
          <img className='preview-image' src={ document.previewImageUrl } />
        </div>
        <div className='complaint-info'>
          <div className='crid'>CR { allegation.crid }</div>
          <div className='num-recent-documents'>
            { `${allegation.documentCount} new ${pluralize('attachment', allegation.documentCount)}` }
          </div>
        </div>
      </Link>
    );
  }
}

ComplaintDocumentCard.propTypes = {
  allegation: PropTypes.object,
  pathname: PropTypes.string,
  onTrackingAttachment: PropTypes.func
};

ComplaintDocumentCard.defaultProps = {
  onTrackingAttachment: () => {},
};

export default ComplaintDocumentCard;
