let FailedSearch;

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

require('should');

require('utils/tests/should/React');

FailedSearch = require('components/Shared/SearchablePage/SearchResults/FailedSearch.react');


describe('FailedSearchComponent', () => {
  it('should be renderable', () => {
    FailedSearch.should.be.renderable();
  });

  it('should render there\'s `no matches yet` if user still need to input more to get the results', () => {
    var failedSearch = ReactTestUtils.renderIntoDocument(
    var failedSearch = ReactTestUtils.renderIntoDocument(
      <FailedSearch term='123'/>
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(failedSearch, 'failed-search').
      textContent.should.containEql('No matches yet.');
  });

  it('should render there\'s `no results` if user still need to input more to get the results', () => {
    var failedSearch = ReactTestUtils.renderIntoDocument(
    var failedSearch = ReactTestUtils.renderIntoDocument(
      <FailedSearch term='kevin'/>
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(failedSearch, 'failed-search').
      textContent.should.containEql('Sorry, there\'s no results for your search in the database.');
  });
});
