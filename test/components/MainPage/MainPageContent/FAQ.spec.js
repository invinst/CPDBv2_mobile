import React from 'react';
import { shallow } from 'enzyme';

import FAQ from 'components/MainPage/MainPageContent/FAQ';

describe('<FAQ />', function () {
  it('should render', function () {
    let wrapper = shallow(<FAQ />);
    wrapper.should.be.ok();
  });
});
