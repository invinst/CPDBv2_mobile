import React from 'react';
import { shallow } from 'enzyme';

import Timeline from 'components/officer-page/tabbed-pane-section/timeline';
import Item from 'components/officer-page/tabbed-pane-section/timeline/item';


describe('Timeline component', function () {
  it('should render items with correct borders', function () {
    const year = {
      date: '1994',
      hasData: true,
      kind: 'YEAR',
      rank: 'Police Officer',
      unitDescription: 'Mobile Strike Force',
      unitName: '153',
    };
    const cr = {
      attachments: [],
      category: 'Illegal Search',
      coaccused: 8,
      crid: '267098',
      date: 'NOV 8',
      finding: 'Not Sustained',
      kind: 'CR',
      outcome: 'No Action Taken',
      rank: 'Police Officer',
      unitDescription: 'Mobile Strike Force',
      unitName: '153',
      year: 2000,
    };
    const joined = {
      date: 'DEC 5',
      kind: 'JOINED',
      rank: 'Police Officer',
      unitDescription: 'Recruit Training Section',
      unitName: '044',
      year: 1988,
    };
    const unitChange = {
      date: 'APR 28',
      kind: 'UNIT_CHANGE',
      oldUnitDescription: 'Airport Law Enforcement Section - South',
      oldUnitName: '051',
      rank: 'Police Officer',
      unitDescription: 'Mobile Strike Force',
      unitName: '153',
      year: 1994,
    };
    const instance = shallow(<Timeline items={ [cr, year, unitChange, year, joined] }/>);
    const items = instance.find(Item);
    items.at(0).prop('hasBorderBottom').should.equal(true);
    items.at(1).prop('hasBorderBottom').should.equal(false);
    items.at(2).prop('hasBorderBottom').should.equal(false);
    items.at(3).prop('hasBorderBottom').should.equal(false);
    items.at(4).prop('hasBorderBottom').should.equal(false);
  });
});
