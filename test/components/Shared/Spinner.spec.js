import React from 'react';
import { shallow } from 'enzyme';

import Spinner from 'components/Shared/Spinner';

describe('<Spinner />', function () {
  it('should render', function () {
    let wrapper = shallow(<Spinner />);
    wrapper.should.be.ok();
  });
});
