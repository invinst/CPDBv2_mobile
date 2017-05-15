import React, { Component, PropTypes } from 'react';
import { Sticky } from 'react-sticky';
import { find } from 'lodash';

import { scrollToTop } from 'utils/NavigationUtil';
import style from 'styles/ComplaintPage.sass';
import PeopleList from 'components/ComplaintPage/PeopleList';
import Outcome from 'components/ComplaintPage/Outcome';
import InvestigationTimeline from 'components/ComplaintPage/InvestigationTimeline';
import Complainants from 'components/ComplaintPage/Complainants';
import Involvements from 'components/ComplaintPage/Involvements';
import IncidentLocation from 'components/ComplaintPage/IncidentLocation';
import ComplaintCategory from 'components/ComplaintPage/ComplaintCategory';
import Attachment from 'components/ComplaintPage/Attachment';
import constants from 'constants';


export default class ComplaintPage extends Component {
  componentDidMount() {
    const { complaint, requestComplaint, complaintId } = this.props;
    if (!complaint) {
      requestComplaint(complaintId);
    }
  }

  getActiveCoaccused() {
    const { complaint, coaccusedId } = this.props;

    return find(complaint.coaccused, c => c.id === coaccusedId);
  }

  render() {
    const { complaint } = this.props;

    if (!complaint) {
      return null;
    }

    const activeCoaccused = this.getActiveCoaccused();

    return (
      <div className={ style.complaintPage }>
        <Sticky className='complaint-header'>
          <div onClick={ scrollToTop() } className='sheet-header header'>
            CR { complaint.crid }
            <span className='subheader'>{ complaint.coaccused.length } coaccused</span>
          </div>
          <PeopleList
            title='Accused'
            people={ [{
              content: activeCoaccused.fullName,
              subcontent: activeCoaccused.gender + ', ' + activeCoaccused.race,
              url: `${constants.OFFICER_PATH}${activeCoaccused.id}/`
            }] }
          />
        </Sticky>
        <div>

          <ComplaintCategory
            category={ activeCoaccused.category }
            subcategory={ activeCoaccused.subcategory }
          />
          <Complainants complainants={ complaint.complainants } />

          <Outcome
            finalFinding={ activeCoaccused.finalFinding }
            recommended={ activeCoaccused.reccOutcome }
            finalOutcome={ activeCoaccused.finalOutcome }
          />

          <InvestigationTimeline
            incidentDate={ complaint.incidentDate }
            startDate={ activeCoaccused.startDate }
            endDate={ activeCoaccused.endDate }
          />

          <IncidentLocation
            address={ complaint.address }
            point={ complaint.point }
            beat={ complaint.beat }
            location={ complaint.location }
          />

          <Involvements involvements={ complaint.involvements } />

          <Attachment
            title='Documents'
            notAvailableMessage='There are no documents publicly available for this incident at this time.'
          />

          <Attachment
            title='Audio'
            notAvailableMessage='There are no audio clips publicly available for this incident at this time.'
          />

          <Attachment
            title='Video'
            notAvailableMessage='There are no video clips publicly available for this incident at this time.'
          />

        </div>
      </div>
    );
  }
}

ComplaintPage.propTypes = {
  requestComplaint: PropTypes.func,
  complaintId: PropTypes.number,
  coaccusedId: PropTypes.number,
  complaint: PropTypes.object
};
