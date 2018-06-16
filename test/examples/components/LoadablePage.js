import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import LoadingPage from 'components/Shared/LoadingPage';
import NotMatchedComplaintPage from 'components/ComplaintPage/NotMatchedComplaintPage';
import SharedExample from 'utils/tests/shared-example';


SharedExample.define('a loadable page', function () {
  const self = this;

  it('should render loading page if loading is true', () => {
    const element = ReactTestUtils.renderIntoDocument(
      React.createElement(self.obj)
    );

    element.setState({ 'loading': true });

    element.should.render([LoadingPage]);

    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(element).parentNode);
  });

  it('should render not matched page if data is not found', () => {
    const element = ReactTestUtils.renderIntoDocument(
      React.createElement(self.obj)
    );

    element.setState({ 'found': false, 'loading': false });

    element.should.render([NotMatchedComplaintPage]);

    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(element).parentNode);
  });
});
