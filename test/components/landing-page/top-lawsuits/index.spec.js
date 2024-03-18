import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import { EditorState } from 'draft-js';

import { mountWithRouter } from 'utils/tests';
import TopLawsuits from 'components/landing-page/top-lawsuits';
import CarouselWrapper from 'components/landing-page/carousel-wrapper';
import TopLawsuitCard from 'components/landing-page/top-lawsuits/top-lawsuit-card';

describe('TopLawsuits component', function () {
  it('should render enough contents', function () {
    const topLawsuits = [
      { caseNo: '00-L-1234' },
      { caseNo: '00-L-1235' },
    ];
    const titleCMSContent = EditorState.createEmpty();
    const descriptionCMSContent = EditorState.createEmpty();

    const wrapper = shallow(
      <TopLawsuits
        topLawsuits={ topLawsuits }
        title={ titleCMSContent }
        description={ descriptionCMSContent }
      />
    );

    const carouselWrapper = wrapper.find(CarouselWrapper);
    carouselWrapper.prop('title').should.eql(titleCMSContent);
    carouselWrapper.prop('description').should.eql(descriptionCMSContent);
    carouselWrapper.prop('trackingContentType').should.eql('LAWSUIT');

    const topLawsuitCard = carouselWrapper.find(TopLawsuitCard);
    topLawsuitCard.should.have.length(2);
    topLawsuitCard.at(0).prop('lawsuit').should.eql({ caseNo: '00-L-1234' });
    topLawsuitCard.at(1).prop('lawsuit').should.eql({ caseNo: '00-L-1235' });
  });

  it('should call requestTopLawsuits', function () {
    const requestTopLawsuitsSpy = spy();
    mountWithRouter(
      <TopLawsuits
        requestTopLawsuits={ requestTopLawsuitsSpy }
        topLawsuits={ [
          { caseNo: '00-L-1234' },
          { caseNo: '00-L-1235' },
        ] }
      />
    );
    requestTopLawsuitsSpy.called.should.be.false();

    requestTopLawsuitsSpy.resetHistory();
    mount(
      <TopLawsuits
        requestTopLawsuits={ requestTopLawsuitsSpy }
      />
    );
    requestTopLawsuitsSpy.called.should.be.true();
  });
});
