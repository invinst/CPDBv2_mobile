import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Promise } from 'es6-promise';
import { stub } from 'sinon';

import browserHistory from 'utils/history';
import PinboardItem from 'components/pinboard-page/pinboards/pinboard-item';
import * as pinboardUtils from 'utils/pinboard';


describe('PinboardItem component', function () {
  const pinboard = {
    id: '1',
    title: 'Pinboard Title',
    createdAt: 'Sep 12, 2019',
    url: '/pinboard/1/pinboard-title/',
  };

  it('should render correctly', function () {
    const wrapper = shallow(
      <PinboardItem pinboard={ pinboard } />
    );

    wrapper.find('.pinboard-title').text().should.equal('Pinboard Title');
    wrapper.find('.pinboard-created-at').text().should.equal('Created Sep 12, 2019');
  });

  it('should render duplicate-pinboard-btn', function (done) {
    const redirectToCreatedPinboardStub = stub(pinboardUtils, 'redirectToCreatedPinboard');
    const duplicatePinboardStub = stub().usingPromise(Promise).resolves({
      payload: {
        id: '5cd06f2b',
        title: 'Pinboard title',
      },
    });
    const store = MockStore()({
      pinboardPage: {
        pinboard: {
          saving: false,
        },
      },
    });

    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <PinboardItem
            pinboard={ pinboard }
            duplicatePinboard={ duplicatePinboardStub }
          />
        </MemoryRouter>
      </Provider>
    );

    const duplicatePinboardBtn = wrapper.find('.duplicate-pinboard-btn').hostNodes().first();
    duplicatePinboardBtn.simulate('click');
    duplicatePinboardStub.should.be.called();

    setTimeout(() => {
      redirectToCreatedPinboardStub.should.be.calledOnce();
      redirectToCreatedPinboardStub.should.be.calledWith({
        payload: {
          id: '5cd06f2b',
          title: 'Pinboard title',
        },
      });
      done();
    }, 50);
  });

  context('isCurrent is true', function () {
    it('should render is-current class', function () {
      const wrapper = shallow(
        <PinboardItem pinboard={ pinboard } isCurrent={ true } />
      );
      wrapper.find('.is-current').exists().should.be.true();
    });
  });

  context('isCurrent is false', function () {
    it('should not render is-current class', function () {
      const wrapper = shallow(
        <PinboardItem pinboard={ pinboard } isCurrent={ false } />
      );
      wrapper.find('.is-current').exists().should.be.false();
    });
  });

  it('should handle click on pinboard-item', function () {
    const browserHistoryPushStub = stub(browserHistory, 'push');
    const store = MockStore()({
      pinboardPage: {
        pinboard: {
          saving: false,
        },
      },
    });

    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <PinboardItem
            pinboard={ pinboard }
          />
        </MemoryRouter>
      </Provider>
    );

    wrapper.find('.pinboard-item').hostNodes().first().simulate('click');
    browserHistoryPushStub.should.be.calledOnce();
    browserHistoryPushStub.should.be.calledWith('/pinboard/1/pinboard-title/');
  });
});
