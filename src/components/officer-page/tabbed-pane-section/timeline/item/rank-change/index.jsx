import React, { PropTypes, Component } from 'react';

import styles from './rank-change.sass';


export default class RankChange extends Component {
  render() {
    const { rank, oldRank, date } = this.props.item;

    return (
      <span className={ styles.wrapper }>
        <span className='rank-change'>
          <span className={ oldRank === 'Unassigned' ? 'unassigned-old-rank' : 'assigned-old-rank' }>
            { oldRank } →&nbsp;
          </span>
          <span className='new-rank'>{ rank }</span>
        </span>
        <span className='date'>{ date }</span>
      </span>
    );
  }
}

RankChange.propTypes = {
  item: PropTypes.object,
};
