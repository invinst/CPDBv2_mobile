import React from 'react';
import { shallow, mount } from 'enzyme';
import { Router, Route, Link } from 'react-router-dom';
import { spy, stub, match, useFakeTimers } from 'sinon';
import { createBrowserHistory } from 'history';

import SearchItem from 'components/search-page/search-item';
import ItemPinButton from 'components/common/item-pin-button';
import * as tracking from 'utils/tracking';
import { APP_CONFIG_KEYS } from 'constants';
import * as appConfig from 'utils/app-config';


const PINBOARD_INTRODUCTION_DELAY = 1000;

describe('<SearchItem />', function () {
  beforeEach(function () {
    appConfig.default.set({
      [APP_CONFIG_KEYS.PINBOARD_INTRODUCTION_DELAY]: PINBOARD_INTRODUCTION_DELAY,
    });
  });

  it('should not render ItemPinButton if hasPinButton is false', function () {
    const wrapper = shallow(<SearchItem hasPinButton={ false } />);
    wrapper.find(ItemPinButton).should.have.length(0);
  });

  it('should render ItemPinButton if hasPinButton is true', function () {
    const timer = useFakeTimers();
    const addOrRemoveItemInPinboard = spy();
    const wrapper = shallow(
      <SearchItem
        id='213'
        type='OFFICER'
        hasPinButton={ true }
        isPinned={ true }
        showIntroduction={ true }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
      />
    );

    let itemPinButton = wrapper.find(ItemPinButton);
    itemPinButton.prop('addOrRemoveItemInPinboard').should.eql(addOrRemoveItemInPinboard);
    itemPinButton.prop('id').should.equal('213');
    itemPinButton.prop('isPinned').should.be.true();
    itemPinButton.prop('showIntroduction').should.be.false();
    itemPinButton.prop('type').should.equal('OFFICER');
    itemPinButton.prop('item').should.eql({
      type: 'OFFICER',
      id: '213',
      isPinned: true,
    });
    itemPinButton.prop('className').should.equal('item-pin-button');

    timer.tick(PINBOARD_INTRODUCTION_DELAY + 50);
    wrapper.update();
    itemPinButton = wrapper.find(ItemPinButton);
    itemPinButton.prop('showIntroduction').should.be.true();
  });

  it('should assign className to Link component', function () {
    const wrapper = shallow(
      <SearchItem className='custom'>
        <span>SearchItem children</span>
      </SearchItem>
    );
    wrapper.find(Link).props().className.should.containEql('custom');
  });

  it('should call saveToRecent and trackSearchFocusedItem when click on item', function () {
    stub(tracking, 'trackSearchFocusedItem');
    const saveToRecentSpy = spy();
    const officer = {
      id: '8562',
      type: 'OFFICER',
      name: 'Jerome Finnigan',
      badge: 'Badge #456789',
      url: '/officer/123456/jerome-finnigan/',
    };

    const wrapper = mount(
      <Router history={ createBrowserHistory() }>
        <Route path='/' component={
          () => <SearchItem
            type='OFFICER'
            id='8562'
            query='Ke'
            itemRank={ 3 }
            saveToRecent={ saveToRecentSpy }
            recentItemData={ officer }
          />
        } />
      </Router>
    );

    wrapper.find(Link).simulate('click');
    saveToRecentSpy.should.be.calledWith({
      type: 'OFFICER',
      id: '8562',
      data: officer,
    });

    tracking.trackSearchFocusedItem.should.be.calledOnce();
    tracking.trackSearchFocusedItem.should.be.calledWith('OFFICER', 'Ke', '8562', 3);
  });

  describe('componentDidMount', function () {
    context('isPinButtonIntroductionVisited is true', function () {
      context('showIntroduction is true', function () {
        it('should not set displayIntroduction to true after timeout', function () {
          const timer = useFakeTimers();
          const wrapper = shallow(
            <SearchItem
              showIntroduction={ true }
              isPinButtonIntroductionVisited={ true }
            />
          );
          wrapper.state('displayIntroduction').should.be.false();
          timer.tick(PINBOARD_INTRODUCTION_DELAY + 50);
          wrapper.state('displayIntroduction').should.be.false();
        });
      });

      context('showIntroduction is false', function () {
        it('should not set displayIntroduction to true after timeout', function () {
          const timer = useFakeTimers();
          const wrapper = shallow(
            <SearchItem
              showIntroduction={ false }
              isPinButtonIntroductionVisited={ true }
            />
          );
          wrapper.state('displayIntroduction').should.be.false();
          timer.tick(PINBOARD_INTRODUCTION_DELAY + 50);
          wrapper.state('displayIntroduction').should.be.false();
        });
      });
    });

    context('isPinButtonIntroductionVisited is false', function () {
      context('showIntroduction is true', function () {
        it('should set displayIntroduction to true after timeout', function () {
          const timer = useFakeTimers();
          const wrapper = shallow(<SearchItem showIntroduction={ true } />);
          wrapper.state('displayIntroduction').should.be.false();
          timer.tick(PINBOARD_INTRODUCTION_DELAY + 50);
          wrapper.state('displayIntroduction').should.be.true();
        });

        it('should get timeout value from appConfig', function () {
          const pinboardIntroductionDelay = 12;
          const appConfigGetStub = stub(appConfig.default, 'get')
            .withArgs(APP_CONFIG_KEYS.PINBOARD_INTRODUCTION_DELAY)
            .returns(pinboardIntroductionDelay);
          const setTimeoutSpy = spy(window, 'setTimeout');
          shallow(<SearchItem showIntroduction={ true } />);

          appConfigGetStub.should.be.calledOnce();
          appConfigGetStub.should.be.calledWith(APP_CONFIG_KEYS.PINBOARD_INTRODUCTION_DELAY);
          setTimeoutSpy.should.be.calledOnce();
          setTimeoutSpy.should.be.calledWith(match.any, pinboardIntroductionDelay);
        });
      });

      context('showIntroduction is false', function () {
        it('should not set displayIntroduction to true after timeout', function () {
          const timer = useFakeTimers();
          const wrapper = shallow(<SearchItem showIntroduction={ false } />);
          wrapper.state('displayIntroduction').should.be.false();
          timer.tick(PINBOARD_INTRODUCTION_DELAY + 50);
          wrapper.state('displayIntroduction').should.be.false();
        });
      });
    });
  });

  describe('componentWillUnmount', function () {
    context('this.displayIntroductionTimeout is not null', function () {
      it('should call clearTimeout', function () {
        const clearTimeoutSpy = spy(window, 'clearTimeout');
        const wrapper = mount(
          <Router history={ createBrowserHistory() }>
            <SearchItem showIntroduction={ true } />
          </Router>
        );
        const displayIntroductionTimeout = wrapper.find('SearchItem').instance().displayIntroductionTimeout;
        wrapper.unmount();
        clearTimeoutSpy.should.be.calledWith(displayIntroductionTimeout);
      });
    });
  });

  context('after display introduction', function () {
    let trackSearchFocusedItemStub;
    beforeEach(function () {
      trackSearchFocusedItemStub = stub(tracking, 'trackSearchFocusedItem');
    });

    context('click on item', function () {
      it('should call preventDefault and setPinButtonIntroductionVisited', function () {
        const timer = useFakeTimers();
        const preventDefaultSpy = spy();
        const visitPinButtonIntroductionSpy = spy();
        const wrapper = mount(
          <Router history={ createBrowserHistory() }>
            <SearchItem
              showIntroduction={ true }
              visitPinButtonIntroduction={ visitPinButtonIntroductionSpy }
            />
          </Router>
        );
        timer.tick(PINBOARD_INTRODUCTION_DELAY + 50);
        wrapper.update();
        wrapper.find('.pin-button-introduction').exists().should.be.true();
        wrapper.find(SearchItem).childAt(0).simulate(
          'click',
          { target: wrapper.find('.item-indicator').getDOMNode(), preventDefault: preventDefaultSpy }
        );
        preventDefaultSpy.should.be.calledOnce();
        trackSearchFocusedItemStub.should.be.calledOnce();
        visitPinButtonIntroductionSpy.should.be.calledOnce();
      });
    });

    context('click on introduction', function () {
      it('should dismiss PinButton introduction', function () {
        const timer = useFakeTimers();
        const preventDefaultSpy = spy();
        const visitPinButtonIntroductionSpy = spy();
        const wrapper = mount(
          <Router history={ createBrowserHistory() }>
            <SearchItem
              showIntroduction={ true }
              visitPinButtonIntroduction={ visitPinButtonIntroductionSpy }
            />
          </Router>
        );

        timer.tick(PINBOARD_INTRODUCTION_DELAY + 50);
        wrapper.update();
        wrapper.find('.pin-button-introduction').exists().should.be.true();
        wrapper.find(SearchItem).childAt(0).simulate(
          'click',
          { target: wrapper.find('.pin-button-introduction').getDOMNode(), preventDefault: preventDefaultSpy }
        );
        preventDefaultSpy.should.be.calledOnce();
        trackSearchFocusedItemStub.should.be.calledOnce();
        visitPinButtonIntroductionSpy.should.be.calledOnce();
      });
    });
  });
});
