import should from 'should';
import React from 'react';
import { shallow } from 'enzyme';

import CMSContent from 'components/common/cms-content';

describe('<CMSContent />', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<CMSContent content={ {} } />);
    wrapper.should.be.ok();
  });

  it('should not render anything if there is no data', function () {
    const wrapper = shallow(
      <CMSContent content={ null } />
    );
    should(wrapper.type()).equal(null);
  });
});
