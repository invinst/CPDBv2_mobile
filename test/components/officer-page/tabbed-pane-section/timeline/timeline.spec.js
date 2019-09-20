import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';

import Timeline from 'components/officer-page/tabbed-pane-section/timeline';
import Item from 'components/officer-page/tabbed-pane-section/timeline/item';
import Dropdown from 'components/shared/dropdown';
import { TIMELINE_FILTERS } from 'constants/officer-page/tabbed-pane-section/timeline';


describe('Timeline component', function () {
  it('should render items', function () {
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
    const filterCount = {
      ALL: 1,
      CRS: 1,
      SUSTAINED: 0,
      FORCE: 0,
      AWARDS: 0,
      RANK_UNIT_CHANGES: 0,
    };

    const instance = shallow(
      <Timeline
        items={ [cr, year, unitChange, year, joined] }
        filterCount={ filterCount }
        selectedFilter={ TIMELINE_FILTERS.ALL }
      />
    );
    const items = instance.find(Item);
    items.should.have.length(5);
  });

  it('should render filter dropdown', function () {
    const filterCount = {
      ALL: 10,
      CRS: 4,
      SUSTAINED: 3,
      FORCE: 2,
      AWARDS: 1,
      RANK_UNIT_CHANGES: 0,
    };

    const wrapper = mount(<Timeline filterCount={ filterCount } selectedFilter={ TIMELINE_FILTERS.ALL }/>);

    wrapper.find('.timeline-filter-wrapper').exists().should.be.true();
    const filterDropdown = wrapper.find(Dropdown);
    filterDropdown.prop('defaultValue').should.eql('All');
    filterDropdown.prop('options').should.eql(
      ['All', 'Complaints', 'Sustained', 'Use Of Force', 'Awards', 'Rank/Unit Changes']
    );
    filterDropdown.prop('className').should.eql('timeline-filter');
    filterDropdown.prop('labels').should.eql(
      ['All (10)', 'Complaints (4)', 'Sustained (3)', 'Use Of Force (2)', 'Awards (1)', 'Rank/Unit Changes']
    );
  });

  it('should call changeFilter when clicking dropdown items', function () {
    const filterCount = {
      ALL: 0,
      CRS: 0,
      SUSTAINED: 0,
      FORCE: 0,
      AWARDS: 0,
      RANK_UNIT_CHANGES: 0,
    };

    const changeFilterStub = stub();
    const wrapper = mount(
      <Timeline
        selectedFilter={ TIMELINE_FILTERS.SUSTAINED }
        changeFilter={ changeFilterStub }
        filterCount={ filterCount }
      />
    );

    const filterDropdown = wrapper.find(Dropdown);
    filterDropdown.prop('defaultValue').should.eql('Sustained');

    wrapper.find('.dropdown-button').simulate('click');
    wrapper.find('.dropdown-menu-item').at(1).simulate('click');

    changeFilterStub.should.be.calledWith({
      label: 'Complaints',
      kind: ['CR'],
    });
  });
});
