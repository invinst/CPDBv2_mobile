import React, { PropTypes } from 'react';

const COLOR_CODES = {
  gray: '#C7C7CC',
  blue: '#005EF4'
};

const ROTATIONS = {
  down: '0deg',
  left: '90deg',
  up: '180deg',
  right: '-90deg'
};

const Arrow = ({ direction, color }) => {
  const rotate = `rotate(${ROTATIONS[direction]})`;
  const style = {
    transform: rotate,
    WebkitTransform: rotate,
    MozTransform: rotate,
    OTransform: rotate,
    msTransform: rotate
  };

  return (
    <svg width='14' height='9' viewBox='0 0 14 9' xmlns='http://www.w3.org/2000/svg'
      style={ style }
    >
      <path
        d='M12 .5L13.5 2 7 8.5.5 2 2 .5l5 5z'
        fill={ COLOR_CODES[color] }
        fillRule='evenodd'
      />
    </svg>
  );
};

Arrow.propTypes = {
  direction: PropTypes.string,
  color: PropTypes.string
};

Arrow.defaultProps = {
  direction: 'down',
  color: 'gray'
};

export default Arrow;
