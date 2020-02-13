import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TRRPage from 'components/trr-page';
import { requestTRR } from 'actions/trr-page';
import { trrSelector, getCMSRequested } from 'selectors/trr-page';
import { requestCMS } from 'actions/trr-page';


const mapStateToProps = (state, ownProps) => ({
  trrId: Number.parseInt(ownProps.match.params.trrId),
  trr: trrSelector(state, ownProps),
  cmsRequested: getCMSRequested(state),
});

const mapDispatchToProps = {
  requestTRR,
  requestCMS,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TRRPage));
