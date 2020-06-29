import PropTypes from 'prop-types';
import React from 'react';

import GeographicContainer from 'containers/pinboard-page/geographic-container';
import SocialGraphContainer from 'containers/pinboard-page/social-graph-container';
import ComplaintSummaryContainer from 'containers/pinboard-page/widgets/complaint-summary-container';
import TRRSummaryContainer from 'containers/pinboard-page/widgets/trr-summary-container';
import OfficersSummaryContainer from 'containers/pinboard-page/widgets/officers-summary-container';
import ComplainantsSummaryContainer from 'containers/pinboard-page/widgets/complainants-summary-container';
import styles from './pinboard-data-visualization.sass';
import HorizontalScrolling from 'components/common/horizontal-scrolling';
import Widget from 'components/common/pinboard/widgets/widget';


export default function PinboardDataVisualization(props) {
  const { hasMapMarker, hasComplaintSummary, hasTRRSummary, hasOfficersSummary, hasComplainantsSummary } = props;
  const slideOptions = {
    slidesOffsetAfter: 0,
  };

  return (
    <div className={ styles.pinboardDataVisualization }>
      <div className='pinboard-data-visualization-title'>GRAPHS & MAPS</div>
      <HorizontalScrolling
        slideOptions={ slideOptions }
        spaceBetween={ 4 }
        hasPagination={ true }
      >
        <Widget widgetTitle='SOCIAL GRAPH' isVisualization={ true }>
          <SocialGraphContainer />
        </Widget>
        {
          hasMapMarker && (
            <Widget widgetTitle='GEOGRAPHIC MAP' isVisualization={ true }>
              <GeographicContainer />
            </Widget>
          )
        }
        {
          hasComplaintSummary && (
            <Widget widgetTitle='COMPLAINT SUMMARY'>
              <ComplaintSummaryContainer />
            </Widget>
          )
        }
        {
          hasTRRSummary && (
            <Widget widgetTitle='TACTICAL RESPONSE REPORT SUMMARY'>
              <TRRSummaryContainer />
            </Widget>
          )
        }
        {
          hasOfficersSummary && (
            <Widget widgetTitle='OFFICERS'>
              <OfficersSummaryContainer />
            </Widget>
          )
        }
        {
          hasComplainantsSummary && (
            <Widget widgetTitle='COMPLAINANTS'>
              <ComplainantsSummaryContainer />
            </Widget>
          )
        }
      </HorizontalScrolling>
    </div>
  );
}

PinboardDataVisualization.propTypes = {
  hasMapMarker: PropTypes.bool,
  hasComplaintSummary: PropTypes.bool,
  hasTRRSummary: PropTypes.bool,
  hasOfficersSummary: PropTypes.bool,
  hasComplainantsSummary: PropTypes.bool,
};

PinboardDataVisualization.defaultProps = {
  hasMapMarker: false,
  hasComplaintSummary: false,
  hasTRRSummary: false,
  hasOfficersSummary: false,
};
