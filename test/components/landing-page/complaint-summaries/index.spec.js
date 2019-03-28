import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import { EditorState } from 'draft-js';

import ComplaintSummaries from 'components/landing-page/complaint-summaries';
import CarouselWrapper from 'components/landing-page/carousel-wrapper';
import ComplaintSummaryCard from 'components/landing-page/complaint-summaries/complaint-summary-card';

describe('<ComplaintSummaries />', () => {
  it('should render enough contents', () => {
    const complaintSummaries = [{ crid: '123' }, { crid: '456' }];
    const titleCMSContent = EditorState.createEmpty();
    const descriptionCMSContent = EditorState.createEmpty();

    const wrapper = shallow(
      <ComplaintSummaries
        complaintSummaries={ complaintSummaries }
        title={ titleCMSContent }
        description={ descriptionCMSContent }
      />
    );

    const carouselWrapper = wrapper.find(CarouselWrapper);
    carouselWrapper.prop('title').should.eql(titleCMSContent);
    carouselWrapper.prop('description').should.eql(descriptionCMSContent);
    carouselWrapper.prop('trackingContentType').should.eql('COMPLAINT');

    const complaintSummaryCards = carouselWrapper.find(ComplaintSummaryCard);
    complaintSummaryCards.should.have.length(2);
    complaintSummaryCards.at(0).prop('allegation').should.eql({ crid: '123' });
    complaintSummaryCards.at(1).prop('allegation').should.eql({ crid: '456' });
  });

  it('should call requestComplaintSummaries', () => {
    const requestComplaintSummariesSpy = spy();
    mount(
      <ComplaintSummaries
        requestComplaintSummaries={ requestComplaintSummariesSpy }
        complaintSummaries={ [1] }
      />
    );
    requestComplaintSummariesSpy.called.should.be.false();

    requestComplaintSummariesSpy.resetHistory();
    mount(
      <ComplaintSummaries
        requestComplaintSummaries={ requestComplaintSummariesSpy }
      />
    );
    requestComplaintSummariesSpy.called.should.be.true();
  });
});
