import React, { Component, PropTypes } from 'react';
import { noop } from 'lodash';

import BottomPadding from 'components/shared/bottom-padding';
import Victim from './victim';
import Complainant from './complainant';
import Summary from './summary';
import AccusedOfficers from './accused-officers';
import ComplaintCategory from './complaint-category';
import ComplaintIncidentDate from './complaint-incident-date';
import Attachments from './attachments';
import InvestigationTimeline from './investigation-timeline';
import Investigator from './investigator';
import PoliceWitness from './police-witness';
import Location from './location';
import style from './complaint-page.sass';
import Footer from 'components/footer';
import WithHeader from 'components/shared/with-header';


export default class ComplaintPage extends Component {
  componentDidMount() {
    const { complaint, requestComplaint, complaintId, cmsRequested, requestCMS } = this.props;
    if (!complaint) {
      requestComplaint(complaintId);
    }
    cmsRequested || requestCMS();
  }

  render() {
    const { complaint, complaintId, pathname, onTrackingAttachment, noAttachmentMessage } = this.props;

    if (!complaint) {
      return null;
    }

    return (
      <WithHeader className={ style.complaintPage }>
        <div className='complaint-page-body'>
          <ComplaintCategory
            category={ complaint.category }
            subcategory={ complaint.subcategory }
          />
          <ComplaintIncidentDate incidentDate={ complaint.incidentDate } />
          <AccusedOfficers officers={ complaint.coaccused } />
          <div className='complaint-info'>
            <Victim victims={ complaint.victims } />
            <Complainant complainants={ complaint.complainants } />
            <Summary summary={ complaint.summary } />
            <Attachments
              attachments={ complaint.attachments }
              complaintId={ complaintId }
              pathname={ pathname }
              onTrackingAttachment={ onTrackingAttachment }
              noAttachmentMessage={ noAttachmentMessage }
            />
            <InvestigationTimeline
              startDate={ complaint.startDate }
              endDate={ complaint.endDate }
              incidentDate={ complaint.incidentDate }
            />
            <Location
              point={ complaint.point }
              address={ complaint.address }
              beat={ complaint.beat }
              location={ complaint.location } />
            <Investigator investigators={ complaint.investigators } />
            <PoliceWitness policeWitnesses={ complaint.policeWitnesses } />
          </div>
          <div />
        </div>
        <BottomPadding />
        <Footer />
      </WithHeader>
    );
  }
}

ComplaintPage.propTypes = {
  requestComplaint: PropTypes.func,
  complaintId: PropTypes.string,
  complaint: PropTypes.object,
  pathname: PropTypes.string,
  onTrackingAttachment: PropTypes.func,
  requestCMS: PropTypes.func,
  cmsRequested: PropTypes.bool,
  noAttachmentMessage: PropTypes.string,
};

ComplaintPage.defaultProps = {
  requestComplaint: () => {},
  requestCMS: noop,
};
