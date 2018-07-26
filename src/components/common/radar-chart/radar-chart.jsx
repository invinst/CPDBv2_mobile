import React, { Component, PropTypes } from 'react';

import { scaleLinear } from 'd3-scale';
import { curveLinearClosed, radialLine } from 'd3-shape';
import { map, range } from 'lodash';

import style from './radar-chart.sass';
import RadarAxis from './radar-axis';
import RadarArea from './radar-area';
import RadarSpineLine from './radar-spine-line';
import RadarGrid from './radar-grid';


export default class RadarChart extends Component {
  constructor(props) {
    super(props);
    this.maxValue = 100;
    this.strokeWidth = 0.5;
  }

  getNumMetrics() {
    const { data, numMetrics } = this.props;
    return data && data.length ? data.length : numMetrics;
  }

  rScale(value) {
    const { radius } = this.props;
    return scaleLinear().range([0, radius - this.strokeWidth]).domain([0, this.maxValue])(value);
  }

  angle(i) {
    const angleSlice = Math.PI * 2 / this.getNumMetrics();
    return i * angleSlice - Math.PI;
  }

  embedComputedPosition() {
    const { data } = this.props;
    const angleSlice = Math.PI * 2 / this.getNumMetrics();

    return map(data, (d, i) => {
      const r = this.rScale(d.value);
      return {
        ...d,
        r: r,
        angle: this.angle(i),
        x: r * Math.cos(angleSlice * i + Math.PI / 2),
        y: r * Math.sin(angleSlice * i + Math.PI / 2)
      };
    });
  }

  render() {
    const {
      width,
      height,
      radius,
      backgroundColor,
      textColor,
      data,
      showAxisTitle,
      showAxisValue,
      axisTitleFontSize,
      axisTitleFontWeight,
      showGrid,
      gridColor,
      gridOpacity,
      showSpineLine,
      showSpineLinePoint,
      yAxisCenter,
      areaColor,
      boundaryAreaColor
    } = this.props;

    const transformData = this.embedComputedPosition(data);
    const boundaryLine = radialLine()
      .curve(curveLinearClosed)
      .radius(this.rScale(this.maxValue))
      .angle(i => this.angle(i));
    const boundaryPathD = boundaryLine(range(this.getNumMetrics()));
    const xCenter = Math.floor(width / 2);
    const yCenter = typeof yAxisCenter !== 'undefined' ? yAxisCenter : Math.floor(height * 0.34);

    return (
      <svg
        className={ style.radarChart }
        style={ { backgroundColor } }
        width='100%'
        height='100%'
        viewBox={ `0 0 ${width} ${height}` }
      >
        <g style={ { transform: `translate(${xCenter}px, ${yCenter}px)` } }>
          {
            data && (showAxisTitle || showAxisValue) && (
              <RadarAxis
                data={ data }
                textColor={ textColor }
                radius={ radius }
                axisTitleFontSize={ axisTitleFontSize }
                axisTitleFontWeight={ axisTitleFontWeight }
                showAxisTitle={ showAxisTitle }
                showAxisValue={ showAxisValue }
              />
            )
          }
          <path
            className='radar-boundary-area'
            d={ boundaryPathD }
            style={ { fill: boundaryAreaColor ? boundaryAreaColor :'white' } }
          />
          <RadarArea
            areaColor={ areaColor }
            rPoints={ transformData }
            strokeWidth={ this.strokeWidth }
          />

          { showGrid && (
            <RadarGrid
              opacity={ gridOpacity }
              numAxis={ this.getNumMetrics() }
              radius={ radius }
              maxValue={ this.maxValue }
              strokeColor={ gridColor || backgroundColor }
              strokeWidth={ this.strokeWidth }/>
          ) }
          { showSpineLine && <RadarSpineLine rPoints={ transformData } showSpineLinePoint={ showSpineLinePoint }/> }
        </g>
      </svg>
    );
  }
}


RadarChart.defaultProps = {
  width: 512,
  height: 392,
  radius: 233,
  showAxisTitle: false,
  showAxisValue: false,
  axisTitleFontSize: 14,
  showGrid: false,
  gridOpacity: 1,
  showSpineLine: true,
  showSpineLinePoint: false,
  axisTitleFontWeight: 400,
  backgroundColor: '#767676',
  numMetrics: 3,
};

RadarChart.propTypes = {
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
  numMetrics: PropTypes.number
};

