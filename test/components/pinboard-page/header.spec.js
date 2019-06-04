import React from 'react';
import { Link } from 'react-router';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import Header from 'components/pinboard-page/header';


describe('<Header /> of PinboardPage', function () {
  it('should render correctly', function () {
    const header = mount(<Header />);

    header.find(Link).props().to.should.eql('/');
    header.find('.highlight').text().should.be.eql('Pinboard');
  });

  it('should preventDefault when clicking on menu item', function () {
    const preventDefault = spy();
    const header = mount(<Header />);

    header.find('.menu-item').simulate('click', { preventDefault: preventDefault });
    preventDefault.should.be.calledOnce();
  });
});
