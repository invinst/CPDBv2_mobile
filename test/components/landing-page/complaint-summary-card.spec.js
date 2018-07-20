import React from 'react';
import { shallow } from 'enzyme';

import ComplaintSummaryCard from 'components/landing-page/complaint-summary-card';

describe('<ComplaintSummaryCard />', () => {
  it('should be renderable', () => {
    const wrapper = shallow(<ComplaintSummaryCard allegation={ {} } />);
    wrapper.should.be.ok();
  });
});
