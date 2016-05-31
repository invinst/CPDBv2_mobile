import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import should from 'should';

import shouldReact from 'utils/tests/should/React';
import sharedExamples from 'utils/tests/should/SharedExample';
import searchablePageExample from 'examples/components/SearchablePage';

import NotMatchedOfficerPage from 'components/OfficerPage/NotMatchedOfficerPage.react';


describe('NotMatchedOfficerPageComponent', () => {
  let notMatchedOfficerPage;

  it('should be renderable', () => {
    NotMatchedOfficerPage.should.be.renderable();
  });

  it('should render the message with decoded categoryId', () => {
    const id = 12345;

    notMatchedOfficerPage = ReactTestUtils.renderIntoDocument(
      <NotMatchedOfficerPage id={ id }/>
    );
    ReactTestUtils.findRenderedDOMComponentWithClass(notMatchedOfficerPage, 'message-content')
      .textContent.should.containEql(id);
  });

  describe('should act like a searchable page', () => {
    (() => {
      return ReactTestUtils.renderIntoDocument(
        <NotMatchedOfficerPage />
      );
    }).should.behaveLike('a searchable page');
  });
});
