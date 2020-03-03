import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TriangleExplainer from 'components/officer-page/radar-chart/explainer/triangle-explainer';
import { cmsSelector } from 'selectors/common/cms';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    descriptionCMSContent: cmsSelector(state, 'officerPage', 'triangle_description'),
    subDescriptionCMSContent: cmsSelector(state, 'officerPage', 'triangle_sub_description'),
  };
}

export default withRouter(connect(mapStateToProps)(TriangleExplainer));
