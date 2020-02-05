import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './rank-change.sass';


export default class RankChange extends Component {
  render() {
    const { item, className } = this.props;
    const { rank, oldRank, date } = item;

    return (
      <span className={ cx(styles.wrapper, className) }>
        <span className='rank-change content'>
          <span className={ oldRank === 'Unassigned' ? 'unassigned-old-rank' : 'assigned-old-rank' }>
            { oldRank } →&nbsp;
          </span>
          <span className='new-rank'>{ rank }</span>
        </span>
        <span className='date content'>{ date }</span>
      </span>
    );
  }
}

RankChange.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object,
};
