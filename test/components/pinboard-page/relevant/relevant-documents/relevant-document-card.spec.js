import React from 'react';
import { stub, useFakeTimers } from 'sinon';

import { mountWithRouter } from 'utils/tests';
import RelevantDocumentCard, { RelevantDocumentCardWithUndo }
  from 'components/pinboard-page/relevant/relevant-documents/relevant-document-card';
import BaseComplaintCard from 'components/pinboard-page/relevant/common/base-complaint-card';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';
import constants from 'constants';


describe('<RelevantDocumentCard />', function () {
  const officers = [{
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
        { axis: 'Civilian Allegations', value: 98.7841 },
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
        { axis: 'Civilian Allegations', value: 98.5549 },
      ],
    },
  }, {
    fullName: 'Joy Mcclain',
    id: 32176,
    shortName: 'J. Mcclain',
    percentile: {
      textColor: '#DFDFDF',
      visualTokenBackground: '#F52524',
      year: 2016,
      items: [
        { axis: 'Use of Force Reports', value: 84.1654 },
        { axis: 'Internal Allegations', value: 0 },
        { axis: 'Civilian Allegations', value: 97.0899 },
      ],
    },
  }];
  const allegation = {
    category: 'False Arrest',
    crid: '1089128',
    incidentDate: 'Feb 1, 2018',
    point: { lat: 41.7924183, lon: -87.668458 },
    officers,
  };

  it('should render enough content correctly', function () {
    const addItemInPinboardPageStub = stub();

    const wrapper = mountWithRouter(
      <RelevantDocumentCard
        url='https://www.documentcloud.org/documents/3108640/CRID-1078616-TRR-Rialmo.pdf'
        previewImageUrl='https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif'
        allegation={ allegation }
        addItemInPinboardPage={ addItemInPinboardPageStub }
        pinned={ false }
      />
    );

    const baseComplaintCard = wrapper.find(BaseComplaintCard);
    baseComplaintCard.prop('crid').should.eql('1089128');
    baseComplaintCard.prop('incidentDate').should.eql('Feb 1, 2018');
    baseComplaintCard.prop('category').should.eql('False Arrest');
    baseComplaintCard.prop('officers').should.eql(officers);
    baseComplaintCard.prop('addItemInPinboardPage').should.eql(addItemInPinboardPageStub);
    baseComplaintCard.prop('pinned').should.be.false();
    baseComplaintCard.prop('fadePlusButtonOnly').should.be.true();
    baseComplaintCard.prop('leftChild').props.href.should.eql(
      'https://www.documentcloud.org/documents/3108640/CRID-1078616-TRR-Rialmo.pdf'
    );
    baseComplaintCard.prop('leftChild').props.target.should.eql('_blank');
    baseComplaintCard.prop('leftChild').type.should.be.eql('a');

    const previewImg = wrapper.find('.document-card-thumbnail-img');
    previewImg.prop('src').should.eql(
      'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif'
    );
  });

  describe('RelevantDocumentCardWithUndo component', function () {
    let clock;

    beforeEach(function () {
      clock = useFakeTimers();
    });

    it('should render remove text correctly', function () {
      const addItemInPinboardPageStub = stub();
      const wrapper = mountWithRouter(
        <RelevantDocumentCardWithUndo
          url='https://www.documentcloud.org/documents/3108640/CRID-1078616-TRR-Rialmo.pdf'
          previewImageUrl='https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif'
          allegation={ allegation }
          addItemInPinboardPage={ addItemInPinboardPageStub }
          pinned={ false }
        />
      );
      const plusButton = wrapper.find(PlusButton);

      plusButton.simulate('click');

      wrapper.find('.undo-card-text').text().should.equal('Document added.');
    });

    it('should be reversed after the undo card disappears', function () {
      const addItemInPinboardPageStub = stub();
      const wrapper = mountWithRouter(
        <RelevantDocumentCardWithUndo
          url='https://www.documentcloud.org/documents/3108640/CRID-1078616-TRR-Rialmo.pdf'
          previewImageUrl='https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif'
          allegation={ allegation }
          addItemInPinboardPage={ addItemInPinboardPageStub }
          pinned={ false }
        />
      );
      const plusButton = wrapper.find(PlusButton);

      plusButton.simulate('click');

      clock.tick(constants.PINBOARD_PAGE.UNDO_CARD_VISIBLE_TIME + 50);
      wrapper.update();

      wrapper.find(RelevantDocumentCard).should.have.length(1);
    });
  });
});
