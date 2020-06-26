import PropTypes from 'prop-types';
import React from 'react';

import GeographicContainer from 'containers/pinboard-page/geographic-container';
import SocialGraphContainer from 'containers/pinboard-page/social-graph-container';
import styles from './pinboard-data-visualization.sass';
import HorizontalScrolling from 'components/common/horizontal-scrolling';
import Widget from 'components/common/pinboard/widgets/widget';


export default function PinboardDataVisualization(props) {
  const { hasMapMarker } = props;
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
        <Widget widgetTitle='SOCIAL GRAPH' isVisualization={ true }>
          <SocialGraphContainer />
        </Widget>
        {
          hasMapMarker &&
          (
            <Widget widgetTitle='GEOGRAPHIC MAP' isVisualization={ true }>
              <GeographicContainer />
            </Widget>
          )
        }
      </HorizontalScrolling>
    </div>
  );
}

PinboardDataVisualization.propTypes = {
  pinboard: PropTypes.object,
  hasMapMarker: PropTypes.bool,
};

PinboardDataVisualization.defaultProps = {
  pinboard: {},
  hasMapMarker: false,
};
