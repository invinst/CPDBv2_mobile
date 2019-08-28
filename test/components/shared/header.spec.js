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

  it('should render breadcrumbs', function () {
    const store = configureStore()({
      breadcrumb: {
        breadcrumbs: [
          {
            component: 'cpdp',
            breadcrumbKey: '/',
            url: '/',
            location: {
              pathname: '/',
              search: '',
              hash: '',
              action: 'POP',
              key: null,
              query: {},
            },
            params: {},
            current: false,
          },
          {
            component: 'Search',
            breadcrumbKey: '/search/',
            url: '/search/',
            location: {
              pathname: '/search/',
              search: '',
              hash: '',
              action: 'PUSH',
              key: 'tncl66',
              query: {},
            },
            params: {},
            current: false,
          },
          {
            breadcrumbKey: '/pinboard/:pinboardId/(:pinboardTitle/)',
            url: '/pinboard/2bd40cf2/untitled-pinboard/',
            location: {
              pathname: '/pinboard/2bd40cf2/untitled-pinboard/',
              search: '',
              hash: '',
              action: 'PUSH',
              key: '40v21h',
              query: {},
            },
            params: {
              pinboardId: '2bd40cf2',
              pinboardTitle: 'untitled-pinboard',
            },
            current: false,
          },
          {
            breadcrumbKey: '/officer/:id',
            url: '/officer/31859/eric-cato/',
            location: {
              pathname: '/officer/31859/eric-cato/',
              search: '',
              hash: '',
              action: 'PUSH',
              key: 'aquodh',
              query: {},
            },
            params: {
              id: '31859',
              firstParam: 'eric-cato',
            },
            current: true,
          },
        ],
      },
      breadcrumbMapping: {
        '/pinboard/2bd40cf2/': 'Pinboard',
        '/officer/31859/eric-cato/': 'Eric Cato',
      },
      routing: {
        locationBeforeTransitions: {
          pathname: '/officer/31859/eric-cato/',
          search: '',
          hash: '',
          action: 'PUSH',
          key: '4zjc3v',
          query: {},
        },
      },
    });

    const wrapper = mount(
      <Provider store={ store }>
        <Header />
      </Provider>
    );

    const breadcrumbs = wrapper.find(Breadcrumbs);
    breadcrumbs.prop('className').should.equal('breadcrumbs');

    wrapper.find('.separator').should.have.length(3);

    const breadcrumbItems = wrapper.find('.breadcrumb-item-wrapper');
    breadcrumbItems.should.have.length(4);
    breadcrumbItems.at(0).text().should.equal('cpdp');
    breadcrumbItems.at(1).text().should.equal('Search');
  });
});
