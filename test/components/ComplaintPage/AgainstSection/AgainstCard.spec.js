import React from 'react';
import { mount, shallow } from 'enzyme';
import { mock, match } from 'sinon';

import AgainstCard from 'components/ComplaintPage/AgainstSection/AgainstCard';
import AppHistory from 'utils/History';


describe('AgainstCard component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<AgainstCard />);
    wrapper.should.be.ok();
  });

  it('should push history on clicking AgainstCard', function () {
    const mockAppHistory = mock(AppHistory);

    mockAppHistory.expects('push').once().withArgs(match.any).returns('anything');
    const wrapper = mount(
      <AgainstCard />
    );
    wrapper.find('.against-card > div').first().simulate('click');
    mockAppHistory.verify();
    mockAppHistory.restore();
  });
});
