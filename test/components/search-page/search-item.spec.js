import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link, Router, Route } from 'react-router';
import { spy } from 'sinon';
import { createMemoryHistory } from 'history';

import SearchItem from 'components/search-page/search-item';
import ItemPinButton from 'components/search-page/item-pin-button';


describe('<SearchItem />', function () {
  it('should not render ItemPinButton if hasPinButton is false', function () {
    const wrapper = shallow(<SearchItem hasPinButton={ false } />);
    wrapper.find(ItemPinButton).should.have.length(0);
  });

  it('should render ItemPinButton if hasPinButton is true', function () {
    const wrapper = shallow(<SearchItem hasPinButton={ true } />);
    wrapper.find(ItemPinButton).should.have.length(1);
  });

  it('should assign className to Link component', function () {
    const wrapper = shallow(
      <SearchItem className='custom'>
        <span>SearchItem children</span>
      </SearchItem>
    );
    wrapper.find(Link).props().className.should.containEql('custom');
  });

  it('should call saveToRecent when click on item', function () {
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
            saveToRecent={ saveToRecentSpy }
            recentItemData={ officer }
          />
        } />
      </Router>
    );

    wrapper.find(Link).simulate('click');
    saveToRecentSpy.calledWith({
      type: 'OFFICER',
      id: '8562',
      data: officer,
    }).should.be.true();
  });
});
