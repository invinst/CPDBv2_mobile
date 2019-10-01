import React from 'react';
import { shallow } from 'enzyme';

import { Link } from 'react-router';
import Trr from 'components/officer-page/tabbed-pane-section/timeline/item/trr';


describe('Trr component', function () {
  it('should render item correctly', function () {
    const trrItem = {
      trrId: 123,
      date: 'DEC 5',
      kind: 'FORCE',
      category: 'Use of Force Report',
      rank: 'Police Officer',
      unitDescription: 'Recruit Training Section',
      unitName: '153',
    };

    const instance = shallow(<Trr className='test--trr-item' item={ trrItem } />);
    instance.find('.test--trr-item .kind').text().should.equal('F');
    instance.find('.test--trr-item .category').text().should.equal('Use of Force Report');
    instance.find('.test--trr-item .date').text().should.equal('DEC 5');
    instance.find(Link).prop('to').should.equal('/trr/123/');
    instance.find(Link).prop('className').should.containEql('test--trr-item');
  });
});
