import React from 'react';
import { shallow } from 'enzyme';

import OfficerHeader from 'components/OfficerPage/OfficerHeader';


describe('OfficerHeader component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<OfficerHeader />);
    wrapper.should.be.ok();
  });
});
