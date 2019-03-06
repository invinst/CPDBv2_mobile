import should from 'should';
import React from 'react';
import { shallow } from 'enzyme';

import CMSContent from 'components/common/cms-content';

describe('<CMSContent />', () => {
  it('should be renderable', () => {
    const wrapper = shallow(<CMSContent content={ {} } />);
    wrapper.should.be.ok();
  });

  it('should not render anything if there is no data', () => {
    const wrapper = shallow(
      <CMSContent content={ null } />
    );
    should(wrapper.type()).equal(null);
  });
});
