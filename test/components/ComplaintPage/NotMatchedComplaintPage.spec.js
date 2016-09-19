import React from 'react';
import { shallow } from 'enzyme';

import NotMatchedComplaintPage from 'components/ComplaintPage/NotMatchedComplaintPage';


describe('NotMatchedComplaintPage component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<NotMatchedComplaintPage />);
    wrapper.should.be.ok();
  });
});
