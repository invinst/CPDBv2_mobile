import React, { PropTypes, Component } from 'react';
import { Sticky } from 'react-sticky';
import InfiniteScroll from 'react-infinite-scroller';

import GaUtil from 'utils/GaUtil';
import LoadingPage from 'components/Shared/LoadingPage';
import NotMatchedOfficerPage from 'components/OfficerPage/NotMatchedOfficerPage';
import OfficerTopLinks from 'components/OfficerPage/OfficerTopLinks';
import YearlyStats from 'components/OfficerPage/OfficerTimeline/YearlyStats';
import CRItem from 'components/OfficerPage/OfficerTimeline/CRItem';
import SimpleEventItem from 'components/OfficerPage/OfficerTimeline/SimpleEventItem';
import { scrollToTop } from 'utils/NavigationUtil';

import style from 'styles/OfficerPage/OfficerTimeline.sass';


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

  renderDivider() {
    return (
      <div className={ style.divider }>
      </div>
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
          { this.renderDivider() }
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
      <div className={ style.officerTimeline }>
        { header }
        <InfiniteScroll
          hasMore={ hasMore }
          loadMore={ () => getMoreOfficerTimeline(pk, timeline.next) }
          useWindow={ true }
        >
          <OfficerTopLinks id={ pk } currentPath='timeline' />
          <div className='officer-timeline-body'>
            { body }
            <div className='vertical-line'></div>
          </div>
        </InfiniteScroll>
      </div>
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
