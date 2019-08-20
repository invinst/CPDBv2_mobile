import React from 'react';
import { Link } from 'react-router';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import CrItem from 'components/search-page/cr-item';
import SearchItem from 'components/search-page/search-item';


describe('<CrItem />', function () {
  it('should render cr correctly', function () {
    const saveToRecentSpy = spy();
    const addOrRemoveItemInPinboardSpy = spy();
    const recentItemData = {
      crid: '1027271',
      url: '/complaint/1027271/',
      category: 'Use Of Force',
      'incident-date': '06/13/2009',
      type: 'CR',
    };
    const cr = {
      crid: '1027271',
      url: '/complaint/1027271/',
      category: 'Use Of Force',
      incidentDate: '06/13/2009',
      isPinned: false,
      type: 'CR',
      recentItemData: recentItemData,
    };

    const wrapper = mount(
      <CrItem
        item={ cr }
        saveToRecent={ saveToRecentSpy }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardSpy }
      />
    );

    wrapper.should.be.ok();
    const link = wrapper.find(Link);
    link.should.have.length(1);

    link.prop('to').should.eql('/complaint/1027271/');
    link.find('.item-subtitle').text().should.eql('CRID 1027271 • 06/13/2009');
    link.find('.item-title').text().should.eql('Use Of Force');

    const searchItem = wrapper.find(SearchItem);
    searchItem.prop('id').should.eql('1027271');
    searchItem.prop('type').should.eql('CR');
    searchItem.prop('addOrRemoveItemInPinboard').should.eql(addOrRemoveItemInPinboardSpy);
    searchItem.prop('recentItemData').should.eql(recentItemData);
    searchItem.prop('saveToRecent').should.eql(saveToRecentSpy);
  });
});
