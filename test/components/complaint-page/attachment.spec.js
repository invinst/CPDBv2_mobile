import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';

import Attachments from 'components/complaint-page/attachments';
import RequestDocumentButton from 'components/common/request-document/request-document-button';


describe('Attachments component', function () {
  it('should render header', function () {
    const wrapper = shallow(
      <Attachments attachments={ [] } complaintId='CR123'/>
    );

    wrapper.find('.label').text().should.eql('There are no documents that have been made public yet.');

    wrapper.setProps({ attachments: ['abc'] });

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
});
