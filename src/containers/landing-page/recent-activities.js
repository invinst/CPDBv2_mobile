import { connect } from 'react-redux';

import RecentActivities from 'components/landing-page/recent-activities';
import { requestRecentActivities } from 'actions/landing-page';
import { recentActivitiesSelector } from 'selectors/landing-page';
import { cmsSelector } from 'selectors/common/cms';

const mapStateToProps = state => ({
  recentActivities: recentActivitiesSelector(state),
  description: cmsSelector(state, 'landingPage', 'carousel_activity_desc'),
  title: cmsSelector(state, 'landingPage', 'carousel_activity_title')
});

const mapDispatchToProps = {
  requestRecentActivities
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentActivities);
