import React from 'react';
import { shallow, mount } from 'enzyme';
import should from 'should';
import { Link } from 'react-router';
import { stub, useFakeTimers } from 'sinon';

import RelevantComplaintCard, { RelevantComplaintCardWithUndo }
  from 'components/pinboard-page/relevant/relevant-complaints/relevant-complaint-card';
import BaseComplaintCard from 'components/pinboard-page/relevant/common/base-complaint-card';
import constants from 'constants';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';


describe('<RelevantComplaintCard />', function () {
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

  it('should render enough content correctly', function () {
    const addItemInPinboardPageStub = stub();

    const wrapper = mount(
      <RelevantComplaintCard
        crid='123'
        incidentDate='Feb 1, 2018'
        category='False Arrest'
        officers={ officers }
        point={ { lat: 41.7924183, lon: -87.668458 } }
        addItemInPinboardPage={ addItemInPinboardPageStub }
      />
    );

    const baseComplaintCard = wrapper.find(BaseComplaintCard);
    baseComplaintCard.prop('crid').should.eql('123');
    baseComplaintCard.prop('incidentDate').should.eql('Feb 1, 2018');
    baseComplaintCard.prop('category').should.eql('False Arrest');
    baseComplaintCard.prop('officers').should.eql(officers);
    baseComplaintCard.prop('point').should.eql({ lat: 41.7924183, lon: -87.668458 });
    baseComplaintCard.prop('addItemInPinboardPage').should.eql(addItemInPinboardPageStub);
    baseComplaintCard.prop('leftChild').props.to.should.eql('/complaint/123/');
    baseComplaintCard.prop('leftChild').props.style.should.eql({
      background: 'url("https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/' +
        'url-https%3A%2F%2Fcpdbv21777.blob.core.windows.net%2Fassets%2Fmap-marker.png' +
        '(-87.668458,41.7924183)/-87.668458,41.7924183,12,0,0/130x176@2x?access_token' +
        '=pk.eyJ1IjoiaW52aXNpYmxlaW5zdGl0dXRlIiwiYSI6ImNpZ256bXRqMDAwMDBzeGtud3VoZGpl' +
        'NHMifQ.ky2VSGEYU5KritRMArHY-w") no-repeat center/cover'
    });
    baseComplaintCard.prop('leftChild').type.should.be.eql(Link);
  });

  it('should render when no point', function () {
    const addItemInPinboardPageStub = stub();

    const wrapper = shallow(
      <RelevantComplaintCard
        crid='123'
        incidentDate='Feb 1, 2018'
        category='False Arrest'
        officers={ [] }
        point={ null }
        addItemInPinboardPage={ addItemInPinboardPageStub }
      />
    );

    const baseComplaintCard = wrapper.find(BaseComplaintCard);
    baseComplaintCard.prop('crid').should.eql('123');
    baseComplaintCard.prop('incidentDate').should.eql('Feb 1, 2018');
    baseComplaintCard.prop('category').should.eql('False Arrest');
    baseComplaintCard.prop('officers').should.eql([]);
    should(baseComplaintCard.prop('point')).be.null();
    baseComplaintCard.prop('addItemInPinboardPage').should.eql(addItemInPinboardPageStub);
    baseComplaintCard.prop('leftChild').props.to.should.eql('/complaint/123/');
    should(baseComplaintCard.prop('leftChild').props.style).be.null();
    baseComplaintCard.prop('leftChild').type.should.be.eql(Link);
  });

  describe('RelevantComplaintCardWithUndo component', function () {
    let clock;

    beforeEach(function () {
      clock = useFakeTimers();
    });

    afterEach(function () {
      clock.restore();
    });

    it('should render remove text correctly', function () {
      const addItemInPinboardPageStub = stub();
      const wrapper = mount(
        <RelevantComplaintCardWithUndo
          crid='123'
          incidentDate='Feb 1, 2018'
          category='False Arrest'
          officers={ [] }
          point={ null }
          addItemInPinboardPage={ addItemInPinboardPageStub }
        />
      );
      const plusButton = wrapper.find(PlusButton);

      plusButton.simulate('click');

      wrapper.find('.undo-card-text').text().should.equal('Complaint added.');
    });

    it('should not be reversed after the undo card disappears', function () {
      const addItemInPinboardPageStub = stub();
      const wrapper = mount(
        <RelevantComplaintCardWithUndo
          crid='123'
          incidentDate='Feb 1, 2018'
          category='False Arrest'
          officers={ [] }
          point={ null }
          addItemInPinboardPage={ addItemInPinboardPageStub }
        />
      );
      const plusButton = wrapper.find(PlusButton);

      plusButton.simulate('click');

      clock.tick(constants.PINBOARD_PAGE.UNDO_CARD_VISIBLE_TIME + 50);

      wrapper.isEmptyRender().should.be.true();
    });
  });
});
