import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import PinboardPage from 'components/pinboard-page';
import PinnedSection from 'components/pinboard-page/pinned-section';
import SearchBar from 'components/pinboard-page/search-bar';


describe('<PinboardPage />', function () {
  it('should dispatch fetch pinboard data when mounted', function () {
    const fetchPinboard = spy();
    const fetchPinboardComplaints = spy();
    const fetchPinboardOfficers = spy();
    const fetchPinboardTRRs = spy();
    mount(
      <PinboardPage
        fetchPinboard={ fetchPinboard }
        fetchPinboardComplaints={ fetchPinboardComplaints }
        fetchPinboardOfficers={ fetchPinboardOfficers }
        fetchPinboardTRRs={ fetchPinboardTRRs }
        params={ { pinboardId: '5cd06f2b' } }
      />
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
    const pinboardPage = mount(
      <PinboardPage
        fetchPinboard={ fetchPinboard }
        fetchPinboardComplaints={ fetchPinboardComplaints }
        fetchPinboardOfficers={ fetchPinboardOfficers }
        fetchPinboardTRRs={ fetchPinboardTRRs }
        params={ { pinboardId: '5cd06f2b' } }
        pinboard={ { id: '5cd06f2b' } }
      />
    );

    pinboardPage.setProps({ pinboard: { id: '5e2372a0' } });

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
    const wrapper = mount(<PinboardPage
      itemsByTypes={ itemsByTypes }
      removeItemInPinboardPage={ removeItemInPinboardPage }
      params={ { pinboardId: '5cd06f2b' } }
      pinboard={ { id: '5cd06f2b' } }
    />);

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
