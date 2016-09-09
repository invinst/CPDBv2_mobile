import React from 'react';
import { shallow } from 'enzyme';

import NoRelatedOfficer from 'components/OfficerPage/RelatedOfficersTab/NoRelatedOfficer';


describe('NoRelatedOfficer component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<NoRelatedOfficer />);
    wrapper.should.be.ok();
  });
});
