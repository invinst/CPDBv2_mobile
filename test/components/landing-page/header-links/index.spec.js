import React from 'react';
import { shallow } from 'enzyme';

import HeaderLinks from 'components/landing-page/header-links';


describe('RightLinks component', function () {
  it('should render correctly', function () {
    const wrapper = shallow(<HeaderLinks />);

    const tags = wrapper.find('a');

    tags.at(0).prop('className').should.equal('header-link');
    tags.at(0).prop('href').should.equal('http://how.cpdp.works/');
    tags.at(0).text().should.equal('Q&A');

    wrapper.find('PinboardButton').exists().should.be.true();
  });
});
