import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';

import PinboardPage from 'components/pinboard-page/index';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section';
import RelevantCoaccusalsContainer from 'containers/pinboard-page/relevant/relevant-coaccusals';
import RelevantDocumentsContainer from 'containers/pinboard-page/relevant/relevant-documents';
import RelevantComplaintsContainer from 'containers/pinboard-page/relevant/relevant-complaints';


describe('<PinboardPage />', function () {
  const pinboard = {
    title: 'This is pinboard title',
    description: 'This is pinboard description',
    'officer_ids': [8652, 123],
    crids: ['123456', '654321'],
  };

  it('should dispatch fetchPinboard, fetchPinboardSocialGraph, fetchPinboardGeographicData when mounted', function () {
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
        'crids': [],
        'trr_ids': [],
      },
      pinboardPage: {
        graphData: {},
        relevantDocuments: defaultPaginationState,
        relevantCoaccusals: defaultPaginationState,
        relevantComplaints: defaultPaginationState,
      }
    });
    const fetchPinboard = spy();
    const fetchPinboardSocialGraph = spy();
    const fetchPinboardGeographicData = spy();
    mount(
      <Provider store={ store }>
        <PinboardPage
          fetchPinboard={ fetchPinboard }
          fetchPinboardSocialGraph={ fetchPinboardSocialGraph }
          fetchPinboardGeographicData={ fetchPinboardGeographicData }
          pinboard={ pinboard }
          params={ { pinboardId: 1 } }
        />
      </Provider>
    );

    fetchPinboard.calledWith(1).should.be.true();
    fetchPinboardSocialGraph.calledWith(1).should.be.true();
    fetchPinboardGeographicData.calledWith(1).should.be.true();
  });

  it('should render pinboard page correctly', function () {
    const wrapper = shallow(
      <PinboardPage
        params={ { pinboardId: 1 } }
        pinboard={ pinboard }
      />
    );

    wrapper.find(PinboardPaneSection).should.have.length(1);
    wrapper.find('.pinboard-title').text().should.equal('This is pinboard title');
    wrapper.find('.pinboard-description').text().should.equal('This is pinboard description');

    wrapper.find('.relevant-title').text().should.equal('Relevant');
    wrapper.find(RelevantCoaccusalsContainer).exists().should.be.true();
    wrapper.find(RelevantDocumentsContainer).exists().should.be.true();
    wrapper.find(RelevantComplaintsContainer).exists().should.be.true();
  });
});
