import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import PinboardPage from 'components/pinboard-page/index';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section/index';


describe('<PinboardPage />', function () {
  const pinboard = {
    title: 'This is pinboard title',
    description: 'This is pinboard description',
    'officer_ids': [8652, 123],
    crids: ['123456', '654321'],
  };

  it('should dispatch fetchPinboard, fetchPinboardSocialGraph, fetchPinboardGeographicData when mounted', function () {
    const fetchPinboard = spy();
    const fetchPinboardSocialGraph = spy();
    const fetchPinboardGeographicData = spy();
    mount(
      <PinboardPage
        fetchPinboard={ fetchPinboard }
        fetchPinboardSocialGraph={ fetchPinboardSocialGraph }
        fetchPinboardGeographicData={ fetchPinboardGeographicData }
        pinboard={ pinboard }
        params={ { pinboardId: 1 } }
      />
    );

    fetchPinboard.calledWith(1).should.be.true();
    fetchPinboardSocialGraph.calledWith(1).should.be.true();
    fetchPinboardGeographicData.calledWith(1).should.be.true();
  });

  it('should render pinboard page correctly', function () {
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
