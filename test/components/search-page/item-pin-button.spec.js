import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';

import ItemPinButton from 'components/search-page/item-pin-button';


describe('<ItemPinButton />', function () {
  it('should have class is-pinned if suggestion.isPinned is true', function () {
    const wrapper = shallow(<ItemPinButton isPinned={ true } />);
    wrapper.find('span').hasClass('is-pinned').should.be.true();
  });

  it('should not have class is-pinned if suggesion.isPinned is false', function () {
    const wrapper = shallow(<ItemPinButton isPinned={ false } />);
    wrapper.find('span').hasClass('is-pinned').should.be.false();
  });

  it('should call addItemInPinboardPage action when cliked on', function () {
    const addOrRemoveItemInPinboard = stub();
    const wrapper = mount(
      <ItemPinButton
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
        isPinned={ false }
        type='CR'
        id='1'
      />
    );
    wrapper.find('span').simulate('click');
    addOrRemoveItemInPinboard.calledWith({
      type: 'CR',
      id: '1',
      isPinned: false,
    }).should.be.true();
  });
});
