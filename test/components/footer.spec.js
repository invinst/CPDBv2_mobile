import React from 'react';
import { shallow } from 'enzyme';

import Footer from 'components/footer';


describe('<Footer />', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<Footer />);
    wrapper.should.be.ok();
  });
});
