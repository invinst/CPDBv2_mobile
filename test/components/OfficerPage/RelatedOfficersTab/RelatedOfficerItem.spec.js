import React from 'react';
import { shallow } from 'enzyme';
import { mock, match } from 'sinon';

import AppHistory from 'utils/History';
import HelperUtil from 'utils/HelperUtil';
import f from 'utils/tests/f';
import RelatedOfficerItem from 'components/OfficerPage/RelatedOfficersTab/RelatedOfficerItem';


describe('RelatedOfficerItem component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<RelatedOfficerItem />);
    wrapper.should.be.ok();
  });

  it('should push url to AppHistory on clicking item', function () {
    const mockAppHistory = mock(AppHistory);
    const wrapper = shallow(<RelatedOfficerItem officer={ f.create('Officer') }/>);
    
    mockAppHistory.expects('push').once().withArgs(match.any).returns('anything');
    wrapper.simulate('click');

    mockAppHistory.verify();
    mockAppHistory.restore();
  });
});
