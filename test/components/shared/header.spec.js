import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Sticky, StickyContainer } from 'react-sticky';
import Breadcrumbs from 'redux-breadcrumb-trail';

import WithHeader from 'components/shared/header';
import IOSPeek from 'components/common/ios-peek';


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
        <WithHeader className='test--with-header-custom-class'>
          <div className='test--with-header-content'/>
        </WithHeader>
      </Provider>
    );

    const stickyContainer = wrapper.find(StickyContainer);
    stickyContainer.prop('className').should.equal('test--with-header-custom-class');

    stickyContainer.find(IOSPeek).exists().should.be.true();

    const sticky = stickyContainer.find(Sticky);
    const breadcrumbs = sticky.find(Breadcrumbs);
    breadcrumbs.prop('className').should.equal('breadcrumbs');
  });
});
