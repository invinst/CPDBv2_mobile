import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { SEARCH_PATH } from 'constants/paths';
import CMSContent from 'components/common/cms-content';
import BottomPadding from 'components/shared/bottom-padding';
import TopOfficersByAllegation from 'containers/landing-page/top-officers-by-allegation';
import RecentActivities from 'containers/landing-page/recent-activities';
import NewDocumentAllegations from 'containers/landing-page/new-document-allegations';
import ComplaintSummaries from 'containers/landing-page/complaint-summaries';
import style from './landing-page.sass';
import Footer from 'components/footer';


export default class LandingPage extends Component {
  componentDidMount() {
    const {
      requestCMS, cmsRequested,
    } = this.props;

    cmsRequested || requestCMS();
  }

  render() {
    const { title, description } = this.props;

    return (
      <React.Fragment>
        <Helmet>
          <title>CPDP</title>
        </Helmet>
        <div className={ style.landingPage }>
          <div className='full-height-wrapper'>
            <CMSContent className='site-title' content={ title } />
            <CMSContent className='site-desc' content={ description } />
            <Link className='search-bar' to={ SEARCH_PATH }>
              <img src='/img/ic-magnifying-glass.svg' />Officer name, badge number or date
            </Link>
          </div>
          <TopOfficersByAllegation />
          <RecentActivities />
          <NewDocumentAllegations />
          <ComplaintSummaries />
          <BottomPadding />
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

LandingPage.defaultProps = {
  requestCMS: () => {},
  pushBreadcrumbs: () => {},
};

LandingPage.propTypes = {
  requestCMS: PropTypes.func,
  cmsRequested: PropTypes.bool,
  title: PropTypes.object,
  description: PropTypes.object,
};
