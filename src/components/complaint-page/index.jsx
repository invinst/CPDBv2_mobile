import React, { Component, PropTypes } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';

import Header from 'components/shared/header';
import BottomPadding from 'components/shared/bottom-padding';
import Victim from './victim';
import Complainant from './complainant';
import Summary from './summary';
import AccusedOfficers from './accused-officers';
import ComplaintCategory from './complaint-category';
import Attachments from './attachments';
import InvestigationTimeline from './investigation-timeline';
import Investigator from './investigator';
import PoliceWitness from './police-witness';
import Location from './location';
import style from './complaint-page.sass';


export default class ComplaintPage extends Component {
  componentDidMount() {
    const { complaint, requestComplaint, complaintId } = this.props;
    if (!complaint) {
      requestComplaint(complaintId);
    }
  }

  render() {
    const { complaint, complaintId } = this.props;

    if (!complaint) {
      return null;
    }

    return (
      <StickyContainer className={ style.complaintPage }>
        <Sticky><Header /></Sticky>
        <div className='complaint-page-body'>
          <ComplaintCategory
            category={ complaint.category }
            subcategory={ complaint.subcategory }
          />
          <AccusedOfficers officers={ complaint.coaccused } />
          <div className='complaint-info'>
            <Victim victims={ complaint.victims } />
            <Complainant complainants={ complaint.complainants } />
            <Summary summary={ complaint.summary } />
            <Attachments attachments={ complaint.attachments } complaintId={ complaintId }/>
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
      </StickyContainer>
    );
  }
}

ComplaintPage.propTypes = {
  requestComplaint: PropTypes.func,
  complaintId: PropTypes.string,
  complaint: PropTypes.object
};

ComplaintPage.defaultProps = {
  requestComplaint: () => {}
};
