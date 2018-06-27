import React, { Component, PropTypes } from 'react';

import TriangleExplainer from './explainer/triangle-explainer';
import ScaleExplainer from './explainer/scale-explainer';
import PercentileExplainer from './explainer/percentile-explainer';

const numType = 3;

export default class RadarExplainer extends Component {
  constructor(props) {
    super(props);
    this.state = { currentIndex: 0 };

    this.navigateLeft = this.navigateLeft.bind(this);
    this.navigateRight = this.navigateRight.bind(this);
  }

  getCurrentComponent() {
    switch (this.state.currentIndex) {
      case 1:
        return ScaleExplainer;
      case 2:
        return PercentileExplainer;
      default:
        return TriangleExplainer;
    }
  }

  navigateLeft() {
    this.setState({
      currentIndex: (this.state.currentIndex - 1 + numType) % numType
    });
  }

  navigateRight() {
    this.setState({
      currentIndex: (this.state.currentIndex + 1) % numType
    });
  }

  render() {
    const { radarChartData, closeExplainer } = this.props;
    const ExplainerComponent = this.getCurrentComponent();

    return (
      <ExplainerComponent
        radarChartData={ radarChartData }
        closeExplainer={ closeExplainer }
        leftNavHandler={ this.navigateLeft }
        rightNavHandler={ this.navigateRight }
      />
    );
  }
}

RadarExplainer.propTypes = {
  radarChartData: PropTypes.array,
  closeExplainer: PropTypes.func
};
