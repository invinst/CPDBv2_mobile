import React from 'react';
import { shallow } from 'enzyme';

import LoadingPage from 'components/shared/loading-page';

describe('<LoadingPage />', function () {
  it('should render svg circle', function () {
    let wrapper = shallow(<LoadingPage />);
    wrapper.should.be.ok();
    wrapper.find('svg circle').exists().should.be.true();
  });
});
