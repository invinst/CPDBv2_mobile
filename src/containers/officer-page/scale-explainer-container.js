import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ScaleExplainer from 'components/officer-page/radar-chart/explainer/scale-explainer';
import { cmsSelector } from 'selectors/common/cms';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    descriptionCMSContent: cmsSelector(state, 'officerPage', 'scale_description'),
    subDescriptionCMSContent: cmsSelector(state, 'officerPage', 'scale_sub_description'),
  };
}

export default withRouter(connect(mapStateToProps)(ScaleExplainer));
