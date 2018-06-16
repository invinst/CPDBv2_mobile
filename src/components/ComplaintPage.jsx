import React, { Component, PropTypes } from 'react';
import { Sticky, StickyContainer } from 'react-sticky';
import { find } from 'lodash';
import cx from 'classnames';
import ReactHeight from 'react-height';

import { scrollToTop } from 'utils/NavigationUtil';
import style from 'styles/ComplaintPage.sass';
import Arrow from 'components/shared/arrow';
import BottomPadding from 'components/shared/bottom-padding';
import PeopleList from 'components/ComplaintPage/PeopleList';
import Outcome from 'components/ComplaintPage/Outcome';
import InvestigationTimeline from 'components/ComplaintPage/InvestigationTimeline';
import Complainants from 'components/ComplaintPage/Complainants';
import Involvements from 'components/ComplaintPage/Involvements';
import IncidentLocation from 'components/ComplaintPage/IncidentLocation';
import ComplaintCategory from 'components/ComplaintPage/ComplaintCategory';
import Attachment from 'components/ComplaintPage/Attachment';
import CoaccusedDropdown from 'components/ComplaintPage/CoaccusedDropdown';
import NavbarContainer from 'containers/navbar-container';
import constants from 'constants';


export default class ComplaintPage extends Component {

  constructor(props) {
    super(props);
    this.updateHeaderHeight = this.updateHeaderHeight.bind(this);
    this.toggleCoaccused = this.toggleCoaccused.bind(this);
    this.state = {
      coaccusedIsExpanded: false,
      headerHeight: 0
    };
  }

  componentDidMount() {
    const { complaint, requestComplaint, complaintId } = this.props;
    if (!complaint) {
      requestComplaint(complaintId);
    }
  }

  toggleCoaccused() {
    this.setState({
      coaccusedIsExpanded: !this.state.coaccusedIsExpanded
    });
  }

  getActiveCoaccused() {
    const { complaint, coaccusedId } = this.props;

    return find(complaint.coaccused, c => c.id === coaccusedId);
  }

  updateHeaderHeight(height) {
    this.setState({
      headerHeight: height
    });
  }

  render() {
    const { complaint } = this.props;

    if (!complaint) {
      return null;
    }

    const activeCoaccused = this.getActiveCoaccused();

    return (
      <StickyContainer className={ style.complaintPage }>
        <NavbarContainer backLink={ constants.SEARCH_PATH } />
        <Sticky className='complaint-header'>
          <ReactHeight className='relative' onHeightReady={ this.updateHeaderHeight }>
            <div className={ cx('sheet-header header', { expanded: this.state.coaccusedIsExpanded }) }>
              <span onClick={ scrollToTop() }>CR { complaint.crid }</span>
              <span onClick={ this.toggleCoaccused } className='subheader'>
                <span className='coaccused-text'>{ complaint.coaccused.length } coaccused</span>
                <Arrow direction={ this.state.coaccusedIsExpanded ? 'up' : 'down' } />
              </span>
            </div>
          </ReactHeight>

          <CoaccusedDropdown
            complaintId={ complaint.crid }
            activeCoaccusedId={ activeCoaccused.id }
            coaccused={ complaint.coaccused }
            isExpanded={ this.state.coaccusedIsExpanded }
            headerHeight={ this.state.headerHeight }
          />
        </Sticky>
        <div className='complaint-page-body'>

          <ComplaintCategory
            category={ activeCoaccused.category }
            subcategory={ activeCoaccused.subcategory }
          />

          <PeopleList
            title='Accused Officer'
            people={ [{
              content: activeCoaccused.fullName,
              subcontent: activeCoaccused.badge ? `Badge ${activeCoaccused.badge}` : '',
              url: `${constants.OFFICER_PATH}${activeCoaccused.id}/`
            }] }
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

          <a className='attachment-request-link'>Request Documents</a>

          <Attachment
            title='Audio'
            notAvailableMessage='There are no audio clips publicly available for this incident at this time.'
          />

          <Attachment
            title='Video'
            notAvailableMessage='There are no video clips publicly available for this incident at this time.'
          />

        </div>
        <BottomPadding />
      </StickyContainer>
    );
  }
}

ComplaintPage.propTypes = {
  requestComplaint: PropTypes.func,
  complaintId: PropTypes.number,
  coaccusedId: PropTypes.number,
  complaint: PropTypes.object
};
