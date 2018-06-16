import React, { PropTypes, Component } from 'react';
import { Sticky, StickyContainer } from 'react-sticky';
import InfiniteScroll from 'react-infinite-scroller';

import GaUtil from 'utils/GaUtil';
import { scrollToTop } from 'utils/NavigationUtil';
import LoadingPage from 'components/shared/loading-page';
import NavbarContainer from 'containers/navbar-container';
import BottomPadding from 'components/shared/bottom-padding';
import constants from 'constants';

import NotMatchedOfficerPage from '../not-matched-officer-page';
import OfficerTopLinks from '../officer-top-links';
import YearlyStats from './yearly-stats';
import CRItem from './cr-item';
import SimpleEventItem from './simple-event-item';
import style from './officer-timeline.sass';


class OfficerTimeline extends Component {
  componentDidMount() {
    const { timeline, getOfficerTimeline, summary, getOfficerSummary, pk } = this.props;

    if (!timeline) {
      getOfficerTimeline(pk);
    }
    if (!summary) {
      getOfficerSummary(pk);
    }

    GaUtil.track('event', 'officer', 'view_detail', window.location.pathname);
  }

  renderHeader() {
    const { summary } = this.props;

    return (
      <Sticky>
        <h1 className='sheet-header header' onClick={ scrollToTop() }>
          { summary ? summary.name : '' }
        </h1>
      </Sticky>
    );
  }

  renderTimelineBody() {
    const { loading, timeline, pk } = this.props;
    if (loading || !timeline) {
      return (
        <LoadingPage />
      );
    }

    const lastIndex = timeline.results.length - 1;
    const timelineResults = timeline.results.map((result, index) => {
      let item = null;
      if (result.kind === 'CR') {
        item = (
          <CRItem
            result={ result }
            officerId={ pk }
          />
        );
      } else if (result.kind === 'UNIT_CHANGE') {
        item = (
          <SimpleEventItem
            date={ result['date'] }
            title='Unit Change'
            content={ `Assigned to Unit ${result['unit_name']}` }
          />
        );
      } else if (result.kind === 'YEAR') {
        item = (
          <YearlyStats
            year={ result.year }
            crCount={ result.crs }
            trrCount={ result.trrs }
            salary={ result.salary }
          />
        );
      } else if (result.kind === 'JOINED') {
        item = (
          <SimpleEventItem
            date={ result['date'] }
            title='Joined CPD'
          />
        );
      }

      return (
        <div key={ index }>
          <div className={ index === lastIndex ? 'last-item' : null }>
            { item }
          </div>
        </div>
      );
    });

    return (
      <div>
        { timelineResults }
      </div>
    );
  }

  render() {
    const { found, pk, hasMore, timeline, getMoreOfficerTimeline } = this.props;

    if (!found) {
      return (
        <NotMatchedOfficerPage id={ pk } three={ 3 } />
      );
    }

    const header = this.renderHeader();
    const body = this.renderTimelineBody();

    return (
      <StickyContainer className={ style.officerTimeline }>
        <NavbarContainer backLink={ constants.SEARCH_PATH } />
        { header }
        <InfiniteScroll
          hasMore={ hasMore }
          loadMore={ () => getMoreOfficerTimeline(pk, timeline.next) }
          useWindow={ true }
        >
          <OfficerTopLinks id={ pk } currentPath='timeline' />
          <div className='officer-timeline-body'>
            { body }
          </div>
          <BottomPadding />
        </InfiniteScroll>
      </StickyContainer>
    );
  }
}

OfficerTimeline.propTypes = {
  pk: PropTypes.number,
  getOfficerTimeline: PropTypes.func.isRequired,
  getMoreOfficerTimeline: PropTypes.func.isRequired,
  getOfficerSummary: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  found: PropTypes.bool,
  hasMore: PropTypes.bool,
  timeline: PropTypes.object,
  summary: PropTypes.object,
  children: PropTypes.object
};

export default OfficerTimeline;
