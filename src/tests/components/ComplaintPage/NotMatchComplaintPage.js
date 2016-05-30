let ReactTestUtils, NotMatchedComplaintPage;

import React from 'react';
ReactTestUtils = require('react-addons-test-utils');

require('should');

require('utils/tests/should/React');
require('utils/tests/should/SharedExample');
require('tests/examples/components/SearchablePage');

NotMatchedComplaintPage = require('components/ComplaintPage/NotMatchedComplaintPage.react');


describe('NotMatchedComplaintPageComponent', () => {
  let notMatchedComplaintPage;

  it('should be renderable', () => {
    NotMatchedComplaintPage.should.be.renderable();
  });

  it('should render the message with decoded categoryId', () => {
    const crid = '12345';

    notMatchedComplaintPage = ReactTestUtils.renderIntoDocument(
    notMatchedComplaintPage = ReactTestUtils.renderIntoDocument(
      <NotMatchedComplaintPage crid={ crid }/>
    );
    ReactTestUtils.findRenderedDOMComponentWithClass(notMatchedComplaintPage, 'message-content')
      .textContent.should.containEql(crid);
  });

  describe('should act like a searchable page', () => {
    (() => {
      return ReactTestUtils.renderIntoDocument(
      return ReactTestUtils.renderIntoDocument(
        <NotMatchedComplaintPage />
      );
    }).should.behaveLike('a searchable page');
  });
});
