import React from 'react';
import { shallow } from 'enzyme';

import OfficerSearchResult from 'components/search-page/officer-search-result';

describe('<OfficerSearchResult />', () => {
  it('should be renderable', () => {
    shallow(
      <OfficerSearchResult
        items={ [{ id: 1 }] }
        saveToRecent={ () => {} }
      />
    ).should.be.ok();
  });
});
