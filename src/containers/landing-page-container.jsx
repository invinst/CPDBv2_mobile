import { connect } from 'react-redux';
import { push as pushBreadcrumbs } from 'redux-breadcrumb-trail';

import LandingPage from 'components/landing-page';
import { requestCMS } from 'actions/landing-page';
import { cmsSelector } from 'selectors/common/cms';

const mapStateToProps = state => ({
  title: cmsSelector(state, 'landingPage', 'navbar_title'),
  description: cmsSelector(state, 'landingPage', 'navbar_subtitle')
});

const mapDispatchToProps = {
  requestCMS,
  pushBreadcrumbs
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
