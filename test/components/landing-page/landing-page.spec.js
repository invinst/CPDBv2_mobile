import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import constants from 'constants';
import LandingPage from 'components/landing-page';


describe('<LandingPage />', function () {
  it('should render', function () {
    const wrapper = shallow(<LandingPage />);
    wrapper.should.be.ok();
  });

  it('should render fake search input box that links to search page', function () {
    const wrapper = shallow(<LandingPage />);
    const searchBar = wrapper.find('Link.search-bar');
    searchBar.prop('children').should.containEql('Search by officer name or badge number');
    searchBar.prop('to').should.eql(constants.SEARCH_PATH);
  });

  it('should request landing page data on mount', function () {
    const store = configureStore()({
      landingPage: {
        topOfficersByAllegation: [1],
        recentActivities: [1],
        newDocumentAllegations: [1],
        complaintSummaries: [1]
      }
    });

    const spyRequestCMS = spy();
    mount(
      <Provider store={ store }>
        <LandingPage requestCMS={ spyRequestCMS } />
      </Provider>
    );
    spyRequestCMS.calledWith().should.be.true();
  });
});
