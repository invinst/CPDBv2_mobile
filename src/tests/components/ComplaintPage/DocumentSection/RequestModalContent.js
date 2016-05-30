let RequestModalContent, RequestEmailResourceUtil, InterfaceTextResourceUtil;

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactStubContext from 'react-stub-context';
import sinon from 'sinon';

require('should');

require('utils/tests/should/React');

RequestModalContent = require('components/ComplaintPage/DocumentSection/DocumentCard/RequestModalContent.react');
RequestEmailResourceUtil = require('utils/RequestEmailResourceUtil.js');
InterfaceTextResourceUtil = require('utils/InterfaceTextResourceUtil');


describe('RequestModalContentComponent', () => {
  beforeEach(() => {
    sinon.stub(InterfaceTextResourceUtil, 'get', () => {});
  });

  afterEach(() => {
    InterfaceTextResourceUtil.get.restore();
  });

  it('should be renderable', () => {
    RequestModalContent.should.be.renderable();
  });

  it('should call context action when clicking cancel button', () => {
    let requestModal, cancelBtn, RequestModalContentStub;
    const action = sinon.spy();
    const context = {
      'modalName': 'requestModal',
      'action': action
    };

    RequestModalContentStub = ReactStubContext(RequestModalContent, context);

    requestModal = ReactTestUtils.renderIntoDocument(
    requestModal = ReactTestUtils.renderIntoDocument(
      <RequestModalContentStub />
    );

    cancelBtn = ReactTestUtils.findRenderedDOMComponentWithClass(requestModal, 'btn-cancel');
    ReactTestUtils.Simulate.click(cancelBtn);

    action.called.should.be.true();
  });

  it('should call context action when click the checkMark in thank you', () => {
    let requestModal, checkMark, RequestModalContentStub;
    const action = sinon.spy();
    const context = {
      'modalName': 'requestModal',
      'action': action
    };

    RequestModalContentStub = ReactStubContext(RequestModalContent, context);

    requestModal = ReactTestUtils.renderIntoDocument(
    requestModal = ReactTestUtils.renderIntoDocument(
      <RequestModalContentStub />
    );

    checkMark = ReactTestUtils.findRenderedDOMComponentWithClass(requestModal, 'success-icon');
    ReactTestUtils.Simulate.click(checkMark);

    action.called.should.be.true();
  });

  it('should send register email action when clicking submit button', () => {
    let requestModal, submitBtn;
    const mock = sinon.mock(RequestEmailResourceUtil);
    mock.expects('post').once();

    requestModal = ReactTestUtils.renderIntoDocument(
    requestModal = ReactTestUtils.renderIntoDocument(
      <RequestModalContent/>
    );
    submitBtn = ReactTestUtils.findRenderedDOMComponentWithClass(requestModal, 'btn-submit');
    ReactTestUtils.Simulate.click(submitBtn);

    mock.verify();
    mock.restore();
  });

  it('should render `hide` style for request form if requested state is true', () => {
    let requestForm;
    var requestModal = ReactTestUtils.renderIntoDocument(
    var requestModal = ReactTestUtils.renderIntoDocument(
      <RequestModalContent/>
    );
    requestModal.setState({'requested': true});

    requestForm = ReactTestUtils.findRenderedDOMComponentWithClass(requestModal, 'request-form');
    requestForm.getAttribute('class').should.containEql('hide');
  });

  it('should render `hide` style for `thank-you` if requested state is false', () => {
    let thankYouNode;
    var requestModal = ReactTestUtils.renderIntoDocument(
    var requestModal = ReactTestUtils.renderIntoDocument(
      <RequestModalContent/>
    );
    requestModal.setState({'requested': false});

    thankYouNode = ReactTestUtils.findRenderedDOMComponentWithClass(requestModal, 'thank-you');
    thankYouNode.getAttribute('class').should.containEql('hide');
  });

  it('should render `hide` style for error message if not submit', () => {
    let errorNode;
    var requestModal = ReactTestUtils.renderIntoDocument(
    var requestModal = ReactTestUtils.renderIntoDocument(
      <RequestModalContent />
    );
    requestModal.setState({'submitFailed': false});
    errorNode = ReactTestUtils.findRenderedDOMComponentWithClass(requestModal, 'error');
    errorNode.getAttribute('class').should.containEql('hide');
  });

  it('should not render `hide` style for error message if submit failed', () => {
    let errorNode;
    var requestModal = ReactTestUtils.renderIntoDocument(
    var requestModal = ReactTestUtils.renderIntoDocument(
      <RequestModalContent />
    );
    requestModal.setState({'submitFailed': true});
    errorNode = ReactTestUtils.findRenderedDOMComponentWithClass(requestModal, 'error');
    errorNode.getAttribute('class').should.not.containEql('hide');
  });
});
