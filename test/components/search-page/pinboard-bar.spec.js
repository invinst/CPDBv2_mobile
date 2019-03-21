import React from 'react';
import { Link } from 'react-router';
import { mount } from 'enzyme';

import PinboardBar from 'components/search-page/pinboard-bar';


describe('<PinboardButton />', function () {
  it('should not display a Link component when there is no pinned item', function () {
    const wrapper = mount(<PinboardBar pinboard={ { itemsCount: 0 } } />);

    wrapper.find(Link).should.have.length(0);
    wrapper.text().should.equal('Your pinboard is empty');
  });

  it('should display a Link component when there are pinned items', function () {
    const wrapper = mount(
      <PinboardBar pinboard={ { itemsCount: 2, url: '/pinboard/1/title/' } } />
    );

    wrapper.exists(Link).should.be.true();
    wrapper.find(Link).props().children[0].should.equal('Pinboard (2)');
    wrapper.find(Link).props().to.should.equal('/pinboard/1/title/');
  });
});
