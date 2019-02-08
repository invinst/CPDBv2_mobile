import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { spy } from 'sinon';
import Modal from 'react-modal';

import RequestDocumentButton from 'components/common/request-document/request-document-button';
import RequestDocumentContent from 'components/common/request-document/request-document-content';


describe('RequestDocumentButton component', function () {
  it('should have correct text', function () {
    const wrapper = shallow(<RequestDocumentButton isRequested={ false }/>);

    wrapper.find('.request-button').text().should.equal('Request Documents');

    wrapper.setProps({ hasData: true });
    wrapper.find('.request-button').text().should.equal('New Document Notifications');


    wrapper.setProps({ isRequested: true });
    wrapper.find('.request-button').text().should.equal('Documents Requested✔');
  });

  it('should open the request form when being clicked', function () {
    const requestDocumentSpy = spy();
    const wrapper = mount(
      <RequestDocumentButton
        requestDocument={ requestDocumentSpy }
        id='some id'
        isRequested={ false }
        message=''
      />
    );

    const modalWrapper = new ReactWrapper(wrapper.find(Modal).node.portal, true);
    modalWrapper.find(RequestDocumentContent).exists().should.be.false();

    wrapper.find('.request-button').simulate('click');
    const requestForm = modalWrapper.find(RequestDocumentContent);
    requestForm.prop('id').should.equal('some id');
    requestForm.prop('requestDocument').should.equal(requestDocumentSpy);
    requestForm.prop('isRequested').should.equal(false);
    requestForm.prop('message').should.equal('');

    requestForm.prop('closeModal').should.equal(wrapper.instance().closeRequestForm);
  });

  it('should close the the request form when closeRequestForm is called', function () {
    const requestDocumentSpy = spy();
    const wrapper = mount(
      <RequestDocumentButton
        requestDocument={ requestDocumentSpy }
        id='some id'
        isRequested={ false }
        message=''
      />
    );

    const modalWrapper = new ReactWrapper(wrapper.find(Modal).node.portal, true);
    modalWrapper.find(RequestDocumentContent).exists().should.be.false();

    wrapper.find('.request-button').simulate('click');
    modalWrapper.find(RequestDocumentContent).exists().should.be.true();

    wrapper.instance().closeRequestForm();

    modalWrapper.find(RequestDocumentContent).exists().should.be.false();
  });
});
