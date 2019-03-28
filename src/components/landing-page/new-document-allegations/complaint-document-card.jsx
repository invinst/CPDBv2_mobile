import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { get } from 'lodash';

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
    const { incidentDate, category } = allegation;
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
  onTrackingAttachment: PropTypes.func
};

ComplaintDocumentCard.defaultProps = {
  onTrackingAttachment: () => {},
};

export default ComplaintDocumentCard;
