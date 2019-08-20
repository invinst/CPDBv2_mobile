import React from 'react';
import { mount } from 'enzyme';

import SuggestedSearchResult from 'components/search-page/suggested-search-result';

describe('<SuggestedSearchResult />', function () {
  it('should render item correctly', function () {
    const items = [{
      url: 'localhost',
      type: 'recent',
      title: 'Whatever',
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
});
