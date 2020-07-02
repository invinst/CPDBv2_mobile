import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import OfficerCard from 'components/common/officer-card';
import CarouselWrapper from './carousel-wrapper';
import { CAROUSEL_TYPES } from 'constants';


export default class RecentActivities extends Component {

  componentDidMount() {
    const { recentActivities, requestRecentActivities } = this.props;

    if (isEmpty(recentActivities)) {
      requestRecentActivities();
    }
  }

  render() {
    const { recentActivities, description, title, addOrRemoveItemInPinboard } = this.props;

    return (
      <CarouselWrapper
        title={ title }
        description={ description }
        trackingContentType={ CAROUSEL_TYPES.ACTIVITY }
      >
        {
          recentActivities.map(officer =>
            <OfficerCard
              pinnable={ true }
              officer={ officer }
              key={ officer.id }
              addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
            />
          )
        }
      </CarouselWrapper>
    );
  }
}

RecentActivities.defaultProps = {
  requestRecentActivities: () => {},
  addOrRemoveItemInPinboard: () => {},
  recentActivities: [],
};

RecentActivities.propTypes = {
  recentActivities: PropTypes.array,
  requestRecentActivities: PropTypes.func,
  addOrRemoveItemInPinboard: PropTypes.func,
  description: PropTypes.object,
  title: PropTypes.object,
};
