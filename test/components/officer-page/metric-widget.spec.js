import React from 'react';
import { shallow } from 'enzyme';

import MetricWidget from 'components/officer-page/metric-widget';
import MetricWidgetItem from 'components/officer-page/metric-widget-item';


describe('MetricWidget component', () => {
  it('should contain correct number of MetricWidgetItem components', () => {
    const metrics = [
      {
        name: 'name1',
        value: 23,
        description: 'description1',
      },
      {
        name: 'name2',
        value: 12,
        description: 'description2',
        isHighlight: true,
      },
    ];
    const wrapper = shallow(
      <MetricWidget metrics={ metrics }/>
    );
    wrapper.find(MetricWidgetItem).should.have.length(2);
  });

  it('should split into groups with the length of 2', () => {
    const metrics = [
      {
        name: 'name1',
        value: 23,
        description: 'description1',
      },
      {
        name: 'name2',
        value: 12,
        description: 'description2',
      },
      {
        name: 'name3',
        value: 34,
        description: 'description3',
      },
    ];
    const wrapper = shallow(
      <MetricWidget metrics={ metrics }/>
    );
    wrapper.find('.chunk').should.have.length(2);
  });
});
