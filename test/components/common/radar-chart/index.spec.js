import React from 'react';
import { shallow } from 'enzyme';
import should from 'should';

import StaticRadarChart from 'components/common/radar-chart';
import RadarChart from 'components/common/radar-chart/radar-chart';

describe('StaticRadarChart component', function () {
  it('should be renderable', function () {
    const data = [
      {
        axis: 'A',
        value: 10,
      },
      {
        axis: 'B',
        value: 50,
      },
      {
        axis: 'C',
        value: 20,
      },
    ];
    const props = {
      data: data,
      width: 456,
      height: 432,
      radius: 123,
      someProps: 'someProps',
    };

    const wrapper = shallow(<StaticRadarChart { ...props }/>);
    const radarChart = wrapper.find(RadarChart);

    radarChart.prop('data').should.equal(props.data);
  });

  it('should be able to render no data radar chart', function () {
    const missingData = [
      {
        axis: 'A',
        value: NaN,
      },
      {
        axis: 'B',
        value: 50,
      },
      {
        axis: 'C',
        value: 20,
      },
    ];
    const props = {
      data: missingData,
      width: 456,
      height: 432,
      radius: 123,
      someProps: 'someProps',
    };

    const wrapper = shallow(<StaticRadarChart { ...props }/>);
    const noDataRadarChart = wrapper.find(RadarChart);
    should(noDataRadarChart.prop('data')).be.undefined();
  });
});
