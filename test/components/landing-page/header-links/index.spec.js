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

    tags.at(1).prop('className').should.equal('header-link');
    tags.at(1).prop('href').should.equal('https://national.cpdp.co/');
    tags.at(1).text().should.equal('National Police Index');

    // wrapper.find('Connect(PinboardButton)').exists().should.be.true();
  });
});
