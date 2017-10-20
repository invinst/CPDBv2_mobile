import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import constants from 'constants';
import LandingPage from 'components/LandingPage';


describe('<LandingPage />', function () {
  it('should render', function () {
    const wrapper = shallow(<LandingPage />);
    wrapper.should.be.ok();
  });

  it('should render title', function () {
    const wrapper = shallow(<LandingPage />);
    wrapper.text().should.containEql('Citizens Police Data Project');
  });

  it('should render fake search input box that links to search page', function () {
    const wrapper = shallow(<LandingPage />);
    const searchBar = wrapper.find('Link.search-bar');
    searchBar.prop('children').should.eql('Search');
    searchBar.prop('to').should.eql(constants.SEARCH_PATH);
  });

  it('should request landing page data on mount', function () {
    const spyRequestLandingPage = spy();
    mount(<LandingPage requestLandingPage={ spyRequestLandingPage } />);
    spyRequestLandingPage.calledWith().should.be.true();
  });
});
