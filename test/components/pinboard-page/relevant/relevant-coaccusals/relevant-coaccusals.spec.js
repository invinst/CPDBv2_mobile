import React from 'react';
import sinon from 'sinon';

import { mountWithRouter } from 'utils/tests';
import RelevantInfiniteCarousel from 'components/pinboard-page/relevant/common/relevant-infinite-carousel';
import RelevantCoaccusals from 'components/pinboard-page/relevant/relevant-coaccusals';
import RelevantCoaccusalCard, { RelevantCoaccusalCardWithUndo }
  from 'components/pinboard-page/relevant/relevant-coaccusals/relevant-coaccusal-card';


describe('<RelevantCoaccusals />', function () {
  it('should render enough content correctly', function () {
    const coaccusals = [{
      id: 123,
      fullName: 'Jerome Finnigan',
      percentile: {},
      rank: 'Officer',
      coaccusalCount: 11,
    }, {
      id: 456,
      fullName: 'Jerome Turbyville',
      percentile: {},
      rank: 'Police Officer',
      coaccusalCount: 0,
    }];
    const addItemInPinboardPageStub = sinon.stub();
    const fetchPinboardRelevantCoaccusalsStub = sinon.stub();

    const wrapper = mountWithRouter(
      <RelevantCoaccusals
        requesting={ false }
        addItemInPinboardPage={ addItemInPinboardPageStub }
        fetchPinboardRelevantCoaccusals={ fetchPinboardRelevantCoaccusalsStub }
        coaccusals={ coaccusals }
        hasMore={ true }
        pinboardId='66ef1560'
        nextParams={ { limit: 20, offset: 20 } }
      />
    );

    const relevantInfiniteCarousel = wrapper.find(RelevantInfiniteCarousel);
    relevantInfiniteCarousel.prop('title').should.eql('COACCUSALS');
    relevantInfiniteCarousel.prop('hasMore').should.be.true();
    relevantInfiniteCarousel.prop('requesting').should.be.false();

    const relevantCoaccusalCards = relevantInfiniteCarousel.find(RelevantCoaccusalCard);
    const relevantCoaccusalCardsWithUndo = relevantInfiniteCarousel.find(RelevantCoaccusalCardWithUndo);
    relevantCoaccusalCards.should.have.length(2);
    relevantCoaccusalCardsWithUndo.should.have.length(2);

    relevantCoaccusalCardsWithUndo.at(0).prop('addItemInPinboardPage').should.eql(addItemInPinboardPageStub);
    relevantCoaccusalCards.at(0).prop('id').should.eql(123);
    relevantCoaccusalCards.at(0).prop('fullName').should.eql('Jerome Finnigan');
    relevantCoaccusalCards.at(0).prop('percentile').should.eql({});
    relevantCoaccusalCards.at(0).prop('rank').should.eql('Officer');
    relevantCoaccusalCards.at(0).prop('coaccusalCount').should.eql(11);

    relevantCoaccusalCardsWithUndo.at(1).prop('addItemInPinboardPage').should.eql(addItemInPinboardPageStub);
    relevantCoaccusalCards.at(1).prop('id').should.eql(456);
    relevantCoaccusalCards.at(1).prop('fullName').should.eql('Jerome Turbyville');
    relevantCoaccusalCards.at(1).prop('percentile').should.eql({});
    relevantCoaccusalCards.at(1).prop('rank').should.eql('Police Officer');
    relevantCoaccusalCards.at(1).prop('coaccusalCount').should.eql(0);

    relevantInfiniteCarousel.prop('loadMore')();
    fetchPinboardRelevantCoaccusalsStub.should.be.calledOnce();
    fetchPinboardRelevantCoaccusalsStub.should.be.calledWith('66ef1560', { limit: 20, offset: 20 });
  });
});
