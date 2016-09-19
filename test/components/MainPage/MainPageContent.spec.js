import React from 'react';
import { shallow } from 'enzyme';

import MainPageContent from 'components/MainPage/MainPageContent';
import ProjectSummary from 'components/MainPage/MainPageContent/ProjectSummary';
import SearchBarContainer from 'containers/Shared/SearchBarContainer';
import SearchResultsContainer from 'containers/Shared/SearchResultsContainer';


describe('<MainPageContent />', function () {
  it('should render', function () {
    let wrapper = shallow(<MainPageContent />);
    wrapper.should.be.ok();
  });

  it('should render subcomponents', function () {
    let wrapper = shallow(<MainPageContent />);
    wrapper.find(ProjectSummary).should.have.length(1);
    wrapper.find(SearchBarContainer).should.have.length(1);
    wrapper.find(SearchResultsContainer).should.have.length(1);
  });
});
