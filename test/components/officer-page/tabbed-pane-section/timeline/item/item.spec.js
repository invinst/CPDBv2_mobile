import React from 'react';
import { shallow } from 'enzyme';
import should from 'should';

import Item from 'components/officer-page/tabbed-pane-section/timeline/item';
import Year from 'components/officer-page/tabbed-pane-section/timeline/item/year';
import CR from 'components/officer-page/tabbed-pane-section/timeline/item/cr';
import TRR from 'components/officer-page/tabbed-pane-section/timeline/item/trr';
import Award from 'components/officer-page/tabbed-pane-section/timeline/item/award';
import UnitChange from 'components/officer-page/tabbed-pane-section/timeline/item/unit-change';
import RankChange from 'components/officer-page/tabbed-pane-section/timeline/item/rank-change';
import Joined from 'components/officer-page/tabbed-pane-section/timeline/item/joined';


describe('Item component', function () {
  it('should render year item with correct className', function () {
    const year = {
      date: '1994',
      hasData: true,
      kind: 'YEAR',
      rank: 'Police Officer',
      unitDescription: 'Mobile Strike Force',
      unitName: 'Unit 153',
    };
    const instance = shallow(<Item item={ year }/>);
    const yearItem = instance.find(Year);
    yearItem.prop('item').should.eql(year);
    yearItem.prop('className').should.eql('normal-item');
  });

  it('should render cr item with correct className', function () {
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
    const instance = shallow(<Item item={ cr }/>);
    const crItem = instance.find(CR);
    crItem.prop('item').should.eql(cr);
    crItem.prop('className').should.eql('normal-item');
  });

  it('should render trr item with correct className', function () {
    const trr = {
      kind: 'FORCE',
      rank: 'Police Officer',
      unitDescription: 'Mobile Strike Force',
      unitName: '153',
      year: 2000,
    };
    const instance = shallow(<Item item={ trr }/>);
    const trrItem = instance.find(TRR);
    trrItem.prop('item').should.eql(trr);
    trrItem.prop('className').should.eql('normal-item');
  });

  it('should render award item with correct className', function () {
    const award = {
      kind: 'AWARD',
      rank: 'Police Officer',
      unitDescription: 'Mobile Strike Force',
      unitName: '153',
      year: 2000,
    };
    const instance = shallow(<Item item={ award }/>);
    const awardItem = instance.find(Award);
    awardItem.prop('item').should.eql(award);
    awardItem.prop('className').should.eql('normal-item');
  });

  it('should render unit change item with correct className', function () {
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
    const instance = shallow(<Item item={ unitChange }/>);
    const unitChangeItem = instance.find(UnitChange);
    unitChangeItem.prop('item').should.eql(unitChange);
    unitChangeItem.prop('className').should.eql('change-item');
  });

  it('should render rank change item with correct className', function () {
    const rankChange = {
      date: 'APR 28',
      kind: 'RANK_CHANGE',
      oldRank: 'Detective',
      rank: 'Police Officer',
      unitDescription: 'Mobile Strike Force',
      unitName: '153',
      year: 1994,
    };
    const instance = shallow(<Item item={ rankChange }/>);
    const rankChangeItem = instance.find(RankChange);
    rankChangeItem.prop('item').should.eql(rankChange);
    rankChangeItem.prop('className').should.eql('change-item');
  });

  it('should render joined item with correct className', function () {
    const joined = {
      date: 'DEC 5',
      kind: 'JOINED',
      rank: 'Police Officer',
      unitDescription: 'Recruit Training Section',
      unitName: '044',
      year: 1988,
    };
    const instance = shallow(<Item item={ joined }/>);
    const joinedItem = instance.find(Joined);
    joinedItem.prop('item').should.eql(joined);
    joinedItem.prop('className').should.eql('joined-item');
  });

  it('should render nothing if kind is incorrect', function () {
    const someItem = {
      kind: 'INCORRECTKIND',
    };
    const wrapper = shallow(<Item item={ someItem }/>);
    should(wrapper.getNode()).be.null();
  });
});
