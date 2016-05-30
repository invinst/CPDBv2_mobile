let ReactTestUtils, NotMatchedCategoryPage;

import React from 'react';
ReactTestUtils = require('react-addons-test-utils');

require('should');

require('utils/tests/should/React');
require('utils/tests/should/SharedExample');
require('tests/examples/components/SearchablePage');

NotMatchedCategoryPage = require('components/ComplaintPage/NotMatchedCategoryPage.react');


describe('NotMatchedCategoryPageComponent', () => {
  let notMatchedCategoryPage;

  it('should be renderable', () => {
    NotMatchedCategoryPage.should.be.renderable();
  });

  it('should render the message', () => {
    notMatchedCategoryPage = ReactTestUtils.renderIntoDocument(
    notMatchedCategoryPage = ReactTestUtils.renderIntoDocument(
      <NotMatchedCategoryPage />
    );
    ReactTestUtils.findRenderedDOMComponentWithClass(notMatchedCategoryPage, 'message-content')
      .textContent.should.containEql('The complaint with this category');
  });

  describe('should act like a searchable page', () => {
    (() => {
      return ReactTestUtils.renderIntoDocument(
      return ReactTestUtils.renderIntoDocument(
        <NotMatchedCategoryPage />
      );
    }).should.behaveLike('a searchable page');
  });
});
