import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import RequestDocumentButton from 'components/common/request-document/request-document-button';
import RequestDocumentContent from 'components/common/request-document/request-document-content';


describe('RequestDocumentButton component', function () {
  it('should have correct text', function () {
    const wrapper = shallow(<RequestDocumentButton isRequested={ false } buttonText='Request Documents'/>);

    wrapper.find('.request-button').text().should.equal('Request Documents');

    wrapper.setProps({ buttonText: 'New Document Notifications' });
    wrapper.find('.request-button').text().should.equal('New Document Notifications');


    wrapper.setProps({ isRequested: true });
    wrapper.find('.request-button').text().should.equal('Documents Requested✔');
  });

  it('should open the request form when being clicked', function () {
    const requestDocumentSpy = sinon.spy();
    const wrapper = mount(
      <RequestDocumentButton
        requestDocument={ requestDocumentSpy }
        id='some id'
        isRequested={ false }
        message=''
      />
    );

    wrapper.find(RequestDocumentContent).exists().should.be.false();

    wrapper.find('.request-button').simulate('click');
    const requestForm = wrapper.find(RequestDocumentContent);
    requestForm.prop('id').should.equal('some id');
    requestForm.prop('requestDocument').should.equal(requestDocumentSpy);
    requestForm.prop('isRequested').should.equal(false);
    requestForm.prop('message').should.equal('');

    requestForm.prop('closeModal').should.equal(wrapper.instance().closeRequestForm);
  });

  it('should close the the request form when closeRequestForm is called', function () {
    const requestDocumentSpy = sinon.spy();
    const wrapper = mount(
      <RequestDocumentButton
        requestDocument={ requestDocumentSpy }
        id='some id'
        isRequested={ false }
        message=''
      />
    );

    wrapper.find(RequestDocumentContent).exists().should.be.false();

    wrapper.find('.request-button').simulate('click');
    wrapper.find(RequestDocumentContent).exists().should.be.true();

    wrapper.instance().closeRequestForm();
    wrapper.update();

    wrapper.find(RequestDocumentContent).exists().should.be.false();
  });
});
