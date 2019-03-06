import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';

import CMSContent from 'components/common/cms-content';
import HorizontalScrolling from 'components/common/horizontal-scrolling';
import OfficerCard from 'components/common/officer-card';
import style from './recent-activities.sass';
import constants from 'constants';


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
      <div className={ style.recentActivities }>
        <CMSContent className='carousel-title' content={ title } />
        <HorizontalScrolling trackingContentType={ constants.CAROUSEL_TYPES.ACTIVITY }>
          <CMSContent className='carousel-description' content={ description } />
          {
            recentActivities.map(officer => <OfficerCard officer={ officer } key={ officer.id } />)
          }
        </HorizontalScrolling>
      </div>
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
