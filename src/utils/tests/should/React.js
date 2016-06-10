import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import should from 'should';
import u from 'utils/HelperUtil';


should.Assertion.add('renderable', function () {
  var element = ReactTestUtils.renderIntoDocument(React.createElement(this.obj));

  element.should.be.ok();

  ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(element).parentNode);
});


should.Assertion.add('render', function (components) {
  let i, component, componentDisplayName, failedMessage;
  for (i = 0; i < components.length; i++) {
    component = components[i];
    componentDisplayName = component.displayName;

    failedMessage = u.format('{component} is not rendered', { 'component': componentDisplayName });

    ReactTestUtils.scryRenderedComponentsWithType(this.obj, component).length
      .should.be.above(0, failedMessage);
  }
});

should.Assertion.add('renderNothing', function () {
  ReactDOM.findDOMNode(this.obj).textContent.trim().should.be.eql('');
});

should.Assertion.add('renderWithProps', function (component, props) {
  let componentProps, currentPropValue, prop, failedMessage;
  const renderedComponent = ReactTestUtils.findRenderedComponentWithType(this.obj, component);

  for (prop in props) {
    failedMessage = u.format('Prop {prop} got unexpected values', { 'prop': prop });
    componentProps = u.fetch(renderedComponent, 'props', {});
    currentPropValue = u.fetch(componentProps, prop, null);
    should(currentPropValue).be.eql(props[prop], failedMessage);
  }
});
