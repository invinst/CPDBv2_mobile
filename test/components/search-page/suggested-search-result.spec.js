import React from 'react';
import { Router, Route } from 'react-router';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { createMemoryHistory } from 'history';

import SuggestedSearchResult from 'components/search-page/suggested-search-result';

describe('<SuggestedSearchResult />', () => {
  it('should render item correctly', () => {
    const items = [{
      url: 'localhost',
      type: 'recent',
      title: 'Whatever'
    }];

    const wrapper = mount(
      <SuggestedSearchResult
        items={ items }
        saveToRecent={ () => {} }
      />
    );
    const itemLink = wrapper.find('Link');

    itemLink.exists().should.be.true();
    itemLink.hasClass('suggested').should.be.true();
    itemLink.prop('to').should.be.eql('localhost');
    itemLink.text().should.eql('recentWhatever');
  });

  it('should dispatch "saveToRecent" action when clicked', () => {
    const spySaveToRecent = spy();
    const items = [{
      url: 'localhost',
      type: 'recent',
      title: 'Whatever'
    }];

    const wrapper = mount(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={
          () => <SuggestedSearchResult
            items={ items }
            saveToRecent={ spySaveToRecent }
          />
        } />
      </Router>
    );
    const itemLink = wrapper.find('Link');

    itemLink.simulate('click');
    spySaveToRecent.calledWith({
      url: 'localhost',
      type: 'recent',
      title: 'Whatever'
    }).should.be.true();
  });

});
