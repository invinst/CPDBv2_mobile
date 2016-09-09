import React from 'react';
import { shallow } from 'enzyme';

import OfficerSummaryItem from 'components/OfficerPage/SummaryTab/OfficerSummarySection/OfficerSummaryItem';


describe('OfficerSummaryItem component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<OfficerSummaryItem />);
    wrapper.should.be.ok();
  });
});
