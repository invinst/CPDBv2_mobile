import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import styles from './joined.sass';


export default class Joined extends Component {

  render() {
    const { item, hasBorderBottom } = this.props;
    const unitString = item.unitName === 'Unassigned' ? '' : `with ${item.unitName} `;

    return (
      <span className={ cx(styles.wrapperShowing) }>
        <span className='showing'>
          <span className='join'>
            Joined Chicago Police Department { unitString }as a {item.rank}
          </span>
          <span className='date'>{ item.date }</span>
        </span>
      </span>
    );
  }
}

Joined.propTypes = {
  item: PropTypes.object,
  hasBorderBottom: PropTypes.bool,
};
