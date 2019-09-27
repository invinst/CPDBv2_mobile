import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import styles from './joined.sass';


export default class Joined extends Component {

  render() {
    const { className, item } = this.props;

    return (
      <span className={ cx(styles.wrapper, className) }>
        <span className='join'>Joined CPD</span>
        <span className='date'>{ item.date }</span>
      </span>
    );
  }
}

Joined.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object,
};
