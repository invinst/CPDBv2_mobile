import { connect } from 'react-redux';

import LandingPage from 'components/landing-page';
import { requestCMS } from 'actions/landing-page';

const mapDispatchToProps = {
  requestCMS
};

export default connect(undefined, mapDispatchToProps)(LandingPage);
