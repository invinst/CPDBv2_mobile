import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './simple-marker-tooltip.sass';


export default class SimpleMarkerTooltip extends Component {
  render() {
    const { kind, id, category, url } = this.props;
    return (
      <a className={ cx(styles.simpleMarkerTooltip, 'test--simple-marker-tooltip') } href={ url }>
        <div className='simple-marker-tooltip-row'>
          <div className='simple-marker-tooltip-title'>
            { kind } { id }
          </div>
          <div className='simple-marker-tooltip-category'>
            { category }
          </div>
        </div>
      </a>
    );
  }
}

SimpleMarkerTooltip.propTypes = {
  kind: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.string,
  category: PropTypes.string,
};
