import React from 'react';
import { shallow } from 'enzyme';

import BottomPadding from 'components/Shared/BottomPadding';

describe('<BottomPadding />', function () {
  it('should render', function () {
    let wrapper = shallow(<BottomPadding />);
    wrapper.should.be.ok();
  });
});
