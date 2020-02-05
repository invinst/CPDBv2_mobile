import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './award.sass';


export default class Award extends Component {

  render() {
    const { className, item } = this.props;

    return (
      <div className={ cx(styles.wrapper, className) }>
        <div className='content'>
          <span className='kind'>A</span>
          <span className='category'>{ item.category }</span>
          <span className='date'>{ item.date }</span>
        </div>
      </div>
    );
  }
}

Award.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object,
};
