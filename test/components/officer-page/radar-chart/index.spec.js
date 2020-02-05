import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import should from 'should';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { EditorState } from 'draft-js';

import AnimatedRadarChart from 'components/officer-page/radar-chart';
import StaticRadarChart from 'components/common/radar-chart';
import RadarExplainer from 'components/officer-page/radar-chart/explainer';
import * as IntercomTracking from 'utils/intercom-tracking';
import * as tracking from 'utils/tracking';


describe('AnimatedRadarChart component', function () {
  const data = [{
    year: 2014,
    items: [
      { axis: 'Use of Force Reports', value: NaN },
      { axis: 'Civilian Complaints', value: 0 },
      { axis: 'Internal Complaints', value: 10 },
    ],
    textColor: 'black',
    visualTokenBackground: 'white',
  }, {
    year: 2015,
    items: [
      { axis: 'Use of Force Reports', value: 20 },
      { axis: 'Civilian Complaints', value: 0 },
      { axis: 'Internal Complaints', value: 10 },
    ],
    textColor: 'black',
    visualTokenBackground: 'white',
  }, {
    year: 2016,
    items: [
      { axis: 'Use of Force Reports', value: 40 },
      { axis: 'Civilian Complaints', value: 50 },
      { axis: 'Internal Complaints', value: 60 },
    ],
    textColor: 'black',
    visualTokenBackground: 'white',
  }, {
    year: 2017,
    items: [
      { axis: 'Use of Force Reports', value: 80 },
      { axis: 'Civilian Complaints', value: 70 },
      { axis: 'Internal Complaints', value: 60 },
    ],
    textColor: 'black',
    visualTokenBackground: 'white',
  }];

  const mockStore = configureStore();
  const store = mockStore({
    officerPage: {
      cms: [{ type: 'rich_text', name: 'triangle_description' }],
    },
  });

  it('should render no data RadarChart if no data', function () {
    const wrapper = shallow(<AnimatedRadarChart officerId={ 123 }/>);
    const noDataRadarChart = wrapper.find(StaticRadarChart);
    should(noDataRadarChart.prop('data')).be.undefined();
  });

  it('should render no data RadarChart if some data is missing', function () {
    const missingPercentileData = [{
      year: 2015,
      items: [
        { axis: 'Use of Force Reports', value: NaN },
        { axis: 'Civilian Complaints', value: 0 },
        { axis: 'Internal Complaints', value: 10 },
      ],
      textColor: 'black',
      visualTokenBackground: 'white',
    }, {
      year: 2016,
      items: [
        { axis: 'Use of Force Reports', value: NaN },
        { axis: 'Civilian Complaints', value: 50 },
        { axis: 'Internal Complaints', value: 60 },
      ],
      textColor: 'black',
      visualTokenBackground: 'white',
    }];

    const wrapper = shallow(
      <AnimatedRadarChart officerId={ 123 }
        percentileData={ missingPercentileData }
        noDataCMSContent={ EditorState.createEmpty() }/>
    );
    const noDataRadarChart = wrapper.find(StaticRadarChart);
    should(noDataRadarChart.prop('data')).be.undefined();

    wrapper.find('.no-data-text').exists().should.be.true();
  });

  it('should render if data provided', function () {
    const wrapper = shallow(<AnimatedRadarChart officerId={ 123 } percentileData={ data }/>);
    wrapper.find(StaticRadarChart).exists().should.be.true();
  });

  it('should rerender if data change', function () {
    const wrapper = mount(<AnimatedRadarChart officerId={ 123 } percentileData={ [data[0]] }/>);
    wrapper.setProps({ percentileData: data });
    should(wrapper.instance().timer).not.be.null();
  });

  context('open the explainer', function () {
    beforeEach(function () {
      sinon.stub(IntercomTracking, 'trackOpenExplainer');
      sinon.stub(tracking, 'trackOpenExplainer');
    });

    it('should open the explainer clicking on the radar chart and track this event', function () {
      const wrapper = mount(
        <Provider store={ store }>
          <AnimatedRadarChart officerId={ 123 } percentileData={ data }/>
        </Provider>
      );
      wrapper.find('.explainer-open-button').exists().should.be.true();

      wrapper.find('.radar-chart-container').exists().should.be.true();
      wrapper.find('.radar-chart-container').simulate('click');

      tracking.trackOpenExplainer.calledWith(123).should.be.true();
      IntercomTracking.trackOpenExplainer.calledWith(123).should.be.true();
    });

    it('should open explainer when click on radar chart', function () {
      const wrapper = mount(
        <Provider store={ store }>
          <AnimatedRadarChart officerId={ 123 } percentileData={ data }/>
        </Provider>
      );
      wrapper.find('.explainer-open-button').exists().should.be.true();

      wrapper.find('.radar-chart-container').exists().should.be.true();
      wrapper.find('.radar-chart-container').simulate('click');

      const explainer = wrapper.find(RadarExplainer);
      explainer.exists().should.be.true();
      explainer.prop('percentileData').should.equal(data);
    });
  });


  describe('test animate', function () {
    let clock;
    beforeEach(function () {
      clock = sinon.useFakeTimers();
    });

    it('should not animate if data length is 1', function () {
      const compactData = [data[0]];
      const wrapper = shallow(
        <AnimatedRadarChart officerId={ 123 } percentileData={ compactData }/>
      );
      const instance = wrapper.instance();

      should(instance.timer).be.null();
      clock.tick(30);
      should(instance.timer).be.null();
      instance.state.transitionValue.should.be.eql(0);
    });

    it('should change transition value after mounting', function () {
      const wrapper = mount(<AnimatedRadarChart officerId={ 123 } percentileData={ data }/>);
      const instance = wrapper.instance();

      instance.state.transitionValue.should.eql(0);

      clock.tick(25);
      instance.state.transitionValue.should.eql(instance.velocity);

      clock.tick(500);
      instance.state.transitionValue.should.eql(2);
    });

    it('should it stops timer before unmounted', function () {
      const wrapper = mount(
        <AnimatedRadarChart officerId={ 123 } percentileData={ data }/>
      );
      const instance = wrapper.instance();

      const stopTimerSpy = sinon.spy(instance, 'stopTimer');
      wrapper.unmount();

      stopTimerSpy.called.should.be.true();
    });

    it('should start to animate after closing explainer', function () {
      let animatedRadarChart = null;

      const wrapper = mount(
        <Provider store={ store }>
          <AnimatedRadarChart officerId={ 123 } ref={ (c) => {animatedRadarChart = c;} } percentileData={ data }/>
        </Provider>
      );
      const startAnimation = sinon.spy(animatedRadarChart, 'startAnimation');

      wrapper.find('.radar-chart-container').simulate('click');

      wrapper.find(RadarExplainer).exists().should.be.true();

      wrapper.find('.explainer-close-button').simulate('click');

      wrapper.find(RadarExplainer).exists().should.be.false();
      startAnimation.calledOnce.should.be.true();
    });

    it('should not animate to years that data is missing', function () {
      const missingData = [{
        year: 2013,
        items: [
          { axis: 'Use of Force Reports', value: 20 },
          { axis: 'Civilian Complaints', value: NaN },
          { axis: 'Internal Complaints', value: 10 },
        ],
        textColor: 'black',
        visualTokenBackground: 'white',
      }, {
        year: 2014,
        items: [
          { axis: 'Use of Force Reports', value: 20 },
          { axis: 'Civilian Complaints', value: 0 },
          { axis: 'Internal Complaints', value: 10 },
        ],
        textColor: 'black',
        visualTokenBackground: 'white',
      }, {
        year: 2015,
        items: [
          { axis: 'Use of Force Reports', value: NaN },
          { axis: 'Civilian Complaints', value: 0 },
          { axis: 'Internal Complaints', value: 10 },
        ],
        textColor: 'black',
        visualTokenBackground: 'white',
      }, {
        year: 2016,
        items: [
          { axis: 'Use of Force Reports', value: 40 },
          { axis: 'Civilian Complaints', value: 50 },
          { axis: 'Internal Complaints', value: 60 },
        ],
        textColor: 'black',
        visualTokenBackground: 'white',
      }, {
        year: 2017,
        items: [
          { axis: 'Use of Force Reports', value: 80 },
          { axis: 'Civilian Complaints', value: 70 },
          { axis: 'Internal Complaints', value: NaN },
        ],
        textColor: 'black',
        visualTokenBackground: 'white',
      }];

      const wrapper = mount(<AnimatedRadarChart officerId={ 123 } percentileData={ missingData }/>);
      const instance = wrapper.instance();

      instance.state.transitionValue.should.eql(0);
      instance.animatedData.should.have.length(2);
      instance.animatedData[0].year.should.equal(2014);
      instance.animatedData[1].year.should.equal(2016);

      clock.tick(250);
      instance.state.transitionValue.should.eql(1);

      clock.tick(500);
      instance.state.transitionValue.should.eql(1);
    });
  });
});
