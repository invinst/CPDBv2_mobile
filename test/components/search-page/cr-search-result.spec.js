import React from 'react';
import { shallow } from 'enzyme';

import CRSearchResult from 'components/search-page/cr-search-result';
import CrItem from 'components/search-page/cr-item';


describe('<CRSearchResult />', function () {
  it('should be renderable', function () {
    shallow(
      <CRSearchResult
        items={ [{ crid: 1 }] }
      />
    ).should.be.ok();
  });

  it('should render list of cr item', function () {
    const wrapper = shallow(
      <CRSearchResult
        items={ [{ crid: 1 }, { crid: 2 }] }
      />
    );

    wrapper.find(CrItem).should.have.length(2);
  });
});
