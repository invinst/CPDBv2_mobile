import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import { MAP_ITEMS } from 'constants/officer-page/tabbed-pane-section/map';
import styles from './marker.sass';


export default class Marker extends Component {
  render() {
    const { kind, finding } = this.props;

    return (
      <div
        className={ cx(
          styles.marker,
          {
            'force': kind === MAP_ITEMS.FORCE,
            'complaint': kind === MAP_ITEMS.CR,
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
