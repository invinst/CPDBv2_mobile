import React from 'react';
import { shallow } from 'enzyme';
import { spy, useFakeTimers } from 'sinon';
import InfiniteScroll from 'react-infinite-scroller';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';

import { mountWithRouter } from 'utils/tests';
import SearchResult from 'components/search-page/search-result';
import OfficerItem from 'components/search-page/officer-item';
import CrItem from 'components/search-page/cr-item';
import TrrItem from 'components/search-page/trr-item';
import { APP_CONFIG_KEYS } from 'constants';
import appConfig from 'utils/app-config';


const PINBOARD_INTRODUCTION_DELAY = 1000;

describe('<SearchResult />', function () {
  it('should render correctly', function () {
    appConfig.set({
      [APP_CONFIG_KEYS.PINBOARD_INTRODUCTION_DELAY]: PINBOARD_INTRODUCTION_DELAY,
    });
    const timer = useFakeTimers();
    const spyGetSuggestionWithContentType = spy();
    const store = MockStore()({
      pinboardIntroduction: {
        isPinButtonIntroductionVisited: false,
      },
    });
    const wrapper = mountWithRouter(
      <Provider store={ store }>
        <SearchResult
          items={ [{ id: 1, showIntroduction: false }, { id: 2, showIntroduction: true }] }
          itemType='officers'
          query='qa'
          getSuggestionWithContentType={ spyGetSuggestionWithContentType }
          nextParams={ {
            contentType: 'OFFICER',
            limit: '30',
            offset: '60',
            term: '123',
          } }
          hasMore={ true }
        />
      </Provider>
    );
    let itemPinButton = wrapper.find('ItemPinButton');
    itemPinButton.length.should.equal(2);
    itemPinButton.at(0).prop('showIntroduction').should.be.false();
    itemPinButton.at(1).prop('showIntroduction').should.be.false();

    const infiniteScroll = wrapper.find(InfiniteScroll);
    infiniteScroll.prop('initialLoad').should.be.true();
    infiniteScroll.prop('hasMore').should.be.true();
    infiniteScroll.prop('useWindow').should.be.true();

    infiniteScroll.prop('loadMore')();
    spyGetSuggestionWithContentType.should.be.calledOnce();
    spyGetSuggestionWithContentType.should.be.calledWith(
      'qa',
      {
        contentType: 'OFFICER',
        limit: '30',
        offset: '60',
        term: '123',
      }
    );
    timer.tick(PINBOARD_INTRODUCTION_DELAY + 50);
    wrapper.update();
    itemPinButton = wrapper.find('ItemPinButton');
    itemPinButton.at(0).prop('showIntroduction').should.be.false();
    itemPinButton.at(1).prop('showIntroduction').should.be.true();
  });

  it('should render correct items based on item type', function () {
    const checkItemRender = (itemType, ItemComponent) => {
      const wrapper = shallow(
        <SearchResult
          itemType={ itemType }
          items={ [{ id: 1 }, { id: 2 }] }
        />
      );
      wrapper.find(ItemComponent).should.have.length(2);
    };

    checkItemRender('officers', OfficerItem);
    checkItemRender('dateOfficers', OfficerItem);
    checkItemRender('dateCRs', CrItem);
    checkItemRender('crs', CrItem);
    checkItemRender('investigatorCRs', CrItem);
    checkItemRender('dateTRRs', TrrItem);
    checkItemRender('trrs', TrrItem);
  });
});
