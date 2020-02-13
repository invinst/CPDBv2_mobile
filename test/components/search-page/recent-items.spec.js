import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import RecentItems from 'components/search-page/recent-items';
import OfficerItem from 'components/search-page/officer-item';
import CrItem from 'components/search-page/cr-item';
import TrrItem from 'components/search-page/trr-item';


describe('<RecentItems />', function () {
  it('should render items correctly', function () {
    const addOrRemoveItemInPinboardSpy = spy();
    const cr = {
      crid: '1027271',
      url: '/complaint/1027271/',
      category: 'Use Of Force',
      incidentDate: '06/13/2009',
      isPinned: false,
      type: 'CR',
      recentItemData: {
        crid: '1027271',
        url: '/complaint/1027271/',
        category: 'Use Of Force',
        'incident-date': '06/13/2009',
        type: 'CR',
      },
      itemRank: 2,
    };
    const officer = {
      id: '8562',
      type: 'OFFICER',
      name: 'Jerome Finnigan',
      badge: 'Badge #456789',
      url: '/officer/123456/jerome-finnigan/',
      recentItemData: {
        id: '8562',
        type: 'OFFICER',
        name: 'Jerome Finnigan',
        badge: 'Badge #456789',
      },
      itemRank: 3,
    };
    const trr = {
      id: '123456',
      type: 'TRR',
      url: '/trr/123456/',
      recentItemData: {
        id: '123456',
        type: 'TRR',
      },
      itemRank: 3,
    };

    const wrapper = shallow(
      <RecentItems
        query='Ke'
        items={ [cr, officer, trr] }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardSpy }
      />
    );

    const crItem = wrapper.find(CrItem);
    crItem.prop('query').should.equal('Ke');
    crItem.prop('item').should.eql(cr);
    crItem.prop('addOrRemoveItemInPinboard').should.eql(addOrRemoveItemInPinboardSpy);

    const officerItem = wrapper.find(OfficerItem);
    officerItem.prop('query').should.equal('Ke');
    officerItem.prop('item').should.eql(officer);
    officerItem.prop('addOrRemoveItemInPinboard').should.eql(addOrRemoveItemInPinboardSpy);

    const trrItem = wrapper.find(TrrItem);
    trrItem.prop('query').should.equal('Ke');
    trrItem.prop('item').should.eql(trr);
    trrItem.prop('addOrRemoveItemInPinboard').should.eql(addOrRemoveItemInPinboardSpy);
  });
});
