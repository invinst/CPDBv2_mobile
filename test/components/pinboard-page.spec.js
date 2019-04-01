import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import PinboardPage from 'components/pinboard-page';
import AnimatedSocialGraph from 'components/common/animated-social-graph';


describe('<PinboardPage />', function () {
  const pinboard = {
    title: 'This is pinboard title',
    description: 'This is pinboard description',
    'officer_ids': [8652, 123],
    crids: ['123456', '654321'],
  };

  const graphData = {
    officers: [
      {
        fullName: 'Jerome Finnigan',
        id: 1
      },
      {
        fullName: 'Edward May',
        id: 2
      }
    ],
    coaccusedData: [
      {
        officerId1: 1,
        officerId2: 2,
        incidentDate: '1988-10-03T00:00:00Z',
        accussedCount: 1,
      }
    ],
    listEvent: [
      '1988-10-03 00:00:00+00:00',
      '1989-12-11 00:00:00+00:00',
      '1990-01-09 00:00:00+00:00',
      '1990-12-13 00:00:00+00:00',
      '1991-01-02 00:00:00+00:00',
      '1991-01-06 00:00:00+00:00',
      '1991-01-15 00:00:00+00:00',
      '1991-02-18 00:00:00+00:00',
      '1991-02-20 00:00:00+00:00',
      '1991-03-06 00:00:00+00:00'
    ]
  };

  it('should dispatch fetchPinboard and fetchPinboardSocialGraph when mounted', function () {
    const fetchPinboard = spy();
    const fetchPinboardSocialGraph = spy();
    mount(
      <PinboardPage
        fetchPinboard={ fetchPinboard }
        fetchPinboardSocialGraph={ fetchPinboardSocialGraph }
        pinboard={ pinboard }
        graphData={ graphData }
        params={ { pinboardId: 1 } }
      />
    );

    fetchPinboard.calledWith(1).should.be.true();
    fetchPinboardSocialGraph.calledWith(1).should.be.true();
  });

  it('should render pinboard page correctly', function () {
    const wrapper = mount(
      <PinboardPage
        params={ { pinboardId: 1 } }
        graphData={ graphData }
        pinboard={ pinboard }
      />
    );

    wrapper.find(AnimatedSocialGraph).should.have.length(1);
    wrapper.find('.pinboard-title').text().should.equal('This is pinboard title');
    wrapper.find('.pinboard-description').text().should.equal('This is pinboard description');
  });
});
