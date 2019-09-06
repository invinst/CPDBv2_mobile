import React from 'react';
import { shallow } from 'enzyme';

import Award from 'components/officer-page/tabbed-pane-section/timeline/item/award';


describe('Award component', function () {
  it('should render item correctly', function () {
    const awardItem = {
      date: 'Jan 01',
      kind: 'CR',
      unitName: '001',
      rank: 'Police Officer',
      category: 'Honorable Mention',
    };

    const instance = shallow(<Award className='test--award-item' item={ awardItem }/>);
    const content = instance.find('.test--award-item .content');
    content.find('.kind').text().should.equal('A');
    content.find('.category').text().should.equal('Honorable Mention');
    content.find('.date').text().should.equal('Jan 01');
  });
});
