import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import constants from 'constants';
import BottomPadding from 'components/shared/bottom-padding';
import TopOfficersByAllegation from 'containers/landing-page/top-officers-by-allegation';
import RecentActivities from 'containers/landing-page/recent-activities';
import NewDocumentAllegations from 'containers/landing-page/new-document-allegations';
import ComplaintSummaries from 'containers/landing-page/complaint-summaries';
import style from './landing-page.sass';


export default class LandingPage extends Component {

  componentDidMount() {
    this.props.requestCMS();
  }

  render() {
    return (
      <div className={ style.landingPage }>
        <div className='full-height-wrapper'>
          <div className='title'>Citizens Police Data Project</div>
          <Link className='search-bar' to={ constants.SEARCH_PATH }>
            Search
          </Link>
        </div>
        <TopOfficersByAllegation />
        <RecentActivities />
        <NewDocumentAllegations />
        <ComplaintSummaries />
        <BottomPadding />
      </div>
    );
  }
}

LandingPage.defaultProps = {
  requestCMS: () => {}
};

LandingPage.propTypes = {
  requestCMS: PropTypes.func
};
