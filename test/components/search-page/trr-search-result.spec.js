import React from 'react';
import { shallow } from 'enzyme';

import TRRSearchResult from 'components/search-page/trr-search-result';
import TrrItem from 'components/search-page/trr-item';


describe('<TRRSearchResult />', function () {
  it('should be renderable', function () {
    shallow(
      <TRRSearchResult
        items={ [{ id: 1 }] }
      />
    ).should.be.ok();
  });

  it('should render list of trr item', function () {
    const wrapper = shallow(
      <TRRSearchResult
        items={ [{ id: 1 }, { id: 2 }] }
      />
    );

    wrapper.find(TrrItem).should.have.length(2);
  });
});
