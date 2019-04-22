import React from 'react';
import { Link } from 'react-router';
import { mount } from 'enzyme';

import Header from 'components/pinboard-page/header';


describe('<Header /> of PinboardPage', function () {
  it('should render correctly', function () {
    const header = mount(<Header />);

    header.find(Link).props().to.should.eql('/');
    header.find('.highlight').text().should.be.eql('Pinboard');
  });
});
