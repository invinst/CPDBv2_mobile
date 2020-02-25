import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './year.sass';


export default function Year(props) {
  const { className, item } = props;
  const { date, hasData } = item;

  return (
    <div className={ cx(styles.wrapper, className) }>
      <div className={ cx('content', { 'no-data': !hasData }) }>
        <div className={ cx('date', { 'no-data': !hasData }) }>{ date }</div>
      </div>
    </div>
  );
}

Year.propTypes = {
  className: PropTypes.string,
  item: PropTypes.shape({
    date: PropTypes.string,
    hasData: PropTypes.bool,
  }),
};
