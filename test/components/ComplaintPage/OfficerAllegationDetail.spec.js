import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import OfficerAllegationDetail from 'components/ComplaintPage/OfficerAllegationDetail';


describe('OfficerAllegationDetail component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<OfficerAllegationDetail />);
    wrapper.should.be.ok();
  });

  it('should be call toggleOpen on click', function () {
    const toggleOpenSpy = spy();

    const wrapper = shallow(<OfficerAllegationDetail toggleOpen={ toggleOpenSpy }/>);
    wrapper.find('.number-of-allegations-section').simulate('click');
    toggleOpenSpy.called.should.be.true();
  });
});
