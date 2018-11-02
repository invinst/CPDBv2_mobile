import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import should from 'should';

import OfficerCard from 'components/officer-page/tabbed-pane-section/coaccusals/officer-card';
import RadarChart from 'components/common/radar-chart';


describe('<OfficerCard />', () => {
  const officer = {
    officerId: 8562,
    fullName: 'Jerome Finnigan',
    percentile: {
      items: [
        { axis: 'Use of Force Reports', value: 0 },
        { axis: 'Internal Allegations', value: 87.828 },
        { axis: 'Civilian Allegations', value: 99.9817 },
      ],
      officerId: undefined,
      textColor: '#231F20',
      visualTokenBackground: '#f95125',
      year: undefined,
    },
    coaccusalCount: 11,
    rank: 'Police Officer'
  };

  it('should render correctly', () => {
    const wrapper = shallow(<OfficerCard { ...officer } />);

    const link = wrapper.find(Link);
    link.prop('to').should.equal('/officer/8562/');

    const radarChart = link.find(RadarChart);
    radarChart.prop('radius').should.equal(170);
    radarChart.prop('backgroundColor').should.equal('#f95125');
    radarChart.prop('data').should.eql([
      { axis: 'Use of Force Reports', value: 0 },
      { axis: 'Internal Allegations', value: 87.828 },
      { axis: 'Civilian Allegations', value: 99.9817 },
    ]);

    link.find('.officer-name').text().should.equal('Jerome Finnigan');
    link.find('.officer-rank').text().should.equal('Police Officer');
    link.find('.coaccusal-count').text().should.equal('11 Coaccusals');
  });

  it('should not pluralize coaccusals count and still render radar chart with no data', function () {
    const noPercentileOfficer = {
      fullName: 'Broderick Jones',
      officerId: 123456,
      percentile: undefined,
      coaccusalCount: 1,
      rank: 'Detective'
    };
    const wrapper = shallow(<OfficerCard { ...noPercentileOfficer } />);
    const link = wrapper.find(Link);

    const noDataRadarChart = link.find(RadarChart);
    should(noDataRadarChart.prop('data')).be.undefined();
    should(noDataRadarChart.prop('backgroundColor')).be.undefined();

    link.find('.coaccusal-count').text().should.equal('1 Coaccusal');
  });
});
