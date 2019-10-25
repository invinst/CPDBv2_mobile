import { connect } from 'react-redux';

import ComplaintSummaries from 'components/landing-page/complaint-summaries';
import { requestComplaintSummaries } from 'actions/landing-page';
import { addOrRemoveItemInPinboard } from 'actions/pinboard';
import { complaintSummariesSelector } from 'selectors/landing-page';
import { cmsSelector } from 'selectors/common/cms';


const mapStateToProps = state => ({
  complaintSummaries: complaintSummariesSelector(state),
  description: cmsSelector(state, 'landingPage', 'carousel_complaint_desc'),
  title: cmsSelector(state, 'landingPage', 'carousel_complaint_title'),
});

const mapDispatchToProps = {
  requestComplaintSummaries,
  addOrRemoveItemInPinboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintSummaries);
