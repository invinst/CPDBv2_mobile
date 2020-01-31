import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import { cloneDeep } from 'lodash';
import configureStore from 'redux-mock-store';
import should from 'should';
import DocumentMeta from 'react-document-meta';

import WithHeader from 'components/shared/with-header';
import OfficerPage from 'components/officer-page';
import OfficerPageContainer from 'containers/officer-page-container';
import OfficerRadarChart from 'components/officer-page/radar-chart';
import LoadingPage from 'components/shared/loading-page';
import NotMatchedOfficerPage from 'components/officer-page/not-matched-officer-page';
import AnimatedRadarChart from 'components/officer-page/radar-chart';
import SectionRow from 'components/officer-page/section-row';
import MetricWidget from 'components/officer-page/metric-widget';
import TabbedPaneSection from 'components/officer-page/tabbed-pane-section';
import { OFFICER_PAGE_TAB_NAMES } from 'constants/officer-page';
import Footer from 'components/footer';


const mockStore = configureStore();

describe('<OfficerPage />', function () {
  beforeEach(function () {
    this.summary = {
      id: 123,
      name: 'Officer 11',
      unit: 'Unit 001 - description',
      demographic: '26 years old, race, male.',
      badge: 'badge',
      historicBadges: ['1', '2'],
      careerDuration: 'SEP 23, 2015—Present',
      rank: 'Police Officer',
    };

    this.metrics = {
      allegationCount: 1,
      allegationPercentile: 4.000,
      honorableMentionCount: 3,
      honorableMentionPercentile: 3.000,
      sustainedCount: 4,
      disciplineCount: 5,
      trrCount: 7,
      majorAwardCount: 5,
      trrPercentile: 9.0,
      civilianComplimentCount: 10,
    };
  });

  it('should render LoadingPage if loading', function () {
    const wrapper = shallow(
      <OfficerPage loading={ true } found={ false }/>
    );
    wrapper.find(LoadingPage).should.have.length(1);
  });

  it('should render NotMatchedOfficerPage if not found', function () {
    const wrapper = shallow(
      <OfficerPage
        loading={ false }
        found={ false }
      />
    );
    wrapper.find(NotMatchedOfficerPage).should.have.length(1);
  });

  it('should resetTimelineFilter when mounted', function () {
    const resetTimelineFilter = spy();
    mount(
      <OfficerPage loading={ true } found={ false } resetTimelineFilter={ resetTimelineFilter }/>
    );

    resetTimelineFilter.should.be.calledOnce();
  });

  it('should resetTimelineFilter when update with new requestOfficerId', function () {
    const resetTimelineFilter = spy();
    const wrapper = mount(
      <OfficerPage
        requestOfficerId={ 1 }
        loading={ false }
        found={ true }
        resetTimelineFilter={ resetTimelineFilter }
      />
    );

    resetTimelineFilter.should.be.calledOnce();
    resetTimelineFilter.resetHistory();

    wrapper.setProps({ requestOfficerId: 2 });

    resetTimelineFilter.should.be.calledOnce();
  });

  it('should set to the correct officer if there is officer alias', function () {
    const pushBreadcrumbSpy = spy();
    const wrapper = shallow(
      <OfficerPage
        loading={ false }
        found={ false }
        pushBreadcrumbs={ pushBreadcrumbSpy }
      />
    );

    wrapper.setProps({
      requestOfficerId: 456,
      summary: { id: 123 },
      routes: [],
      location: {},
      params: {},
    });

    pushBreadcrumbSpy.calledWith({ routes: [], location: { pathname: 'officer/123/' }, params: { id: 123 } });
  });

  it('should not fetch officer data if summary is already available', function () {
    const spyfetchOfficer = spy();

    const wrapper = shallow(
      <OfficerPage
        loading={ false }
        found={ true }
        fetchOfficer={ spyfetchOfficer }
        summary={ this.summary }
      />
    );

    wrapper.instance().componentDidMount();
    spyfetchOfficer.should.not.be.called();
  });

  it('should not fetch officer data if officer id is empty', function () {
    const spyfetchOfficer = spy();
    const spyGetOfficerTimeline = spy();
    const spyGetOfficerCoaccusals = spy();

    const wrapper = shallow(
      <OfficerPage
        requestOfficerId={ null }
        loading={ false }
        found={ true }
        fetchOfficer={ spyfetchOfficer }
        getOfficerTimeline={ spyGetOfficerTimeline }
        getOfficerCoaccusals={ spyGetOfficerCoaccusals }
      />
    );

    wrapper.instance().componentDidMount();
    spyfetchOfficer.called.should.be.false();
    spyGetOfficerTimeline.called.should.be.false();
    spyGetOfficerCoaccusals.called.should.be.false();
  });

  it('should fetch officer data if summary is not available', function () {
    const spyfetchOfficer = spy();

    const wrapper = shallow(
      <OfficerPage
        requestOfficerId={ 123 }
        loading={ false }
        found={ false }
        fetchOfficer={ spyfetchOfficer }
        summary={ null }
      />
    );

    wrapper.instance().componentDidMount();
    spyfetchOfficer.calledWith(123).should.be.true();
  });

  describe('Path name', function () {
    beforeEach(function () {
      spy(window.history, 'replaceState');
    });

    afterEach(function () {
      window.history.replaceState.restore();
    });

    it('should be replaced with correct one', function () {
      const wrapper = shallow(
        <OfficerPage
          requestOfficerId={ 123 }
          loading={ false }
          found={ true }
          metrics={ this.metrics }
        />,
        { lifecycleExperimental: true }
      );

      wrapper.setProps({ summary: null });
      window.history.replaceState.should.not.be.called();
      window.history.replaceState.resetHistory();

      wrapper.setProps({ summary: this.summary });

      window.history.replaceState.should.be.called();
      const args = window.history.replaceState.getCall(0).args;
      args[2].should.equal('/officer/123/officer-11/');
    });

    it('should be corrected if there is officer alias', function () {
      const wrapper = shallow(
        <OfficerPage
          requestOfficerId={ 456 }
          loading={ false }
          found={ true }
        />,
        { lifecycleExperimental: true }
      );

      wrapper.setProps({ summary: this.summary });

      window.history.replaceState.should.be.called();
      const args = window.history.replaceState.getCall(0).args;
      args[2].should.equal('/officer/123/officer-11/');
    });

    it('should be corrected in case secondParam is a valid tab name', function () {
      const wrapper = shallow(
        <OfficerPage
          requestOfficerId={ 123 }
          loading={ false }
          found={ true }
          metrics={ this.metrics }
          params={ { firstParam: '3213', secondParam: 'documents' } }
        />,
        { lifecycleExperimental: true }
      );
      wrapper.setProps({ summary: this.summary });

      const tabbedPaneSection = wrapper.find(TabbedPaneSection);
      tabbedPaneSection.prop('currentTab').should.eql(OFFICER_PAGE_TAB_NAMES.ATTACHMENTS);

      window.history.replaceState.should.be.called();
      const args = window.history.replaceState.getCall(0).args;
      args[2].should.equal('/officer/123/officer-11/documents/');
    });

    it('should be corrected in case secondParam is an invalid tab name', function () {
      const wrapper = shallow(
        <OfficerPage
          requestOfficerId={ 123 }
          loading={ false }
          found={ true }
          metrics={ this.metrics }
          params={ { firstParam: '', secondParam: 'document' } }
        />,
        { lifecycleExperimental: true }
      );
      wrapper.setProps({ summary: this.summary });

      const tabbedPaneSection = wrapper.find(TabbedPaneSection);
      tabbedPaneSection.prop('currentTab').should.eql(OFFICER_PAGE_TAB_NAMES.TIMELINE);

      window.history.replaceState.should.be.called();
      const args = window.history.replaceState.getCall(0).args;
      args[2].should.equal('/officer/123/officer-11/');
    });

    it('should be corrected in case firstParam is a valid tab name', function () {
      const wrapper = shallow(
        <OfficerPage
          requestOfficerId={ 123 }
          loading={ false }
          found={ true }
          metrics={ this.metrics }
          params={ { firstParam: 'documents', secondParam: '' } }
        />,
        { lifecycleExperimental: true }
      );
      wrapper.setProps({ summary: this.summary });

      const tabbedPaneSection = wrapper.find(TabbedPaneSection);
      tabbedPaneSection.prop('currentTab').should.eql(OFFICER_PAGE_TAB_NAMES.ATTACHMENTS);

      window.history.replaceState.should.be.called();
      const args = window.history.replaceState.getCall(0).args;
      args[2].should.equal('/officer/123/officer-11/documents/');
    });

    it('should be corrected in case firstParam is an invalid tab name', function () {
      const wrapper = shallow(
        <OfficerPage
          requestOfficerId={ 123 }
          loading={ false }
          found={ true }
          metrics={ this.metrics }
          params={ { firstParam: 'document', secondParam: '' } }
        />,
        { lifecycleExperimental: true }
      );
      wrapper.setProps({ summary: this.summary });

      const tabbedPaneSection = wrapper.find(TabbedPaneSection);
      tabbedPaneSection.prop('currentTab').should.eql(OFFICER_PAGE_TAB_NAMES.TIMELINE);

      window.history.replaceState.should.be.called();
      const args = window.history.replaceState.getCall(0).args;
      args[2].should.equal('/officer/123/officer-11/');
    });

    it('should be changed when tab is changed', function () {
      const wrapper = shallow(
        <OfficerPage
          requestOfficerId={ 123 }
          loading={ false }
          found={ true }
          metrics={ this.metrics }
          params={ { firstParam: 'document', secondParam: '' } }
        />,
        { lifecycleExperimental: true }
      );
      wrapper.setProps({ summary: this.summary });

      const tabbedPaneSection = wrapper.find(TabbedPaneSection);
      tabbedPaneSection.prop('currentTab').should.eql(OFFICER_PAGE_TAB_NAMES.TIMELINE);

      window.history.replaceState.should.be.called();
      window.history.replaceState.getCall(0).args[2].should.equal('/officer/123/officer-11/');

      window.history.replaceState.resetHistory();

      const instance = wrapper.instance();
      instance.changeTab(OFFICER_PAGE_TAB_NAMES.COACCUSALS);

      window.history.replaceState.should.be.called();
      window.history.replaceState.getCall(0).args[2].should.equal('/officer/123/officer-11/coaccusals/');

      window.history.replaceState.resetHistory();
      instance.changeTab(OFFICER_PAGE_TAB_NAMES.ATTACHMENTS);

      window.history.replaceState.should.be.called();
      window.history.replaceState.getCall(0).args[2].should.equal('/officer/123/officer-11/documents/');

      window.history.replaceState.resetHistory();
      instance.changeTab('DOCUMENT');

      window.history.replaceState.should.should.not.be.called();
    });
  });

  it('should render Header and Footer', function () {
    const wrapper = shallow(
      <OfficerPage
        loading={ false }
        found={ true }
        summary={ this.summary }
        metrics={ this.metrics }
      />
    );

    const withHeader = wrapper.find(WithHeader);
    withHeader.find(AnimatedRadarChart).exists().should.be.true();
    withHeader.find(Footer).exists().should.be.true();
  });

  it('should have BottomPadding', function () {
    const wrapper = shallow(
      <OfficerPage
        loading={ false }
        found={ true }
        summary={ this.summary }
        metrics={ this.metrics }
      />
    );
    wrapper.find('BottomPadding').exists().should.be.true();
  });

  context('inside container', function () {
    const timeline = {
      data: {
        11: [{
          attachments: [],
          category: 'Illegal Search',
          coaccused: 8,
          crid: '267098',
          date: 'NOV 8',
          finding: 'Not Sustained',
          kind: 'CR',
          outcome: 'No Action Taken',
          unitDescription: 'Mobile Strike Force',
          unitDisplay: ' ',
          unitName: '153',
          year: 2000,
        }],
      },
      isSuccess: {
        11: true,
      },
    };
    const coaccusals = {
      data: {
        11: [{
          'id': 123,
          'full_name': 'Edward May',
          'rank': 'Detective',
          'coaccusal_count': 4,
        }],
      },
      isSuccess: {
        11: true,
      },
    };
    const stateData = {
      breadcrumb: {
        breadcrumbs: [],
      },
      officerPage: {
        officers: {
          isRequesting: false,
          isSuccess: true,
          data: {
            11: {
              'officer_id': 11,
              'full_name': 'Kenneth Wojtan',
              active: true,
              'allegation_count': 104,
              badge: '8548',
              'historic_badges': ['8547', '8546'],
              'birth_year': 1957,
              'civilian_compliment_count': 4,
              'complaint_percentile': 99.895,
              'date_of_appt': '1993-12-13',
              'date_of_resignation': '2017-01-15',
              'discipline_count': 1,
              gender: 'Male',
              'honorable_mention_count': 55,
              'honorable_mention_percentile': 85.87,
              'major_award_count': 0,
              race: 'White',
              rank: 'Police Officer',
              'sustained_count': 1,
              'trr_count': 3,
              unit: {
                'unit_id': 6,
                description: 'District 005',
                'unit_name': '005',
              },
              percentiles: [
                {
                  'officer_id': 1,
                  year: 2006,
                  'percentile_allegation_civilian': '66.251',
                  'percentile_allegation_internal': '0.023',
                  'percentile_trr': '0.049',
                  'percentile_allegation': '41.001',
                },
                {
                  'officer_id': 1,
                  year: 2007,
                  'percentile_allegation_civilian': '75.065',
                  'percentile_allegation_internal': '0.022',
                  'percentile_trr': '0.046',
                  'percentile_allegation': '31.201',
                },
              ],
            },
          },
        },
        timeline: timeline,
        coaccusals: coaccusals,
        cms: [
          {
            type: 'rich_text',
            name: 'triangle_description',
          },
        ],
      },
    };

    const emptyBadgeStateData = {
      breadcrumb: {
        breadcrumbs: [],
      },
      officerPage: {
        officers: {
          isRequesting: false,
          isSuccess: true,
          data: {
            11: {
              'officer_id': 11,
              'full_name': 'Kenneth Wojtan',
              active: true,
              'allegation_count': 104,
              badge: '',
              'historic_badges': ['8547', '8546'],
              'birth_year': 1957,
              'civilian_compliment_count': 4,
              'complaint_percentile': 99.895,
              'date_of_appt': '1993-12-13',
              'date_of_resignation': '2017-01-15',
              'discipline_count': 1,
              gender: 'Male',
              'honorable_mention_count': 55,
              'honorable_mention_percentile': 85.87,
              'major_award_count': 0,
              race: 'White',
              rank: 'Police Officer',
              'sustained_count': 1,
              'trr_count': 3,
              unit: {
                'unit_id': 6,
                description: 'District 005',
                'unit_name': '005',
              },
              percentiles: [
                {
                  'officer_id': 1,
                  year: 2006,
                  'percentile_allegation_civilian': '66.251',
                  'percentile_allegation_internal': '0.023',
                  'percentile_trr': '0.049',
                  'percentile_allegation': '41.001',
                },
                {
                  'officer_id': 1,
                  year: 2007,
                  'percentile_allegation_civilian': '75.065',
                  'percentile_allegation_internal': '0.022',
                  'percentile_trr': '0.046',
                  'percentile_allegation': '31.201',
                },
              ],
            },
          },
        },
        timeline: timeline,
        coaccusals: coaccusals,
        cms: [
          {
            type: 'rich_text',
            name: 'triangle_description',
          },
        ],
      },
    };

    const emptyHistoricBadgeStateData = {
      breadcrumb: {
        breadcrumbs: [],
      },
      officerPage: {
        officers: {
          isRequesting: false,
          isSuccess: true,
          data: {
            11: {
              'officer_id': 11,
              'full_name': 'Kenneth Wojtan',
              active: true,
              'allegation_count': 104,
              badge: '8548',
              'historic_badges': [],
              'birth_year': 1957,
              'civilian_compliment_count': 4,
              'complaint_percentile': 99.895,
              'date_of_appt': '1993-12-13',
              'date_of_resignation': '2017-01-15',
              'discipline_count': 1,
              gender: 'Male',
              'honorable_mention_count': 55,
              'honorable_mention_percentile': 85.87,
              'major_award_count': 0,
              race: 'White',
              rank: 'Police Officer',
              'sustained_count': 1,
              'trr_count': 3,
              unit: {
                'unit_id': 6,
                description: 'District 005',
                'unit_name': '005',
              },
              percentiles: [
                {
                  'officer_id': 1,
                  year: 2006,
                  'percentile_allegation_civilian': '66.251',
                  'percentile_allegation_internal': '0.023',
                  'percentile_trr': '0.049',
                  'percentile_allegation': '41.001',
                },
                {
                  'officer_id': 1,
                  year: 2007,
                  'percentile_allegation_civilian': '75.065',
                  'percentile_allegation_internal': '0.022',
                  'percentile_trr': '0.046',
                  'percentile_allegation': '31.201',
                },
              ],
            },
          },
        },
        timeline: timeline,
        coaccusals: coaccusals,
        cms: [
          {
            type: 'rich_text',
            name: 'triangle_description',
          },
        ],
      },
    };

    const emptyBadgeAndHistoricBadgeStateData = {
      breadcrumb: {
        breadcrumbs: [],
      },
      officerPage: {
        officers: {
          isRequesting: false,
          isSuccess: true,
          data: {
            11: {
              'officer_id': 11,
              'full_name': 'Kenneth Wojtan',
              active: true,
              'allegation_count': 104,
              badge: '',
              'historic_badges': [],
              'birth_year': 1957,
              'civilian_compliment_count': 4,
              'complaint_percentile': 99.895,
              'date_of_appt': '1993-12-13',
              'date_of_resignation': '2017-01-15',
              'discipline_count': 1,
              gender: 'Male',
              'honorable_mention_count': 55,
              'honorable_mention_percentile': 85.87,
              'major_award_count': 0,
              race: 'White',
              rank: 'Police Officer',
              'sustained_count': 1,
              'trr_count': 3,
              unit: {
                'unit_id': 6,
                description: 'District 005',
                'unit_name': '005',
              },
              percentiles: [
                {
                  'officer_id': 1,
                  year: 2006,
                  'percentile_allegation_civilian': '66.251',
                  'percentile_allegation_internal': '0.023',
                  'percentile_trr': '0.049',
                  'percentile_allegation': '41.001',
                },
                {
                  'officer_id': 1,
                  year: 2007,
                  'percentile_allegation_civilian': '75.065',
                  'percentile_allegation_internal': '0.022',
                  'percentile_trr': '0.046',
                  'percentile_allegation': '31.201',
                },
              ],
            },
          },
        },
        timeline: timeline,
        coaccusals: coaccusals,
        cms: [
          {
            type: 'rich_text',
            name: 'triangle_description',
          },
        ],
      },
    };

    it('should return LoadingPage if request is not complete', function () {
      let requestingSummary = cloneDeep(stateData);
      requestingSummary.officerPage.officers.isRequesting = true;
      const requestingSummaryStore = mockStore(requestingSummary);
      const wrapper = mount(
        <Provider store={ requestingSummaryStore }>
          <OfficerPageContainer params={ { id: 11 } }/>
        </Provider>
      );

      wrapper.find(LoadingPage).exists().should.be.true();
    });

    it('should return NotMatchedOfficerPage if officer request is not success', function () {
      let requestingOfficer = cloneDeep(stateData);
      requestingOfficer.officerPage.officers.isSuccess = false;
      const requestingOfficerStore = mockStore(requestingOfficer);

      const wrapper = mount(
        <Provider store={ requestingOfficerStore }>
          <OfficerPageContainer params={ { id: 11 } }/>
        </Provider>
      );
      wrapper.find(NotMatchedOfficerPage).exists().should.be.true();
    });

    it('should be able to render officer radar chart', function () {
      const workingStore = mockStore(stateData);
      const wrapper = mount(
        <Provider store={ workingStore }>
          <OfficerPageContainer params={ { id: 11 } }/>
        </Provider>
      );

      const officerRadarChart = wrapper.find(OfficerRadarChart);
      officerRadarChart.exists().should.be.true();
      officerRadarChart.prop('percentileData').should.deepEqual([{
        items: [{
          axis: 'Use of Force Reports',
          value: 0.049,
        }, {
          axis: 'Internal Allegations',
          value: 0.023,
        }, {
          axis: 'Civilian Allegations',
          value: 66.251,
        }],
        textColor: '#231F20',
        visualTokenBackground: '#fc5d2c',
        year: 2006,
      }, {
        items: [{
          axis: 'Use of Force Reports',
          value: 0.046,
        }, {
          axis: 'Internal Allegations',
          value: 0.022,
        }, {
          axis: 'Civilian Allegations',
          value: 75.065,
        }],
        textColor: '#231F20',
        visualTokenBackground: '#fc5d2c',
        year: 2007,
      }]);
    });

    it('should render officer info', function () {
      const workingStore = mockStore(stateData);
      const wrapper = mount(
        <Provider store={ workingStore }>
          <OfficerPageContainer params={ { id: 11 } }/>
        </Provider>
      );

      wrapper.find('.officer-name.header').text().should.equal('Kenneth Wojtan');
      wrapper.find('.officer-demographic').text().should.equal('60 years old, white, male.');

      const rows = wrapper.find(SectionRow);
      const badgeRow = rows.at(0);
      const rankRow = rows.at(1);
      const unitRow = rows.at(2);
      const careerRow = rows.at(3);

      badgeRow.find('.label').text().should.equal('Badge');
      rankRow.find('.label').text().should.equal('Rank');
      unitRow.find('.label').text().should.equal('Unit');
      careerRow.find('.label').text().should.equal('Career');

      badgeRow.find('.value').text().should.eql('8548, 8547, 8546');
      rankRow.find('.value').text().should.equal('Police Officer');
      unitRow.find('.value').text().should.equal('Unit 005 - District 005');
      careerRow.find('.value').text().should.equal('DEC 13, 1993 — JAN 15, 2017');
    });

    it('should only render historic badge when badge is empty', function () {
      const workingStore = mockStore(emptyBadgeStateData);
      const wrapper = mount(
        <Provider store={ workingStore }>
          <OfficerPageContainer params={ { id: 11 } }/>
        </Provider>
      );

      const badgeRow = wrapper.find(SectionRow).at(0);

      badgeRow.find('.label').text().should.equal('Badge');
      badgeRow.find('.value').text().should.eql('8547, 8546');
    });

    it('should only render badge when historic badge is empty', function () {
      const workingStore = mockStore(emptyHistoricBadgeStateData);
      const wrapper = mount(
        <Provider store={ workingStore }>
          <OfficerPageContainer params={ { id: 11 } }/>
        </Provider>
      );

      const badgeRow = wrapper.find(SectionRow).at(0);

      badgeRow.find('.label').text().should.equal('Badge');
      badgeRow.find('.value').text().should.eql('8548');
    });

    it('should render Unknown when both badge and historic badge are empty', function () {
      const workingStore = mockStore(emptyBadgeAndHistoricBadgeStateData);
      const wrapper = mount(
        <Provider store={ workingStore }>
          <OfficerPageContainer params={ { id: 11 } }/>
        </Provider>
      );

      const badgeRow = wrapper.find(SectionRow).at(0);

      badgeRow.find('.label').text().should.equal('Badge');
      badgeRow.find('.value').text().should.eql('Unknown');
    });

    it('should render officer metrics with correct props', function () {
      const workingStore = mockStore(stateData);
      const wrapper = mount(
        <Provider store={ workingStore }>
          <OfficerPageContainer params={ { id: 11 } }/>
        </Provider>
      );

      const metricWidget = wrapper.find(MetricWidget);
      const metricsProp = metricWidget.prop('metrics');

      metricsProp.should.have.length(6);

      metricsProp[0].name.should.equal('Allegations');
      metricsProp[0].value.should.equal(104);
      metricsProp[0].description.should.equal('More than 99.8% of other officers');

      metricsProp[1].name.should.equal('Sustained');
      metricsProp[1].value.should.equal(1);
      metricsProp[1].isHighlight.should.be.true();
      metricsProp[1].description.should.equal('1 Disciplined');

      metricsProp[2].name.should.equal('Use of Force Reports');
      metricsProp[2].value.should.equal(3);
      metricsProp[2].description.should.equal('More than 0% of other officers');

      metricsProp[3].value.should.equal(4);

      metricsProp[4].name.should.equal('Major Awards');
      metricsProp[4].value.should.equal(0);

      metricsProp[5].name.should.equal('Honorable Mentions');
      metricsProp[5].value.should.equal(55);
      metricsProp[5].description.should.equal('More than 85% of other officers');
    });

    it('should pluralize content correctly', function () {
      const data = {
        breadcrumb: {
          breadcrumbs: [],
        },
        officerPage: {
          officers: {
            isRequesting: false,
            isSuccess: true,
            data: {
              11: {
                'officer_id': 11,
                'full_name': 'Kenneth Wojtan',
                active: true,
                'allegation_count': 1,
                badge: '8548',
                'historic_badges': ['8547', '8546'],
                'birth_year': 1957,
                'civilian_compliment_count': 1,
                'complaint_percentile': 99.895,
                'date_of_appt': '1993-12-13',
                'date_of_resignation': '2017-01-15',
                'discipline_count': 1,
                gender: 'Male',
                'honorable_mention_count': 1,
                'honorable_mention_percentile': 85.87,
                'major_award_count': 1,
                race: 'White',
                rank: 'Police Officer',
                'sustained_count': 1,
                'trr_count': 1,
                unit: {
                  'unit_id': 6,
                  description: 'District 005',
                  'unit_name': '005',
                },
                percentiles: [
                  {
                    'officer_id': 1,
                    year: 2006,
                    'percentile_allegation_civilian': '66.251',
                    'percentile_allegation_internal': '0.023',
                    'percentile_trr': '0.049',
                    'percentile_allegation': '41.001',
                  },
                  {
                    'officer_id': 1,
                    year: 2007,
                    'percentile_allegation_civilian': '75.065',
                    'percentile_allegation_internal': '0.022',
                    'percentile_trr': '0.046',
                    'percentile_allegation': '31.201',
                  },
                ],
              },
            },
          },
          timeline: timeline,
          coaccusals: coaccusals,
          cms: [
            {
              type: 'rich_text',
              name: 'triangle_description',
            },
          ],
        },
      };

      const wrapper = mount(
        <Provider store={ mockStore(data) }>
          <OfficerPageContainer params={ { id: 11 } }/>
        </Provider>
      );

      const metricWidget = wrapper.find(MetricWidget);
      const metricsProp = metricWidget.prop('metrics');

      metricsProp.should.have.length(6);

      metricsProp[0].name.should.equal('Allegation');
      metricsProp[0].value.should.equal(1);

      metricsProp[2].name.should.equal('Use of Force Report');
      metricsProp[2].value.should.equal(1);

      metricsProp[4].name.should.equal('Major Award');
      metricsProp[4].value.should.equal(1);

      metricsProp[5].name.should.equal('Honorable Mention');
      metricsProp[5].value.should.equal(1);
    });

    it('should skip some content if data is not available', function () {
      const data = {
        breadcrumb: {
          breadcrumbs: [],
        },
        officerPage: {
          officers: {
            isRequesting: false,
            isSuccess: true,
            data: {
              11: {
                'officer_id': 11,
                'full_name': 'Kenneth Wojtan',
                active: true,
                badge: '8548',
                'historic_badges': ['8547', '8546'],
                'birth_year': 1957,
                'date_of_appt': '1993-12-13',
                'date_of_resignation': '2017-01-15',
                gender: 'Male',
                race: 'White',
                rank: 'Police Officer',
                unit: {
                  'unit_id': 6,
                  description: 'District 005',
                  'unit_name': '005',
                },
                percentiles: [],
              },
            },
          },
          timeline: timeline,
          coaccusals: coaccusals,
          cms: [
            {
              type: 'rich_text',
              name: 'triangle_description',
            },
          ],
        },
      };

      const wrapper = mount(
        <Provider store={ mockStore(data) }>
          <OfficerPageContainer params={ { id: 11 } }/>
        </Provider>
      );

      const metricWidget = wrapper.find(MetricWidget);
      const metricsProp = metricWidget.prop('metrics');

      metricsProp.should.have.length(6);

      metricsProp[0].name.should.equal('Allegations');
      metricsProp[0].value.should.equal('N/A');
      should(metricsProp[0].description).be.null();

      metricsProp[1].name.should.equal('Sustained');
      metricsProp[1].value.should.equal('N/A');
      metricsProp[1].isHighlight.should.be.true();
      should(metricsProp[1].description).be.null();

      metricsProp[2].name.should.equal('Use of Force Reports');
      metricsProp[2].value.should.equal('N/A');
      should(metricsProp[2].description).be.null();

      metricsProp[3].value.should.equal('N/A');

      metricsProp[4].name.should.equal('Major Awards');
      metricsProp[4].value.should.equal('N/A');

      metricsProp[5].name.should.equal('Honorable Mentions');
      metricsProp[5].value.should.equal('N/A');
      should(metricsProp[5].description).be.null();
    });

    it('should render TabbedPaneSection component', function () {
      const workingStore = mockStore(stateData);
      const wrapper = mount(
        <Provider store={ workingStore }>
          <OfficerPageContainer params={ { id: 11, firstParam: 'coaccusals' } } />
        </Provider>
      );
      const tabbedPaneSection = wrapper.find(TabbedPaneSection);
      tabbedPaneSection.prop('officerId').should.equal(11);
      tabbedPaneSection.prop('currentTab').should.equal('COACCUSALS');
      tabbedPaneSection.prop('hasCoaccusal').should.equal(true);
      tabbedPaneSection.prop('hasAttachment').should.equal(false);
    });

    it('should get officer timeline and officer coaccusals after the component is mounted', function () {
      const stubGetOfficerTimeline = stub();
      const stubGetOfficerCoaccusals = stub();

      const wrapper = shallow(
        <OfficerPage
          requestOfficerId={ 123 }
          loading={ false }
          found={ false }
          summary={ null }
          isTimelineSuccess={ false }
          isCoaccusalSuccess={ false }
          getOfficerCoaccusals={ stubGetOfficerCoaccusals }
          getOfficerTimeline={ stubGetOfficerTimeline }
        />
      );

      wrapper.instance().componentDidMount();
      stubGetOfficerTimeline.calledWith(123).should.be.true();
      stubGetOfficerCoaccusals.calledWith(123).should.be.true();
    });

    it('should get officer timeline and officer coaccusals if the component is updated', function () {
      const stubGetOfficerTimeline = stub();
      const stubGetOfficerCoaccusals = stub();
      const prevProps = {
        requestOfficerId: 123,
      };

      const wrapper = shallow(
        <OfficerPage
          requestOfficerId={ 456 }
          loading={ false }
          found={ false }
          summary={ null }
          isTimelineSuccess={ false }
          isCoaccusalSuccess={ false }
          getOfficerCoaccusals={ stubGetOfficerCoaccusals }
          getOfficerTimeline={ stubGetOfficerTimeline }
        />
      );

      wrapper.instance().componentDidUpdate(prevProps);
      stubGetOfficerTimeline.calledWith(456).should.be.true();
      stubGetOfficerCoaccusals.calledWith(456).should.be.true();
    });

    it('should render officer title', function () {
      const wrapper = shallow(
        <OfficerPage
          loading={ false }
          found={ true }
          summary={ this.summary }
          metrics={ this.metrics }
        />
      );

      const documentMeta = wrapper.find(DocumentMeta);
      documentMeta.prop('title').should.equal('Police Officer Officer 11');
    });
  });
});
