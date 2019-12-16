import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy, useFakeTimers } from 'sinon';
import Slider from 'rc-slider';
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

    const slider = wrapper.find(Slider);
    const currentDate = wrapper.find('.current-date-label');
    wrapper.find('.start-date-label').text().should.equal('1988-10-03');
    wrapper.find('.end-date-label').text().should.equal('1991-03-06');
    currentDate.text().should.eql('1988-10-03');
    slider.prop('step').should.equal(1);
    slider.prop('min').should.equal(0);
    slider.prop('max').should.equal(9);
    slider.prop('defaultValue').should.equal(0);
    slider.prop('value').should.equal(0);

    wrapper.setState({ timelineIdx: 1 });
    currentDate.text().should.eql('1989-12-11');
    slider.prop('value').should.eql(1);
  });

  it('should not render graph control panel if there is no event', function () {
    wrapper = mount(<AnimatedSocialGraph/>);
    wrapper.find('.graph-control-panel').should.have.length(0);
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

  it('should call toggle timeline', function () {
    const clock = useFakeTimers();
    wrapper = mount(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    const toggleTimelineButton = wrapper.find('.toggle-timeline-btn');

    wrapper.state('refreshIntervalId').should.not.be.null();
    wrapper.state('timelineIdx').should.equal(0);
    clock.tick(150);
    wrapper.state('timelineIdx').should.equal(1);

    toggleTimelineButton.simulate('click');
    should(wrapper.state('refreshIntervalId')).be.null();
    wrapper.state('timelineIdx').should.equal(1);

    toggleTimelineButton.simulate('click');
    wrapper.state('refreshIntervalId').should.not.be.null();
    wrapper.state('timelineIdx').should.equal(1);

    clock.tick(1350);
    wrapper.state('timelineIdx').should.equal(9);
    should(wrapper.state('refreshIntervalId')).be.null();

    toggleTimelineButton.simulate('click');
    wrapper.state('timelineIdx').should.equal(0);
    wrapper.state('refreshIntervalId').should.not.be.null();
    clock.restore();
  });

  it('should update timelineIdx value when click on specific part of the timeline ', function () {
    wrapper = mount(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    wrapper.state('timelineIdx').should.equal(0);
    const coaccusalsThresholdSlider = wrapper.find(Slider);
    coaccusalsThresholdSlider.props().onChange(5);
    wrapper.state('timelineIdx').should.equal(5);
  });

  it('should update refreshIntervalId and timelineIdx values when startTimelineFromBeginning', function () {
    const clock = useFakeTimers();
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
    clock.restore();
  });

  it('should update refreshIntervalId value when stop timeline', function () {
    const clock = useFakeTimers();
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
    clock.restore();
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
    const stopTimelineSpy = spy(instance, 'stopTimeline');
    wrapper.unmount();
    stopTimelineSpy.called.should.be.true();
  });
});
