import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import WithHeader from 'components/shared/with-header';
import IOSPeek from 'components/common/ios-peek';
import BreadcrumbContainer from 'containers/breadcrumb';


describe('<WithHeader />', function () {
  it('should be renderable', function () {
    const mockStore = configureStore();
    const store = mockStore({
      breadcrumb: {
        breadcrumbs: [],
      },
    });
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <WithHeader className='test--with-header-custom-class'>
            <div className='test--with-header-content'/>
          </WithHeader>
        </MemoryRouter>
      </Provider>
    );

    const container = wrapper.find(WithHeader);
    container.prop('className').should.equal('test--with-header-custom-class');

    container.find(IOSPeek).exists().should.be.true();

    container.find(BreadcrumbContainer).exists().should.be.true();
  });
});
