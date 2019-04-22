import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import should from 'should';

import BaseOfficerCard from 'components/common/base-officer-card';
import RadarChart from 'components/common/radar-chart';


describe('<BaseOfficerCard />', () => {
  const officer = {
    fullName: 'Broderick Jones',
    officerId: 13788,
    percentile: {
      items: [
        { axis: 'Use of Force Reports', value: 0 },
        { axis: 'Internal Allegations', value: 87.828 },
        { axis: 'Civilian Allegations', value: 99.9817 },
      ],
      textColor: '#231F20',
      visualTokenBackground: '#f95125',
    },
    rank: 'Police Officer'
  };

  it('should render correctly', () => {
    const wrapper = shallow(<BaseOfficerCard { ...officer } />);

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
    link.find('.officer-rank').text().should.equal('Police Officer');
  });

  it('should render radar chart with no data', function () {
    const noPercentileOfficer = {
      fullName: 'Broderick Jones',
      officerId: 13788,
      percentile: undefined,
      rank: 'Detective',
    };
    const wrapper = shallow(<BaseOfficerCard { ...noPercentileOfficer } />);
    const link = wrapper.find(Link);

    const noDataRadarChart = link.find(RadarChart);
    should(noDataRadarChart.prop('data')).be.undefined();
    should(noDataRadarChart.prop('backgroundColor')).be.undefined();
  });

  it('should link to new tab if openCardInNewPage is true', function () {
    const wrapper = shallow(<BaseOfficerCard { ...officer } openCardInNewPage={ true }/>);

    const link = wrapper.find(Link);
    link.prop('to').should.equal('/officer/13788/broderick-jones/');
    link.prop('target').should.equal('_blank');
  });

  it('should not have href link if hasHrefLink is false', function () {
    const wrapper = shallow(<BaseOfficerCard { ...officer } hasHrefLink={ false }/>);

    const link = wrapper.find(Link);
    should(link.prop('to')).be.null();
  });
});
