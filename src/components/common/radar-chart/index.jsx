import React, { Component, PropTypes } from 'react';

import RadarChart from './radar-chart';
import NoDataRadarChart from './no-data-radar-chart';
import { hasEnoughRadarChartData } from 'utils/visual-token';


export default class StaticRadarChart extends Component {
  render() {
    const { data, width, height, radius, yAxisCenter } = this.props;
    if (!hasEnoughRadarChartData(data)) {
      const noDataProps = { width, height, radius, yAxisCenter };
      return <NoDataRadarChart { ...noDataProps }/>;
    }

    return <RadarChart{ ...this.props }/>;
  }
}


StaticRadarChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.number,
  yAxisCenter: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      axis: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ),
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  showAxisTitle: PropTypes.bool,
  showAxisValue: PropTypes.bool,
  axisTitleFontSize: PropTypes.number,
  axisTitleFontWeight: PropTypes.number,
  showGrid: PropTypes.bool,
  gridOpacity: PropTypes.number,
  gridColor: PropTypes.string,
  showSpineLine: PropTypes.bool,
  showSpineLinePoint: PropTypes.bool,
  areaColor: PropTypes.string,
  boundaryAreaColor: PropTypes.string,
};

