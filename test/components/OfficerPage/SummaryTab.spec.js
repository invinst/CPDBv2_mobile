import React from 'react';
import { shallow } from 'enzyme';

import SummaryTab from 'components/OfficerPage/SummaryTab';


describe('SummaryTab component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<SummaryTab />);
    wrapper.should.be.ok();
  });
});
