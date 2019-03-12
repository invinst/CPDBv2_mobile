import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';

import OfficerCard from 'components/common/officer-card';
import CarouselWrapper from './carousel-wrapper';


export default class RecentActivities extends Component {

  componentDidMount() {
    const { recentActivities, requestRecentActivities } = this.props;

    if (isEmpty(recentActivities)) {
      requestRecentActivities();
    }
  }

  render() {
    const { recentActivities, description, title } = this.props;

    return (
      <CarouselWrapper title={ title } description={ description }>
        {
          recentActivities.map(officer => <OfficerCard officer={ officer } key={ officer.id } />)
        }
      </CarouselWrapper>
    );
  }
}

RecentActivities.defaultProps = {
  requestRecentActivities: () => {},
  recentActivities: []
};

RecentActivities.propTypes = {
  recentActivities: PropTypes.array,
  requestRecentActivities: PropTypes.func,
  description: PropTypes.object,
  title: PropTypes.object
};
