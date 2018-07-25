import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TRRPage from 'components/trr-page';
import { requestTRR } from 'actions/trr-page';
import { trrSelector } from 'selectors/trr-page';


const mapStateToProps = (state, ownProps) => ({
  trrId: Number.parseInt(ownProps.params.trrId),
  trr: trrSelector(state, ownProps)
});

const mapDispatchToProps = {
  requestTRR
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TRRPage));
