import React from 'react';
import { shallow } from 'enzyme';

import DistributionCurve from 'components/OfficerPage/SummaryTab/OfficerAnalyticSection/DistributionCurve';


describe('DistributionCurve component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<DistributionCurve />);
    wrapper.should.be.ok();
  });
});
