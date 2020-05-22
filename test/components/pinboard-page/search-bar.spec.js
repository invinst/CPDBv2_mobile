import React from 'react';
import { Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { stub } from 'sinon';

import { mountWithRouter } from 'utils/tests';
import SearchBar from 'components/pinboard-page/search-bar';
import PinboardsContainer from 'containers/pinboard-page/pinboards-container';


describe('<SearchBar /> of PinboardPage', function () {
  context('isShownPinboardsList is true', function () {
    let searchBar;
    let hideShowPinboardsListStub;
    beforeEach(function () {
      const store = configureStore()({
        pinboardPage: { pinboards: [] },
      });
      hideShowPinboardsListStub = stub();
      searchBar = mountWithRouter(
        <Provider store={ store }>
          <SearchBar isShownPinboardsList={ true } hideShowPinboardsList={ hideShowPinboardsListStub } />
        </Provider>
      );
    });

    it('should render correctly', function () {
      searchBar.find(Link).props().to.should.eql('/search/');
      searchBar.find('.search-term').text().should.equal('Search');
      searchBar.find('.pinboards-list-btn').prop('className').should.containEql('display-pinboards-list');
      searchBar.find(PinboardsContainer).exists().should.be.true();
    });

    it('should call handleHideShowPinboardsList with correct params', function () {
      searchBar.find('.pinboards-list-btn').simulate('click');
      hideShowPinboardsListStub.should.be.calledOnce();
      hideShowPinboardsListStub.should.be.calledWith(false);
    });
  });

  context('isShownPinboardsList is false', function () {
    let searchBar;
    let hideShowPinboardsListStub;
    beforeEach(function () {
      const store = configureStore()({
        pinboardPage: { pinboards: [] },
      });
      hideShowPinboardsListStub = stub();
      searchBar = mountWithRouter(
        <Provider store={ store }>
          <SearchBar isShownPinboardsList={ false } hideShowPinboardsList={ hideShowPinboardsListStub } />
        </Provider>
      );
    });

    it('should render correctly', function () {
      const searchBar = mountWithRouter(<SearchBar isShownPinboardsList={ false } />);
      searchBar.find(Link).props().to.should.eql('/search/');
      searchBar.find('.search-term').text().should.equal('Search');
      searchBar.find('.pinboards-list-btn').prop('className').should.not.containEql('display-pinboards-list');
      searchBar.find(PinboardsContainer).exists().should.be.false();
    });

    it('should call handleHideShowPinboardsList with correct params', function () {
      searchBar.find('.pinboards-list-btn').simulate('click');
      hideShowPinboardsListStub.should.be.calledOnce();
      hideShowPinboardsListStub.should.be.calledWith(true);
    });
  });
});
