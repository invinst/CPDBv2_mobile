import React from 'react';
import PropTypes from 'prop-types';

import style from './radar-spine-line.sass';


export default function RadarSpineLine(props) {
  const { rPoints, showSpineLinePoint } = props;

  return (
    <g className={ style.radarSpineLine }>
      { rPoints.map((point, i) => typeof point.x !== 'undefined' && (
        <line
          key={ `line-${i}` }
          x1={ 0 } y1={ 0 }
          x2={ point.x }
          y2={ point.y }
          className='line'
        />
      )) }
      { rPoints.map((point, i) => (typeof point.x !== 'undefined' && showSpineLinePoint) && (
        <circle
          key={ `circle-${i}` }
          cx={ point.x }
          cy={ point.y }
          r={ 3 }
          strokeWidth={ 1 }
          stroke='white'/>
      )) }
    </g>
  );
}

RadarSpineLine.propTypes = {
  rPoints: PropTypes.array.isRequired,
  showSpineLinePoint: PropTypes.bool,
};

RadarSpineLine.defaultProps = {
  showSpineLinePoint: false,
};
