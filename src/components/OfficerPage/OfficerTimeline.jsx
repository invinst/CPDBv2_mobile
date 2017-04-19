import React, { PropTypes, Component } from 'react';
import { Sticky } from 'react-sticky';
import InfiniteScroll from 'react-infinite-scroller';

import GaUtil from 'utils/GaUtil';
import LoadingPage from 'components/Shared/LoadingPage';
import NotMatchedOfficerPage from 'components/OfficerPage/NotMatchedOfficerPage';
import OfficerTopLinks from 'components/OfficerPage/OfficerTopLinks';
import YearlyStats from 'components/OfficerPage/OfficerTimeline/YearlyStats';
import CRItem from 'components/OfficerPage/OfficerTimeline/CRItem';
import UnitChangeItem from 'components/OfficerPage/OfficerTimeline/UnitChangeItem';
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
        <div className={ style.verticalLine }></div>
      </div>
    );
  }

  renderTimelineBody() {
    const { loading, timeline } = this.props;
    if (loading || !timeline) {
      return (
        <LoadingPage />
      );
    }

    const timelineResults = timeline.results.map((result, index) => {
      // TODO implement more timeline item types
      if (result.kind === 'CR') {
        return (
          <div key={ index }>
            { this.renderDivider() }
            <CRItem
              result={ result }
            />
          </div>
        );
      } else if (result.kind === 'UNIT_CHANGE') {
        return (
          <div key={ index }>
            { this.renderDivider() }
            <UnitChangeItem
              date={ result['date'] }
              unitName={ result['unit_name'] }
            />
          </div>
        );
      }
    });

    return (
      <div>
        { this.renderDivider() }
        <YearlyStats
          year={ 2017 }
          crCount={ 0 }
          trrCount={ 0 }
          salary='N/A'
          />
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
