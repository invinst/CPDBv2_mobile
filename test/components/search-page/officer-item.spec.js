import React from 'react';
import { Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';

import { mountWithRouter } from 'utils/tests';
import OfficerItem from 'components/search-page/officer-item';
import SearchItem from 'components/search-page/search-item';


describe('<OfficerItem />', function () {
  it('should render officer correctly', function () {
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
        <OfficerItem
          item={ officer }
          query='Le'
        />
      </Provider>
    );

    wrapper.should.be.ok();
    const link = wrapper.find(Link);
    link.should.have.length(1);

    link.prop('to').should.equal('/officer/123456/jerome-finnigan/');
    link.find('.item-title').text().should.equal('Jerome Finnigan');
    link.find('.item-subtitle').text().should.equal('Badge #456789');

    const searchItem = wrapper.find(SearchItem);
    searchItem.prop('id').should.equal('8562');
    searchItem.prop('type').should.equal('OFFICER');
    searchItem.prop('itemRank').should.equal(3);
    searchItem.prop('query').should.equal('Le');
    searchItem.prop('showIntroduction').should.be.true();
    searchItem.prop('recentItemData').should.eql(recentItemData);
  });
});
