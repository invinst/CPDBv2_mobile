import React from 'react';
import { shallow } from 'enzyme';

import OfficerSearchResult from 'components/search-page/officer-search-result';
import OfficerItem from 'components/search-page/officer-item';


describe('<OfficerSearchResult />', function () {
  it('should be renderable', function () {
    shallow(
      <OfficerSearchResult
        items={ [{ id: 1 }] }
      />
    ).should.be.ok();
  });

  it('should render list of officer item', function () {
    const wrapper = shallow(
      <OfficerSearchResult
        items={ [{ id: 1 }, { id: 2 }] }
      />
    );

    wrapper.find(OfficerItem).should.have.length(2);
  });
});
