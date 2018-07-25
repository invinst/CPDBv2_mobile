import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import RecentActivities from 'components/landing-page/recent-activities';

describe('<RecentActivities />', () => {
  it('should be renderable', () => {
    const wrapper = shallow(<RecentActivities />);
    wrapper.should.be.ok();
  });

  it('should call requestRecentActivities', () => {
    const requestRecentActivitiesSpy = spy();
    mount(
      <RecentActivities
        requestRecentActivities={ requestRecentActivitiesSpy }
        recentActivities={ [{ percentile: {} }] }
      />
    );
    requestRecentActivitiesSpy.called.should.be.false();

    requestRecentActivitiesSpy.reset();
    mount(
      <RecentActivities
        requestRecentActivities={ requestRecentActivitiesSpy }
      />
    );
    requestRecentActivitiesSpy.called.should.be.true();
  });
});
