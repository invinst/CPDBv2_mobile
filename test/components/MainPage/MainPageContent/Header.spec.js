import React from 'react';
import { shallow } from 'enzyme';

import Header from 'components/MainPage/MainPageContent/Header';

describe('<Header />', function () {
  it('should render', function () {
    let wrapper = shallow(<Header />);
    wrapper.should.be.ok();
  });
});
