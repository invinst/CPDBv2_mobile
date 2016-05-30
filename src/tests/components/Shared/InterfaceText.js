let InterfaceText, InterfaceTextResourceUtil;

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
require('should');
require('utils/tests/should/React');

InterfaceText = require('components/Shared/InterfaceText.react');
InterfaceTextResourceUtil = require('utils/InterfaceTextResourceUtil');


describe('InterfaceTextComponent', () => {
  let interfaceText;

  beforeEach(() => {
    sinon.stub(InterfaceTextResourceUtil, 'get', () => {});
  });

  afterEach(() => {
    InterfaceTextResourceUtil.get.restore();
  });

  it('should be renderable', () => {
    InterfaceText.should.be.renderable();
  });

  it('should render the blurred placeholder if the data is not loaded yet', () => {
    let node;
    interfaceText = ReactTestUtils.renderIntoDocument(
    interfaceText = ReactTestUtils.renderIntoDocument(
      <InterfaceText placeholderLength={ 3 } identifier='key'/>
    );
    interfaceText.setState({
      'loaded': false
    });
    node = ReactTestUtils.findRenderedDOMComponentWithClass(interfaceText, 'interface-text');
    node.getAttribute('class').should.containEql('blur');
    node.textContent.should.eql('xxx');
  });

  it('should render the data if it\'s already loaded', () => {
    let node;
    interfaceText = ReactTestUtils.renderIntoDocument(
    interfaceText = ReactTestUtils.renderIntoDocument(
      <InterfaceText placeholderLength={ 3 } identifier='key'/>
    );
    interfaceText.setState({
      'interfaceTexts': {
        'key': 'something'
      },
      'loaded': true
    });
    node = ReactTestUtils.findRenderedDOMComponentWithClass(interfaceText, 'interface-text');
    node.getAttribute('class').should.not.containEql('blur');
    node.textContent.should.eql('something');
  });
});
