import React from 'react';
import { mount } from 'enzyme';

import SingleSpin from 'components/common/loading-spinner/single-spin';


describe('SingleSpin component', function () {
  it('should render enough content', function () {
    const wrapper = mount(
      <SingleSpin
        transform='rotate(150 50 50)'
        begin='0.25s'
        fill='#ACB123'
      />
    );

    const element = wrapper.find('g');
    element.getDOMNode().getAttribute('class').should.containEql('animation');
    element.getDOMNode().getAttribute('transform').should.containEql('rotate(150 50 50)');

    const rect = wrapper.find('rect');
    rect.getDOMNode().getAttribute('class').should.containEql('animation');
    rect.getDOMNode().getAttribute('fill').should.equal('#ACB123');

    const animate = wrapper.find('animate');
    animate.getDOMNode().getAttribute('class').should.containEql('animation');
    animate.getDOMNode().getAttribute('begin').should.equal('0.25s');
  });
});
