import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import * as ReactRouter from 'react-router';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router, createMemoryHistory, Route } from 'react-router';

import PinboardPage from 'components/pinboard-page';
import PinnedOfficersContainer from 'containers/pinboard-page/pinned-officers';
import PinnedCRsContainer from 'containers/pinboard-page/pinned-crs';
import PinnedTRRsContainer from 'containers/pinboard-page/pinned-trrs';
import SearchBar from 'components/pinboard-page/search-bar';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section/index';
import RelevantSectionContainer from 'containers/pinboard-page/relevant-section';
import Footer from 'components/footer';


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
          pinboard={ { id: '5cd06f2b', url: '/pinboard/5cd06f2b/new-title/' } }
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

    replaceStub.calledWith('/pinboard/5cd06f2b/new-title/');
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
          pinboard={ { id: '5cd06f2b', 'crids': ['123'] } }
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
          pinboard={ { id: '5cd06f2b', 'crids': ['123'] } }
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
  });

  it('should render EmptyPinboard instead of pinboard contents if pinboard is empty', function () {
    const store = MockStore()({
      pinboard: {
        title: 'This is pinboard title',
        description: 'This is pinboard description',
      },
      pinboardPage: {
        graphData: {},
        relevantDocuments: defaultPaginationState,
        relevantCoaccusals: defaultPaginationState,
        relevantComplaints: defaultPaginationState,
      }
    });

    const pinboard = {
      title: 'This is pinboard title',
      description: 'This is pinboard description',
    };

    const wrapper = mount(
      <Provider store={ store }>
        <PinboardPage
          params={ { pinboardId: '5cd06f2b' } }
          pinboard={ pinboard }
          isEmptyPinboard={ true }
        />
      </Provider>
    );

    wrapper.getDOMNode().className.should.containEql('empty');

    wrapper.find(PinboardPaneSection).should.have.length(0);
    wrapper.find('.pinboard-title').should.have.length(0);
    wrapper.find('.pinboard-description').should.have.length(0);
    wrapper.find(RelevantSectionContainer).should.have.length(0);

    wrapper.find('.empty-pinboard-title').text().should.equal('Add');
    wrapper.find('.empty-pinboard-description').text().should.containEql(
      'Add officers, or complaint records through search.'
    ).and.containEql('Or use an example pinboard as a baseline to get started.');

    wrapper.find('.helper-row').should.have.length(2);
    const helperHeaders = wrapper.find('.helper-header');
    const helperTexts = wrapper.find('.helper-text');
    const helperArrows = wrapper.find('.helper-arrow');

    helperHeaders.should.have.length(2);
    helperTexts.should.have.length(2);
    helperArrows.should.have.length(2);

    helperHeaders.at(0).text().should.equal('Repeaters');
    helperHeaders.at(1).text().should.equal('Skullcap crew');
    helperTexts.at(0).text().should.equal(
      'Officers with at least 10 complaints against them generate 64% of all complaints.'
    );
    helperTexts.at(1).text().should.equal(
      'Dogged by allegations of abuse, members of the group have been named in more than 20 federal lawsuits – yet h…'
    );

    wrapper.find('.arrow-head').exists().should.be.true();
    wrapper.find('.arrow-shaft').exists().should.be.true();
    wrapper.find(Footer).exists().should.be.true();
  });
});
