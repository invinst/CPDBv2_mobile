import React from 'react';
import { shallow } from 'enzyme';

import RankChange from 'components/officer-page/tabbed-pane-section/timeline/item/rank-change';


describe('RankChange component', function () {
  it('should render item correctly', function () {
    const unitChange = {
      date: 'APR 28',
      kind: 'RANK_CHANGE',
      oldRank: 'Police Officer',
      rank: 'Detective',
      unitDescription: 'Mobile Strike Force',
      unitName: 'Unit 153',
      year: 1994,
    };

    const instance = shallow(<RankChange className='test--rank-change' item={ unitChange }/>);
    instance.find('.test--rank-change .rank-change').text().should.equal('Police Officer → Detective');
    instance.find('.test--rank-change .date').text().should.equal('APR 28');
  });

  it('should render old rank with different class if the old rank is marked with Unassigned', function () {
    const unitChange = {
      date: 'APR 28',
      kind: 'UNIT_CHANGE',
      oldRank: 'Unassigned',
      rank: 'Police Officer',
      unitDescription: 'Mobile Strike Force',
      unitName: 'Unit 153',
      year: 1994,
    };

    const instance = shallow(<RankChange item={ unitChange }/>);
    instance.find('.unassigned-old-rank').text().should.equal('Unassigned → ');
    instance.find('.assigned-old-rank').exists().should.be.false();
    instance.find('.date').text().should.equal('APR 28');
  });
});
