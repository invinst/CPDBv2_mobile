import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import RecentActivities from 'components/landing-page/recent-activities';
import { EditorState } from 'draft-js';
import CarouselWrapper from 'components/landing-page/carousel-wrapper';
import OfficerCard from 'components/common/officer-card';

describe('<RecentActivities />', () => {
  it('should render enough contents', () => {
    const recentActivities = [{ id: '123' }, { id: '456' }];
    const titleCMSContent = EditorState.createEmpty();
    const descriptionCMSContent = EditorState.createEmpty();

    const wrapper = shallow(
      <RecentActivities
        recentActivities={ recentActivities }
        title={ titleCMSContent }
        description={ descriptionCMSContent }
      />
    );

    const carouselWrapper = wrapper.find(CarouselWrapper);
    carouselWrapper.prop('title').should.eql(titleCMSContent);
    carouselWrapper.prop('description').should.eql(descriptionCMSContent);
    carouselWrapper.prop('trackingContentType').should.eql('ACTIVITY');

    const officerCards = carouselWrapper.find(OfficerCard);
    officerCards.should.have.length(2);
    officerCards.at(0).prop('officer').should.eql({ id: '123' });
    officerCards.at(1).prop('officer').should.eql({ id: '456' });
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

    requestRecentActivitiesSpy.resetHistory();
    mount(
      <RecentActivities
        requestRecentActivities={ requestRecentActivitiesSpy }
      />
    );
    requestRecentActivitiesSpy.called.should.be.true();
  });
});
