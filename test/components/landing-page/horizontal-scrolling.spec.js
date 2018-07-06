import React from 'react';
import { shallow } from 'enzyme';

import HorizontalScrolling from 'components/landing-page/horizontal-scrolling';

describe('<HorizontalScrolling />', () => {
  it('should be renderable', () => {
    const wrapper = shallow(<HorizontalScrolling />);
    wrapper.should.be.ok();
  });

  it('should wrap children node', () => {
    const wrapper = shallow(
      <HorizontalScrolling>
        <div>Child 1</div>
        <div>Child 2</div>
      </HorizontalScrolling>
    );

    wrapper.find('.swiper-slide').should.have.length(2);
  });
});
