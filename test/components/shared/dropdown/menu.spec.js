import React from 'react';
import { stub } from 'sinon';
import { shallow } from 'enzyme';

import Menu from 'components/shared/dropdown/menu';


describe('Menu component', function () {
  it('should invoke onSelect when clicking on an item', function () {
    const onSelectStub = stub();
    const wrapper = shallow(
      <Menu
        onSelect={ onSelectStub }
        options={ ['1', '2', '3'] }
      />
    );

    const secondMenuItem = wrapper.find('.dropdown-menu-item').at(1);
    secondMenuItem.simulate('click');

    onSelectStub.should.be.calledWith(1);
  });
});
