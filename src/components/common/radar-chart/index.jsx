import React from 'react';
import PropTypes from 'prop-types';

import RadarChart from './radar-chart';
import { hasEnoughRadarChartData } from 'utils/visual-token';


export default function StaticRadarChart(props) {
  const { data, width, height, radius, yAxisCenter } = props;
  if (!hasEnoughRadarChartData(data)) {
    return (
      <RadarChart
        numMetrics={ 3 }
        width={ width }
        height={ height }
        radius={ radius }
        yAxisCenter={ yAxisCenter }
        showGrid={ true }
        gridColor='#8f8f8f'
        boundaryAreaColor='#adadad'
      />
    );
  }

  return <RadarChart{ ...props }/>;
}


StaticRadarChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.number,
  yAxisCenter: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      axis: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
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

