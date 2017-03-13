import React, { PropTypes, Component } from 'react';

import GaUtil from 'utils/GaUtil';
import LoadingPage from 'components/Shared/LoadingPage';
import NotMatchedOfficerPage from 'components/OfficerPage/NotMatchedOfficerPage';
import OfficerTopLinks from 'components/OfficerPage/OfficerTopLinks';
import { scrollToTop } from 'utils/NavigationUtil';

import style from 'styles/OfficerPage.sass';


class OfficerTimeline extends Component {
  componentDidMount() {
    const { timeline, getOfficerTimeline, summary, getOfficerSummary, pk } = this.props;
    if (!timeline) {
      getOfficerTimeline(pk);
    }
    if (!summary) {
      getOfficerSummary(pk);
    }

    GaUtil.track('event', 'officer', 'view_detail', location.pathname);
  }


  render() {
    const { loading, found, timeline, summary, pk } = this.props;

    if (loading || !timeline) {
      return (
        <LoadingPage />
      );
    }

    if (!found) {
      return (
        <NotMatchedOfficerPage id={ pk } />
      );
    }

    return (
      <div className={ style.officerPage }>
        <h1 className='sheet-header header' onClick={ scrollToTop }>
          { summary.name }
        </h1>
        <OfficerTopLinks id={ pk } currentPath='timeline' />
      </div>
    );
  }
}

OfficerTimeline.propTypes = {
  pk: PropTypes.number,
  getOfficerTimeline: PropTypes.func.isRequired,
  getOfficerSummary: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  found: PropTypes.bool,
  timeline: PropTypes.object,
  summary: PropTypes.object,
  children: PropTypes.object
};

export default OfficerTimeline;
