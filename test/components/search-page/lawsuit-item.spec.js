import React from 'react';
import { Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';

import { mountWithRouter } from 'utils/tests';
import LawsuitItem from 'components/search-page/lawsuit-item';
import SearchItem from 'components/search-page/search-item';


describe('<LawsuitItem />', function () {
  it('should render lawsuit correctly', function () {
    const recentItemData = {
      'id': 25,
      'url': '/lawsuit/00-L-5230/',
      'case_no': '00-L-5230',
      'type': 'LAWSUIT',
      'primary_cause': 'EXCESSIVE FORCE/MINOR',
      'incident_date': '2016-09-11',
    };
    const lawsuit = {
      id: 234567,
      url: '/lawsuit/00-L-5230/',
      caseNo: '00-L-5230',
      itemRank: 3,
      primaryCause: 'EXCESSIVE FORCE/MINOR',
      isPinned: false,
      type: 'LAWSUIT',
      incidentDate: '2016-09-11',
      recentItemData: recentItemData,
    };

    const store = MockStore()({
      pinboardIntroduction: {
        isPinButtonIntroductionVisited: true,
      },
    });

    const wrapper = mountWithRouter(
      <Provider store={ store }>
        <LawsuitItem
          query='Ke'
          item={ lawsuit }
        />
      </Provider>
    );

    const link = wrapper.find(Link);
    link.should.have.length(1);

    link.prop('to').should.equal('/lawsuit/00-L-5230/');
    link.find('.item-subtitle').text().should.equal('00-L-5230 • 2016-09-11');
    link.find('.item-title').text().should.equal('EXCESSIVE FORCE/MINOR');

    const searchItem = wrapper.find(SearchItem);
    searchItem.prop('id').should.equal(234567);
    searchItem.prop('query').should.equal('Ke');
    searchItem.prop('type').should.equal('LAWSUIT');
    searchItem.prop('itemRank').should.equal(3);
    searchItem.prop('recentItemData').should.eql(recentItemData);
  });
});
