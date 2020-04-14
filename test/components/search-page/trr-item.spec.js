import React from 'react';
import { Link } from 'react-router-dom';
import { spy } from 'sinon';

import { mountWithRouter } from 'utils/tests';
import TrrItem from 'components/search-page/trr-item';
import SearchItem from 'components/search-page/search-item';


describe('<TrrItem />', function () {
  it('should render trr correctly', function () {
    const saveToRecentSpy = spy();
    const addOrRemoveItemInPinboardSpy = spy();
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
    const wrapper = mountWithRouter(
      <TrrItem
        query='Ke'
        item={ trr }
        saveToRecent={ saveToRecentSpy }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardSpy }
      />
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
    searchItem.prop('addOrRemoveItemInPinboard').should.eql(addOrRemoveItemInPinboardSpy);
    searchItem.prop('recentItemData').should.eql(recentItemData);
    searchItem.prop('saveToRecent').should.eql(saveToRecentSpy);
  });
});
