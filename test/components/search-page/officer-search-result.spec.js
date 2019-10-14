import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import InfiniteScroll from 'react-infinite-scroller';

import OfficerSearchResult from 'components/search-page/officer-search-result';
import OfficerItem from 'components/search-page/officer-item';


describe('<OfficerSearchResult />', function () {
  it('should be renderable', function () {
    shallow(
      <OfficerSearchResult
        items={ [{ id: 1 }] }
      />
    ).should.be.ok();
  });

  it('should render InfiniteScroll with correct props', function () {
    const spyGetSuggestionWithContentType = spy();
    const wrapper = mount(
      <OfficerSearchResult
        items={ [{ id: 1 }] }
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

  it('should render list of officer item', function () {
    const wrapper = shallow(
      <OfficerSearchResult
        items={ [{ id: 1 }, { id: 2 }] }
      />
    );

    wrapper.find(OfficerItem).should.have.length(2);
  });
});
