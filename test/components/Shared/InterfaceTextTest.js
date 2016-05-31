import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import should from 'should';
import shouldReact from 'utils/tests/should/React';

import InterfaceText from 'components/Shared/InterfaceText.react';
import InterfaceTextResourceUtil from 'utils/InterfaceTextResourceUtil';
import style from 'styles/Shared/InterfaceText.sass';


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
    interfaceText = ReactTestUtils.renderIntoDocument(
      <InterfaceText placeholderLength={ 3 } identifier='key'/>
    );
    interfaceText.setState({
      'loaded': false
    });
    const node = ReactTestUtils.findRenderedDOMComponentWithClass(interfaceText, 'interface-text');
    node.getAttribute('class').should.containEql('blur');
    node.textContent.should.eql('xxx');
  });

  it('should render the data if it\'s already loaded', () => {
    interfaceText = ReactTestUtils.renderIntoDocument(
      <InterfaceText placeholderLength={ 3 } identifier='key'/>
    );
    interfaceText.setState({
      'interfaceTexts': {
        'key': 'something'
      },
      'loaded': true
    });
    const node = ReactTestUtils.findRenderedDOMComponentWithClass(interfaceText, 'interface-text');
    node.getAttribute('class').should.not.containEql('blur');
    node.textContent.should.eql('something');
  });
});
