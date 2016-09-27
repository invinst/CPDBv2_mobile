import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import MainPageContent from 'components/MainPage/MainPageContent';
import Header from 'components/MainPage/MainPageContent/Header';
import SearchBarContainer from 'containers/Shared/SearchBarContainer';
import SearchResultsContainer from 'containers/Shared/SearchResultsContainer';
import VFTGContainer from 'containers/MainPage/MainPageContent/VFTGContainer';
import About from 'components/MainPage/MainPageContent/About';
import Collaborate from 'components/MainPage/MainPageContent/Collaborate';
import Footer from 'components/MainPage/MainPageContent/Footer';


describe('<MainPageContent />', function () {
  it('should render', function () {
    let wrapper = shallow(<MainPageContent requestLandingPage={ spy() } />);
    wrapper.should.be.ok();
  });

  it('should render subcomponents', function () {
    let wrapper = shallow(<MainPageContent requestLandingPage={ spy() } />);
    wrapper.find(Header).should.have.length(1);
    wrapper.find(SearchBarContainer).should.have.length(1);
    wrapper.find(SearchResultsContainer).should.have.length(1);
    wrapper.find(VFTGContainer).should.have.length(1);
    wrapper.find(About).should.have.length(1);
    wrapper.find(Collaborate).should.have.length(1);
    wrapper.find(Footer).should.have.length(1);
  });

  it('should hide search description when searching', function () {
    let wrapper = shallow(<MainPageContent requestLandingPage={ spy() } query='something not empty' />);
    wrapper.find('.search-description .hidden').should.have.length(1);

    wrapper = shallow(<MainPageContent requestLandingPage={ spy() } query='' />);
    wrapper.find('.search-description .hidden').should.have.length(0);
  });
});
