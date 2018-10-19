import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import should from 'should';

import OfficerCard from 'components/landing-page/officer-card';
import RadarChart from 'components/common/radar-chart';


describe('<OfficerCard />', () => {
  const officer = {
    'birth_year': 1971,
    'complaint_count': 104,
    'complaint_percentile': 99.9911,
    'full_name': 'Broderick Jones',
    gender: 'Male',
    id: 13788,
    percentile: {
      items: [
        { axis: 'Use of Force Reports', value: 0 },
        { axis: 'Internal Allegations', value: 87.828 },
        { axis: 'Civilian Allegations', value: 99.9817 },
      ],
      officerId: undefined,
      textColor: '#231F20',
      visualTokenBackground: '#f95125',
      year: 2005,
    },
    race: 'Black',
    'sustained_count': 11
  };

  it('should render correctly', () => {
    const wrapper = shallow(<OfficerCard officer={ officer } />);

    const link = wrapper.find(Link);
    link.prop('to').should.equal('/officer/13788/broderick-jones/');
    should(link.prop('target')).be.null();

    const radarChart = link.find(RadarChart);
    radarChart.prop('radius').should.equal(170);
    radarChart.prop('backgroundColor').should.equal('#f95125');
    radarChart.prop('data').should.eql([
      { axis: 'Use of Force Reports', value: 0 },
      { axis: 'Internal Allegations', value: 87.828 },
      { axis: 'Civilian Allegations', value: 99.9817 },
    ]);

    link.find('.officer-name').text().should.equal('Broderick Jones');
    link.find('.complaint-count').text().should.equal('104 complaints');
  });

  it('should pluralize complaint count and still render radar chart with no data', function () {
    const noPercentileOfficer = {
      'birth_year': 1971,
      'complaint_count': 1,
      'complaint_percentile': 99.9911,
      'full_name': 'Broderick Jones',
      gender: 'Male',
      id: 13788,
      percentile: undefined,
      race: 'Black',
      'sustained_count': 11
    };
    const wrapper = shallow(<OfficerCard officer={ noPercentileOfficer } />);
    const link = wrapper.find(Link);

    const noDataRadarChart = link.find(RadarChart);
    should(noDataRadarChart.prop('data')).be.undefined();
    should(noDataRadarChart.prop('backgroundColor')).be.undefined();

    link.find('.complaint-count').text().should.equal('1 complaint');
  });

  it('should link to new tab if openCardInNewPage is true', function () {
    const wrapper = shallow(<OfficerCard officer={ officer } openCardInNewPage={ true }/>);

    const link = wrapper.find(Link);
    link.prop('to').should.equal('/officer/13788/broderick-jones/');
    link.prop('target').should.equal('_blank');
  });
});
