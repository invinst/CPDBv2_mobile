import React from 'react';
import { mount } from 'enzyme';

import Legend from 'components/common/allegations-map/legend';
import Row from 'components/common/allegations-map/legend/row';


describe('Legend component', function () {
  let wrapper;

  it('should render rows correctly', function () {
    const legend = {
      allegationCount: 23,
      unsustainedCount: 20,
      sustainedCount: 3,
      useOfForceCount: 1,
    };
    wrapper = mount(<Legend legend={ legend } />);
    const legendRows = wrapper.find(Row);
    legendRows.should.have.length(4);
    legendRows.at(0).prop('number').should.eql(23);
    legendRows.at(1).prop('number').should.eql(20);
    legendRows.at(2).prop('number').should.eql(3);
    legendRows.at(3).prop('number').should.eql(1);
  });

  it('should not render rows with missing value', function () {
    const legend = {
      allegationCount: 23,
      useOfForceCount: 0,
    };
    wrapper = mount(<Legend legend={ legend } />);
    const legendRow = wrapper.find(Row);
    legendRow.should.have.length(2);
    legendRow.at(0).prop('number').should.eql(23);
    legendRow.at(1).prop('number').should.eql(0);
  });
});
