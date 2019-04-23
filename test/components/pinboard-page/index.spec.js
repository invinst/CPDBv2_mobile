import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import PinboardPage from 'components/pinboard-page';
import PinnedSection from 'components/pinboard-page/pinned-section';
import SearchBar from 'components/pinboard-page/search-bar';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';


describe('<PinboardPage />', function () {
  const defaultPaginationState = {
    items: [],
    count: 0,
    pagination: { next: null, previous: null }
  };

  const store = MockStore()({
    pinboard: {
      title: 'This is pinboard title',
      description: 'This is pinboard description',
      'officer_ids': [1, 2],
      'crids': ['123456', '654321'],
      'trr_ids': ['123', '456'],
    },
    pinboardPage: {
      graphData: {},
      relevantDocuments: defaultPaginationState,
      relevantCoaccusals: defaultPaginationState,
      relevantComplaints: defaultPaginationState,
    }
  });

  it('should dispatch fetch pinboard data when mounted', function () {
    const fetchPinboard = spy();
    const fetchPinboardComplaints = spy();
    const fetchPinboardOfficers = spy();
    const fetchPinboardTRRs = spy();
    mount(
      <Provider store={ store }>
        <PinboardPage
          fetchPinboard={ fetchPinboard }
          fetchPinboardComplaints={ fetchPinboardComplaints }
          fetchPinboardOfficers={ fetchPinboardOfficers }
          fetchPinboardTRRs={ fetchPinboardTRRs }
          params={ { pinboardId: '5cd06f2b' } }
          pinboard={ { id: '5cd06f2b' } }
        />
     </Provider>
    );

    fetchPinboard.calledWith('5cd06f2b').should.be.true();
    fetchPinboardComplaints.calledWith('5cd06f2b').should.be.true();
    fetchPinboardOfficers.calledWith('5cd06f2b').should.be.true();
    fetchPinboardTRRs.calledWith('5cd06f2b').should.be.true();
  });

  it('should dispatch fetch pinboard data when updated', function () {
    const fetchPinboard = spy();
    const fetchPinboardComplaints = spy();
    const fetchPinboardOfficers = spy();
    const fetchPinboardTRRs = spy();
    const instance = mount(
      <Provider store={ store }>
        <PinboardPage
          fetchPinboard={ fetchPinboard }
          fetchPinboardComplaints={ fetchPinboardComplaints }
          fetchPinboardOfficers={ fetchPinboardOfficers }
          fetchPinboardTRRs={ fetchPinboardTRRs }
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
        params={ { pinboardId: '5cd06f2b' } }
        pinboard={ { id: '5e2372a0' } }
      />
    )});

    fetchPinboard.calledWith('5e2372a0').should.be.true();
    fetchPinboardComplaints.calledWith('5e2372a0').should.be.true();
    fetchPinboardOfficers.calledWith('5e2372a0').should.be.true();
    fetchPinboardTRRs.calledWith('5e2372a0').should.be.true();
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

    wrapper.exists(PinnedSection).should.be.true();
    wrapper.find(PinnedSection).props().itemsByTypes.should.equal(itemsByTypes);
    wrapper.find(PinnedSection).props().removeItemInPinboardPage.should.equal(removeItemInPinboardPage);
  });

  it('should render SearchBar component', function () {
    const wrapper = mount(<PinboardPage
      params={ { pinboardId: '5cd06f2b' } }
      pinboard={ { id: '5cd06f2b' } }
    />);

    wrapper.exists(SearchBar).should.be.true();
  });
});
