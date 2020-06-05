import React from 'react';
import { mount } from 'enzyme';
import { stub } from 'sinon';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Pinboards from 'components/pinboard-page/pinboards';
import * as pinboardUtils from 'utils/pinboard';


describe('Pinboards component', function () {
  const store = MockStore()({
    pinboardPage: {
      pinboard: {
        id: '2',
        saving: false,
      },
    },
  });

  const pinboards = [
    {
      id: '1',
      title: 'Pinboard Title',
      createdAt: 'Sep 12, 2019',
      url: '/pinboard/1/pinboard-title/',
      isCurrent: false,
    },
    {
      id: '2',
      title: '',
      createdAt: 'Oct 15, 2019',
      url: '/pinboard/2/untitled-pinboard/',
      isCurrent: true,
    },
  ];

  context('isShownPinboardsList is true', function () {
    let wrapper;
    let createNewEmptyPinboardStub;

    beforeEach(function () {
      createNewEmptyPinboardStub = stub().resolves({ id: '123f12' });

      wrapper = mount(
        <Provider store={ store }>
          <Pinboards
            pinboards={ pinboards }
            pinboard={ { id: '2', saving: false } }
            createNewEmptyPinboard={ createNewEmptyPinboardStub }
            isShownPinboardsList={ true } />
        </Provider>
      );
    });

    it('should render pinboard items', function () {
      wrapper.find('.pinboards-title').text().should.equal('Pinboards');

      const pinboardItems = wrapper.find('.pinboard-item').hostNodes();
      pinboardItems.should.have.length(2);

      const pinboardTitles = wrapper.find('.pinboard-title');
      const pinboardCreatedAts = wrapper.find('.pinboard-created-at');

      pinboardTitles.at(0).text().should.equal('Pinboard Title');
      pinboardCreatedAts.at(0).text().should.equal('Created Sep 12, 2019');
      pinboardItems.at(0).prop('className').should.not.containEql('is-current');

      pinboardTitles.at(1).text().should.equal('');
      pinboardCreatedAts.at(1).text().should.equal('Created Oct 15, 2019');
      pinboardItems.at(1).prop('className').should.containEql('is-current');
    });

    it('should call redirectToCreatedPinboard on click create new pinboard', function (done) {
      const redirectToCreatedPinboardStub = stub(pinboardUtils, 'redirectToCreatedPinboard');
      wrapper.find('.new-pinboard-btn').hostNodes().last().simulate('click');
      setTimeout(function () {
        redirectToCreatedPinboardStub.should.be.calledWith({ id: '123f12' });
        done();
      }, 50);
    });
  });

  context('isShownPinboardsList is false', function () {
    it('should not render pinboard items', function () {
      const wrapper = mount(
        <Provider store={ store }>
          <Pinboards
            pinboards={ pinboards }
            pinboard={ { id: '2', saving: false } }
            isShownPinboardsList={ false } />
        </Provider>
      );
      const modal = wrapper.find('Modal');
      modal.exists().should.be.true();
      modal.find('.pinboards-title').exists().should.be.false();
      modal.find('PinboardItem').exists().should.be.false();
    });
  });
});
