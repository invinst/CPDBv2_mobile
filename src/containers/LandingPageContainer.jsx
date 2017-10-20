import { connect } from 'react-redux';

import LandingPage from 'components/LandingPage';
import { requestLandingPage } from 'actions/landing-page';

const mapDispatchToProps = {
  requestLandingPage
};

export default connect(undefined, mapDispatchToProps)(LandingPage);
