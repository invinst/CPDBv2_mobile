import React from 'react';
import { shallow } from 'enzyme';

import Joined from 'components/officer-page/tabbed-pane-section/timeline/item/joined';


describe('Joined component', function () {
  it('should render item correctly', function () {
    const joinedItem = {
      date: 'DEC 5',
      kind: 'JOINED',
      rank: 'Police Officer',
      unitDescription: 'Recruit Training Section',
      unitName: 'Unit 044',
      year: 1988,
    };

    const instance = shallow(<Joined item={ joinedItem } hasBorderBottom={ false } />);
    instance.find('.join').text().should.equal('Joined CPD');
    instance.find('.date').text().should.equal('DEC 5');
  });
});
