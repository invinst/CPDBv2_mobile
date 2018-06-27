import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './year.sass';



export default class Year extends Component {
  render() {
    const { hasBorderBottom, item } = this.props;
    const { date, hasData } = item;

    return (
      <span className={ cx(styles.wrapperShowing, 'test--timeline-year-item') }>
        <div
          className={ hasData ? 'has-data-showing' : 'no-data-showing' }
        >
          <span className={ hasData ? 'has-data-date' : 'no-data-date' }>{ date }</span>
          <br className='clear-float' />
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
