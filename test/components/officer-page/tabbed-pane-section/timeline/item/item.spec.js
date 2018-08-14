import React from 'react';
import { shallow } from 'enzyme';

import Item from 'components/officer-page/tabbed-pane-section/timeline/item';
import Year from 'components/officer-page/tabbed-pane-section/timeline/item/year';
import CR from 'components/officer-page/tabbed-pane-section/timeline/item/cr';
import TRR from 'components/officer-page/tabbed-pane-section/timeline/item/trr';
import Award from 'components/officer-page/tabbed-pane-section/timeline/item/award';
import UnitChange from 'components/officer-page/tabbed-pane-section/timeline/item/unit-change';
import RankChange from 'components/officer-page/tabbed-pane-section/timeline/item/rank-change';
import Joined from 'components/officer-page/tabbed-pane-section/timeline/item/joined';


describe('Item component', function () {
  it('should render item with correct kind', function () {
    const year = {
      date: '1994',
      hasData: true,
      kind: 'YEAR',
      rank: 'Police Officer',
      unitDescription: 'Mobile Strike Force',
      unitName: 'Unit 153',
    };
    const instance = shallow(<Item item={ year }/>);
    instance.find(Year).should.have.length(1);
  });

  it('should not render item with incorrect kind', function () {
    const components = [CR, TRR, Award, UnitChange, RankChange, Joined, Year];
    const someItem = {
      kind: 'SOMEKIND',
    };
    const wrapper = shallow(<Item item={ someItem }/>);
    components.map(component => {
      wrapper.find(component).exists().should.be.false();
    });
  });
});
