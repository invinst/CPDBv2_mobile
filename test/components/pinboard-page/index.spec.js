import React from 'react';
import { mount } from 'enzyme';
import { spy, stub } from 'sinon';
import * as ReactRouter from 'react-router';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import PinboardPage from 'components/pinboard-page';
import PinnedOfficersContainer from 'containers/pinboard-page/pinned-officers';
import PinnedCRsContainer from 'containers/pinboard-page/pinned-crs';
import PinnedTRRsContainer from 'containers/pinboard-page/pinned-trrs';
import SearchBar from 'components/pinboard-page/search-bar';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section/index';


describe('<PinboardPage />', function () {
  const defaultPaginationState = {
    items: [],
    count: 0,
    pagination: { next: null, previous: null }
  };

  const store = MockStore()({
    pinboardPage: {
      pinboard: {
        title: 'This is pinboard title',
        description: 'This is pinboard description',
        'officer_ids': [1, 2],
        'crids': ['123456', '654321'],
        'trr_ids': ['123', '456'],
      },
      graphData: {},
      relevantDocuments: defaultPaginationState,
      relevantCoaccusals: defaultPaginationState,
      relevantComplaints: defaultPaginationState,
    }
  });

  context('when the component is mounted', function () {
    it('should dispatch only fetchPinboard if ID on params and in store are differenct', function () {
      const fetchPinboard = spy();
      const fetchPinboardComplaints = spy();
      const fetchPinboardOfficers = spy();
      const fetchPinboardTRRs = spy();
      const fetchPinboardSocialGraph = spy();
      const fetchPinboardGeographicData = spy();
      const fetchPinboardRelevantDocuments = spy();
      const fetchPinboardRelevantCoaccusals = spy();
      const fetchPinboardRelevantComplaints = spy();

      mount(
        <Provider store={ store }>
          <PinboardPage
            fetchPinboard={ fetchPinboard }
            fetchPinboardComplaints={ fetchPinboardComplaints }
            fetchPinboardOfficers={ fetchPinboardOfficers }
            fetchPinboardTRRs={ fetchPinboardTRRs }
            fetchPinboardSocialGraph={ fetchPinboardSocialGraph }
            fetchPinboardGeographicData={ fetchPinboardGeographicData }
            fetchPinboardRelevantDocuments={ fetchPinboardRelevantDocuments }
            fetchPinboardRelevantCoaccusals={ fetchPinboardRelevantCoaccusals }
            fetchPinboardRelevantComplaints={ fetchPinboardRelevantComplaints }
            params={ { pinboardId: '5cd06f2b' } }
            pinboard={ { id: null } }
          />
        </Provider>
      );

      fetchPinboard.calledWith('5cd06f2b').should.be.true();
      fetchPinboardComplaints.called.should.be.false();
      fetchPinboardOfficers.called.should.be.false();
      fetchPinboardTRRs.called.should.be.false();
      fetchPinboardSocialGraph.called.should.be.false();
      fetchPinboardGeographicData.called.should.be.false();
      fetchPinboardRelevantDocuments.called.should.be.false();
      fetchPinboardRelevantCoaccusals.called.should.be.false();
      fetchPinboardRelevantComplaints.called.should.be.false();
    });

    it('should dispatch fetchPinboard and all data if ID on params and in store are same', function () {
      const fetchPinboard = spy();
      const fetchPinboardComplaints = spy();
      const fetchPinboardOfficers = spy();
      const fetchPinboardTRRs = spy();
      const fetchPinboardSocialGraph = spy();
      const fetchPinboardGeographicData = spy();
      const fetchPinboardRelevantDocuments = spy();
      const fetchPinboardRelevantCoaccusals = spy();
      const fetchPinboardRelevantComplaints = spy();
      mount(
        <Provider store={ store }>
          <PinboardPage
            fetchPinboard={ fetchPinboard }
            fetchPinboardComplaints={ fetchPinboardComplaints }
            fetchPinboardOfficers={ fetchPinboardOfficers }
            fetchPinboardTRRs={ fetchPinboardTRRs }
            fetchPinboardSocialGraph={ fetchPinboardSocialGraph }
            fetchPinboardGeographicData={ fetchPinboardGeographicData }
            fetchPinboardRelevantDocuments={ fetchPinboardRelevantDocuments }
            fetchPinboardRelevantCoaccusals={ fetchPinboardRelevantCoaccusals }
            fetchPinboardRelevantComplaints={ fetchPinboardRelevantComplaints }
            params={ { pinboardId: '5cd06f2b' } }
            pinboard={ { id: '5cd06f2b' } }
          />
        </Provider>
      );

      fetchPinboard.calledWith('5cd06f2b').should.be.true();
      fetchPinboardComplaints.calledWith('5cd06f2b').should.be.true();
      fetchPinboardOfficers.calledWith('5cd06f2b').should.be.true();
      fetchPinboardTRRs.calledWith('5cd06f2b').should.be.true();
      fetchPinboardSocialGraph.calledWith('5cd06f2b').should.be.true();
      fetchPinboardGeographicData.calledWith('5cd06f2b').should.be.true();
      fetchPinboardRelevantDocuments.calledWith('5cd06f2b').should.be.true();
      fetchPinboardRelevantCoaccusals.calledWith('5cd06f2b').should.be.true();
      fetchPinboardRelevantComplaints.calledWith('5cd06f2b').should.be.true();
    });
  });

  it('should replace url and get data on ID updated', function () {
    const replaceStub = stub(ReactRouter.browserHistory, 'replace');
    const fetchPinboard = spy();
    const fetchPinboardComplaints = spy();
    const fetchPinboardOfficers = spy();
    const fetchPinboardTRRs = spy();
    const fetchPinboardSocialGraph = spy();
    const fetchPinboardGeographicData = spy();
    const fetchPinboardRelevantDocuments = spy();
    const fetchPinboardRelevantCoaccusals = spy();
    const fetchPinboardRelevantComplaints = spy();

    const instance = mount(
      <Provider store={ store }>
        <PinboardPage
          fetchPinboard={ fetchPinboard }
          fetchPinboardComplaints={ fetchPinboardComplaints }
          fetchPinboardOfficers={ fetchPinboardOfficers }
          fetchPinboardTRRs={ fetchPinboardTRRs }
          fetchPinboardRelevantDocuments={ fetchPinboardRelevantDocuments }
          fetchPinboardRelevantCoaccusals={ fetchPinboardRelevantCoaccusals }
          fetchPinboardRelevantComplaints={ fetchPinboardRelevantComplaints }
          params={ { pinboardId: '5cd06f2b' } }
          pinboard={ { id: '5cd06f2b' } }
        />
      </Provider>
    );

    instance.setProps( { children: (
      <PinboardPage
        fetchPinboard={ fetchPinboard }
        fetchPinboardComplaints={ fetchPinboardComplaints }
        fetchPinboardOfficers={ fetchPinboardOfficers }
        fetchPinboardTRRs={ fetchPinboardTRRs }
        fetchPinboardSocialGraph={ fetchPinboardSocialGraph }
        fetchPinboardGeographicData={ fetchPinboardGeographicData }
        fetchPinboardRelevantDocuments={ fetchPinboardRelevantDocuments }
        fetchPinboardRelevantCoaccusals={ fetchPinboardRelevantCoaccusals }
        fetchPinboardRelevantComplaints={ fetchPinboardRelevantComplaints }
        params={ { pinboardId: '5cd06f2b' } }
        pinboard={ { id: '5e2372a0' } }
      />
    ) });

    replaceStub.calledWith('/pinboard/5e2372a0/');
    fetchPinboardComplaints.calledWith('5e2372a0').should.be.true();
    fetchPinboardOfficers.calledWith('5e2372a0').should.be.true();
    fetchPinboardTRRs.calledWith('5e2372a0').should.be.true();
    fetchPinboardSocialGraph.calledWith('5e2372a0').should.be.true();
    fetchPinboardGeographicData.calledWith('5e2372a0').should.be.true();
    fetchPinboardRelevantDocuments.calledWith('5e2372a0').should.be.true();
    fetchPinboardRelevantCoaccusals.calledWith('5e2372a0').should.be.true();
    fetchPinboardRelevantComplaints.calledWith('5e2372a0').should.be.true();

    replaceStub.restore();
  });

  it('should render PinnedSection component', function () {
    const itemsByTypes = {
      'OFFICER': [],
      'CR': [],
      'TRR': [],
    };
    const removeItemInPinboardPage = spy();
    const wrapper = mount(
      <Provider store={ store }>
        <PinboardPage
          itemsByTypes={ itemsByTypes }
          removeItemInPinboardPage={ removeItemInPinboardPage }
          params={ { pinboardId: '5cd06f2b' } }
          pinboard={ { id: '5cd06f2b' } }
        />
      </Provider>
    );

    wrapper.exists('.pinned-section').should.be.true();
    wrapper.exists(PinnedOfficersContainer).should.be.true();
    wrapper.exists(PinnedCRsContainer).should.be.true();
    wrapper.exists(PinnedTRRsContainer).should.be.true();
  });

  it('should render SearchBar component', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <PinboardPage
          params={ { pinboardId: '5cd06f2b' } }
          pinboard={ { id: '5cd06f2b' } }
        />
      </Provider>
    );

    wrapper.exists(SearchBar).should.be.true();
  });

  it('should render pinboard page correctly', function () {
    const pinboard = {
      title: 'This is pinboard title',
      description: 'This is pinboard description',
      'officer_ids': [8652, 123],
      crids: ['123456', '654321'],
    };

    const wrapper = mount(
      <Provider store={ store }>
        <PinboardPage
          params={ { pinboardId: '5cd06f2b' } }
          pinboard={ pinboard }
        />
      </Provider>
    );

    wrapper.find(PinboardPaneSection).should.have.length(1);
    wrapper.find('.pinboard-title').text().should.equal('This is pinboard title');
    wrapper.find('.pinboard-description').text().should.equal('This is pinboard description');
  });
});
