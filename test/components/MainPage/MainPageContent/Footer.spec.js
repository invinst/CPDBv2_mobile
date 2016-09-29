import React from 'react';
import { shallow } from 'enzyme';

import Footer from 'components/MainPage/MainPageContent/Footer';

describe('<Footer />', function () {
  it('should render', function () {
    let wrapper = shallow(<Footer />);
    wrapper.should.be.ok();
  });
});
