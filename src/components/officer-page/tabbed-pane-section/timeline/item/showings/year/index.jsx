import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './year.sass';


export default class Year extends Component {
  render() {
    const { hasBorderBottom, item } = this.props;
    const { date, hasData } = item;

    return (
      <div className={ cx(styles.wrapper, 'test--timeline-year-item') }>
        <div className={ cx('content', { 'content-no-data': !hasData }, { 'no-border-bottom': !hasBorderBottom }) }>
          <div className={ cx('date', { 'date-no-data': !hasData } ) }>{ date }</div>
        </div>
      </div>
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
