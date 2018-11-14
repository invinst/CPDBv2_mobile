import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import OfficerPage from 'components/officer-page';
import { fetchOfficer, requestCMS } from 'actions/officer-page';
import {
  officerSummarySelector,
  officerMetricsSelector,
  officerYearlyPercentileSelector,
} from 'selectors/officer-page';
import { cmsSelector, hasCMS } from 'selectors/common/cms';
import { hasCoaccusalSelector, isCoaccusalSuccess } from 'selectors/officer-page/coaccusals';
import { isTimelineSuccess } from 'selectors/officer-page/timeline';
import { getOfficerTimeline } from 'actions/officer-page/timeline';
import { getOfficerCoaccusals } from 'actions/officer-page/coaccusals';
import { hasAttachmentSelector } from 'selectors/officer-page/attachments';


function mapStateToProps(state, ownProps) {
  const pk = Number.parseInt(ownProps.params.id);
  const props = {
    ...ownProps,
    params: {
      ...ownProps.params,
      id: pk
    }
  };
  return {
    location: ownProps.location,
    params: ownProps.params,
    loading: state.officerPage.officers.isRequesting,
    found: state.officerPage.officers.isSuccess,
    summary: officerSummarySelector(state, props),
    metrics: officerMetricsSelector(state, props),
    threeCornerPercentile: officerYearlyPercentileSelector(state, props),
    requestOfficerId: pk,
    hasCMS: hasCMS(state, 'officerPage'),
    noDataCMSContent: cmsSelector(state, 'officerPage', 'no_data_explain_text'),
    hasCoaccusal: hasCoaccusalSelector(state, pk),
    hasAttachment: hasAttachmentSelector(state, pk),
    isCoaccusalSuccess: isCoaccusalSuccess(state, pk),
    isTimelineSuccess: isTimelineSuccess(state, pk),
  };
}

const mapDispatchToProps = {
  requestCMS,
  fetchOfficer,
  getOfficerTimeline,
  getOfficerCoaccusals
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfficerPage));
