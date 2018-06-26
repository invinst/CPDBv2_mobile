import React, { Component, PropTypes } from 'react';

import style from './type-of-force.sass';


class TypeOfForce extends Component {
  render() {
    const [topForceType, ...theRest] = this.props.forceTypes;

    return (
      <div className={ style.typeOfForce }>
        <div className='title'>TYPES OF FORCE</div>
        <div className='top-force-type'>{ topForceType }</div>
        { theRest.map((forceType, idx) => (
          <div key={ idx } className='force-type'>↑{ forceType }</div>
        )) }
      </div>
    );
  }
}


TypeOfForce.propTypes = {
  forceTypes: PropTypes.arrayOf(PropTypes.string),
};

export default TypeOfForce;
