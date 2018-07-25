import { connect } from 'react-redux';

import RecentActivities from 'components/landing-page/recent-activities';
import { requestRecentActivities } from 'actions/landing-page';
import { recentActivitiesSelector, cmsSelector } from 'selectors/landing-page';

const mapStateToProps = state => ({
  recentActivities: recentActivitiesSelector(state),
  description: cmsSelector('carousel_activity_desc')(state),
  title: cmsSelector('carousel_activity_title')(state)
});

const mapDispatchToProps = {
  requestRecentActivities
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentActivities);
