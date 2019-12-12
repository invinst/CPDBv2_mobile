import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import InfiniteScroll from 'react-infinite-scroller';

import SearchResult from 'components/search-page/search-result';
import OfficerItem from 'components/search-page/officer-item';
import CrItem from 'components/search-page/cr-item';
import TrrItem from 'components/search-page/trr-item';


describe('SearchResult />', function () {
  it('should render InfiniteScroll with correct props', function () {
    const spyGetSuggestionWithContentType = spy();
    const wrapper = mount(
      <SearchResult
        items={ [{ id: 1 }] }
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
    const infiniteScroll = wrapper.find(InfiniteScroll);
    infiniteScroll.props().initialLoad.should.be.true();
    infiniteScroll.props().hasMore.should.be.true();
    infiniteScroll.props().useWindow.should.be.true();
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
