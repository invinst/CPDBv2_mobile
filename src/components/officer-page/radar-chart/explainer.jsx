import React, { Component, PropTypes } from 'react';
import { last } from 'lodash';

import TriangleExplainerContainer from 'containers/officer-page/triangle-explainer-container';
import ScaleExplainerContainer from 'containers/officer-page/scale-explainer-container';
import PercentileExplainer from './explainer/percentile-explainer';

const numType = 3;


export default class RadarExplainer extends Component {
  constructor(props) {
    super(props);
    this.state = { currentIndex: 0 };

    this.navigateLeft = this.navigateLeft.bind(this);
    this.navigateRight = this.navigateRight.bind(this);
  }

  navigateLeft() {
    this.setState({
      currentIndex: (this.state.currentIndex - 1 + numType) % numType,
    });
  }

  navigateRight() {
    this.setState({
      currentIndex: (this.state.currentIndex + 1) % numType,
    });
  }

  render() {
    const { percentileData, closeExplainer } = this.props;
    const radarChartData = last(percentileData);

    switch (this.state.currentIndex) {
      case 1:
        return (
          <ScaleExplainerContainer
            radarChartData={ radarChartData }
            closeExplainer={ closeExplainer }
            leftNavHandler={ this.navigateLeft }
            rightNavHandler={ this.navigateRight }
          />
        );
      case 2:
        return (
          <PercentileExplainer
            data={ percentileData }
            closeExplainer={ closeExplainer }
            leftNavHandler={ this.navigateLeft }
            rightNavHandler={ this.navigateRight }
          />
        );
      default:
        return (
          <TriangleExplainerContainer
            radarChartData={ radarChartData }
            closeExplainer={ closeExplainer }
            leftNavHandler={ this.navigateLeft }
            rightNavHandler={ this.navigateRight }
          />
        );
    }
  }
}

RadarExplainer.propTypes = {
  percentileData: PropTypes.array,
  closeExplainer: PropTypes.func,
};
