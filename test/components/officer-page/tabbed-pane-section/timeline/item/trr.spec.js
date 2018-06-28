import React from 'react';
import { shallow } from 'enzyme';

import { Link } from 'react-router';
import Trr from 'components/officer-page/tabbed-pane-section/timeline/item/showings/trr';


describe('Trr component', function () {
  it('should render item correctly', function () {
    const trrItem = {
      trrId: 123,
      date: 'DEC 5',
      kind: 'FORCE',
      category: 'Use of Force Report',
      rank: 'Police Officer',
      rankDisplay: ' ',
      unitDescription: 'Recruit Training Section',
      unitDisplay: ' ',
      unitName: '153',
    };

    const instance = shallow(<Trr item={ trrItem } hasBorderBottom={ false } />);
    instance.find('.kind').text().should.equal('F');
    instance.find('.category').text().should.equal('Use of Force Report');
    instance.find('.date').text().should.equal('DEC 5');
    instance.find(Link).prop('to').should.equal('/trr/123/');
  });
});
