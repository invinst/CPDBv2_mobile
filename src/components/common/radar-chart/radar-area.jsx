import React from 'react';
import PropTypes from 'prop-types';
import { every } from 'lodash';

import { curveLinearClosed, radialLine } from 'd3-shape';

import style from './radar-area.sass';


export default function RadarArea(props) {

  const { rPoints, drawStroke, strokeWidth, areaColor } = props;
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
          fill={ areaColor }
        />

        { drawStroke && (
          <path
            className='test--radar-stroke'
            d={ pathD }
            style={ { strokeWidth } }
            stroke={ areaColor }
            fill='none'
          />
        ) }
      </g>
    </g>
  );
}

RadarArea.defaultProps = {
  drawStroke: true,
  areaColor: '#231f20',
};

RadarArea.propTypes = {
  rPoints: PropTypes.array,
  drawStroke: PropTypes.bool,
  strokeWidth: PropTypes.number,
  areaColor: PropTypes.string,
};
