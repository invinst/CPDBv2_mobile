let OfficerCard, ReactTestUtils;

import React from 'react';
require('react-dom');
ReactTestUtils = require('react-addons-test-utils');

require('should');
require('utils/tests/should/React');

OfficerCard = require('components/Shared/OfficerCard.react');


describe('officerCard component', () => {
  let officerCard;

  it('should be renderable', () => {
    OfficerCard.should.be.renderable();
  });

  it('should display officer name information', () => {
    const displayName = 'test name';

    officerCard = ReactTestUtils.renderIntoDocument(
    officerCard = ReactTestUtils.renderIntoDocument(
      <OfficerCard displayName={ displayName } />
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(officerCard, 'name bold')
      .textContent.should.be.containEql(displayName);
  });

  it('should display officer description information', () => {
    const description = 'test description';

    officerCard = ReactTestUtils.renderIntoDocument(
    officerCard = ReactTestUtils.renderIntoDocument(
      <OfficerCard description={ description } />
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(officerCard, 'description')
      .textContent.should.be.containEql(description);
  });

  it('should render color circle which show how dangerous an officer is', () => {
    officerCard = ReactTestUtils.renderIntoDocument(
    officerCard = ReactTestUtils.renderIntoDocument(
      <OfficerCard />
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(officerCard, 'circle').should.be.ok;
  });

  // TODO: Should have a test for include color level here and remove the corresponding integration tests
});
