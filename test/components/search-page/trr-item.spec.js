import React from 'react';
import { Link } from 'react-router';
import { mount } from 'enzyme';
import { spy } from 'sinon';

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
    };
    const wrapper = mount(
      <TrrItem
        item={ trr }
        saveToRecent={ saveToRecentSpy }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardSpy }
      />
    );

    wrapper.should.be.ok();
    const link = wrapper.find(Link);
    link.should.have.length(1);

    link.prop('to').should.eql('/trr/123456/');
    link.find('.item-title').text().should.eql('TRR');
    link.find('.item-subtitle').text().should.eql('123456');

    const searchItem = wrapper.find(SearchItem);
    searchItem.prop('id').should.eql('123456');
    searchItem.prop('type').should.eql('TRR');
    searchItem.prop('addOrRemoveItemInPinboard').should.eql(addOrRemoveItemInPinboardSpy);
    searchItem.prop('recentItemData').should.eql(recentItemData);
    searchItem.prop('saveToRecent').should.eql(saveToRecentSpy);
  });
});
