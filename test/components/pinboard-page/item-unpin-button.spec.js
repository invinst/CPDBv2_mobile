import React from 'react';
import { mount } from 'enzyme';
import { stub } from 'sinon';

import ItemUnpinButton from 'components/pinboard-page/item-unpin-button';


describe('<ItemUnpinButton />', function () {
  it('should call removeItemInPinboardPage action and onClick when cliked on', function () {
    const removeItemInPinboardPage = stub();
    const onClick = stub();
    const wrapper = mount(
      <ItemUnpinButton
        removeItemInPinboardPage={ removeItemInPinboardPage }
        item={ { isPinned: true, type: 'CR', id: '1' } }
        onClick={ onClick }
      />
    );
    wrapper.find('span').simulate('click');
    removeItemInPinboardPage.calledWith({
      type: 'CR',
      id: '1',
      isPinned: true,
    }).should.be.true();
    onClick.should.be.calledOnce();
  });
});
