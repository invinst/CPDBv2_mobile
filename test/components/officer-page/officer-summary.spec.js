import React from 'react';
import should from 'should';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import { cloneDeep } from 'lodash';
import configureStore from 'redux-mock-store';

import NavbarContainer from 'containers/navbar-container';
import constants from 'constants';
import OfficerSummary from 'components/officer-page/officer-summary';
import OfficerSummaryContainer from 'containers/officer-page/officer-summary-container';
import OfficerRadarChart from 'components/officer-page/radar-chart';
import LoadingPage from 'components/shared/loading-page';
import NotMatchedOfficerPage from 'components/officer-page/not-matched-officer-page';
import GaUtil from 'utils/ga-util';


const mockStore = configureStore();
const store = mockStore({
  suggestionApp: {
    query: ''
  }
});

describe('<OfficerSummary />', function () {
  beforeEach(function () {
    this.pk = 33;
    this.summary = {
      name: 'John Doe',
      unit: '111',
      rank: 'Dummy Rank',
      badge: '222',
      dateOfAppt: 'Jan 01, 2000',
      yearsSinceDateOfAppt: '17',
      race: 'White',
      sex: 'Male',
      salary: '$1',
      complaints: {
        count: 11,
        facets: [
          {
            name: 'Facet 1',
            entries: []
          }
        ]
      }
    };

    this.stubTrack = stub(GaUtil, 'track');
  });

  afterEach(function () {
    this.stubTrack.restore();
  });

  it('should be renderable', function () {
    const wrapper = shallow(<OfficerSummary />);
    wrapper.should.be.ok();
  });

  it('should render LoadingPage if loading', function () {
    const wrapper = shallow(
      <OfficerSummary
        loading={ true }
        found={ false }
        />
    );
    wrapper.find(LoadingPage).should.have.length(1);
  });

  it('should render NotMatchedOfficerPage if not found', function () {
    const wrapper = shallow(
      <OfficerSummary
        loading={ false }
        found={ false }
        getOfficerSummary={ () => {} }
        />
    );
    wrapper.find(NotMatchedOfficerPage).should.have.length(1);
  });

  it('should be tracked by Google Analytics when mounted', function () {
    mount(
      <Provider store={ store }>
        <OfficerSummary loading={ false } found={ false } getOfficerSummary={ () => {} } fetchOfficer={ () => {} }/>
      </Provider>
    );

    this.stubTrack.calledWith(
      'event',
      'officer',
      'view_detail',
      window.location.pathname
    ).should.be.true();
  });

  it('should not fetch summary data if already available', function () {
    const spyGetOfficerSummary = spy();

    const wrapper = shallow(
      <OfficerSummary
        loading={ false }
        found={ true }
        getOfficerSummary={ spyGetOfficerSummary }
        summary={ this.summary }
      />
    );

    wrapper.instance().componentDidMount();
    spyGetOfficerSummary.called.should.be.false();
  });

  it('should render Navbar', function () {
    const wrapper = shallow(
      <OfficerSummary
        loading={ false }
        found={ true }
        summary={ this.summary }
      />
    );

    wrapper.find(NavbarContainer).prop('backLink').should.eql(constants.SEARCH_PATH);
  });

  describe('when summary is provided', function () {
    beforeEach(function () {
      this.wrapper = shallow(
        <OfficerSummary
          loading={ false }
          found={ true }
          getOfficerSummary={ () => {} }
          summary={ this.summary }
          pk={ this.pk }
        />
      );
    });

    it('should render sticky header', function () {
      const sticky = this.wrapper.find('Sticky');
      sticky.find('.sheet-header').text().should.eql(this.summary.name);
    });

    it('should render "Assignment Details" section', function () {
      const section = this.wrapper.find('.assignment-detail-section');
      const rows = section.find('SectionRow');
      const expectedRows = [
        ['Unit', this.summary.unit],
        ['Rank', this.summary.rank],
        ['Badge', this.summary.badge],
        ['2017 Salary', this.summary.salary],
        ['Career', this.summary.dateOfAppt, this.summary.yearsSinceDateOfAppt],
        ['Race', this.summary.race],
        ['Sex', this.summary.sex]
      ];

      expectedRows.forEach(([label, value, extraInfo], index) => {
        const row = rows.at(index);
        row.prop('label').should.be.eql(label);
        row.prop('value').should.be.eql(value);
        if (extraInfo) {
          row.prop('extraInfo').should.be.eql(extraInfo);
        }
      });
    });

    it('should render SummaryStatsSection', function () {
      this.wrapper.find('SummaryStatsSection').props().should.eql({
        name: 'Complaints',
        data: this.summary.complaints
      });
    });
  });

  it('should have BottomPadding', function () {
    const wrapper = shallow(
      <OfficerSummary loading={ false } found={ true } summary={ this.summary }/>
    );
    wrapper.find('BottomPadding').exists().should.be.true();
  });

  context('inside container', function () {
    const stateData = {
      navbar: { shareMenuIsOpen: false },
      officerPage: {
        summaries: {
          isRequesting: false,
          isSuccess: true,
          data: {
            11: {
              'trr_count': 24,
              'civilian_compliment_count': 8,
              'rank': 'Police Officer',
              'full_name': 'Kevin Osborn',
              'sustained_count': 0,
              id: 21468,
              unit: {
                'unit_name': '001',
                id: 2,
                description: 'District 001'
              },
              'complaint_percentile': 99.914,
              'major_award_count': 0,
              'date_of_appt': '1992-01-02',
              'unsustained_count': 55,
              'complaint_records': {
                count: 0,
                items: [],
                facets: [],
                'sustained_count': 0
              },
              to: '/officer/21468/',
              'honorable_mention_percentile': 75.5604,
              'discipline_count': 0,
              badge: '19675',
              'birth_year': 1965,
              'allegation_count': 125,
              'current_salary': 93354,
              'active': 'Inactive',
              'honorable_mention_count': 29,
              url: 'https://beta.cpdb.co/officer/kevin-osborn/21468',
              gender: 'Male',
              race: 'White',
            }
          }
        },
        officers: {
          isRequesting: false,
          data: {
            11: {
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
                  'percentile_allegation': '31.201'
                }
              ]
            }
          }
        }
      }
    };

    it('should return LoadingPage if summary request is not complete', function () {
      let requestingSummary = cloneDeep(stateData);
      requestingSummary.officerPage.summaries.isRequesting = true;
      const requestingSummaryStore = mockStore(requestingSummary);
      const wrapper = mount(
        <Provider store={ requestingSummaryStore }>
          <OfficerSummaryContainer params={ { id: 11 } }/>
        </Provider>
      );

      wrapper.find(LoadingPage).exists().should.be.true();
    });

    it('should return LoadingPage if officer request is not complete', function () {
      let requestingOfficer = cloneDeep(stateData);
      requestingOfficer.officerPage.officers.isRequesting = true;
      const requestingOfficerStore = mockStore(requestingOfficer);

      const wrapper = mount(
        <Provider store={ requestingOfficerStore }>
          <OfficerSummaryContainer params={ { id: 11 } }/>
        </Provider>
      );
      wrapper.find(LoadingPage).exists().should.be.true();
    });

    it('should be able to render officer radar chart', function () {
      const workingStore = mockStore(stateData);
      const wrapper = mount(
        <Provider store={ workingStore }>
          <OfficerSummaryContainer params={ { id: 11 } }/>
        </Provider>
      );

      const officerRadarChart = wrapper.find(OfficerRadarChart);
      officerRadarChart.exists().should.be.true();
      officerRadarChart.prop('data').should.deepEqual([{
        items: [{
          axis: 'Use of Force Reports',
          value: 0.049
        }, {
          axis: 'Internal Allegations',
          value: 0.023
        }, {
          axis: 'Civilian Allegations',
          value: 66.251
        }],
        officerId: 1,
        textColor: '#231F20',
        visualTokenBackground: '#eb9056',
        year: 2006
      }, {
        items: [{
          axis: 'Use of Force Reports',
          value: 0.046
        }, {
          axis: 'Internal Allegations',
          value: 0.022
        }, {
          axis: 'Civilian Allegations',
          value: 75.065
        }],
        officerId: 1,
        textColor: '#231F20',
        visualTokenBackground: '#eb9056',
        year: 2007
      }]);
    });
  });
});
