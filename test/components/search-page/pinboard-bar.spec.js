import React from 'react';
import { browserHistory } from 'react-router';
import { shallow } from 'enzyme';
import should from 'should';
import { spy, stub } from 'sinon';

import PinboardBar from 'components/search-page/pinboard-bar';


describe('<PinboardBar />', function () {
  it('should render nothing if isPinboardRestored is false', function () {
    const wrapper = shallow(
      <PinboardBar pinboard={ {
        isPinboardRestored: false,
      } } />
    );

    should(wrapper.getNode()).be.null();
  });

  it('should render "Your pinboard is empty" if pinboard is empty', function () {
    const wrapper = shallow(
      <PinboardBar />
    );

    wrapper.text().should.equal('Your pinboard is empty');
  });

  it('should render Pinboard ($count) if pinboard is not empty', function () {
    const wrapper = shallow(
      <PinboardBar pinboard={ {
        itemsCount: 2,
        url: '/pinboard/1/title/',
        isPinboardRestored: true,
      } } />
    );

    wrapper.text().should.equal('Pinboard (2)');
  });

  it('should call onEmptyPinboardButtonClick if we click on the button when pinboard id is null', function () {
    const onEmptyPinboardButtonClick = spy();

    const wrapper = shallow(
      <PinboardBar
        onEmptyPinboardButtonClick={ onEmptyPinboardButtonClick }
      />
    );

    wrapper.simulate('click');
    onEmptyPinboardButtonClick.called.should.be.true();
  });

  it('should redirect if we click on the button when pinboard is exist', function () {
    const browserHistoryPush = stub(browserHistory, 'push');

    const wrapper = shallow(
      <PinboardBar pinboard={ {
        id: '5cd06f2b',
        itemsCount: 2,
        url: '/pinboard/1/title/',
        isPinboardRestored: true,
      } }/>
    );

    wrapper.simulate('click');
    browserHistoryPush.should.be.calledWith('/pinboard/1/title/');

    browserHistoryPush.restore();
  });

  it('should go to /pinboard/ if pinboard is empty and hasPendingChanges is true', function () {
    const browserHistoryPush = stub(browserHistory, 'push');

    const wrapper = shallow(
      <PinboardBar pinboard={ {
        id: '',
        itemsCount: 2,
        isPinboardRestored: true,
        hasPendingChanges: true,
      } }/>
    );

    wrapper.simulate('click');
    browserHistoryPush.should.be.calledWith('/pinboard/');

    browserHistoryPush.restore();
  });
});
