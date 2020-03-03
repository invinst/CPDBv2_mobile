import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { isNaN } from 'lodash';

import OfficerPage from 'components/officer-page';
import { fetchOfficer, requestCMS, resetTimelineFilter } from 'actions/officer-page';
import {
  officerSummarySelector,
  officerMetricsSelector,
  officerYearlyPercentileSelector,
  getIsOfficerPinned,
} from 'selectors/officer-page';
import { addOrRemoveItemInPinboard } from 'actions/pinboard';
import { cmsSelector, hasCMS } from 'selectors/common/cms';
import { hasCoaccusalSelector, isCoaccusalSuccess } from 'selectors/officer-page/coaccusals';
import { isTimelineSuccess } from 'selectors/officer-page/timeline';
import { getOfficerTimeline } from 'actions/officer-page/timeline';
import { getOfficerCoaccusals } from 'actions/officer-page/coaccusals';
import { hasAttachmentSelector, numAttachmentsSelector } from 'selectors/officer-page/attachments';
import { hasMapMarkersSelector } from 'selectors/officer-page/map';


function mapStateToProps(state, ownProps) {
  const parsedId = Number.parseInt(ownProps.match.params.id);
  const pk = isNaN(parsedId) ? null : parsedId;

  const props = {
    ...ownProps,
    params: {
      ...ownProps.match.params,
      id: pk,
    },
  };
  return {
    location: ownProps.location,
    params: ownProps.match.params,
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
    hasMapMarker: hasMapMarkersSelector(state, pk),
    isCoaccusalSuccess: isCoaccusalSuccess(state, pk),
    isTimelineSuccess: isTimelineSuccess(state, pk),
    numAttachments: numAttachmentsSelector(state, pk),
    isPinned: getIsOfficerPinned(state, pk),
  };
}

const mapDispatchToProps = {
  requestCMS,
  fetchOfficer,
  getOfficerTimeline,
  getOfficerCoaccusals,
  resetTimelineFilter,
  addOrRemoveItemInPinboard,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfficerPage));
