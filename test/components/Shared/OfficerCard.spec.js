import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

import should from 'should';
import shouldReact from 'utils/tests/should/React';

import OfficerCard from 'components/Shared/OfficerCard';


describe('officerCard component', () => {
  let officerCard;

  it('should be renderable', () => {
    OfficerCard.should.be.renderable();
  });

  it('should display officer name information', () => {
    const displayName = 'test name';

    officerCard = ReactTestUtils.renderIntoDocument(
      <OfficerCard displayName={ displayName } />
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(officerCard, 'name bold')
      .textContent.should.be.containEql(displayName);
  });

  it('should display officer description information', () => {
    const description = 'test description';

    officerCard = ReactTestUtils.renderIntoDocument(
      <OfficerCard description={ description } />
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(officerCard, 'description')
      .textContent.should.be.containEql(description);
  });

  it('should render color circle which show how dangerous an officer is', () => {
    officerCard = ReactTestUtils.renderIntoDocument(
      <OfficerCard />
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(officerCard, 'circle').should.be.ok;
  });

  // TODO: Should have a test for include color level here and remove the corresponding integration tests
});
