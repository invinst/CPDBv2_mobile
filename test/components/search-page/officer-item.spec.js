import React from 'react';
import { Link } from 'react-router';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import OfficerItem from 'components/search-page/officer-item';
import SearchItem from 'components/search-page/search-item';


describe('<OfficerItem />', function () {
  it('should render officer correctly', function () {
    const saveToRecentSpy = spy();
    const addOrRemoveItemInPinboardSpy = spy();
    const recentItemData = {
      id: '8562',
      type: 'OFFICER',
      name: 'Jerome Finnigan',
      badge: 'Badge #456789',
    };
    const officer = {
      id: '8562',
      type: 'OFFICER',
      name: 'Jerome Finnigan',
      badge: 'Badge #456789',
      url: '/officer/123456/jerome-finnigan/',
      recentItemData: recentItemData,
    };

    const wrapper = mount(
      <OfficerItem
        item={ officer }
        saveToRecent={ saveToRecentSpy }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardSpy }
      />
    );

    wrapper.should.be.ok();
    const link = wrapper.find(Link);
    link.should.have.length(1);

    link.prop('to').should.eql('/officer/123456/jerome-finnigan/');
    link.find('.item-title').text().should.eql('Jerome Finnigan');
    link.find('.item-subtitle').text().should.eql('Badge #456789');

    const searchItem = wrapper.find(SearchItem);
    searchItem.prop('id').should.eql('8562');
    searchItem.prop('type').should.eql('OFFICER');
    searchItem.prop('addOrRemoveItemInPinboard').should.eql(addOrRemoveItemInPinboardSpy);
    searchItem.prop('recentItemData').should.eql(recentItemData);
    searchItem.prop('saveToRecent').should.eql(saveToRecentSpy);
  });
});
