import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import constants from 'constants';
import styles from './marker.sass';


export default class Marker extends Component {
  render() {
    const { kind, finding } = this.props;

    return (
      <div
        className={ cx(
          styles.marker,
          {
            'force': kind === constants.MAP_ITEMS.FORCE,
            'complaint': kind === constants.MAP_ITEMS.CR,
            'sustained-finding': finding === 'Sustained',
          },
          'test--marker'
        ) }
      />
    );
  }
}

Marker.propTypes = {
  kind: PropTypes.string,
  finding: PropTypes.string,
};
