import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import constants from 'constants';
import CMSContent from 'components/landing-page/cms-content';
import BottomPadding from 'components/shared/bottom-padding';
import TopOfficersByAllegation from 'containers/landing-page/top-officers-by-allegation';
import RecentActivities from 'containers/landing-page/recent-activities';
import NewDocumentAllegations from 'containers/landing-page/new-document-allegations';
import ComplaintSummaries from 'containers/landing-page/complaint-summaries';
import magnifyingGlassIcon from 'img/ic-magnifying-glass.svg';
import style from './landing-page.sass';


export default class LandingPage extends Component {
  componentDidMount() {
    const {
      requestCMS, pushBreadcrumbs, location, routes, params, cmsRequested
    } = this.props;
    pushBreadcrumbs({ location, routes, params });

    cmsRequested || requestCMS();
  }

  componentWillReceiveProps(nextProps) {
    const { location, params, routes, pushBreadcrumbs } = nextProps;
    if (location !== this.props.location) {
      pushBreadcrumbs({ location, params, routes });
    }
  }

  render() {
    const { title, description } = this.props;

    return (
      <div className={ style.landingPage }>
        <div className='full-height-wrapper'>
          <CMSContent className='site-title' content={ title } />
          <CMSContent className='site-desc' content={ description } />
          <Link className='search-bar' to={ constants.SEARCH_PATH }>
            <img src={ magnifyingGlassIcon } />Search by officer name/badge or date
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
  requestCMS: () => {},
  pushBreadcrumbs: () => {}
};

LandingPage.propTypes = {
  pushBreadcrumbs: PropTypes.func,
  requestCMS: PropTypes.func,
  cmsRequested: PropTypes.bool,
  title: PropTypes.object,
  description: PropTypes.object,
  location: PropTypes.object,
  params: PropTypes.object,
  routes: PropTypes.array,
};
