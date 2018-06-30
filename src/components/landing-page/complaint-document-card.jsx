import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { get } from 'lodash';
import pluralize from 'pluralize';

import constants from 'constants';
import style from './complaint-document-card.sass';

const ComplaintDocumentCard = ({ allegation }) => {
  const latestDocument = get(allegation, 'latest_document', {});

  return (
    <div className={ style.complaintDocumentCard }>
      <a href={ latestDocument.url } className='document-preview'>
        <img className='preview-image' src={ latestDocument.preview_image_url } />
      </a>
      <Link
        to={ `${constants.COMPLAINT_PATH}${allegation.crid}/` }
        className='complaint-info'>
        <div className='crid'>CR { allegation.crid }</div>
        <div className='num-recent-documents'>
          { `${allegation.num_recent_documents} new ${pluralize('attachment', allegation.num_recent_documents)}` }
        </div>
      </Link>
    </div>
  );
};

ComplaintDocumentCard.propTypes = {
  allegation: PropTypes.object
};

export default ComplaintDocumentCard;
