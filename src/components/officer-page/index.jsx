import React, { PropTypes, Component } from 'react';
import { isEmpty, noop, clone, reduce, values } from 'lodash';
import pluralize from 'pluralize';

import { scrollToTop } from 'utils/navigation-util';
import LoadingPage from 'components/shared/loading-page';
import BottomPadding from 'components/shared/bottom-padding';
import NotMatchedOfficerPage from './not-matched-officer-page';
import SectionRow from './section-row';
import style from './officer-page.sass';
import AnimatedRadarChart from './radar-chart';
import MetricWidget from './metric-widget';
import { roundedPercentile } from 'utils/calculation';
import { DATA_NOT_AVAILABLE } from 'selectors/officer-page';
import { officerUrl } from 'utils/url-util';
import TabbedPaneSection from 'components/officer-page/tabbed-pane-section';
import { TAB_MAP, OFFICER_PAGE_TAB_NAMES } from 'constants/officer-page';
import AppHistory from 'utils/history';
import Footer from 'components/footer';
import WithHeader from 'components/shared/header';


class OfficerPage extends Component {
  constructor(props) {
    super(props);
    const { firstParam, secondParam } = props.params;
    const tabName = secondParam || firstParam;
    this.state = {
      currentTab: TAB_MAP[tabName] || OFFICER_PAGE_TAB_NAMES.TIMELINE,
    };

    this.changeTab = this.changeTab.bind(this);
  }

  componentDidMount() {
    this._fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.requestOfficerId !== this.props.requestOfficerId) {
      this._fetchData();
    }

    const { summary, location } = this.props;
    if (!summary) {
      return;
    }
    const name = summary.name;
    const correctPathName = officerUrl(summary.id, name, this.state.currentTab);
    if (name && (location.pathname !== correctPathName)) {
      AppHistory.replace(correctPathName);
    }
  }

  changeTab(tab) {
    if (values(OFFICER_PAGE_TAB_NAMES).includes(tab))
      this.setState({ currentTab: tab });
  }

  _fetchData() {
    const {
      summary,
      requestOfficerId,
      fetchOfficer,
      requestCMS,
      hasCMS,
      getOfficerCoaccusals,
      getOfficerTimeline,
      isCoaccusalSuccess,
      isTimelineSuccess,
    } = this.props;

    if (!requestOfficerId) {
      return;
    }

    if (!summary) {
      fetchOfficer(requestOfficerId);
    }
    hasCMS || requestCMS();

    if (!isTimelineSuccess) {
      getOfficerTimeline(requestOfficerId);
    }

    if (!isCoaccusalSuccess) {
      getOfficerCoaccusals(requestOfficerId);
    }
  }

  badges() {
    const { badge, historicBadges } = this.props.summary;
    let allBadges = clone(historicBadges) || [];
    if (badge)
      allBadges.unshift(<span className='current-badge'>{ badge }</span>);

    if (isEmpty(allBadges))
      allBadges.unshift('Unknown');

    return (
      <span>
        { reduce(allBadges, (prev, curr) => [prev, ', ', curr]) }
      </span>
    );
  }

  getMetricWidgetData() {
    const {
      allegationCount,
      allegationPercentile,
      sustainedCount,
      disciplineCount,
      trrCount,
      trrPercentile,
      civilianComplimentCount,
      honorableMentionCount,
      majorAwardCount,
      honorableMentionPercentile,
    } = this.props.metrics;

    return [
      {
        name: pluralize('Allegation', allegationCount),
        value: allegationCount,
        description: (allegationPercentile !== DATA_NOT_AVAILABLE) ?
          `More than ${roundedPercentile(allegationPercentile)}% of other officers`
          : null,
      },
      {
        name: 'Sustained',
        value: sustainedCount,
        isHighlight: true,
        description: (disciplineCount !== DATA_NOT_AVAILABLE) ? `${disciplineCount} Disciplined`: null,
      },
      {
        name: `Use of Force ${pluralize('Report', trrCount)}`,
        value: trrCount,
        description: (trrPercentile !== DATA_NOT_AVAILABLE) ?
          `More than ${roundedPercentile(trrPercentile)}% of other officers`
          : null,
      },
      {
        name: <span>Civilian<br/>{ pluralize('Compliment', civilianComplimentCount) }</span>,
        value: civilianComplimentCount,
      },
      {
        name: `Major ${pluralize('Award', majorAwardCount)}`,
        value: majorAwardCount,
      },
      {
        name: `Honorable ${pluralize('Mention', honorableMentionCount)}`,
        value: honorableMentionCount,
        description: (honorableMentionPercentile !== DATA_NOT_AVAILABLE) ?
          `More than ${roundedPercentile(honorableMentionPercentile)}% of other officers`
          : null,
      },
    ];
  }

  render() {
    const {
      loading,
      found,
      summary,
      requestOfficerId,
      threeCornerPercentile,
      metrics,
      noDataCMSContent,
      hasCoaccusal,
      hasAttachment,
      hasMapMarker,
    } = this.props;

    if (loading) {
      return (
        <LoadingPage />
      );
    }

    if (!found || !summary || !metrics) {
      return (
        <NotMatchedOfficerPage id={ requestOfficerId } />
      );
    }

    const { id, name, demographic, rank, unit, careerDuration } = summary;

    return (
      <WithHeader className={ style.officerSummary }>
        <AnimatedRadarChart
          officerId={ id }
          percentileData={ threeCornerPercentile }
          noDataCMSContent={ noDataCMSContent }/>
        <h1 className='officer-name header' onClick={ scrollToTop() }>
          { name }
        </h1>
        <div className='officer-summary-body'>
          <div className='officer-demographic'>{ demographic }</div>
          <SectionRow label='Badge' value={ this.badges() } />
          <SectionRow label='Rank' value={ rank } />
          <SectionRow label='Unit' value={ unit } />
          <SectionRow label='Career' value={ careerDuration }/>
        </div>
        { this.props.metrics && <MetricWidget metrics={ this.getMetricWidgetData() }/> }
        <TabbedPaneSection
          changeOfficerTab={ this.changeTab }
          currentTab={ this.state.currentTab }
          hasCoaccusal={ hasCoaccusal }
          hasAttachment={ hasAttachment }
          hasMapMarker={ hasMapMarker }
          officerId={ id }
        />
        <BottomPadding />
        <Footer />
      </WithHeader>
    );
  }
}

OfficerPage.propTypes = {
  requestOfficerId: PropTypes.number,
  fetchOfficer: PropTypes.func,
  requestCMS: PropTypes.func,
  loading: PropTypes.bool,
  found: PropTypes.bool,
  summary: PropTypes.object,
  metrics: PropTypes.object,
  children: PropTypes.object,
  threeCornerPercentile: PropTypes.array,
  noDataCMSContent: PropTypes.object,
  hasCMS: PropTypes.bool,
  requestLandingPage: PropTypes.func,
  location: PropTypes.object,
  params: PropTypes.object,
  hasCoaccusal: PropTypes.bool,
  hasAttachment: PropTypes.bool,
  hasMapMarker: PropTypes.bool,
  getOfficerCoaccusals: PropTypes.func,
  getOfficerTimeline: PropTypes.func,
  isTimelineSuccess: PropTypes.bool,
  isCoaccusalSuccess: PropTypes.bool,
};

OfficerPage.defaultProps = {
  requestCMS: noop,
  location: {},
  params: {},
  fetchOfficer: noop,
  requestLandingPage: noop,
  getOfficerCoaccusals: noop,
  getOfficerTimeline: noop,
};

export default OfficerPage;
