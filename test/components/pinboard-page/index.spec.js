import React from 'react';
import { mount } from 'enzyme';
import { spy, stub } from 'sinon';
import * as ReactRouter from 'react-router';

import PinboardPage from 'components/pinboard-page';
import PinnedSection from 'components/pinboard-page/pinned-section';
import SearchBar from 'components/pinboard-page/search-bar';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section/index';


describe('<PinboardPage />', function () {
  context('when the component is mounted', function () {
    it('should dispatch only fetchPinboard if ID on params and in store are differenct', function () {
      const fetchPinboard = spy();
      const fetchPinboardComplaints = spy();
      const fetchPinboardOfficers = spy();
      const fetchPinboardTRRs = spy();
      const fetchPinboardSocialGraph = spy();
      const fetchPinboardGeographicData = spy();
      mount(
        <PinboardPage
          fetchPinboard={ fetchPinboard }
          fetchPinboardComplaints={ fetchPinboardComplaints }
          fetchPinboardOfficers={ fetchPinboardOfficers }
          fetchPinboardTRRs={ fetchPinboardTRRs }
          fetchPinboardSocialGraph={ fetchPinboardSocialGraph }
          fetchPinboardGeographicData={ fetchPinboardGeographicData }
          params={ { pinboardId: '5cd06f2b' } }
          pinboard={ { id: null } }
        />
      );

      fetchPinboard.calledWith('5cd06f2b').should.be.true();
      fetchPinboardComplaints.called.should.be.false();
      fetchPinboardOfficers.called.should.be.false();
      fetchPinboardTRRs.called.should.be.false();
      fetchPinboardSocialGraph.called.should.be.false();
      fetchPinboardGeographicData.called.should.be.false();
    });

    it('should dispatch fetchPinboard and all data if ID on params and in store are same', function () {
      const fetchPinboard = spy();
      const fetchPinboardComplaints = spy();
      const fetchPinboardOfficers = spy();
      const fetchPinboardTRRs = spy();
      const fetchPinboardSocialGraph = spy();
      const fetchPinboardGeographicData = spy();
      mount(
        <PinboardPage
          fetchPinboard={ fetchPinboard }
          fetchPinboardComplaints={ fetchPinboardComplaints }
          fetchPinboardOfficers={ fetchPinboardOfficers }
          fetchPinboardTRRs={ fetchPinboardTRRs }
          fetchPinboardSocialGraph={ fetchPinboardSocialGraph }
          fetchPinboardGeographicData={ fetchPinboardGeographicData }
          params={ { pinboardId: '5cd06f2b' } }
          pinboard={ { id: '5cd06f2b' } }
        />
      );

      fetchPinboard.calledWith('5cd06f2b').should.be.true();
      fetchPinboardComplaints.calledWith('5cd06f2b').should.be.true();
      fetchPinboardOfficers.calledWith('5cd06f2b').should.be.true();
      fetchPinboardTRRs.calledWith('5cd06f2b').should.be.true();
      fetchPinboardSocialGraph.calledWith('5cd06f2b').should.be.true();
      fetchPinboardGeographicData.calledWith('5cd06f2b').should.be.true();
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
    const pinboardPage = mount(
      <PinboardPage
        fetchPinboard={ fetchPinboard }
        fetchPinboardComplaints={ fetchPinboardComplaints }
        fetchPinboardOfficers={ fetchPinboardOfficers }
        fetchPinboardTRRs={ fetchPinboardTRRs }
        fetchPinboardSocialGraph={ fetchPinboardSocialGraph }
        fetchPinboardGeographicData={ fetchPinboardGeographicData }
        params={ { pinboardId: '5cd06f2b' } }
        pinboard={ { id: '5cd06f2b' } }
      />
    );

    pinboardPage.setProps({ pinboard: { id: '5e2372a0' } });

    replaceStub.calledWith('/pinboard/5e2372a0/');
    fetchPinboardComplaints.calledWith('5e2372a0').should.be.true();
    fetchPinboardOfficers.calledWith('5e2372a0').should.be.true();
    fetchPinboardTRRs.calledWith('5e2372a0').should.be.true();
    fetchPinboardSocialGraph.calledWith('5e2372a0').should.be.true();
    fetchPinboardGeographicData.calledWith('5e2372a0').should.be.true();
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

  it('should render pinboard page correctly', function () {
    const pinboard = {
      title: 'This is pinboard title',
      description: 'This is pinboard description',
      'officer_ids': [8652, 123],
      crids: ['123456', '654321'],
    };

    const wrapper = mount(
      <PinboardPage
        params={ { pinboardId: 1 } }
        pinboard={ pinboard }
      />
    );

    wrapper.find(PinboardPaneSection).should.have.length(1);
    wrapper.find('.pinboard-title').text().should.equal('This is pinboard title');
    wrapper.find('.pinboard-description').text().should.equal('This is pinboard description');
  });
});
