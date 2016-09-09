import React from 'react';
import { shallow } from 'enzyme';

import OfficerAnalyticSection from 'components/OfficerPage/SummaryTab/OfficerAnalyticSection';


describe('OfficerAnalyticSection component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<OfficerAnalyticSection />);
    wrapper.should.be.ok();
  });
});
