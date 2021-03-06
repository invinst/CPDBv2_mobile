import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map, isEqual, filter } from 'lodash';
import { scaleLinear } from 'd3-scale';
import Modal from 'react-modal';
import memoize from 'memoize-one';

import StaticRadarChart from 'components/common/radar-chart';
import RadarExplainer from './explainer';
import style from './radar-chart.sass';
import { hasEnoughRadarChartData } from 'utils/visual-token';
import CMSContent from 'components/common/cms-content';
import * as IntercomTracking from 'utils/intercom-tracking';
import * as tracking from 'utils/tracking';


export default class AnimatedRadarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transitionValue: 0,
      explainerOpened: false,
    };
    this.interval = 20;
    this.velocity = 0.1;
    this.timer = null;

  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.percentileData, prevProps.percentileData)) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  memoizeAnimatedData = memoize((data) => filter(data, item => hasEnoughRadarChartData(item.items)));

  animatedData() {
    const { percentileData } = this.props;
    return this.memoizeAnimatedData(percentileData);
  }

  animate = () => {
    const maxValue = this.animatedData().length - 1;
    this.setState({
      transitionValue: Math.min(this.state.transitionValue + this.velocity, maxValue),
    });
    if (this.state.transitionValue >= maxValue) {
      this.stopTimer();
    }
  };

  startTimer() {
    const animatedData = this.animatedData();
    if (animatedData && animatedData.length > 1 && !this.timer) {
      this.timer = setInterval(this.animate, this.interval);
    }
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  getCurrentTransitionData = () => {
    const { transitionValue } = this.state;
    const animatedData = this.animatedData();

    // ensure at least 2 elements
    if (animatedData.length < 2)
      return animatedData[0];

    const index = Math.min(Math.floor(transitionValue) + 1, animatedData.length - 1);

    const previousData = animatedData[index - 1].items;

    const color = scaleLinear()
      .domain([0, 1])
      .range([animatedData[index - 1].visualTokenBackground, animatedData[index].visualTokenBackground]);

    const backgroundColor = color(transitionValue - (index - 1));

    return {
      ...animatedData[index],
      items: map(animatedData[index].items, (d, i) => ({
        ...d,
        value: (d.value - previousData[i].value) * (transitionValue - (index - 1)) + previousData[i].value,
      })),
      visualTokenBackground: backgroundColor,
    };
  };

  startAnimation() {
    if (this.timer) {
      this.stopTimer();
    }

    this.setState({ transitionValue: 0 });
    this.startTimer();
  }

  openExplainer = () => {
    const { officerId } = this.props;

    tracking.trackOpenExplainer(officerId);
    IntercomTracking.trackOpenExplainer(officerId);

    this.setState({ explainerOpened: true });
  };

  closeExplainer = () => {
    this.setState({ explainerOpened: false });
    this.startAnimation();
  };

  render() {
    const { transitionValue, explainerOpened } = this.state;
    const { percentileData, noDataCMSContent } = this.props;

    const itemData = this.getCurrentTransitionData();

    const explainerModalStyles = {
      overlay: {
        top: '40px',
      },
      content: {
        top: 0,
        left: 0,
        width: '100%',
        height: 'calc(100vh - 40px)',
        minHeight: 'calc(100vh - 40px)',
        padding: 0,
      },
    };

    if (itemData) {
      return (
        <div className={ style.animatedRadarChart }>
          <div className='radar-chart-container' onClick={ this.openExplainer }>
            <StaticRadarChart
              backgroundColor={ itemData.visualTokenBackground }
              fadeOutLegend={ transitionValue >= (this.animatedData().length - 1) }
              data={ itemData.items }
              showSpineLine={ false }
              showGrid={ true }
              gridOpacity={ 0.5 }
              showAxisTitle={ true }
              radius={ 121 }
              axisTitleFontSize={ 23 }
              axisTitleFontWeight={ 200 }
              textColor='#f5f4f4'
              gridColor='white'
              yAxisCenter={ 133 }
            />
            <div className='explainer-open-button'>
              { <span className='inner'>?</span> }
            </div>
          </div>
          <Modal isOpen={ explainerOpened } style={ explainerModalStyles }>
            <RadarExplainer percentileData={ percentileData } closeExplainer={ this.closeExplainer }/>
          </Modal>
        </div>
      );
    } else {
      return (
        <div className={ style.animatedRadarChart }>
          <StaticRadarChart
            numMetrics={ 3 }
            radius={ 121 }
            yAxisCenter={ 133 }
            showGrid={ true }
            gridColor='#8f8f8f'
            boundaryAreaColor='#adadad'
          />
          {
            noDataCMSContent ? (
              <CMSContent className='no-data-text' content={ noDataCMSContent }/>
            ) : null
          }
        </div>
      );
    }
  }
}


AnimatedRadarChart.propTypes = {
  officerId: PropTypes.number,
  percentileData: PropTypes.array,
  noDataCMSContent: PropTypes.object,
};
