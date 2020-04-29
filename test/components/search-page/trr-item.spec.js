import React from 'react';
import { Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';

import { mountWithRouter } from 'utils/tests';
import TrrItem from 'components/search-page/trr-item';
import SearchItem from 'components/search-page/search-item';


describe('<TrrItem />', function () {
  it('should render trr correctly', function () {
    const recentItemData = {
      id: '123456',
      type: 'TRR',
    };
    const trr = {
      id: '123456',
      type: 'TRR',
      url: '/trr/123456/',
      recentItemData: recentItemData,
      itemRank: 3,
      showIntroduction: true,
    };
    const store = MockStore()({
      pinboardIntroduction: {
        isPinButtonIntroductionVisited: true,
      },
    });
    const wrapper = mountWithRouter(
      <Provider store={ store }>
        <TrrItem
          query='Ke'
          item={ trr }
        />
      </Provider>
    );

    wrapper.should.be.ok();
    const link = wrapper.find(Link);
    link.should.have.length(1);

    link.prop('to').should.equal('/trr/123456/');
    link.find('.item-title').text().should.equal('TRR');
    link.find('.item-subtitle').text().should.equal('123456');

    const searchItem = wrapper.find(SearchItem);
    searchItem.prop('id').should.equal('123456');
    searchItem.prop('type').should.equal('TRR');
    searchItem.prop('itemRank').should.equal(3);
    searchItem.prop('query').should.equal('Ke');
    searchItem.prop('showIntroduction').should.be.true();
    searchItem.prop('isPinButtonIntroductionVisited').should.be.true();
  });
});
