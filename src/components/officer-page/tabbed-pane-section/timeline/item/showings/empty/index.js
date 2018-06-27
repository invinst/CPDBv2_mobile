import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import styles from './empty.sass';


export default class Empty extends Component {

  render() {
    const { hasBorderBottom } = this.props;

    return (
      <span className={ cx(styles.wrapperShowing) }>
        <div className='showing'/>
      </span>
    );
  }
}

Empty.propTypes = {
  hasBorderBottom: PropTypes.bool,
};
