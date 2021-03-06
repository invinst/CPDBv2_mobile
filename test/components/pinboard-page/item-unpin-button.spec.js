import React from 'react';
import { mount } from 'enzyme';
import { stub } from 'sinon';

import ItemUnpinButton from 'components/pinboard-page/item-unpin-button';


describe('<ItemUnpinButton />', function () {
  it('should onClick when cliked on', function () {
    const onClick = stub();
    const wrapper = mount(
      <ItemUnpinButton onClick={ onClick } />
    );
    wrapper.find('span').simulate('click');
    onClick.should.be.calledOnce();
  });
});
