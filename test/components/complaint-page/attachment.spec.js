import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';

import Attachments from 'components/complaint-page/attachments';
import RequestDocumentButton from 'components/common/request-document/request-document-button';
import * as tracking from 'utils/tracking';
import CMSContent from 'components/common/cms-content';


describe('Attachments component', function () {
  it('should render header', function () {
    const wrapper = shallow(
      <Attachments
        attachments={ [] }
        complaintId='CR123'
        noAttachmentMessage='There are no documents that have been made public yet.'
      />
    );

    const cmsContent = wrapper.find(CMSContent);
    cmsContent.at(0).prop('content').should.equal('There are no documents that have been made public yet.');

    wrapper.setProps({ attachments: [{ fileType: 'video', title: 'Video Clip' }] });

    wrapper.find('.label').text().should.eql('DOCUMENTS');
  });

  it('should track click event', function () {
    const store = configureStore()({
      complaintPage: {
        attachmentRequest: {
          message: '',
          subscribedCRIds: {},
        },
        complaints: {
          'CR123': {},
        },
      },
    });
    const stubTrackAttachmentClick = stub(tracking, 'trackAttachmentClick');
    const attachments = [{
      'url': 'https://www.documentcloud.org/documents/4769822-CRID-1002813-CR.html',
      'fileType': 'document',
    }];
    const wrapper = mount(
      <Provider store={ store }>
        <Attachments attachments={ attachments } pathname='/complaint/123456/' complaintId='CR123'/>
      </Provider>
    );
    wrapper.find('.attachment').simulate('click');
    stubTrackAttachmentClick.should.be.calledWith(
      '/complaint/123456/',
      'https://www.documentcloud.org/documents/4769822-CRID-1002813-CR.html'
    );
  });

  it('should track click on attachment event', function () {
    const store = configureStore()({
      complaintPage: {
        attachmentRequest: {
          message: '',
          subscribedCRIds: {},
        },
        complaints: {
          '123': {},
        },
      },
    });
    const stubOnTrackingAttachment = stub();
    const attachments = [{
      'url': 'https://www.documentcloud.org/documents/4769822-CRID-1002813-CR.html',
      'fileType': 'document',
      'id': '123456',
    }];
    const wrapper = mount(
      <Provider store={ store }>
        <Attachments
          attachments={ attachments }
          pathname='/complaint/123456/'
          onTrackingAttachment={ stubOnTrackingAttachment }
        />
      </Provider>
    );
    wrapper.find('.attachment').simulate('click');
    stubOnTrackingAttachment.should.be.calledWith({
      attachmentId: '123456',
      sourcePage: 'CR Page',
      app: 'Mobile',
    });
  });
});
