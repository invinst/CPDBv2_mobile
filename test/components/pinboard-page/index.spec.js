import React from 'react';
import { mount } from 'enzyme';
import { spy, stub } from 'sinon';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { mountWithRouter } from 'utils/tests';
import PinboardPage from 'components/pinboard-page';
import PinnedOfficersContainer from 'containers/pinboard-page/pinned-officers';
import PinnedCRsContainer from 'containers/pinboard-page/pinned-crs';
import PinnedTRRsContainer from 'containers/pinboard-page/pinned-trrs';
import SearchBar from 'components/pinboard-page/search-bar';
import PinboardDataVisualization from 'components/pinboard-page/pinboard-data-visualization';
import RelevantSectionContainer from 'containers/pinboard-page/relevant-section';
import EmptyPinboardPage from 'components/pinboard-page/empty-pinboard';
import LoadingSpinner from 'components/common/loading-spinner';
import Pinboards from 'components/pinboard-page/pinboards';


describe('<PinboardPage />', function () {
  const defaultPaginationState = {
    items: [],
    count: 0,
    pagination: { next: null, previous: null },
    requesting: false,
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
      graphData: { requesting: false, data: {} },
      geographicData: { requesting: false, data: [] },
      relevantDocuments: defaultPaginationState,
      relevantCoaccusals: defaultPaginationState,
      relevantComplaints: defaultPaginationState,
      crItems: { requesting: false, items: [] },
      officerItems: { requesting: false, items: [] },
      trrItems: { requesting: false, items: [] },
      initialRequested: true,
      pinboards: [],
    },
  });

  it('should not render the pinboard if initialRequested is false', function () {
    const wrapper = mountWithRouter(
      <PinboardPage
        params={ { pinboardId: '5cd06f2b' } }
        pinboard={ { id: '5cd06f2b' } }
        initialRequested={ false }
      />
    );

    wrapper.find('pinboard-content').exists().should.be.false();
  });

  it('should render LoadingSpiner component if pinboardPageLoading is true', function () {
    const wrapper = mountWithRouter(
      <PinboardPage
        params={ { pinboardId: '5cd06f2b' } }
        pinboard={ { id: '5cd06f2b' } }
        initialRequested={ true }
        pinboardPageLoading={ true }
      />
    );

    wrapper.find(LoadingSpinner).exists().should.be.true();
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
        <MemoryRouter>
          <PinboardPage
            itemsByTypes={ itemsByTypes }
            removeItemInPinboardPage={ removeItemInPinboardPage }
            params={ { pinboardId: '5cd06f2b' } }
            pinboard={ { id: '5cd06f2b', 'crids': ['123'] } }
          />
        </MemoryRouter>
      </Provider>
    );

    wrapper.exists('.pinned-section').should.be.true();
    wrapper.exists(PinnedOfficersContainer).should.be.true();
    wrapper.exists(PinnedCRsContainer).should.be.true();
    wrapper.exists(PinnedTRRsContainer).should.be.true();
  });

  it('should render SearchBar component', function () {
    const isShownPinboardsListSpy = spy();
    stub(Pinboards.prototype, 'componentDidMount');
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <PinboardPage
            hideShowPinboardsList={ true }
            isShownPinboardsList={ isShownPinboardsListSpy }
            params={ { pinboardId: '5cd06f2b' } }
            pinboard={ { id: '5cd06f2b', 'crids': ['123'] } }
          />
        </MemoryRouter>
      </Provider>
    );
    const searchBar = wrapper.find(SearchBar);
    searchBar.exists().should.be.true();
    searchBar.prop('hideShowPinboardsList').should.be.true();
    searchBar.prop('isShownPinboardsList').should.equal(isShownPinboardsListSpy);
  });

  context('isShownPinboardsList is true', function () {
    it('should render pinboard page correctly', function () {
      const pinboard = {
        title: 'This is pinboard title',
        description: 'This is pinboard description',
        'officer_ids': [8652, 123],
        crids: ['123456', '654321'],
      };
      stub(Pinboards.prototype, 'componentDidMount');

      const wrapper = mount(
        <Provider store={ store }>
          <MemoryRouter>
            <PinboardPage
              isShownPinboardsList={ true }
              params={ { pinboardId: '5cd06f2b' } }
              pinboard={ pinboard }
            />
          </MemoryRouter>
        </Provider>
      );

      wrapper.find(PinboardDataVisualization).should.have.length(1);
      wrapper.find('.pinboard-page').prop('className').should.containEql('display-pinboards-list');
    });
  });

  context('isShownPinboardsList is false', function () {
    it('should render pinboard page correctly', function () {
      const pinboard = {
        title: 'This is pinboard title',
        description: 'This is pinboard description',
        'officer_ids': [8652, 123],
        crids: ['123456', '654321'],
      };

      const wrapper = mount(
        <Provider store={ store }>
          <MemoryRouter>
            <PinboardPage
              isShownPinboardsList={ false }
              params={ { pinboardId: '5cd06f2b' } }
              pinboard={ pinboard }
            />
          </MemoryRouter>
        </Provider>
      );

      wrapper.find('.pinboard-page').prop('className').should.not.containEql('display-pinboards-list');
    });
  });

  it('should render EmptyPinboard instead of pinboard contents if pinboard is empty', function () {
    const store = MockStore()({
      pinboardPage: {
        pinboard: {
          'example_pinboards': [{
            id: '66ef1561',
            title: 'Pinboard 1',
            description: 'Description 1',
          }, {
            id: '66ef1562',
            title: 'Pinboard 2',
            description: 'Description 2',
          }],
        },
        graphData: {},
        relevantDocuments: defaultPaginationState,
        relevantCoaccusals: defaultPaginationState,
        relevantComplaints: defaultPaginationState,
      },
    });

    const pinboard = {
      title: 'This is pinboard title',
      description: 'This is pinboard description',
    };

    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <PinboardPage
            params={ { pinboardId: '5cd06f2b' } }
            pinboard={ pinboard }
            isEmptyPinboard={ true }
          />
        </MemoryRouter>
      </Provider>
    );

    wrapper.getDOMNode().className.should.containEql('empty');

    wrapper.find(PinboardDataVisualization).should.have.length(0);
    wrapper.find('.pinboard-title').should.have.length(0);
    wrapper.find('.pinboard-description').should.have.length(0);
    wrapper.find(RelevantSectionContainer).should.have.length(0);

    const emptyPinboard = wrapper.find(EmptyPinboardPage);

    emptyPinboard.prop('examplePinboards').should.eql([{
      id: '66ef1561',
      title: 'Pinboard 1',
      description: 'Description 1',
    }, {
      id: '66ef1562',
      title: 'Pinboard 2',
      description: 'Description 2',
    }]);
  });

  it('should requestCMS if does not hasCMS', function () {
    const requestCMSSpy = spy();

    mountWithRouter(
      <PinboardPage
        params={ { pinboardId: '5cd06f2b' } }
        pinboard={ { id: '5cd06f2b' } }
        initialRequested={ false }
        hasCMS={ false }
        requestCMS={ requestCMSSpy }
      />
    );

    requestCMSSpy.should.be.calledOnce();
  });

  it('should not requestCMS if hasCMS', function () {
    const requestCMSSpy = spy();

    mountWithRouter(
      <PinboardPage
        params={ { pinboardId: '5cd06f2b' } }
        pinboard={ { id: '5cd06f2b' } }
        initialRequested={ false }
        hasCMS={ true }
        requestCMS={ requestCMSSpy }
      />
    );

    requestCMSSpy.should.not.be.calledOnce();
  });
});
