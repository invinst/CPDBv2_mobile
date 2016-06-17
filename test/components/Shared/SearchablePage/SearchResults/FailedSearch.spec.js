import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import should from 'should';
import shouldReact from 'utils/tests/should/React';

import FailedSearch from 'components/Shared/SearchablePage/SearchResults/FailedSearch';


describe('FailedSearchComponent', () => {
  it('should be renderable', () => {
    FailedSearch.should.be.renderable();
  });

  it('should render there\'s `no matches yet` if user still need to input more to get the results', () => {
    var failedSearch = ReactTestUtils.renderIntoDocument(
      <FailedSearch term='123'/>
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(failedSearch, 'failed-search').
      textContent.should.containEql('No matches yet.');
  });

  it('should render there\'s `no results` if user still need to input more to get the results', () => {
    var failedSearch = ReactTestUtils.renderIntoDocument(
      <FailedSearch term='kevin'/>
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(failedSearch, 'failed-search').
      textContent.should.containEql('Sorry, there\'s no results for your search in the database.');
  });
});
