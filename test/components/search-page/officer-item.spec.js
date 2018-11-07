import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import OfficerItem from 'components/search-page/officer-item';

describe('<OfficerItem />', () => {
  it('should be renderable', () => {
    shallow(<OfficerItem />).should.be.ok();
  });

  it('should call saveToRecent when click on item', function () {
    const saveToRecentSpy = spy();
    const wrapper = shallow(
      <OfficerItem
        name='Peter'
        url='/officer/1/peter/'
        saveToRecent={ saveToRecentSpy }
      />
    );

    wrapper.simulate('click');
    saveToRecentSpy.calledWith({
      type: 'Officer',
      title: 'Peter',
      url: '/officer/1/peter/'
    }).should.be.true();
  });
});
