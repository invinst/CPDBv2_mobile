import React, { Component, PropTypes } from 'react';
import { every } from 'lodash';

import { curveLinearClosed, radialLine } from 'd3-shape';

import style from 'styles/Common/RadarChart/RadarArea.sass';


export default class RadarArea extends Component {
  render() {

    const { rPoints, drawStroke, strokeWidth } = this.props;
    if (!rPoints || !every(rPoints, (point) => !isNaN(point.r)))
      return <g className='radar-wrapper'/>;

    const radarLine = radialLine()
      .curve(curveLinearClosed)
      .radius(d => d.r - strokeWidth)
      .angle(d => d.angle);

    // required the rPoints as follows [{'angle': 0.15, 'r': 2}]
    const pathD = radarLine(rPoints);

    return (
      <g className='radar-wrapper'>
        <g>
          <path
            className={ style.radarArea }
            d={ pathD }
          />

          { drawStroke && (
            <path
              className='radar-stroke'
              d={ pathD }
              style={ { strokeWidth } }
            />
          ) }
        </g>
      </g>
    );
  }
}

RadarArea.defaultProps = {
  drawStroke: true
};

RadarArea.propTypes = {
  rPoints: PropTypes.array,
  drawStroke: PropTypes.bool,
  strokeWidth: PropTypes.number
};
