import React from 'react';
import { shallow } from 'enzyme';

import OfficerCard from 'components/landing-page/officer-card';

describe('<OfficerCard />', () => {
  it('should be renderable', () => {
    const wrapper = shallow(<OfficerCard officer={ { percentile: {} } } />);
    wrapper.should.be.ok();
  });
});
