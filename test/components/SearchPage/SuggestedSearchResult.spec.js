import should from 'should';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import SuggestedSearchResult from 'components/SearchPage/SuggestedSearchResult';

describe('<SuggestedSearchResult />', () => {
  it('should render item correctly', () => {
    const item = {
      url: 'localhost',
      type: 'recent',
      title: 'Whatever'
    };

    const wrapper = mount(
      <SuggestedSearchResult
        item={ item }
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
    const item = {
      url: 'localhost',
      type: 'recent',
      title: 'Whatever'
    };

    const wrapper = shallow(
      <SuggestedSearchResult
        item={ item }
        saveToRecent={ spySaveToRecent }
      />
    );
    const itemLink = wrapper.find('Link');

    itemLink.simulate('click');
    spySaveToRecent.calledWith(item).should.be.true();
  });

});
