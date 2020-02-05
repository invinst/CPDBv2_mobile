import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import should from 'should';

import AnimatedSocialGraph, { AnimatedSocialGraphWithSpinner } from 'components/common/animated-social-graph';
import SocialGraph from 'components/common/animated-social-graph/social-graph';
import LoadingSpinner from 'components/common/loading-spinner';
import graphStyles from 'components/common/animated-social-graph/animated-social-graph.sass';


describe('AnimatedSocialGraph component', function () {
  let wrapper;
  const officers = [
    {
      fullName: 'Jerome Finnigan',
      id: 1,
    },
    {
      fullName: 'Edward May',
      id: 2,
    },
  ];
  const coaccusedData = [
    {
      officerId1: 1,
      officerId2: 2,
      incidentDate: '1988-10-03T00:00:00Z',
      accussedCount: 1,
    },
  ];
  const listEvent = [
    '1988-10-03 00:00:00+00:00',
    '1989-12-11 00:00:00+00:00',
    '1990-01-09 00:00:00+00:00',
    '1990-12-13 00:00:00+00:00',
    '1991-01-02 00:00:00+00:00',
    '1991-01-06 00:00:00+00:00',
    '1991-01-15 00:00:00+00:00',
    '1991-02-18 00:00:00+00:00',
    '1991-02-20 00:00:00+00:00',
    '1991-03-06 00:00:00+00:00',
  ];

  it('should render all sections correctly', function () {
    wrapper = mount(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    wrapper.find(SocialGraph).should.have.length(1);
    wrapper.find('.refresh-button').exists().should.be.true();
  });

  context('withLoadingSpinner', function () {
    it('should render LoadingSpinner only if requesting is true', function () {
      const wrapper = shallow(
        <AnimatedSocialGraphWithSpinner
          officers={ officers }
          coaccusedData={ coaccusedData }
          listEvent={ listEvent }
          requesting={ true }
        />
      );

      wrapper.find(AnimatedSocialGraph).exists().should.be.false();

      const loadingSpinner = wrapper.find(LoadingSpinner);
      loadingSpinner.prop('className').should.equal(graphStyles.socialGraphLoading);
    });

    it('should not render LoadingSpinner only if requesting is false', function () {
      const wrapper = shallow(
        <AnimatedSocialGraphWithSpinner
          timelineIdx={ 0 }
          officers={ officers }
          coaccusedData={ coaccusedData }
          listEvent={ listEvent }
          requesting={ false }
        />
      );

      wrapper.find(AnimatedSocialGraph).exists().should.be.true();
      wrapper.find(LoadingSpinner).exists().should.be.false();
    });
  });

  it('should update refreshIntervalId and timelineIdx values when startTimelineFromBeginning', function () {
    const clock = sinon.useFakeTimers();
    wrapper = mount(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    const socialGraph = wrapper.find(SocialGraph);
    clock.tick(150);
    wrapper.state('timelineIdx').should.equal(1);
    const oldRefreshInterval = wrapper.state('refreshIntervalId');
    socialGraph.props().startTimelineFromBeginning();

    wrapper.state('timelineIdx').should.equal(0);
    wrapper.state('refreshIntervalId').should.not.be.null();
    wrapper.state('refreshIntervalId').should.not.eql(oldRefreshInterval);
  });

  it('should update refreshIntervalId value when stop timeline', function () {
    const clock = sinon.useFakeTimers();
    wrapper = mount(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    const socialGraph = wrapper.find(SocialGraph);

    clock.tick(150);
    wrapper.state('timelineIdx').should.equal(1);

    socialGraph.props().stopTimeline();
    should(wrapper.state('refreshIntervalId')).be.null();
    wrapper.state('timelineIdx').should.equal(1);
  });

  it('should call stopTimeline when componentWillUnmount', function () {
    wrapper = mount(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    const instance = wrapper.instance();
    const stopTimelineSpy = sinon.spy(instance, 'stopTimeline');
    wrapper.unmount();
    stopTimelineSpy.called.should.be.true();
  });

  it('should call startTimelineFromBeginning when clicking on refresh button', function () {
    const startTimelineFromBeginningStub = sinon.stub(AnimatedSocialGraph.prototype, 'startTimelineFromBeginning');
    wrapper = mount(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    const refreshButton = wrapper.find('.refresh-button');
    refreshButton.simulate('click');

    startTimelineFromBeginningStub.should.be.called();
  });
});
