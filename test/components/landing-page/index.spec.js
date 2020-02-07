import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router';

import constants from 'constants';
import LandingPage from 'components/landing-page';
import Footer from 'components/footer';


describe('<LandingPage />', function () {
  it('should render footer', function () {
    const wrapper = shallow(<LandingPage />);
    wrapper.find(Footer).exists().should.be.true();
  });

  it('should render fake search input box that links to search page', function () {
    const wrapper = shallow(<LandingPage />);
    const searchBar = wrapper.find('Link.search-bar');
    searchBar.prop('children').should.containEql('Officer name, badge number or date');
    searchBar.prop('to').should.eql(constants.SEARCH_PATH);
  });

  it('should request landing page data', function () {
    const store = configureStore()({
      landingPage: {
        topOfficersByAllegation: [1],
        recentActivities: [{ kind: 'single_officer' }],
        newDocumentAllegations: [1],
        complaintSummaries: [1],
        cmsRequested: true,
      },
    });

    const spyRequestCMS = sinon.spy();
    mount(
      <Provider store={ store }>
        <MemoryRouter>
          <LandingPage
            cmsRequested={ false }
            requestCMS={ spyRequestCMS }
            location='location'
            routes='routes'
            params='params'
          />
        </MemoryRouter>
      </Provider>
    );
    spyRequestCMS.calledWith().should.be.true();
  });
});
