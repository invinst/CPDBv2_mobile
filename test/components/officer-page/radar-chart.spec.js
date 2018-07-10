import React from 'react';
import should from 'should';
import { mount, shallow, ReactWrapper } from 'enzyme';
import { useFakeTimers, spy } from 'sinon';
import Modal from 'react-modal';

import AnimatedRadarChart from 'components/officer-page/radar-chart';
import StaticRadarChart from 'components/common/radar-chart';
import RadarExplainer from 'components/officer-page/radar-chart/explainer';


describe('AnimatedRadarChart component', function () {
  const data = [{
    year: 2015,
    items: [
      { axis: 'Use of Force Reports', value: 20 },
      { axis: 'Civilian Complaints', value: 0 },
      { axis: 'Internal Complaints', value: 10 },
    ],
    textColor: 'black',
    visualTokenBackground: 'white'
  }, {
    year: 2016,
    items: [
      { axis: 'Use of Force Reports', value: 40 },
      { axis: 'Civilian Complaints', value: 50 },
      { axis: 'Internal Complaints', value: 60 },
    ],
    textColor: 'black',
    visualTokenBackground: 'white'
  }, {
    year: 2017,
    items: [
      { axis: 'Use of Force Reports', value: 80 },
      { axis: 'Civilian Complaints', value: 70 },
      { axis: 'Internal Complaints', value: 60 },
    ],
    textColor: 'black',
    visualTokenBackground: 'white'
  }];

  it('should display nothing if no data', function () {
    should(shallow(<AnimatedRadarChart/>).type()).be.null();
  });

  it('should render if data provided', function () {
    const wrapper = shallow(<AnimatedRadarChart percentileData={ data }/>);
    wrapper.find(StaticRadarChart).exists().should.be.true();
  });

  it('should rerender if data change', function () {
    const wrapper = mount(<AnimatedRadarChart percentileData={ [data[0]] }/>);
    wrapper.setProps({ percentileData: data });
    should(wrapper.instance().timer).not.be.null();
  });

  it('should open explainer when click on radar chart', function () {
    const wrapper = mount(
      <AnimatedRadarChart percentileData={ data }/>
    );
    wrapper.find('.explainer-open-button').exists().should.be.true();

    wrapper.find('.radar-chart-container').exists().should.be.true();
    wrapper.find('.radar-chart-container').simulate('click');

    const modalWrapper = new ReactWrapper(wrapper.find(Modal).node.portal, true);

    const explainer = modalWrapper.find(RadarExplainer);
    explainer.exists().should.be.true();
    explainer.prop('percentileData').should.equal(data);
  });

  describe('test animate', function () {
    let clock;
    beforeEach(function () {
      clock = useFakeTimers();
    });

    afterEach(function () {
      clock.restore();
    });

    it('should not animate if data length is 1', function () {
      const compactData = [data[0]];
      const wrapper = shallow(
        <AnimatedRadarChart percentileData={ compactData }/>
      );
      const instance = wrapper.instance();

      should(instance.timer).be.null();
      clock.tick(30);
      should(instance.timer).be.null();
      instance.state.transitionValue.should.be.eql(0);
    });

    it('should change transition value after mounting', function () {

      const wrapper = mount(
        <AnimatedRadarChart percentileData={ data }/>
      );
      const instance = wrapper.instance();

      instance.state.transitionValue.should.eql(0);

      clock.tick(25);
      instance.state.transitionValue.should.eql(instance.velocity);

      clock.tick(500);
      instance.state.transitionValue.should.eql(2);

    });

    it('should it stops timer before unmounted', function () {
      const wrapper = mount(
        <AnimatedRadarChart percentileData={ data }/>
      );
      const instance = wrapper.instance();

      const stopTimerSpy = spy(instance, 'stopTimer');
      wrapper.unmount();

      stopTimerSpy.called.should.be.true();
    });

    it('should start to animate after closing explainer', function () {
      const wrapper = mount(
        <AnimatedRadarChart percentileData={ data }/>
      );
      const instance = wrapper.instance();
      const startAnimation = spy(instance, 'startAnimation');

      wrapper.find('.radar-chart-container').simulate('click');

      const modalWrapper = new ReactWrapper(wrapper.find(Modal).node.portal, true);
      modalWrapper.find(RadarExplainer).exists().should.be.true();

      modalWrapper.find('.explainer-close-button').simulate('click');

      modalWrapper.find(RadarExplainer).exists().should.be.false();
      startAnimation.calledOnce.should.be.true();
    });
  });
});
