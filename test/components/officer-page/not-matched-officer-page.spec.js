import React from 'react';
import { shallow } from 'enzyme';

import NotMatchedOfficerPage from 'components/officer-page/not-matched-officer-page';


describe('NotMatchedOfficerPage component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<NotMatchedOfficerPage />);
    wrapper.should.be.ok();
  });
});
