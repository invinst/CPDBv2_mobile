import React, { Component, PropTypes } from 'react';

import GeographicContainer from 'containers/pinboard-page/geographic-container';
import SocialGraphContainer from 'containers/pinboard-page/social-graph-container';
import styles from './pinboard-data-visualization.sass';
import HorizontalScrolling from 'components/common/horizontal-scrolling';


export default class PinboardDataVisualization extends Component {
  render() {
    const { hasMapMarker } = this.props;
    const slideOptions = {
      slidesOffsetAfter: 0,
    };

    return (
      <div className={ styles.pinboardDataVisualization }>
        <div className='visualization-title'>GRAPHS & MAPS</div>
        <HorizontalScrolling
          slideOptions={ slideOptions }
          spaceBetween={ 4 }
          hasPagination={ true }
        >
          <div className='visualization-item'>
            <SocialGraphContainer />
          </div>
          {
            hasMapMarker &&
            (
              <div className='visualization-item'>
                <GeographicContainer />
              </div>
            )
          }
        </HorizontalScrolling>
      </div>
    );
  }
}

PinboardDataVisualization.propTypes = {
  pinboard: PropTypes.object,
  hasMapMarker: PropTypes.bool,
};

PinboardDataVisualization.defaultProps = {
  pinboard: {},
  hasMapMarker: false,
};
