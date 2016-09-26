import React from 'react';
import { shallow } from 'enzyme';

import Collaborate from 'components/MainPage/MainPageContent/Collaborate';

describe('<Collaborate />', function () {
  it('should render', function () {
    let wrapper = shallow(<Collaborate />);
    wrapper.should.be.ok();
  });
});
