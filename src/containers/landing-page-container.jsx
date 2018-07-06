import { connect } from 'react-redux';
import { push as pushBreadcrumbs } from 'redux-breadcrumb-trail';

import LandingPage from 'components/landing-page';
import { requestLandingPage } from 'actions/landing-page';

const mapDispatchToProps = {
  requestLandingPage,
  pushBreadcrumbs
};

export default connect(undefined, mapDispatchToProps)(LandingPage);
