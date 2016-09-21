import React, { Component, PropTypes } from 'react';

import spinnerStyle from 'styles/Shared/Spinner.sass';


class Spinner extends Component {
  render() {
    // const { style } = this.props;
    const pathD = 'm35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,'
      + '0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z';

    return (
      <svg className={ spinnerStyle.spinner } viewBox='0 0 70 70'>
        <path
          className='path-style'
          d={ pathD }/>
      </svg>
    );
  }
}

Spinner.propTypes = {
  style: PropTypes.object
};

export default Spinner;
