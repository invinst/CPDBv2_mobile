import React from 'react';
import { shallow } from 'enzyme';

import Year from 'components/officer-page/tabbed-pane-section/timeline/item/year';


describe('Year component', function () {
  it('should render item correctly', function () {
    const year = {
      date: '1994',
      hasData: true,
      kind: 'YEAR',
      rank: 'Police Officer',
      unitDescription: 'Mobile Strike Force',
      unitName: '153',
    };

    const instance = shallow(<Year item={ year } hasBorderBottom={ false } />);
    instance.find('.content').text().should.equal('1994');
    instance.find('.date').text().should.equal('1994');
  });
});
