import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';

import Attachments from 'components/complaint-page/attachments';
import RequestDocumentButton from 'components/common/request-document/request-document-button';
import * as GATracking from 'utils/google_analytics_tracking';


describe('Attachments component', function () {
  it('should render header', function () {
    const wrapper = shallow(
      <Attachments attachments={ [] } complaintId='CR123'/>
    );

    wrapper.find('.label').text().should.eql('There are no documents that have been made public yet.');

    wrapper.setProps({ attachments: [{fileType: 'video', title: 'Video Clip'}] });

    wrapper.find('.label').text().should.eql('ATTACHMENTS');
  });

  it('should render request document button', function () {
    const store = configureStore()({
      complaintPage: {
        attachmentRequest: {
          message: '',
          subscribedCRIds: {}
        }
      }
    });
    const wrapper = mount(
      <Provider store={ store }>
        <Attachments attachments={ [] } complaintId='CR123'/>
      </Provider>
    );

    const requestButton = wrapper.find(RequestDocumentButton);
    requestButton.prop('id').should.equal('CR123');
    requestButton.prop('isRequested').should.be.false();
    requestButton.prop('message').should.equal('');
    requestButton.prop('customClassName').should.equal('request-button-container');
  });

  it('should track click event', function () {
    const store = configureStore()({
      complaintPage: {
        attachmentRequest: {
          message: '',
          subscribedCRIds: {}
        }
      }
    });
    const stubTrackAttachmentClick = stub(GATracking, 'trackAttachmentClick');
    const attachments = [{
      'url': 'https://www.documentcloud.org/documents/4769822-CRID-1002813-CR.html',
      'fileType': 'document',
    }];
    const wrapper = mount(
      <Provider store={ store }>
        <Attachments attachments={ attachments } pathname='/complaint/123456/'/>
      </Provider>
    );
    wrapper.find('.attachment').simulate('click');
    stubTrackAttachmentClick.should.be.calledWith(
      '/complaint/123456/',
      'https://www.documentcloud.org/documents/4769822-CRID-1002813-CR.html'
    );
    stubTrackAttachmentClick.restore();
  });
});
