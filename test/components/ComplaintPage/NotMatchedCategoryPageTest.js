import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import should from 'should';

import shouldReact from 'utils/tests/should/React';
import sharedExample from 'utils/tests/should/SharedExample';
import searchablePage from 'examples/components/SearchablePage';


import NotMatchedCategoryPage from 'components/ComplaintPage/NotMatchedCategoryPage.react';


describe('NotMatchedCategoryPageComponent', () => {
  let notMatchedCategoryPage;

  it('should be renderable', () => {
    NotMatchedCategoryPage.should.be.renderable();
  });

  it('should render the message', () => {
    notMatchedCategoryPage = ReactTestUtils.renderIntoDocument(
      <NotMatchedCategoryPage />
    );
    ReactTestUtils.findRenderedDOMComponentWithClass(notMatchedCategoryPage, 'message-content')
      .textContent.should.containEql('The complaint with this category');
  });

  describe('should act like a searchable page', () => {
    (() => {
      return ReactTestUtils.renderIntoDocument(
        <NotMatchedCategoryPage />
      );
    }).should.behaveLike('a searchable page');
  });
});
