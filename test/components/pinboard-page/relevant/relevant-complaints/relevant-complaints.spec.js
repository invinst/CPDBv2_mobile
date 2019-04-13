import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';

import RelevantInfiniteCarousel from 'components/pinboard-page/relevant/common/relevant-infinite-carousel';
import RelevantComplaints from 'components/pinboard-page/relevant/relevant-complaints';
import RelevantComplaintCard from 'components/pinboard-page/relevant/relevant-complaints/relevant-complaint-card';


describe('<RelevantComplaints />', function () {
  it('should render enough content correctly', function () {
    const firstOfficers = [{
      fullName: 'Scott Mc Kenna',
      id: 32172,
      shortName: 'S. Kenna',
      percentile: {
        textColor: '#DFDFDF',
        visualTokenBackground: '#f0201e',
        year: 2016,
        items: [
          { axis: 'Use of Force Reports', value: 63.0035 },
          { axis: 'Internal Allegations', value: 88.3297 },
          { axis: 'Civilian Allegations', value: 98.7841 }
        ],
      },
    }, {
      fullName: 'Edwin Utreras',
      id: 32384,
      shortName: 'E. Utreras',
      percentile: {
        textColor: '#DFDFDF',
        visualTokenBackground: '#f0201e',
        year: 2016,
        items: [
          { axis: 'Use of Force Reports', value: 78.2707 },
          { axis: 'Internal Allegations', value: 0 },
          { axis: 'Civilian Allegations', value: 98.5549 }
        ],
      },
    }, {
      fullName: 'Joy Mcclain',
      id: 32176,
      shortName: 'J. Mcclain',
      percentile: {
        textColor: '#DFDFDF',
        visualTokenBackground: '#f52524',
        year: 2016,
        items: [
          { axis: 'Use of Force Reports', value: 84.1654 },
          { axis: 'Internal Allegations', value: 0 },
          { axis: 'Civilian Allegations', value: 97.0899 },
        ],
      },
    }];
    const complaints = [{
      category: 'False Arrest',
      crid: '1089128',
      incidentDate: 'Feb 1, 2018',
      point: {
        lat: 41.7924183,
        lon: -87.668458,
      },
      officers: firstOfficers,
    }, {
      category: 'Unknown',
      crid: '1085255',
      incidentDate: 'May 18, 2017',
      point: {
        lat: 41.800831,
        lon: -87.6222052,
      },
      officers: [],
    }];
    const addItemToPinboardStub = stub();
    const fetchPinboardRelevantComplaintsStub = stub();

    const wrapper = shallow(
      <RelevantComplaints
        addItemToPinboard={ addItemToPinboardStub }
        fetchPinboardRelevantComplaints={ fetchPinboardRelevantComplaintsStub }
        complaints={ complaints }
        hasMore={ true }
        pinboardId='66ef1560'
        nextParams={ { limit: 20, offset: 20 } }
      />
    );

    const relevantInfiniteCarousel = wrapper.find(RelevantInfiniteCarousel);
    relevantInfiniteCarousel.prop('title').should.eql('COMPLAINTS');
    relevantInfiniteCarousel.prop('hasMore').should.be.true();

    const RelevantComplaintCards = relevantInfiniteCarousel.find(RelevantComplaintCard);
    RelevantComplaintCards.should.have.length(2);

    RelevantComplaintCards.at(0).prop('crid').should.eql('1089128');
    RelevantComplaintCards.at(0).prop('incidentDate').should.eql('Feb 1, 2018');
    RelevantComplaintCards.at(0).prop('category').should.eql('False Arrest');
    RelevantComplaintCards.at(0).prop('officers').should.eql(firstOfficers);
    RelevantComplaintCards.at(0).prop('point').should.eql({ lat: 41.7924183, lon: -87.668458 });
    RelevantComplaintCards.at(0).prop('addItemToPinboard').should.eql(addItemToPinboardStub);

    RelevantComplaintCards.at(1).prop('crid').should.eql('1085255');
    RelevantComplaintCards.at(1).prop('incidentDate').should.eql('May 18, 2017');
    RelevantComplaintCards.at(1).prop('category').should.eql('Unknown');
    RelevantComplaintCards.at(1).prop('officers').should.eql([]);
    RelevantComplaintCards.at(1).prop('point').should.eql({ lat: 41.800831, lon: -87.6222052 });
    RelevantComplaintCards.at(1).prop('addItemToPinboard').should.eql(addItemToPinboardStub);

    relevantInfiniteCarousel.prop('loadMore')();
    fetchPinboardRelevantComplaintsStub.should.be.calledOnce();
    fetchPinboardRelevantComplaintsStub.should.be.calledWith('66ef1560', { limit: 20, offset: 20 });
  });
});
