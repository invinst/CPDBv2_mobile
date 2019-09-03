import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import Header from 'components/shared/header';

describe('<Header />', function () {
  it('should be renderable', function () {
    const mockStore = configureStore();
    const store = mockStore({
      breadcrumb: {
        breadcrumbs: [],
      },
    });
    mount(
      <Provider store={ store }>
        <Header />
      </Provider>
    ).should.be.ok();
  });
});
