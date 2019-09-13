import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './year.sass';


export default class Year extends Component {
  render() {
    const { className, item } = this.props;
    const { date, hasData } = item;

    return (
      <div className={ cx(styles.wrapper, className) }>
        <div className={ cx('content', { 'no-data': !hasData }) }>
          <div className={ cx('date', { 'no-data': !hasData }) }>{ date }</div>
        </div>
      </div>
    );
  }
}

Year.propTypes = {
  className: PropTypes.string,
  item: PropTypes.shape({
    date: PropTypes.string,
    hasData: PropTypes.bool,
  }),
};
