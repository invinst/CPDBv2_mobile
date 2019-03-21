import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';

import SearchItem from 'components/search-page/search-item';
import ItemPinButton from 'components/search-page/item-pin-button';


describe('<SearchItem />', function () {
  it('should not render ItemPinButton if hasPinButton is false', function () {
    const wrapper = shallow(<SearchItem hasPinButton={ false } />);
    wrapper.find(ItemPinButton).should.have.length(0);
  });

  it('should render ItemPinButton if hasPinButton is true', function () {
    const wrapper = shallow(<SearchItem hasPinButton={ true } />);
    wrapper.find(ItemPinButton).should.have.length(1);
  });

  it('should assign className to Link component', function () {
    const wrapper = shallow(
      <SearchItem className='custom'>
        <span>SearchItem children</span>
      </SearchItem>
    );
    wrapper.find(Link).props().className.should.containEql('custom');
  });
});
