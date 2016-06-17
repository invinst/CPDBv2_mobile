import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import should from 'should';

import shouldReact from 'utils/tests/should/React';
import sharedExample from 'utils/tests/should/SharedExample';
import searchablePageExample from 'examples/components/SearchablePage';

import NotMatchedComplaintPage from 'components/ComplaintPage/NotMatchedComplaintPage.react';


describe('NotMatchedComplaintPageComponent', () => {
  it('should be renderable', () => {
    NotMatchedComplaintPage.should.be.renderable();
  });

  it('should render the message with decoded categoryId', () => {
    const crid = '12345';

    const notMatchedComplaintPage = ReactTestUtils.renderIntoDocument(
      <NotMatchedComplaintPage crid={ crid }/>
    );
    ReactTestUtils.findRenderedDOMComponentWithClass(notMatchedComplaintPage, 'message-content')
      .textContent.should.containEql(crid);
  });

  describe('should act like a searchable page', () => {
    (() => {
      return ReactTestUtils.renderIntoDocument(
        <NotMatchedComplaintPage />
      );
    }).should.behaveLike('a searchable page');
  });
});
