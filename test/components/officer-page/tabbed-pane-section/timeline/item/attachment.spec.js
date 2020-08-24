import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';
import * as tracking from 'utils/tracking';

import Attachments from 'components/officer-page/tabbed-pane-section/timeline/item/attachments';


describe('Attachments component', function () {
  const attachments = [{
    url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-1-of-3.pdf',
    previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif',
    fileType: 'document',
  }, {
    url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-2-of-3.pdf',
    previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif',
    fileType: 'document',
  }, {
    url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-3-of-3.pdf',
    previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p3-normal.gif',
    fileType: 'document',
  }];

  it('should render attachments correctly', function () {
    const instance = shallow(<Attachments attachments={ attachments } />);
    instance.find('.image').prop('style').backgroundImage.should.equal(
      'url(https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif)'
    );
    instance.find('.document').exists().should.be.true();
  });

  it('should render file types of attachments correctly', function () {
    const videoAttachments = [{
      url: 'https://player.vimeo.com/video/165206078',
      previewImageUrl: '/src/img/ic-video.svg',
      fileType: 'video',
    }];
    const instance = shallow(<Attachments attachments={ videoAttachments } />);
    instance.find('image-document').exists().should.be.false();
  });

  it('should open new attachment file tab when click on attachment', function () {
    const stubOpen = stub(window, 'open');
    const instance = shallow(<Attachments attachments={ attachments } />);
    instance.find('.image').simulate('click', { preventDefault() {} });
    stubOpen.calledWith(
      'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-1-of-3.pdf'
    ).should.be.true();
  });

  it('should render null when there are no attachments', function () {
    const instance = shallow(<Attachments attachments={ [] } />);
    instance.find('.test-wrapper').exists().should.be.false();
  });

  it('should track click event', function () {
    const stubTrackAttachmentClick = stub(tracking, 'trackAttachmentClick');
    const attachments = [{
      url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-1-of-3.html',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif',
      fileType: 'document',
    }];
    const wrapper = mount(<Attachments attachments={ attachments } pathname='/officer/123456/john-henry/'/>);
    wrapper.find('.image').simulate('click');
    stubTrackAttachmentClick.should.be.calledWith(
      '/officer/123456/john-henry/',
      'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-1-of-3.html'
    );
  });

  it('should track click on attachment event', function () {
    const stubOnTrackingAttachment = stub();
    const attachments = [{
      url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-1-of-3.html',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif',
      fileType: 'document',
      id: '123456',
    }];
    const wrapper = mount(<Attachments
      attachments={ attachments }
      pathname='/officer/123456/john-henry/'
      onTrackingAttachment={ stubOnTrackingAttachment }
    />);
    wrapper.find('.image').simulate('click');

    stubOnTrackingAttachment.should.be.calledWith({
      attachmentId: '123456',
      sourcePage: 'Officer Page - Timeline Tab',
      app: 'Mobile',
    });
  });
});
