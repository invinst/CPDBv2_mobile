import { connect } from 'react-redux';
import { push as pushBreadcrumbs } from 'redux-breadcrumb-trail';

import LandingPage from 'components/landing-page';
import { requestCMS } from 'actions/landing-page';
import { cmsSelector } from 'selectors/landing-page';

const mapStateToProps = state => ({
  title: cmsSelector('navbar_title')(state),
  description: cmsSelector('navbar_subtitle')(state)
});

const mapDispatchToProps = {
  requestCMS,
  pushBreadcrumbs
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
