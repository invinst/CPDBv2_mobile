import React, { Component, PropTypes } from 'react';
import { map, isEqual, filter } from 'lodash';
import { scaleLinear } from 'd3-scale';
import Modal from 'react-modal';

import StaticRadarChart from 'components/common/radar-chart';
import RadarExplainer from './explainer';
import style from './radar-chart.sass';
import { hasEnoughRadarChartData } from 'utils/visual-token';


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

    this.animatedData = this.getAnimatedData(props.percentileData);

    this.openExplainer = this.openExplainer.bind(this);
    this.closeExplainer = this.closeExplainer.bind(this);
    this.animate = this.animate.bind(this);
    this.getCurrentTransitionData = this.getCurrentTransitionData.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.percentileData, nextProps.percentileData)) {
      this.animatedData = this.getAnimatedData(nextProps.percentileData);
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.percentileData, prevProps.percentileData)) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  getAnimatedData(data) {
    return filter(data, item => hasEnoughRadarChartData(item.items));
  }

  animate() {
    const maxValue = this.animatedData.length - 1;
    this.setState({
      transitionValue: Math.min(this.state.transitionValue + this.velocity, maxValue),
    });
    if (this.state.transitionValue >= maxValue) {
      this.stopTimer();
    }
  }

  startTimer() {
    if (this.animatedData && this.animatedData.length > 1 && !this.timer) {
      this.timer = setInterval(this.animate, this.interval);
    }
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  getCurrentTransitionData() {
    const { transitionValue } = this.state;

    // ensure at least 2 elements
    if (this.animatedData.length < 2)
      return this.animatedData[0];

    const index = Math.min(Math.floor(transitionValue) + 1, this.animatedData.length - 1);

    const previousData = this.animatedData[index - 1].items;

    const color = scaleLinear()
      .domain([0, 1])
      .range([this.animatedData[index - 1].visualTokenBackground, this.animatedData[index].visualTokenBackground]);

    const backgroundColor = color(transitionValue - (index - 1));

    return {
      ...this.animatedData[index],
      items: map(this.animatedData[index].items, (d, i) => ({
        ...d,
        value: (d.value - previousData[i].value) * (transitionValue - (index - 1)) + previousData[i].value,
      })),
      visualTokenBackground: backgroundColor
    };
  }

  startAnimation() {
    if (this.timer) {
      this.stopTimer();
    }

    this.setState({ transitionValue: 0 });
    this.startTimer();
  }

  openExplainer() {
    this.setState({ explainerOpened: true });
  }

  closeExplainer() {
    this.setState({ explainerOpened: false });
    this.startAnimation();
  }

  render() {
    const { transitionValue, explainerOpened } = this.state;
    const { percentileData, noDataText } = this.props;

    const itemData = this.getCurrentTransitionData();

    const explainerModalStyles = {
      overlay: {
        top: '40px',
      },
      content: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        minHeight: '100vh',
        padding: 0
      }
    };

    if (itemData) {
      return (
        <div className={ style.animatedRadarChart }>
          <div className='radar-chart-container' onClick={ this.openExplainer }>
            <StaticRadarChart
              backgroundColor={ itemData.visualTokenBackground }
              fadeOutLegend={ transitionValue >= (this.animatedData.length - 1) }
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
            noDataText ? (
              <div className='no-data-text'>{ noDataText }</div>
            ) : null
          }
        </div>
      );
    }
  }
}

AnimatedRadarChart.defaultProps = {
  noDataText: 'There is not enough data to construct a radar graph for this officer.'
};

AnimatedRadarChart.propTypes = {
  percentileData: PropTypes.array,
  noDataText: PropTypes.string,
};
