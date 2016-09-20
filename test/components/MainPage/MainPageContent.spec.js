import React from 'react';
import { shallow } from 'enzyme';

import MainPageContent from 'components/MainPage/MainPageContent';
import Header from 'components/MainPage/MainPageContent/Header';
import SearchBarContainer from 'containers/Shared/SearchBarContainer';
import SearchResultsContainer from 'containers/Shared/SearchResultsContainer';


describe('<MainPageContent />', function () {
  it('should render', function () {
    let wrapper = shallow(<MainPageContent />);
    wrapper.should.be.ok();
  });

  it('should render subcomponents', function () {
    let wrapper = shallow(<MainPageContent />);
    wrapper.find(Header).should.have.length(1);
    wrapper.find(SearchBarContainer).should.have.length(1);
    wrapper.find(SearchResultsContainer).should.have.length(1);
  });
});
