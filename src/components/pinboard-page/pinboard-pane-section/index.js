import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import GeographicContainer from 'containers/pinboard-page/geographic-container';
import SocialGraphContainer from 'containers/pinboard-page/social-graph-container';
import styles from './pinboard-pane-section.sass';


export default class PinboardPaneSection extends Component {
  render() {
    const { hasMapMarker } = this.props;

    return (
      <div className={ cx(styles.pinboardPaneSection) }>
        <SocialGraphContainer />
        { hasMapMarker && <GeographicContainer /> }
      </div>
    );
  }
}

PinboardPaneSection.propTypes = {
  hasMapMarker: PropTypes.bool,
};
