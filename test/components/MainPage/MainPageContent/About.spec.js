import React from 'react';
import { shallow } from 'enzyme';

import About from 'components/MainPage/MainPageContent/About';

describe('<About />', function () {
  it('should render', function () {
    let wrapper = shallow(<About />);
    wrapper.should.be.ok();
  });
});
