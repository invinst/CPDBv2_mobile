import React from 'react';
import { shallow } from 'enzyme';

import OfficerSummarySection from 'components/OfficerPage/SummaryTab/OfficerSummarySection';


describe('OfficerSummarySection component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<OfficerSummarySection />);
    wrapper.should.be.ok();
  });
});
