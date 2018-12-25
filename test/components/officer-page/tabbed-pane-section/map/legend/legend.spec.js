import React from 'react';
import { mount } from 'enzyme';

import Legend from 'components/officer-page/tabbed-pane-section/map/legend';
import Row from 'components/officer-page/tabbed-pane-section/map/legend/row';


describe('Legend component', function () {
  let wrapper;

  it('should render rows correctly', function () {
    const legend = {
      unsustainedCount: 20,
      sustainedCount: 3,
      useOfForceCount: 1,
    };
    wrapper = mount(<Legend legend={ legend } />);
    const legendRows = wrapper.find('Row');
    legendRows.should.have.length(3);
    legendRows.at(0).prop('number').should.eql(20);
    legendRows.at(1).prop('number').should.eql(3);
    legendRows.at(2).prop('number').should.eql(1);
  });
});
