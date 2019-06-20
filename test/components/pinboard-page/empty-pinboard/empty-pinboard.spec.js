import React from 'react';
import { mount } from 'enzyme';
import { Link } from 'react-router';

import EmptyPinboard from 'components/pinboard-page/empty-pinboard';


describe('EmptyPinboard component', function () {
  it('should have enough contents', function () {
    const examplePinboards = [{
      id: '66ef1561',
      title: 'Pinboard 1',
      description: 'Description 1'
    }, {
      id: '66ef1562',
      title: 'Pinboard 2',
      description: 'Description 2'
    }];

    const wrapper = mount(
      <EmptyPinboard examplePinboards={ examplePinboards }/>
    );

    wrapper.find('.empty-pinboard-title').text().should.equal('Add');
    wrapper.find('.empty-pinboard-description').text().should.containEql(
      'Add officers, or complaint records through search.'
    ).and.containEql('Or use an example pinboard as a baseline to get started.');

    const examplePinboardLinks = wrapper.find(Link);
    examplePinboardLinks.should.have.length(2);

    examplePinboardLinks.at(0).prop('to').should.equal('/pinboard/66ef1561/');
    examplePinboardLinks.at(0).find('.title').text().should.equal('Pinboard 1');
    examplePinboardLinks.at(0).find('.description').text().should.equal('Description 1…');

    examplePinboardLinks.at(1).prop('to').should.equal('/pinboard/66ef1562/');
    examplePinboardLinks.at(1).find('.title').text().should.equal('Pinboard 2');
    examplePinboardLinks.at(1).find('.description').text().should.equal('Description 2…');

    wrapper.find('.arrow-head').exists().should.be.true();
    wrapper.find('.arrow-shaft').exists().should.be.true();
  });
});
