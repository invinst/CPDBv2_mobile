import React from 'react';
import { Link } from 'react-router-dom';

import { mountWithRouter } from 'utils/tests';
import SearchBar from 'components/pinboard-page/search-bar';


describe('<SearchBar /> of PinboardPage', function () {
  it('should render correctly', function () {
    const searchBar = mountWithRouter(<SearchBar />);
    searchBar.find(Link).props().to.should.eql('/search/');
    searchBar.find('.search-term').text().should.equal('Search');
  });
});
