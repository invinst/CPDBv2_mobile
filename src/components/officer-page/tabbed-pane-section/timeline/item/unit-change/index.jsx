import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import styles from './unit-change.sass';


export default class UnitChange extends Component {
  render() {
    const { item, className } = this.props;
    const { unitName, oldUnitName, unitDescription, date } = item;

    return (
      <span className={ cx(styles.wrapper, className) }>
        <span className='unit-change content'>
          {
            oldUnitName === 'Unassigned' ?
              <span className='unassigned-old-unit'>Unassigned → </span>
              :
              <span className='assigned-old-unit'>{ oldUnitName } → </span>
          }
          <span className='new-unit'>{ unitName } - { unitDescription }</span>
        </span>
        <span className='date content'>{ date }</span>
      </span>
    );
  }
}

UnitChange.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object,
};
