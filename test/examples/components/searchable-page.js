import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';

import Searchable from 'components/shared/searchable-page';
import SearchablePageStore from 'stores/shared/searchable-page-store';
import SharedExample from 'utils/tests/shared-example';
import SuggestionAPI from 'utils/suggestion-api';
import SearchBarActions from 'actions/main-page/search-bar-actions';


SharedExample.define('a searchable page', function () {
  const self = this;

  it('should render search page', () => {
    const obj = self.obj();
    obj.should.render([Searchable]);
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(obj).parentNode);

  });

  it('should hide result content when search bar is inactive', () => {
    const obj = self.obj();
    const resultContent = ReactTestUtils.findRenderedDOMComponentWithClass(obj, 'result-content');
    resultContent.getAttribute('class').should.containEql('result-content invisible');
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(obj).parentNode);
  });

  it('should show result content when search bar is active', () => {
    let resultContent;
    const obj = self.obj();
    const input = ReactTestUtils.findRenderedDOMComponentWithClass(obj, 'input-text');

    ReactTestUtils.Simulate.focus(input);

    sinon.stub(SearchablePageStore, 'getState', () => ({
      'focus': 1
    }));
    SearchablePageStore.emitChange();
    resultContent = ReactTestUtils.findRenderedDOMComponentWithClass(obj, 'result-content');
    resultContent.getAttribute('class').should.not.containEql('result-content invisible');
    SearchablePageStore.getState.restore();
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(obj).parentNode);
  });

  it('should trigger an api for searching', () => {
    const obj = self.obj();
    const term = 'abc';
    const input = ReactTestUtils.findRenderedDOMComponentWithClass(obj, 'input-text');
    const mock = sinon.mock(SuggestionAPI);
    mock.expects('get').once().withArgs(term).returns(null);
    input.value = term;

    ReactTestUtils.Simulate.change(input);

    mock.verify();
    mock.restore();
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(obj).parentNode);
  });

  it('should trigger clear action if icon is clicked', () => {
    const obj = self.obj();
    const icon = ReactTestUtils.findRenderedDOMComponentWithClass(obj, 'icon');
    const mock = sinon.mock(SearchBarActions);
    mock.expects('clear').once();

    ReactTestUtils.Simulate.click(icon);

    mock.verify();
    mock.restore();
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(obj).parentNode);
  });
});
