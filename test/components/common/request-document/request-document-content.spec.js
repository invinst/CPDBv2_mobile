import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy, useFakeTimers, stub } from 'sinon';

import RequestDocumentContent from 'components/common/request-document/request-document-content';


describe('RequestDocumentContent component', function () {
  it('should initial render form with text box and "Request", "Cancel" button', function () {
    const wrapper = shallow(<RequestDocumentContent/>);
    const instance = wrapper.instance();

    wrapper.text().should.containEql('We’ll notify you when the document is made available');
    instance.state.warning.should.be.false();

    const inputs = wrapper.find('input');
    inputs.at(0).prop('placeholder').should.be.eql('Your email');
    inputs.at(1).prop('value').should.be.eql('Request');
    wrapper.find('a').text().should.be.eql('Cancel');
  });

  it('should call closeEvent when click to Close link', function () {
    const cancelClickHandler = spy();
    const wrapper = shallow(
      <RequestDocumentContent closeModal={ cancelClickHandler }/>
    );
    const cancelDomElement = wrapper.find('a');
    cancelDomElement.text().should.be.eql('Cancel');
    cancelDomElement.simulate('click');
    cancelClickHandler.calledOnce.should.be.true();
  });

  it('should show message if isRequested is true and have message', function () {
    const wrapper = shallow(
      <RequestDocumentContent message={ 'Thanks you' } isRequested={ true } />
    );
    const messageBoxElement = wrapper.find('.message-box');
    messageBoxElement.text().should.be.eql('Thanks you');
  });

  it('hide messageBox on startup but show if `warning` set to true; the email-input change background', function () {
    const wrapper = shallow(
      <RequestDocumentContent message={ 'Thanks you' } />
    );
    wrapper.find('.message-box').exists().should.be.false();
    wrapper.find('.email-input').hasClass('warning').should.be.false();

    wrapper.setState({ warning: true });
    const messageBox = wrapper.find('.message-box');
    messageBox.text().should.eql('Thanks you');
    wrapper.find('.email-input').hasClass('warning').should.be.true();
  });

  describe('Submit', function () {
    let clock;
    let assertInCallbackTest;

    beforeEach(function () {
      clock = useFakeTimers();
    });

    afterEach(function () {
      clock.restore();
    });

    function submitRequestDocumentTest(assertInCallbackTest, done, fail=false) {
      const closeCallback = spy();
      const promise = new Promise((resolve, reject) => {
        if (fail) { reject(); }
        else { resolve(); }
      });
      const requestDocumentCallback = stub().returns(promise);
      let requestForm;

      const oldHandleSubmit = RequestDocumentContent.prototype.handleSubmit;
      RequestDocumentContent.prototype.handleSubmit = function (event) {
        event.preventDefault = spy();

        const temp = oldHandleSubmit.call(this, event);
        event.preventDefault.calledOnce.should.be.true();
        temp.then(() => {
          assertInCallbackTest(requestForm);
          RequestDocumentContent.prototype.handleSubmit = oldHandleSubmit;
        }).then(done);
      };

      requestForm = mount(
        <RequestDocumentContent
          message={ 'Default message' }
          id={ 1 }
          closeModal={ closeCallback }
          requestDocument={ requestDocumentCallback }
        />
      );

      requestForm.instance().state.warning.should.be.false();
      const emailInput = requestForm.find('input.email-input');
      emailInput.node.value = 'abc@xyz.com';
      requestForm.simulate('submit');
      requestDocumentCallback.calledWith({ id: 1, email: 'abc@xyz.com' }).should.be.true();
    }

    // TODO: BUG - when one case failed, then other case failed as well !
    it('- invalid email, should set "warning" state to true, show the messageBox', function (done) {
      assertInCallbackTest = function (requestForm) {
        requestForm.instance().state.should.containEql( { warning: true } );
        requestForm.find('.message-box').text().should.be.eql('Default message');
      };
      submitRequestDocumentTest(assertInCallbackTest, done, true);
    });

    it('- valid email, should set "warning" state as false and call closeModal after 1.5s', function (done) {
      assertInCallbackTest = function (requestForm) {
        requestForm.instance().state.should.containEql( { warning: false } );
        requestForm.prop('closeModal').called.should.be.false();
        clock.tick(1550);
        requestForm.prop('closeModal').calledOnce.should.be.true();
      };
      submitRequestDocumentTest(assertInCallbackTest, done);
    });
  });
});