import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import styles from './unit-change.sass';


export default class UnitChange extends Component {
  render() {
    const { unitName, oldUnitName, unitDescription, date } = this.props.item;

    return (
      <span className={ cx(styles.wrapper) }>
        <span className='unit-change'>
          {
            oldUnitName === 'Unassigned' ?
              <span className='unassigned-old-unit'>Unassigned → </span>
            :
              <span className='assigned-old-unit'>{ oldUnitName } → </span>
          }
          <span className='new-unit'>{ unitName } - { unitDescription }</span>
        </span>
        <span className='date'>{ date }</span>
      </span>
    );
  }
}

UnitChange.propTypes = {
  item: PropTypes.object,
};
