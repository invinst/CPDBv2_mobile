let Modal, sinon;

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

require('should');
sinon = require('sinon');

require('utils/tests/should/React');

Modal = require('components/Lib/Modal.react');


describe('Modal', () => {
  it('should render empty if open state is false', () => {
    var modal = ReactTestUtils.renderIntoDocument(
    var modal = ReactTestUtils.renderIntoDocument(
      <Modal />
    );

    modal.setState({'open': 0});

    modal.should.renderNothing();
  });

  it('should render its children if open state is true', () => {
    var modal = ReactTestUtils.renderIntoDocument(
    var modal = ReactTestUtils.renderIntoDocument(
      <Modal>children</Modal>
    );

    modal.setState({'open': 1});

    ReactDOM.findDOMNode(modal).textContent.should.be.eql('children');
  });

  describe('#dispatch', () => {
    it('should call event system dispatch', () => {
      const mock = sinon.mock(Modal.eventSystem);
      mock.expects('dispatch').once().withArgs('target', 'event');

      Modal.dispatch('target', 'event')();

      mock.verify();
      mock.restore();
    });
  });

  describe('#dispatchFor', () => {
    it('should call dispatch', () => {
      const dispatch = sinon.spy(Modal, 'dispatch');

      Modal.dispatchFor('target')('event')();

      dispatch.calledWith('target', 'event').should.be.true();
    });
  });
});
