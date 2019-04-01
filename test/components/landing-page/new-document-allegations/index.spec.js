import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import NewDocumentAllegations from 'components/landing-page/new-document-allegations';
import { EditorState } from 'draft-js';
import CarouselWrapper from 'components/landing-page/carousel-wrapper';
import ComplaintDocumentCard from 'components/landing-page/new-document-allegations/complaint-document-card';

describe('<NewDocumentAllegations />', () => {
  it('should render enough contents', () => {
    const newDocumentAllegations = [{ crid: '123' }, { crid: '456' }];
    const titleCMSContent = EditorState.createEmpty();
    const descriptionCMSContent = EditorState.createEmpty();
    const onTrackingAttachment = spy();

    const wrapper = shallow(
      <NewDocumentAllegations
        newDocumentAllegations={ newDocumentAllegations }
        title={ titleCMSContent }
        description={ descriptionCMSContent }
        pathname='some/path/name/'
        onTrackingAttachment={ onTrackingAttachment }
      />
    );

    const carouselWrapper = wrapper.find(CarouselWrapper);
    carouselWrapper.prop('title').should.eql(titleCMSContent);
    carouselWrapper.prop('description').should.eql(descriptionCMSContent);
    carouselWrapper.prop('trackingContentType').should.eql('DOCUMENT');

    const complaintDocumentCards = carouselWrapper.find(ComplaintDocumentCard);
    complaintDocumentCards.should.have.length(2);
    complaintDocumentCards.at(0).prop('allegation').should.eql({ crid: '123' });
    complaintDocumentCards.at(0).prop('pathname').should.eql('some/path/name/');
    complaintDocumentCards.at(0).prop('onTrackingAttachment').should.eql(onTrackingAttachment);
    complaintDocumentCards.at(1).prop('allegation').should.eql({ crid: '456' });
    complaintDocumentCards.at(1).prop('pathname').should.eql('some/path/name/');
    complaintDocumentCards.at(1).prop('onTrackingAttachment').should.eql(onTrackingAttachment);
  });

  it('should call requestNewDocumentAllegations', () => {
    const requestNewDocumentAllegationsSpy = spy();
    mount(
      <NewDocumentAllegations
        requestNewDocumentAllegations={ requestNewDocumentAllegationsSpy }
        newDocumentAllegations={ [1] }
      />
    );
    requestNewDocumentAllegationsSpy.called.should.be.false();

    requestNewDocumentAllegationsSpy.resetHistory();
    mount(
      <NewDocumentAllegations
        requestNewDocumentAllegations={ requestNewDocumentAllegationsSpy }
      />
    );
    requestNewDocumentAllegationsSpy.called.should.be.true();
  });
});
