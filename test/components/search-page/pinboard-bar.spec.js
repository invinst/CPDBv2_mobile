import React from 'react';
import { Link } from 'react-router';
import { mount, shallow } from 'enzyme';
import should from 'should';

import PinboardBar from 'components/search-page/pinboard-bar';


describe('<PinboardButton />', function () {
  it('should not display a Link component when there is no pinned item', function () {
    const wrapper = mount(<PinboardBar pinboard={ {
      itemsCount: 0,
      isPinboardRestored: true,
    } } />);

    wrapper.find(Link).should.have.length(0);
    wrapper.text().should.equal('Your pinboard is empty');
  });

  it('should display a Link component when there are pinned items', function () {
    const wrapper = mount(
      <PinboardBar pinboard={ {
        itemsCount: 2,
        url: '/pinboard/1/title/',
        isPinboardRestored: true,
      } } />
    );

    wrapper.exists(Link).should.be.true();
    wrapper.find(Link).props().children[0].should.equal('Pinboard (2)');
    wrapper.find(Link).props().to.should.equal('/pinboard/1/title/');
  });

  it('should render nothing if isPinboardRestored is false', function () {
    const wrapper = shallow(
      <PinboardBar pinboard={ {
        isPinboardRestored: false,
      } } />
    );

    should(wrapper.getNode()).be.null();
  });
});
