import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';

import { SEARCH_PATH } from 'constants/paths';
import LandingPage from 'components/landing-page';
import Footer from 'components/footer';


describe('<LandingPage />', function () {
  it('should render footer', function () {
    const wrapper = shallow(<LandingPage />);
    wrapper.find(Footer).exists().should.be.true();
  });

  it('should render main title', function () {
    const wrapper = shallow(<LandingPage />);

    const documentMeta = wrapper.find(DocumentMeta).at(0);
    documentMeta.prop('title').should.equal('CPDP');
  });

  it('should render fake search input box that links to search page', function () {
    const wrapper = shallow(<LandingPage />);
    const searchBar = wrapper.find('Link.search-bar');
    searchBar.prop('children').should.containEql('Officer name, badge number or date');
    searchBar.prop('to').should.eql(SEARCH_PATH);
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

    const spyRequestCMS = spy();
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
