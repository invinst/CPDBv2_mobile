import React, { Component, PropTypes } from 'react';
import { map, isEqual } from 'lodash';
import { scaleLinear } from 'd3-scale';
import Modal from 'react-modal';

import StaticRadarChart from 'components/common/radar-chart';
import RadarExplainer from './radar-chart/explainer';
import style from './radar-chart.sass';


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

    this.openExplainer = this.openExplainer.bind(this);
    this.closeExplainer = this.closeExplainer.bind(this);
    this.animate = this.animate.bind(this);
    this.getCurrentTransitionData = this.getCurrentTransitionData.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.data, prevProps.data)) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  animate() {
    const { data } = this.props;

    const maxValue = data.length - 1;
    this.setState({
      transitionValue: Math.min(this.state.transitionValue + this.velocity, maxValue),
    });
    if (this.state.transitionValue >= maxValue) {
      this.stopTimer();
    }
  }

  startTimer() {
    if (this.props.data && this.props.data.length > 1 && !this.timer) {
      this.timer = setInterval(this.animate, this.interval);
    }
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  getCurrentTransitionData() {
    const { transitionValue } = this.state;
    const { data } = this.props;

    // ensure at least 2 elements
    if (data.length < 2)
      return data[0];

    const index = Math.min(parseInt(transitionValue) + 1, data.length - 1);

    const previousData = data[index - 1].items;

    const color = scaleLinear()
      .domain([0, 1])
      .range([data[index - 1].visualTokenBackground, data[index].visualTokenBackground]);

    const backgroundColor = color(transitionValue - (index - 1));

    return {
      ...data[index],
      items: map(data[index].items, (d, i) => ({
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
    const { data } = this.props;
    if (!data) return null;

    const itemData = this.getCurrentTransitionData();

    const explainerModalStyles = {
      overlay: {
        top: '21px',
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

    Modal.setAppElement('body');

    return (!!itemData) && (
      <div className={ style.animatedRadarChart }>
        <div className='radar-chart-container' onClick={ this.openExplainer }>
          <StaticRadarChart
            backgroundColor={ itemData.visualTokenBackground }
            fadeOutLegend={ transitionValue >= (data.length - 1) }
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
          <RadarExplainer radarChartData={ data } closeExplainer={ this.closeExplainer }/>
        </Modal>
      </div>
    );
  }
}


AnimatedRadarChart.propTypes = {
  data: PropTypes.array
};
