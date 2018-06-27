import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './year.sass';


export default class Year extends Component {
  render() {
    const { hasBorderBottom, item } = this.props;
    const { date, hasData } = item;

    return (
      <span className={ cx(styles.wrapper, 'test--timeline-year-item', { [styles.wrapperNoData]: !hasData }) }>
        <div className={ cx('content', { 'no-border-bottom': !hasBorderBottom }) }>
          <span className={ cx('date', { 'date-no-data': !hasData }) }>{ date }</span>
        </div>
      </span>
    );
  }
}

Year.propTypes = {
  item: PropTypes.shape({
    date: PropTypes.string,
    hasData: PropTypes.bool,
  }),
  hasBorderBottom: PropTypes.bool,
};
