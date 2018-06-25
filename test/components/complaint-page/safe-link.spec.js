import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';

import SafeLink from 'components/complaint-page/safe-link';

describe('SafeLink component', function () {
  it('should wrap children with link', function () {
    const wrapper = shallow(
      <SafeLink to='abc'>
        <div className='children' />
      </SafeLink>
    );

    wrapper.find(Link).should.have.length(1);
    wrapper.find('.children').should.have.length(1);
  });

  it('should wrap children with a div', function () {
    const wrapper = shallow(
      <SafeLink to={ null }>abc</SafeLink>
    );

    wrapper.find('div').should.have.length(1);
  });
});
