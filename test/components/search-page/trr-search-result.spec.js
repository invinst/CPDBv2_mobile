import React from 'react';
import { Link, Router, Route } from 'react-router';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { createMemoryHistory } from 'history';

import TRRSearchResult from 'components/search-page/trr-search-result';


describe('<TRRSearchResult />', () => {

  it('should render trrs correctly', () => {
    const trrs = [
      { id: '1' },
      { id: '2' },
      { id: '3' },
    ];

    const wrapper = mount(
      <TRRSearchResult
        items={ trrs }
        saveToRecent={ () => {} }
        categoryFilter='TRR'
      />
    );

    wrapper.should.be.ok();
    wrapper.find(Link).should.have.length(3);
  });

  it('should call saveToRecent when click on item', function () {
    const saveToRecentSpy = spy();
    const trrs = [
      {
        id: '1',
        url: 'url'
      }
    ];
    const wrapper = mount(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={
          () => <TRRSearchResult
            items={ trrs }
            saveToRecent={ saveToRecentSpy }
            categoryFilter='TRR'
          />
        } />
      </Router>
    );

    wrapper.find(Link).simulate('click');
    saveToRecentSpy.calledWith({
      type: 'TRR',
      title: '1',
      url: 'url'
    }).should.be.true();
  });
});
