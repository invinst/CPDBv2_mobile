import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import styles from './joined.sass';


export default class Joined extends Component {

  render() {
    const { date } = this.props.item;

    return (
      <span className={ cx(styles.wrapper) }>
        <span className='join'>Joined CPD</span>
        <span className='date'>{ date }</span>
      </span>
    );
  }
}

Joined.propTypes = {
  item: PropTypes.object,
};
