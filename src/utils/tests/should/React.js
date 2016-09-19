import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils, { renderIntoDocument } from 'react-addons-test-utils';
import should from 'should';
import u from 'utils/HelperUtil';
import { Provider } from 'react-redux';


should.Assertion.add('renderable', function (props) {
  let element;
  if (props && props.store) {
    const { store, ...otherProps } = props;
    element = renderIntoDocument(
      <Provider store={ store }>
        { createElement(this.obj, otherProps) }
      </Provider>
    );
  } else {
    element = renderIntoDocument(createElement(this.obj, props));
  }

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
