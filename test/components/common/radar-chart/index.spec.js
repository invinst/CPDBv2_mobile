import React from 'react';
import { shallow } from 'enzyme';

import StaticRadarChart from 'components/common/radar-chart';
import RadarChart from 'components/common/radar-chart/radar-chart';
import NoDataRadarChart from 'components/common/radar-chart/no-data-radar-chart';

describe('StaticRadarChart component', function () {
  it('should be renderable', () => {
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
      }
    ];
    const props = {
      data: data,
      width: 456,
      height: 432,
      radius: 123,
      someProps: 'someProps'
    };

    const wrapper = shallow(<StaticRadarChart { ...props }/>);
    const radarChart = wrapper.find(RadarChart);

    radarChart.prop('data').should.equal(props.data);
  });

  it('should be able to render NoDataRadarChart', () => {
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
      }
    ];
    const props = {
      data: missingData,
      width: 456,
      height: 432,
      radius: 123,
      someProps: 'someProps'
    };

    const wrapper = shallow(<StaticRadarChart { ...props }/>);
    const noDataRadarChart = wrapper.find(NoDataRadarChart);
    noDataRadarChart.prop('width').should.equal(props.width);
    noDataRadarChart.prop('height').should.equal(props.height);
    noDataRadarChart.prop('radius').should.equal(props.radius);
  });
});
