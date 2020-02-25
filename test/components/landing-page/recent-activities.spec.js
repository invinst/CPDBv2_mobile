import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { mountWithRouter } from 'utils/tests';
import RecentActivities from 'components/landing-page/recent-activities';
import { EditorState } from 'draft-js';
import CarouselWrapper from 'components/landing-page/carousel-wrapper';
import OfficerCard from 'components/common/officer-card';

describe('<RecentActivities />', function () {
  it('should render enough contents', function () {
    const recentActivities = [{ id: '123' }, { id: '456' }];
    const titleCMSContent = EditorState.createEmpty();
    const descriptionCMSContent = EditorState.createEmpty();

    const wrapper = shallow(
      <RecentActivities
        recentActivities={ recentActivities }
        title={ titleCMSContent }
        description={ descriptionCMSContent }
        pinnable={ true }
      />
    );

    const carouselWrapper = wrapper.find(CarouselWrapper);
    carouselWrapper.prop('title').should.eql(titleCMSContent);
    carouselWrapper.prop('description').should.eql(descriptionCMSContent);
    carouselWrapper.prop('trackingContentType').should.eql('ACTIVITY');

    const officerCards = carouselWrapper.find(OfficerCard);
    officerCards.should.have.length(2);
    officerCards.at(0).prop('officer').should.eql({ id: '123' });
    officerCards.at(0).prop('pinnable').should.eql(true);
    officerCards.at(1).prop('officer').should.eql({ id: '456' });
    officerCards.at(1).prop('pinnable').should.eql(true);
  });

  it('should call requestRecentActivities', function () {
    const requestRecentActivitiesSpy = spy();
    mountWithRouter(
      <RecentActivities
        requestRecentActivities={ requestRecentActivitiesSpy }
        recentActivities={ [{ id: 123 }, { id: 456 }] }
      />
    );
    requestRecentActivitiesSpy.called.should.be.false();

    requestRecentActivitiesSpy.resetHistory();
    mountWithRouter(
      <RecentActivities
        requestRecentActivities={ requestRecentActivitiesSpy }
      />
    );
    requestRecentActivitiesSpy.called.should.be.true();
  });
});
