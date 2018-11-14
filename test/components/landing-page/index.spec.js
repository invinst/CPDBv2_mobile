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
    searchBar.prop('children').should.containEql('Officer name, badge number, or date');
    searchBar.prop('to').should.eql(constants.SEARCH_PATH);
  });

  it('should request landing page data and pushBreadcrumb on mount', function () {
    const store = configureStore()({
      landingPage: {
        topOfficersByAllegation: [1],
        recentActivities: [{ type: 'single_officer' }],
        newDocumentAllegations: [1],
        complaintSummaries: [1],
        cmsRequested: true,
      }
    });

    const spyRequestCMS = spy();
    const pushBreadcrumbsSpy = spy();
    mount(
      <Provider store={ store }>
        <LandingPage
          cmsRequested={ false }
          requestCMS={ spyRequestCMS }
          pushBreadcrumbs={ pushBreadcrumbsSpy }
          location='location'
          routes='routes'
          params='params'
        />
      </Provider>
    );
    spyRequestCMS.calledWith().should.be.true();
    pushBreadcrumbsSpy.calledWith({
      location: 'location',
      routes: 'routes',
      params: 'params'
    }).should.be.true();
  });

  it('should call pushBreadcrumb when updating', function () {
    const pushBreadcrumbsSpy = spy();
    const wrapper = shallow(
      <LandingPage
        pushBreadcrumbs={ pushBreadcrumbsSpy }
        location='location'
        routes='routes'
        params='params'
      />
    );

    wrapper.setProps({ location: 'changed' });
    pushBreadcrumbsSpy.calledWith({
      location: 'changed',
      routes: 'routes',
      params: 'params'
    }).should.be.true();
  });
});
