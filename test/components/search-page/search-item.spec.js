import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link, Router, Route } from 'react-router';
import { spy, stub } from 'sinon';
import { createMemoryHistory } from 'history';

import SearchItem from 'components/search-page/search-item';
import ItemPinButton from 'components/common/item-pin-button';
import * as GATracking from 'utils/google_analytics_tracking';


describe('<SearchItem />', function () {
  it('should not render ItemPinButton if hasPinButton is false', function () {
    const wrapper = shallow(<SearchItem hasPinButton={ false } />);
    wrapper.find(ItemPinButton).should.have.length(0);
  });

  it('should render ItemPinButton if hasPinButton is true', function () {
    const addOrRemoveItemInPinboard = spy();
    const wrapper = shallow(
      <SearchItem
        id='213'
        type='OFFICER'
        hasPinButton={ true }
        isPinned={ true }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
      />
    );

    const itemPinButton = wrapper.find(ItemPinButton);
    itemPinButton.prop('addOrRemoveItemInPinboard').should.eql(addOrRemoveItemInPinboard);
    itemPinButton.prop('id').should.equal('213');
    itemPinButton.prop('isPinned').should.be.true();
    itemPinButton.prop('type').should.equal('OFFICER');
    itemPinButton.prop('item').should.eql({
      type: 'OFFICER',
      id: '213',
      isPinned: true,
    });
    itemPinButton.prop('className').should.equal('item-pin-button');
  });

  it('should assign className to Link component', function () {
    const wrapper = shallow(
      <SearchItem className='custom'>
        <span>SearchItem children</span>
      </SearchItem>
    );
    wrapper.find(Link).props().className.should.containEql('custom');
  });

  it('should call saveToRecent and trackSearchFocusedItem when click on item', function () {
    stub(GATracking, 'trackSearchFocusedItem');
    const saveToRecentSpy = spy();
    const officer = {
      id: '8562',
      type: 'OFFICER',
      name: 'Jerome Finnigan',
      badge: 'Badge #456789',
      url: '/officer/123456/jerome-finnigan/',
    };

    const wrapper = mount(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={
          () => <SearchItem
            type='OFFICER'
            id='8562'
            query='Ke'
            itemRank={ 3 }
            saveToRecent={ saveToRecentSpy }
            recentItemData={ officer }
          />
        } />
      </Router>
    );

    wrapper.find(Link).simulate('click');
    saveToRecentSpy.should.be.calledWith({
      type: 'OFFICER',
      id: '8562',
      data: officer,
    });

    GATracking.trackSearchFocusedItem.should.be.calledOnce();
    GATracking.trackSearchFocusedItem.should.be.calledWith('OFFICER', 'Ke', '8562', 3);
    GATracking.trackSearchFocusedItem.restore();
  });
});
