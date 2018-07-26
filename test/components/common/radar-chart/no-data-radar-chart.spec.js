import React from 'react';
import { shallow } from 'enzyme';

import RadarChart from 'components/common/radar-chart/radar-chart';
import NoDataRadarChart from 'components/common/radar-chart/no-data-radar-chart';

describe('NoDataRadarChart component', function () {
  it('should be renderable with no data text', () => {
    const props = {
      width: 456,
      height: 432,
      radius: 123,
    };

    const wrapper = shallow(<NoDataRadarChart { ...props }/>);
    wrapper.find(RadarChart).exists().should.be.true();
    wrapper.find('.no-data-text').exists().should.be.false();
  });

  it('should be able to render NoDataRadarChart', () => {
    const noDataText = 'some explain text';
    const props = {
      width: 456,
      height: 432,
      radius: 123,
      noDataText
    };
    const wrapper = shallow(<NoDataRadarChart { ...props }/>);
    wrapper.find(RadarChart).exists().should.be.true();
    wrapper.find('.no-data-text').text().should.equal(noDataText);
  });
});
