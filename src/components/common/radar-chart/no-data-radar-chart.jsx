import React, { Component, PropTypes } from 'react';

import style from './no-data-radar-chart.sass';
import RadarChart from './radar-chart';


export default class NoDataRadarChart extends Component {
  render() {
    const { width, height, radius, yAxisCenter, noDataText } = this.props;

    return (
      <div className={ style.noDataRadarChart }>
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
        {
          noDataText ? (
            <div className='no-data-text'>{ noDataText }</div>
          ) : null
        }
      </div>
    );
  }
}

NoDataRadarChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.number,
  noDataText: PropTypes.string,
  yAxisCenter: PropTypes.number,
};
