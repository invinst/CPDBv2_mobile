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

    wrapper.find('.empty-pinboard-title').text().should.equal('Get started');
    wrapper.find('.empty-pinboard-description').text().should.containEql(
      'Use search to find officers and individual complaint records ' +
      'and press the plus button to add cards to your pinboard.'
    ).and.containEql(
      'Come back to the pinboard to give it a title and see a network map or discover relevant documents.'
    );

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
