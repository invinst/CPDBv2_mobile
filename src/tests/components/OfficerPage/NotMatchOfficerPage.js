let ReactTestUtils, NotMatchedOfficerPage;

import React from 'react';
ReactTestUtils = require('react-addons-test-utils');

require('should');

require('utils/tests/should/React');
require('utils/tests/should/SharedExample');
require('tests/examples/components/SearchablePage');

NotMatchedOfficerPage = require('components/OfficerPage/NotMatchedOfficerPage.react');


describe('NotMatchedOfficerPageComponent', () => {
  let notMatchedOfficerPage;

  it('should be renderable', () => {
    NotMatchedOfficerPage.should.be.renderable();
  });

  it('should render the message with decoded categoryId', () => {
    const id = 12345;

    notMatchedOfficerPage = ReactTestUtils.renderIntoDocument(
    notMatchedOfficerPage = ReactTestUtils.renderIntoDocument(
      <NotMatchedOfficerPage id={ id }/>
    );
    ReactTestUtils.findRenderedDOMComponentWithClass(notMatchedOfficerPage, 'message-content')
      .textContent.should.containEql(id);
  });

  describe('should act like a searchable page', () => {
    (() => {
      return ReactTestUtils.renderIntoDocument(
      return ReactTestUtils.renderIntoDocument(
        <NotMatchedOfficerPage />
      );
    }).should.behaveLike('a searchable page');
  });
});
