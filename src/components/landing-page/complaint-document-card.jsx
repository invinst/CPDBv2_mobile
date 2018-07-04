import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { get } from 'lodash';
import pluralize from 'pluralize';

import constants from 'constants';
import style from './complaint-document-card.sass';


const ComplaintDocumentCard = ({ allegation }) => {
  const document = get(allegation, 'document', {});

  return (
    <Link
      to={ `${constants.COMPLAINT_PATH}${allegation.crid}/` }
      className={ style.complaintDocumentCard }>
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
};

ComplaintDocumentCard.propTypes = {
  allegation: PropTypes.object
};

export default ComplaintDocumentCard;
