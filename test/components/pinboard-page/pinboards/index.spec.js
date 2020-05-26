import React from 'react';
import { mount } from 'enzyme';
import { stub, spy } from 'sinon';
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
    },
    {
      id: '2',
      title: '',
      createdAt: 'Oct 15, 2019',
      url: '/pinboard/2/untitled-pinboard/',
    },
  ];

  it('should render pinboard items', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <Pinboards pinboards={ pinboards } pinboard={ { id: '2', saving: false } } />
      </Provider>
    );

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
    const createNewEmptyPinboardStub = stub().resolves({ id: '123f12' });
    const redirectToCreatedPinboardStub = stub(pinboardUtils, 'redirectToCreatedPinboard');
    const wrapper = mount(
      <Provider store={ store }>
        <Pinboards pinboards={ pinboards } createNewEmptyPinboard={ createNewEmptyPinboardStub } />
      </Provider>
    );
    wrapper.find('.new-pinboard-btn').hostNodes().last().simulate('click');
    setTimeout(function () {
      redirectToCreatedPinboardStub.should.be.calledWith({ id: '123f12' });
      done();
    }, 50);
  });

  describe('componentDidMount', function () {
    it('should call fetchPinboards', function () {
      const fetchPinboards = spy();
      mount(
        <Provider store={ store }>
          <Pinboards pinboards={ pinboards } fetchPinboards={ fetchPinboards } />
        </Provider>
      );
      fetchPinboards.should.be.calledOnce();
    });
  });
});
