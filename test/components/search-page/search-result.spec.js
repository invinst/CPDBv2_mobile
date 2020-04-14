import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import InfiniteScroll from 'react-infinite-scroller';

import { mountWithRouter } from 'utils/tests';
import SearchResult from 'components/search-page/search-result';
import OfficerItem from 'components/search-page/officer-item';
import CrItem from 'components/search-page/cr-item';
import TrrItem from 'components/search-page/trr-item';


describe('SearchResult />', function () {
  it('should render correctly', function () {
    const spyGetSuggestionWithContentType = spy();
    const wrapper = mountWithRouter(
      <SearchResult
        items={ [{ id: 1, showIntroduction: true }, { id: 2, showIntroduction: false }] }
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
    );
    const itemPinButton = wrapper.find('ItemPinButton');
    itemPinButton.length.should.equal(2);
    itemPinButton.at(0).prop('showIntroduction').should.be.true();
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
