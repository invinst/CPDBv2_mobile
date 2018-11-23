import React, { PropTypes, Component } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import { isEmpty, noop } from 'lodash';
import classnames from 'classnames';
import pluralize from 'pluralize';

import { scrollToTop } from 'utils/navigation-util';
import Header from 'components/shared/header';
import LoadingPage from 'components/shared/loading-page';
import BottomPadding from 'components/shared/bottom-padding';
import NotMatchedOfficerPage from './not-matched-officer-page';
import SectionRow from './section-row';
import style from './officer-page.sass';
import AnimatedRadarChart from './radar-chart';
import MetricWidget from './metric-widget';
import { roundedPercentile } from 'utils/calculation';
import navigationArrow from 'img/disclosure-indicator.svg';
import { DATA_NOT_AVAILABLE } from 'selectors/officer-page';
import { officerUrl } from 'utils/url-util';
import TabbedPaneSection from 'components/officer-page/tabbed-pane-section';
import { TAB_MAP, OFFICER_PAGE_TAB_NAMES } from 'constants/officer-page';
import AppHistory from 'utils/history';


class OfficerPage extends Component {
  constructor(props) {
    super(props);
    this.state = { historicBadgesExpanded: false };

    const { firstParam, secondParam } = props.params;
    const tabName = secondParam || firstParam;
    this.state = {
      currentTab: TAB_MAP[tabName] || OFFICER_PAGE_TAB_NAMES.TIMELINE
    };

    this.toggleHistoricBadges = this.toggleHistoricBadges.bind(this);
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
    if (name && ('/' + location.pathname) !== correctPathName) {
      AppHistory.replace(correctPathName);
    }
  }

  changeTab(tab) {
    if (tab in OFFICER_PAGE_TAB_NAMES)
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
      isTimelineSuccess
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

  toggleHistoricBadges() {
    this.setState({ historicBadgesExpanded: !this.state.historicBadgesExpanded });
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

    const { id, name, demographic, badge, historicBadges, rank, unit, careerDuration } = summary;
    const { historicBadgesExpanded } = this.state;


    return (
      <StickyContainer className={ style.officerSummary }>
        <Sticky><Header /></Sticky>
        <AnimatedRadarChart
          officerId={ id }
          percentileData={ threeCornerPercentile }
          noDataCMSContent={ noDataCMSContent }/>
        <h1 className='officer-name header' onClick={ scrollToTop() }>
          { name }
        </h1>
        <div className='officer-summary-body'>
          <div className='officer-demographic'>{ demographic }</div>
          <SectionRow label='Badge' value={ badge }>
            {
              !isEmpty(historicBadges) &&
              <span className='historic-badges-toggle' onClick={ this.toggleHistoricBadges }>
                Previously
                <img
                  className={ classnames('toggle-arrow', { expanded: historicBadgesExpanded }) }
                  src={ navigationArrow }
                />
              </span>
            }
          </SectionRow>
          {
            !isEmpty(historicBadges) &&
            <div className={ classnames('historic-badges-container', { expanded: historicBadgesExpanded }) }>
              <div className='historic-badges'>
                { historicBadges.join(', ') }
              </div>
            </div>
          }
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
          officerId={ id }
        />
        <BottomPadding />
      </StickyContainer>
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
