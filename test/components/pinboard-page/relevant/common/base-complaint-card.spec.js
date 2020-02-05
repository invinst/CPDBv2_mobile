import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import sinon from 'sinon';

import MiniVisualToken from 'components/pinboard-page/relevant/common/mini-officer-visual-token';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';
import BaseComplaintCard from 'components/pinboard-page/relevant/common/base-complaint-card';

describe('<BaseComplaintCard />', function () {
  it('should render enough content', function () {
    const officers = [{
      id: 1,
      shortName: 'R. Sullivan',
      percentile: {
        year: 2015,
        items: [
          { axis: 'Use of Force Reports', value: 20.6 },
          { axis: 'Internal Allegations', value: 10.1 },
          { axis: 'Civilian Allegations', value: 52.5 },
        ],
        visualTokenBackground: '#ed7467',
        textColor: '#231F20',
      },
    }, {
      id: 2,
      shortName: 'E. May',
      percentile: { year: 2015, items: [] },
    }, {
      id: 3,
      shortName: 'B. Lopez',
      percentile: { year: 2015, items: [] },
    }, {
      id: 4,
      percentile: { year: 2015, items: [] },
    }, {
      id: 5,
      percentile: { year: 2015, items: [] },
    }, {
      id: 6,
      percentile: { year: 2015, items: [] },
    }, {
      id: 7,
      percentile: { year: 2015, items: [] },
    }, {
      id: 8,
      percentile: { year: 2015, items: [] },
    }];
    const addItemInPinboardPage = sinon.spy();
    const wrapper = shallow(
      <BaseComplaintCard
        leftChild={ <div className='test--left-child'/> }
        url='lvh.me'
        previewImageUrl='img.lvh.me'
        crid='123'
        incidentDate='Apr 4, 2015'
        category='Unknown'
        officers={ officers }
        addItemInPinboardPage={ addItemInPinboardPage }
        pinned={ false }
      />
    );

    wrapper.find('.test--left-child').exists().should.be.true();

    const rightHalf = wrapper.find(Link);
    rightHalf.prop('to').should.eql('/complaint/123/');

    rightHalf.find('.incident-date').text().should.eql('Apr 4, 2015');
    rightHalf.find('.category').text().should.eql('Unknown');

    const miniVisualTokens = rightHalf.find(MiniVisualToken);
    miniVisualTokens.should.have.length(7);

    rightHalf.find('.top-officer-row').should.have.length(2);
    rightHalf.find('.top-officer-row-token').should.have.length(2);
    const topOfficerNames = rightHalf.find('.top-officer-row-officer-name');
    topOfficerNames.should.have.length(2);
    topOfficerNames.at(0).text().should.eql('R. Sullivan');
    topOfficerNames.at(1).text().should.eql('E. May');
    miniVisualTokens.at(0).prop('className').should.eql('top-officer-row-token');
    miniVisualTokens.at(0).prop('percentile').should.eql({
      year: 2015,
      items: [
        { axis: 'Use of Force Reports', value: 20.6 },
        { axis: 'Internal Allegations', value: 10.1 },
        { axis: 'Civilian Allegations', value: 52.5 },
      ],
      visualTokenBackground: '#ed7467',
      textColor: '#231F20',
    });
    miniVisualTokens.at(1).prop('className').should.eql('top-officer-row-token');
    miniVisualTokens.at(1).prop('percentile').should.eql({ year: 2015, items: [] });

    miniVisualTokens.at(2).prop('className').should.eql('remaining-officer');
    miniVisualTokens.at(2).prop('percentile').should.eql({ year: 2015, items: [] });
    miniVisualTokens.at(3).prop('className').should.eql('remaining-officer');
    miniVisualTokens.at(3).prop('percentile').should.eql({ year: 2015, items: [] });
    miniVisualTokens.at(4).prop('className').should.eql('remaining-officer');
    miniVisualTokens.at(4).prop('percentile').should.eql({ year: 2015, items: [] });
    miniVisualTokens.at(5).prop('className').should.eql('remaining-officer');
    miniVisualTokens.at(5).prop('percentile').should.eql({ year: 2015, items: [] });
    miniVisualTokens.at(6).prop('className').should.eql('remaining-officer');
    miniVisualTokens.at(6).prop('percentile').should.eql({ year: 2015, items: [] });

    rightHalf.find('.not-showing-officer-count').text().should.eql('1+');

    rightHalf.find(PlusButton).exists().should.be.true();
  });

  it('should hide PlusButton if pinned', function () {
    const addItemInPinboardPage = sinon.spy();
    const wrapper = shallow(
      <BaseComplaintCard
        leftChild={ <div className='test--left-child'/> }
        url='lvh.me'
        previewImageUrl='img.lvh.me'
        crid='123'
        incidentDate='Apr 4, 2015'
        category='Unknown'
        officers={ [] }
        addItemInPinboardPage={ addItemInPinboardPage }
        pinned={ true }
      />
    );
    const rightHalf = wrapper.find(Link);
    rightHalf.find(PlusButton).exists().should.be.false();
  });

  it('should call addItemInPinboardPage when clicking on PlusButton', function () {
    const addItemInPinboardPage = sinon.spy();
    const wrapper = shallow(
      <BaseComplaintCard
        leftChild={ <div className='test--left-child'/> }
        url='lvh.me'
        previewImageUrl='img.lvh.me'
        crid='123'
        incidentDate='Apr 4, 2015'
        category='Unknown'
        officers={ [] }
        addItemInPinboardPage={ addItemInPinboardPage }
        pinned={ false }
      />
    );
    const rightHalf = wrapper.find(Link);
    const plusButton = rightHalf.find(PlusButton);
    plusButton.simulate('click', { preventDefault: () => {} } );
    addItemInPinboardPage.should.be.calledWith({
      type: 'CR',
      id: '123',
      category: 'Unknown',
      incidentDate: 'Apr 4, 2015',
      point: undefined,
    });
  });
});
