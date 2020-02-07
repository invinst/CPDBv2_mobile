import React from 'react';
import { mount } from 'enzyme';
import { Link } from 'react-router-dom';

import SearchBar from 'components/pinboard-page/search-bar';


describe('<SearchBar /> of PinboardPage', function () {
  it('should render correctly', function () {
    const searchBar = mount(<SearchBar />);
    searchBar.find(Link).props().to.should.eql('/search/');
    searchBar.find('.search-term').text().should.equal('Search');
  });
});
